import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { RootState } from '../../store/store';
import { getDocumentDetailsById } from '../../services';
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
    versions: Array<{
        versionNumber: number;
        title: string;
        content: string;
        tags: string[];
        summary: string;
        createdAt: string;
        _id: string;
    }>;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const DocumentView: React.FC = () => {
    const { docId } = useParams<{ docId: string }>();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [document, setDocument] = useState<Document | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token || !isAuthenticated || !docId) {
            setError('Authentication required');
            setIsLoading(false);
            return;
        }

        const fetchDocument = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await getDocumentDetailsById({ token, docId });
                setDocument(response.data.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load document');
            } finally {
                setIsLoading(false);
            }
        };
        fetchDocument();
    }, [docId, token, isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="dashboard-container">
                <div className="dashboard">
                    <div className="auth-error">
                        <h2>Authentication Required</h2>
                        <p>Please log in to view the document.</p>
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
                        <h2>Document Details</h2>
                        {error && (
                            <div className="error-message">
                                <p>{error}</p>
                                <button onClick={() => setError(null)} className="btn-secondary">
                                    Dismiss
                                </button>
                            </div>
                        )}
                        {isLoading ? (
                            <div className="dashboard-loading">Loading...</div>
                        ) : !document ? (
                            <div className="no-documents">
                                <p>Document not found or access denied.</p>
                                <button onClick={() => navigate('/')} className="btn-secondary">
                                    Back to Dashboard
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3>{document.title}</h3>
                                <p className="summary">{document.summary}</p>
                                <div className="tags">
                                    {document.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <div className="document-meta">
                                    <span className="author">By {document.createdBy.email.split('@')[0]}</span>
                                    <span className="date">{new Date(document.updatedAt).toLocaleDateString()}</span>
                                </div>
                                <div className="document-content">
                                    <h4>Content:</h4>
                                    <p>{document.content}</p>
                                </div>
                                <div className="document-actions">
                                    <button
                                        className="btn-primary"
                                        onClick={() => navigate(`/document/${document._id}`)}
                                    >
                                        Edit Document
                                    </button>
                                    <button
                                        className="btn-secondary"
                                        onClick={() => navigate('/dashboard')}
                                    >
                                        Back to Dashboard
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

export default DocumentView;