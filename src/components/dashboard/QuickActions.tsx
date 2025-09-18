import React from 'react';

interface QuickActionsProps {
    onNewDocument: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onNewDocument }) => {
    return (
        <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button className="btn-primary" onClick={onNewDocument}>
                Create New Document
            </button>
            <button className="btn-secondary">View All Tags</button>
            <button className="btn-secondary">Import Documents</button>
        </div>
    );
};

export default QuickActions;