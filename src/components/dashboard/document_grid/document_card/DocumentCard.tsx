import React from 'react';
import '../../../../styles/DocumentCard.css';

interface Document {
    id: number;
    title: string;
    summary: string;
    tags: string[];
    author: string;
    createdAt: string;
    updatedAt: string;
}

interface DocumentCardProps {
    document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
    return (
        <div className="document-card">
            <div className="card-header">
                <h3 className="document-title">{document.title}</h3>
                <span className="document-time">{document.updatedAt}</span>
            </div>

            <p className="document-summary">{document.summary}</p>

            <div className="document-tags">
                {document.tags.map((tag, index) => (
                    <span key={index} className="tag">
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="card-footer">
                <div className="document-meta">
                    <span className="document-author">By {document.author}</span>
                    <span className="document-date">Created {document.createdAt}</span>
                </div>

                <div className="card-actions">
                    <button className="action-btn summarize-btn" title="Summarize with AI">
                        📝 Summarize
                    </button>
                    <button className="action-btn tags-btn" title="Generate tags with AI">
                        🏷️ Tags
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentCard;