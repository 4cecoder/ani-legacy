import { useEffect, useRef, useState } from "react";

const useWebSocket = (
  url: string,
  onMessage: (event: MessageEvent) => void,
  username: string
) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);

  useEffect(() => {
    if (!url) return;

    const newSocket = new WebSocket(url);
    newSocket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.username !== username) {
        const audio = new Audio("/notification.mp3");
        audio.play().then((r) => console.log(r));
      }
      onMessage(event);
    });

    newSocket.addEventListener("open", () => {
      console.log("WebSocket connected");
      socketRef.current = newSocket;
      setWs(newSocket);
      setReconnectAttempt(0);
    });

    newSocket.addEventListener("close", () => {
      console.log("WebSocket disconnected");
      socketRef.current = null;
      setWs(null);
      scheduleReconnect();
    });

    newSocket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
      // Add logic to handle errors and possibly attempt to reconnect
    });

    return () => {
      newSocket.removeEventListener("message", onMessage);
      newSocket.close();
    };
  }, [url, onMessage, username, reconnectAttempt]);

  const scheduleReconnect = () => {
    const timeout = Math.min(1000 * 2 ** reconnectAttempt, 30000);
    console.log(`Scheduling WebSocket reconnect in ${timeout} ms`);
    setTimeout(() => setReconnectAttempt(reconnectAttempt + 1), timeout);
  };

  return ws;
};

export default useWebSocket;
