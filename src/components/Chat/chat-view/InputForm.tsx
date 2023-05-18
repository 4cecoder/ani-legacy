import { FaExclamationCircle } from "react-icons/fa";
import React from "react";

interface InputFormProps {
  inputValue: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  warningMessage: string;
}

const InputForm: React.FC<InputFormProps> = ({
  inputValue,
  handleChange,
  handleKeyDown,
  warningMessage,
}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="mt-4">
      <textarea
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="resize-vertical mb-2 w-full overflow-auto whitespace-pre-wrap rounded-2xl border bg-gray-700 p-3 text-gray-300 placeholder-white"
        placeholder="Type a message"
        style={{ maxHeight: "200px", height: "80px" }}
      />
      {warningMessage && (
        <div className="mt-2 flex items-center text-sm text-red-500">
          <FaExclamationCircle className="mr-1" />
          {warningMessage}
        </div>
      )}
    </form>
  );
};

export default InputForm;
