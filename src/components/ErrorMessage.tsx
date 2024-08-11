import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white text-red-600 font-semibold text-xl p-6 rounded-lg shadow-lg">
        {message}
      </div>
    </div>
  );
};

export default ErrorMessage;
