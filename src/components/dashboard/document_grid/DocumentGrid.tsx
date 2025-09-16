import React from 'react';
import { DocumentCard } from './document_card';
import { EmptyState } from '../empty_state';
import '../../../styles/DocumentGrid.css';

const DocumentGrid: React.FC = () => {

    const documents = [
        {
            id: 1,
            title: 'React Best Practices',
            summary: 'Comprehensive guide to React development patterns and performance optimization techniques for modern applications.',
            tags: ['React', 'JavaScript', 'Frontend'],
            author: 'You',
            createdAt: '2 hours ago',
            updatedAt: '30 minutes ago'
        },
        {
            id: 2,
            title: 'API Design Principles',
            summary: 'Best practices for designing RESTful APIs including versioning, authentication, and error handling strategies.',
            tags: ['API', 'Backend', 'REST'],
            author: 'Sarah Chen',
            createdAt: '1 day ago',
            updatedAt: '5 hours ago'
        },
        {
            id: 3,
            title: 'Database Optimization',
            summary: 'Techniques for optimizing database performance including indexing, query optimization, and caching strategies.',
            tags: ['Database', 'SQL', 'Performance'],
            author: 'Mike Johnson',
            createdAt: '3 days ago',
            updatedAt: '2 days ago'
        }
    ];

    return (
        <div className="document-grid-container">
            {documents.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <div className="grid-header">
                        <h2 className="grid-title">Recent Documents</h2>
                        <span className="document-count">{documents.length} documents</span>
                    </div>
                    <div className="document-grid">
                        {documents.map((doc) => (
                            <DocumentCard key={doc.id} document={doc} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default DocumentGrid;