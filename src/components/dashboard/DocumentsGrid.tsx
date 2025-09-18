import React from 'react';
import DocumentCard from './DocumentCard';
import Pagination from './Pagination';
import Loader from '../Loader';
import type { Document, PaginationInfo } from '../../types/dashboard.types';

interface DocumentsGridProps {
    documents: Document[];
    paginationInfo: PaginationInfo;
    isLoading: boolean;
    isFilteringLocally: boolean;
    searchTerm: string;
    selectedTags: string[];
    onNewDocument: () => void;
    onViewDocument: (docId: string) => void;
    onEditDocument: (docId: string) => void;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
    onClearAllFilters: () => void;
}

const DocumentsGrid: React.FC<DocumentsGridProps> = ({
    documents,
    paginationInfo,
    isLoading,
    isFilteringLocally,
    searchTerm,
    selectedTags,
    onNewDocument,
    onViewDocument,
    onEditDocument,
    onPageChange,
    onLimitChange,
    onClearAllFilters,
}) => {
    const hasFilters = searchTerm || selectedTags.length > 0;

    return (
        <div className="documents-grid">
            <div className="documents-header">
                <h2>Team Documents ({paginationInfo.total})</h2>
                <button className="btn-primary" onClick={onNewDocument}>
                    + New Document
                </button>
            </div>

            {isLoading ? (
                <Loader message="Loading documents..." />
            ) : documents.length === 0 ? (
                <div className="no-documents">
                    <p>No documents found. Try adjusting your search or filters.</p>
                    {hasFilters && (
                        <button onClick={onClearAllFilters}>Clear all filters</button>
                    )}
                </div>
            ) : (
                <>
                    <div className="documents-list">
                        {documents.map(doc => (
                            <DocumentCard
                                key={doc._id}
                                document={doc}
                                onView={onViewDocument}
                                onEdit={onEditDocument}
                            />
                        ))}
                    </div>
                    <Pagination
                        paginationInfo={paginationInfo}
                        isFilteringLocally={isFilteringLocally}
                        onPageChange={onPageChange}
                        onLimitChange={onLimitChange}
                    />
                </>
            )}
        </div>
    );
};

export default DocumentsGrid;