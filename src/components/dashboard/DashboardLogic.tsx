import { useEffect, useCallback } from 'react';
import { getAllDocuments, tagBasedSearch } from '../../services';
import { useDashboard } from '../../hooks/useDashboard';

export const useDashboardLogic = () => {
    const dashboardState = useDashboard();
    const {
        searchTerm,
        selectedTags,
        paginationInfo,
        token,
        isAuthenticated,
        isFilteringLocally,
        fetchDocuments,
        setIsFilteringLocally,
        setDocuments,
        setFilteredDocuments,
        setPaginationInfo,
        setIsLoading,
        setError,
    } = dashboardState;

    // Handle pagination change
    const handlePageChange = useCallback(
        (newPage: number) => {
            if (isFilteringLocally && selectedTags.length > 0) {
                const fetchFilteredDocuments = async () => {
                    if (!token || !isAuthenticated) {
                        setError('Authentication required');
                        setIsLoading(false);
                        return;
                    }

                    try {
                        setIsLoading(true);
                        setError(null);
                        const response = await tagBasedSearch({
                            token,
                            docTags: selectedTags.join(','),
                            page: newPage.toString(),
                            limit: paginationInfo.limit.toString(),
                        });
                        const results = response.data.data || [];
                        setDocuments(results);
                        setFilteredDocuments(results);
                        setPaginationInfo(prev => ({
                            ...prev,
                            page: newPage,
                            total: response.data.total || 0,
                            totalPages: response.data.totalPages || 1,
                        }));
                    } catch (err: any) {
                        setError(err.response?.data?.message || 'Failed to fetch documents');
                        setDocuments([]);
                        setFilteredDocuments([]);
                    } finally {
                        setIsLoading(false);
                    }
                };
                fetchFilteredDocuments();
            } else {
                fetchDocuments(newPage, paginationInfo.limit);
            }
        },
        [isFilteringLocally, selectedTags, paginationInfo.limit, fetchDocuments, token, isAuthenticated]
    );

    // Handle limit change
    const handleLimitChange = useCallback(
        (newLimit: number) => {
            if (isFilteringLocally && selectedTags.length > 0) {
                const fetchFilteredDocuments = async () => {
                    if (!token || !isAuthenticated) {
                        setError('Authentication required');
                        setIsLoading(false);
                        return;
                    }

                    try {
                        setIsLoading(true);
                        setError(null);
                        const response = await tagBasedSearch({
                            token,
                            docTags: selectedTags.join(','),
                            page: '1',
                            limit: newLimit.toString(),
                        });
                        const results = response.data.data || [];
                        setDocuments(results);
                        setFilteredDocuments(results);
                        setPaginationInfo(prev => ({
                            ...prev,
                            limit: newLimit,
                            page: 1,
                            total: response.data.total || 0,
                            totalPages: response.data.totalPages || 1,
                        }));
                    } catch (err: any) {
                        setError(err.response?.data?.message || 'Failed to fetch documents');
                        setDocuments([]);
                        setFilteredDocuments([]);
                    } finally {
                        setIsLoading(false);
                    }
                };
                fetchFilteredDocuments();
            } else {
                fetchDocuments(1, newLimit);
            }
        },
        [isFilteringLocally, selectedTags, fetchDocuments, token, isAuthenticated]
    );

    // Filter documents based on search term and tags
    useEffect(() => {
        const hasFilters = searchTerm.trim() || selectedTags.length > 0;

        if (hasFilters) {
            setIsFilteringLocally(true);
            const fetchFilteredDocuments = async () => {
                if (!token || !isAuthenticated) {
                    setError('Authentication required');
                    setIsLoading(false);
                    return;
                }
                try {
                    setIsLoading(true);
                    setError(null);
                    let results = [];
                    let total = 0;
                    let totalPages = 0;

                    if (selectedTags.length > 0) {
                        const response = await tagBasedSearch({
                            token,
                            docTags: selectedTags.join(','),
                            page: paginationInfo.page.toString(),
                            limit: paginationInfo.limit.toString(),
                        });
                        results = response.data.data || [];
                        total = response.data.total || 0;
                        totalPages = response.data.totalPages || 1;
                    } else {
                        const response = await getAllDocuments({
                            token,
                            page: paginationInfo.page.toString(),
                            limit: paginationInfo.limit.toString(),
                        });
                        results = response.data.data || [];
                        total = response.data.total || 0;
                        totalPages = response.data.totalPages || 1;
                    }

                    if (searchTerm) {
                        const searchTermLower = searchTerm.toLowerCase();
                        results = results.filter(
                            (doc: any) =>
                                doc.title.toLowerCase().includes(searchTermLower) ||
                                doc.content.toLowerCase().includes(searchTermLower) ||
                                doc.summary.toLowerCase().includes(searchTermLower) ||
                                doc.tags.some((tag: string) => tag.toLowerCase().includes(searchTermLower))
                        );
                        total = results.length;
                        totalPages = Math.ceil(total / paginationInfo.limit);
                    }

                    setFilteredDocuments(results);
                    setDocuments(results);
                    setPaginationInfo(prev => ({
                        ...prev,
                        total,
                        page: paginationInfo.page,
                        totalPages,
                    }));
                } catch (err: any) {
                    console.error('Error during tag-based search:', err);
                    const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch filtered documents';
                    setError(errorMessage);
                    setDocuments([]);
                    setFilteredDocuments([]);
                    setPaginationInfo(prev => ({ ...prev, total: 0, page: 1, totalPages: 0 }));
                } finally {
                    setIsLoading(false);
                }
            };
            fetchFilteredDocuments();
        } else {
            setIsFilteringLocally(false);
            fetchDocuments(1, paginationInfo.limit);
        }
    }, [searchTerm, selectedTags, paginationInfo.page, paginationInfo.limit, fetchDocuments, token, isAuthenticated]);

    return {
        ...dashboardState,
        handlePageChange,
        handleLimitChange,
    };
};