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
    createdAt: string;
    updatedAt: string;
}

export interface DocumentEditorState {
    title: string;
    content: string;
    error: string | null;
    isLoading: boolean;
    isSaving: boolean;
    isEditing: boolean;
}

export interface DocumentEditorActions {
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setError: (error: string | null) => void;
    setIsLoading: (loading: boolean) => void;
    setIsSaving: (saving: boolean) => void;
    handleSave: () => Promise<void>;
    handleSummarize: () => Promise<void>;
    handleGenerateTags: () => Promise<void>;
    handleCancel: () => void;
}