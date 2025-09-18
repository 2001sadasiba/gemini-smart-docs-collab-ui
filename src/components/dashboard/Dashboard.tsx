import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardLogic } from './DashboardLogic';
import SearchBar from './SearchBar';
import QnASection from './QnASection';
import TagsFilter from './TagsFilter';
import DocumentsGrid from './DocumentsGrid';
import ActivityFeed from './ActivityFeed';
import QuickActions from './QuickActions';
import ErrorMessage from './ErrorMessage';
import '../../styles/Dashboard.css';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [showQnA, setShowQnA] = useState(false);

    const {
        documents,
        recentActivity,
        searchTerm,
        selectedTags,
        isLoading,
        error,
        paginationInfo,
        isFilteringLocally,
        getAllTags,
        isAuthenticated,
        setSearchTerm,
        setSelectedTags,
        setError,
        fetchDocuments,
        fetchAllDocuments,
        handlePageChange,
        handleLimitChange,
    } = useDashboardLogic();

    // Initial load
    useEffect(() => {
        fetchDocuments(1, paginationInfo.limit);
        fetchAllDocuments();
    }, [fetchDocuments, fetchAllDocuments, paginationInfo.limit]);

    const handleTagClick = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedTags([]);
    };

    const handleNewDocument = () => {
        navigate('/document/new');
    };

    const handleEditDocument = (docId: string) => {
        navigate(`/document/${docId}`);
    };

    const handleViewDocument = (docId: string) => {
        navigate(`/document/view/${docId}`);
    };

    if (!isAuthenticated) {
        return (
            <div className="dashboard-container">
                <div className="dashboard">
                    <div className="auth-error">
                        <h2>Authentication Required</h2>
                        <p>Please log in to access the dashboard.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <div className="dashboard-content">
                    <div className="main-content">
                        <SearchBar
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            showQnA={showQnA}
                            onToggleQnA={() => setShowQnA(!showQnA)}
                        />

                        {error && (
                            <ErrorMessage
                                error={error}
                                onDismiss={() => setError(null)}
                            />
                        )}

                        <QnASection isVisible={showQnA} />

                        <TagsFilter
                            allTags={getAllTags}
                            selectedTags={selectedTags}
                            searchTerm={searchTerm}
                            onTagClick={handleTagClick}
                            onClearAllFilters={clearAllFilters}
                            onClearTags={() => setSelectedTags([])}
                        />

                        <DocumentsGrid
                            documents={documents}
                            paginationInfo={paginationInfo}
                            isLoading={isLoading}
                            isFilteringLocally={isFilteringLocally}
                            searchTerm={searchTerm}
                            selectedTags={selectedTags}
                            onNewDocument={handleNewDocument}
                            onViewDocument={handleViewDocument}
                            onEditDocument={handleEditDocument}
                            onPageChange={handlePageChange}
                            onLimitChange={handleLimitChange}
                            onClearAllFilters={clearAllFilters}
                        />
                    </div>

                    <div className="sidebar">
                        <ActivityFeed recentActivity={recentActivity} />
                        <QuickActions onNewDocument={handleNewDocument} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;