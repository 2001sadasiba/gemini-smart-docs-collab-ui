import React from 'react';
import type { PaginationInfo } from '../../types/dashboard.types';

interface PaginationProps {
    paginationInfo: PaginationInfo;
    isFilteringLocally: boolean;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    paginationInfo,
    isFilteringLocally,
    onPageChange,
    onLimitChange,
}) => {
    const { page, totalPages, limit, total } = paginationInfo;

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <div className="pagination-info">
                <span>
                    Showing {((page - 1) * limit) + 1} to{' '}
                    {Math.min(page * limit, total)} of {total} documents
                    {isFilteringLocally && ' (filtered)'}
                </span>
                <select
                    value={limit}
                    onChange={e => onLimitChange(Number(e.target.value))}
                    className="limit-select"
                >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                </select>
            </div>

            <div className="pagination-controls">
                <button
                    className="pagination-btn"
                    disabled={page <= 1}
                    onClick={() => onPageChange(1)}
                >
                    First
                </button>
                <button
                    className="pagination-btn"
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    Previous
                </button>
                {renderPageNumbers().map(pageNum => (
                    <button
                        key={pageNum}
                        className={`pagination-btn ${page === pageNum ? 'active' : ''}`}
                        onClick={() => onPageChange(pageNum)}
                    >
                        {pageNum}
                    </button>
                ))}
                <button
                    className="pagination-btn"
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                >
                    Next
                </button>
                <button
                    className="pagination-btn"
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(totalPages)}
                >
                    Last
                </button>
            </div>
        </div>
    );
};

export default Pagination;