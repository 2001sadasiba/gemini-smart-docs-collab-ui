export interface Document {
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

export interface Activity {
    docId: string;
    docTitle: string;
    userId: string;
    userName: string;
    action: string;
    timestamp: string;
}

export interface PaginationInfo {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface DashboardState {
    documents: Document[];
    filteredDocuments: Document[];
    allDocuments: Document[];
    recentActivity: Activity[];
    searchTerm: string;
    selectedTags: string[];
    isLoading: boolean;
    error: string | null;
    paginationInfo: PaginationInfo;
    isFilteringLocally: boolean;
}