import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { getAllDocuments, tagBasedSearch } from '../services';
import type { Document, Activity, PaginationInfo, DashboardState } from '../types/dashboard.types';

export const useDashboard = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
    const [allDocuments, setAllDocuments] = useState<Document[]>([]);
    const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
        total: 0,
        page: 1,
        limit: 5,
        totalPages: 0,
    });
    const [isFilteringLocally, setIsFilteringLocally] = useState(false);

    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const fetchDocuments = useCallback(
        async (page: number = 1, limit: number = paginationInfo.limit) => {
            if (!token || !isAuthenticated) {
                setError('Authentication required');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                const response = await getAllDocuments({
                    token,
                    page: page.toString(),
                    limit: limit.toString(),
                });

                const { data, total, page: currentPage, limit: currentLimit, totalPages } = response.data;

                setDocuments(data || []);
                setPaginationInfo({
                    total,
                    page: currentPage,
                    limit: currentLimit,
                    totalPages,
                });

                if (!isFilteringLocally) {
                    setFilteredDocuments(data || []);
                }

                const activity: Activity[] = (data || []).slice(0, 4).map((doc: Document, index: number) => ({
                    docId: doc._id,
                    docTitle: doc.title,
                    userId: doc.createdBy._id,
                    userName: doc.createdBy.email.split('@')[0],
                    action: index % 2 === 0 ? 'edited' : 'viewed',
                    timestamp: new Date(Date.now() - (index + 1) * 3600000).toISOString(),
                }));

                setRecentActivity(activity);
            } catch (err: any) {
                console.error('Error fetching documents:', err);
                const errorMessage = err.response?.data?.message || err.message || 'Failed to load documents';
                setError(errorMessage);
                setDocuments([]);
                setFilteredDocuments([]);
                setRecentActivity([]);
            } finally {
                setIsLoading(false);
            }
        },
        [token, isAuthenticated, isFilteringLocally, paginationInfo.limit]
    );

    const fetchAllDocuments = useCallback(async () => {
        if (!token || !isAuthenticated) return;

        try {
            const response = await getAllDocuments({
                token,
                page: '1',
                limit: '100',
            });
            setAllDocuments(response.data.data || []);
        } catch (err: any) {
            console.error('Error fetching all documents:', err);
        }
    }, [token, isAuthenticated]);

    const getAllTags = useMemo(() => {
        const allTags = allDocuments.flatMap(doc => doc.tags);
        return Array.from(new Set(allTags)).sort();
    }, [allDocuments]);

    return {
        // State
        documents,
        filteredDocuments,
        allDocuments,
        recentActivity,
        searchTerm,
        selectedTags,
        isLoading,
        error,
        paginationInfo,
        isFilteringLocally,
        getAllTags,
        token,
        isAuthenticated,

        // Setters
        setSearchTerm,
        setSelectedTags,
        setError,
        setIsFilteringLocally,
        setDocuments,
        setFilteredDocuments,
        setPaginationInfo,
        setIsLoading,

        // Functions
        fetchDocuments,
        fetchAllDocuments,
    };
};