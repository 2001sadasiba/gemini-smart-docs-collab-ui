import React from 'react';

interface LoadingSpinnerProps {
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    message = 'Loading...' 
}) => {
    return (
        <div className="dashboard-loading">
            {message}
        </div>
    );
};

export default LoadingSpinner;