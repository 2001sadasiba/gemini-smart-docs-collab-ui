import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { RootState } from '../../store/store';
import { updateDocument, getAllDocuments, createDocument } from '../../services';
import '../../styles/Dashboard.css';

interface Document {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    summary: string;
    createdBy: {
        _id: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}

const DocumentEditor: React.FC = () => {
    const { docId } = useParams<{ docId?: string }>();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Fetch document data if editing (and docId is not 'new')
    useEffect(() => {
        if (docId && docId !== 'new' && token && isAuthenticated) {
            const fetchDocument = async () => {
                try {
                    setIsLoading(true);
                    const response = await getAllDocuments({ token, page: '1', limit: '100' });
                    const document = response.data.data.find((doc: Document) => doc._id === docId);
                    if (document) {
                        setTitle(document.title);
                        setContent(document.content);
                    } else {
                        setError('Document not found');
                    }
                } catch (err: any) {
                    setError(err.response?.data?.message || 'Failed to load document');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchDocument();
        }
    }, [docId, token, isAuthenticated]);

    // Handle save (create or update)
    const handleSave = async () => {
        if (!title.trim() && !content.trim()) {
            setError('Both title and content are required');
            return;
        }
        if (!title.trim()) {
            setError('Title is required');
            return;
        }
        if (!content.trim()) {
            setError('Content is required');
            return;
        }
        if (!token || !isAuthenticated) {
            setError('Authentication required');
            return;
        }

        try {
            setIsSaving(true);
            setError(null);
            if (docId === 'new') {
                await createDocument({
                    token,
                    title,
                    context: content
                });
            } else {
                await updateDocument({
                    token,
                    docId: docId || '',
                    title,
                    context: content
                });
            }
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save document');
        } finally {
            setIsSaving(false);
        }
    };

    // Simulate Gemini summarize
    const handleSummarize = async () => {
        if (!content.trim()) {
            setError('Content is required to summarize');
            return;
        }
        try {
            setIsLoading(true);
            setError(null);
            // Simulate API call to Gemini
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Summary: This is a simulated summary from Gemini AI.');
        } catch (err) {
            setError('Failed to generate summary');
        } finally {
            setIsLoading(false);
        }
    };

    // Simulate Gemini tag generation
    const handleGenerateTags = async () => {
        if (!content.trim()) {
            setError('Content is required to generate tags');
            return;
        }
        try {
            setIsLoading(true);
            setError(null);
            // Simulate API call to Gemini
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Generated Tags: tag1, tag2, tag3');
        } catch (err) {
            setError('Failed to generate tags');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
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
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <div className="main-content">
                    <div className="qna-section">
                        <h2>{docId && docId !== 'new' ? 'Edit Document' : 'Create New Document'}</h2>
                        {error && (
                            <div className="error-message">
                                <p>{error}</p>
                                <button onClick={() => setError(null)} className="btn-secondary">Dismiss</button>
                            </div>
                        )}
                        {isLoading ? (
                            <div className="dashboard-loading">Loading...</div>
                        ) : (
                            <>
                                <div className="qna-input">
                                    <input
                                        type="text"
                                        placeholder="Document Title"
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                            setError(null);
                                        }}
                                        className="search-input"
                                    />
                                </div>
                                <div className="qna-input">
                                    <textarea
                                        placeholder="Document Content"
                                        value={content}
                                        onChange={(e) => {
                                            setContent(e.target.value);
                                            setError(null);
                                        }}
                                        className="search-input"
                                        style={{ minHeight: '200px', resize: 'vertical' }}
                                    />
                                </div>
                                <div className="document-actions">
                                    <button
                                        className="btn-primary"
                                        onClick={handleSummarize}
                                        disabled={isLoading || isSaving}
                                    >
                                        Summarize with Gemini
                                    </button>
                                    <button
                                        className="btn-primary"
                                        onClick={handleGenerateTags}
                                        disabled={isLoading || isSaving}
                                    >
                                        Generate Tags with Gemini
                                    </button>
                                    <button
                                        className="btn-primary"
                                        onClick={handleSave}
                                        disabled={isLoading || isSaving || !title.trim() || !content.trim()}
                                    >
                                        {isSaving ? 'Saving...' : 'Save Document'}
                                    </button>
                                    <button
                                        className="btn-secondary"
                                        onClick={() => navigate('/')}
                                        disabled={isLoading || isSaving}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentEditor;