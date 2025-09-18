import React from 'react';

interface DocumentActionsProps {
    onSave: () => void;
    onCancel: () => void;
    isLoading: boolean;
    isSaving: boolean;
    canSave: boolean;
}

const DocumentActions: React.FC<DocumentActionsProps> = ({
    onSave,
    onCancel,
    isLoading,
    isSaving,
    canSave,
}) => {
    return (
        <div className="document-actions">
            <button
                className="btn-primary"
                onClick={onSave}
                disabled={isLoading || isSaving || !canSave}
            >
                {isSaving ? 'Saving...' : 'Save Document'}
            </button>
            <button
                className="btn-secondary"
                onClick={onCancel}
                disabled={isLoading || isSaving}
            >
                Cancel
            </button>
        </div>
    );
};

export default DocumentActions;