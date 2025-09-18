import React from 'react';

interface AIActionsProps {
    onSummarize: () => void;
    onGenerateTags: () => void;
    isLoading: boolean;
    isSaving: boolean;
    hasContent: boolean;
}

const AIActions: React.FC<AIActionsProps> = ({
    onSummarize,
    onGenerateTags,
    isLoading,
    isSaving,
    hasContent,
}) => {
    return (
        <div className="ai-actions">
            <button
                className="btn-primary"
                onClick={onSummarize}
                disabled={isLoading || isSaving || !hasContent}
            >
                {isLoading ? 'Processing...' : 'Summarize with Gemini'}
            </button>
            <button
                className="btn-primary"
                onClick={onGenerateTags}
                disabled={isLoading || isSaving || !hasContent}
            >
                {isLoading ? 'Processing...' : 'Generate Tags with Gemini'}
            </button>
        </div>
    );
};

export default AIActions;