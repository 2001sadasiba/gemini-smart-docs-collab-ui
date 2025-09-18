import React from 'react';

interface DocumentFormProps {
    title: string;
    content: string;
    onTitleChange: (title: string) => void;
    onContentChange: (content: string) => void;
    isLoading: boolean;
    isSaving: boolean;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
    title,
    content,
    onTitleChange,
    onContentChange,
    isLoading,
    isSaving,
}) => {
    return (
        <>
            <div className="qna-input">
                <input
                    type="text"
                    placeholder="Document Title"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    className="search-input"
                    disabled={isLoading || isSaving}
                />
            </div>
            <div className="qna-input">
                <textarea
                    placeholder="Document Content"
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    className="search-input"
                    style={{ minHeight: '200px', resize: 'vertical' }}
                    disabled={isLoading || isSaving}
                />
            </div>
        </>
    );
};

export default DocumentForm;