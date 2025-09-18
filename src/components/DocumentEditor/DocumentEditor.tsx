import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocumentEditor } from '../../hooks/useDocumentEditor';
import EditorHeader from './EditorHeader';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import DocumentForm from './DocumentForm';
import AIActions from './AIActions';
import DocumentActions from './DocumentActions';
import AuthenticationError from './AuthenticationError';
import '../../styles/Dashboard.css';

const DocumentEditor: React.FC = () => {
    const { docId } = useParams<{ docId?: string }>();
    
    const {
        title,
        content,
        error,
        isLoading,
        isSaving,
        isEditing,
        isAuthenticated,
        setTitle,
        setContent,
        setError,
        handleSave,
        handleSummarize,
        handleGenerateTags,
        handleCancel,
    } = useDocumentEditor(docId);

    if (!isAuthenticated) {
        return <AuthenticationError />;
    }

    const canSave = !title.trim() && !content.trim();
    const hasContent = !content.trim();

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <div className="main-content">
                    <div className="qna-section">
                        <EditorHeader isEditing={!isEditing} />
                        
                        {error && (
                            <ErrorMessage 
                                error={error} 
                                onDismiss={() => setError(null)} 
                            />
                        )}
                        
                        {isLoading ? (
                            <LoadingSpinner message="Loading document..." />
                        ) : (
                            <>
                                <DocumentForm
                                    title={title}
                                    content={content}
                                    onTitleChange={setTitle}
                                    onContentChange={setContent}
                                    isLoading={isLoading}
                                    isSaving={isSaving}
                                />
                                
                                <AIActions
                                    onSummarize={handleSummarize}
                                    onGenerateTags={handleGenerateTags}
                                    isLoading={isLoading}
                                    isSaving={isSaving}
                                    hasContent={hasContent}
                                />
                                
                                <DocumentActions
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                    isLoading={isLoading}
                                    isSaving={isSaving}
                                    canSave={canSave}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentEditor;