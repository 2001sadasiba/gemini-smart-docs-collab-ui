import React from 'react';

interface ErrorMessageProps {
    error: string;
    onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onDismiss }) => {
    return (
        <div className="error-message">
            <p>{error}</p>
            <button onClick={onDismiss}>Dismiss</button>
        </div>
    );
};

export default ErrorMessage;