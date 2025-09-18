import React from 'react';

const AuthenticationError: React.FC = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <div className="auth-error">
                    <h2>Authentication Required</h2>
                    <p>Please log in to access the document editor.</p>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationError;