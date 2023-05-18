#!/bin/bash

# Set environment variable
export NODE_ENV=production

# Define build output directory and log file
BUILD_DIR=dist
LOG_FILE=server.log

# Build the production bundle and log output to file
if ! vite build | tee -a $LOG_FILE; then
  echo "Error: Build failed, see $LOG_FILE for details"
  exit 1
fi

# Start the server as a background process and log output to file
serve -s $BUILD_DIR 2>&1 | tee -a $LOG_FILE &

# Log server start time
echo "Server started at $(date)" >> $LOG_FILE

# Monitor server process
while true; do
  # Check if server process is still running
  if ! ps -p $! > /dev/null; then
    echo "Error: Server process terminated unexpectedly, see $LOG_FILE for details"
    exit 1
  fi

  # Wait 5 seconds before checking again
  sleep 5
done
