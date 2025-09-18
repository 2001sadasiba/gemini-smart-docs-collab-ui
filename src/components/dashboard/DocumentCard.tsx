import React from 'react';
import type { Document } from '../../types/dashboard.types';

interface DocumentCardProps {
    document: Document;
    onView: (docId: string) => void;
    onEdit: (docId: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onView, onEdit }) => {
    return (
        <div className="document-card">
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
            <div className="document-actions">
                <button
                    className="btn-secondary"
                    onClick={() => onView(document._id)}
                >
                    View
                </button>
                <button
                    className="btn-secondary"
                    onClick={() => onEdit(document._id)}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default DocumentCard;