import React from 'react';
import '../../../styles/EmptyState.css';

interface EmptyStateProps {
    title?: string;
    description?: string;
    actionText?: string;
    onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No documents yet",
    description = "Create your first document to start building your knowledge hub",
    actionText = "Create Document",
    onAction
}) => {
    return (
        <div className="empty-state">
            <div className="empty-state-illustration">
                <div className="empty-state-icon">
                    <span className="icon">📄</span>
                    <div className="sparkle sparkle-1">✨</div>
                    <div className="sparkle sparkle-2">✨</div>
                    <div className="sparkle sparkle-3">✨</div>
                </div>
            </div>

            <div className="empty-state-content">
                <h3 className="empty-state-title">{title}</h3>
                <p className="empty-state-description">{description}</p>

                {onAction && (
                    <button className="empty-state-action-btn" onClick={onAction}>
                        {actionText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmptyState;