import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';
import { updateDocument, getAllDocuments, createDocument } from '../services';
import type { Document, DocumentEditorState } from '../types/documentEditor.types';

export const useDocumentEditor = (docId?: string) => {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const isEditing = docId && docId !== 'new';

    // Fetch document data if editing
    const fetchDocument = useCallback(async () => {
        if (!isEditing || !token || !isAuthenticated) return;

        try {
            setIsLoading(true);
            const response = await getAllDocuments({ token, page: '1', limit: '100' });
            const document = response.data.data.find((doc: Document) => doc._id === docId);
            if (document) {
                setTitle(document.title);
                setContent(document.content);
            } else {
                setError('Document not found');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load document');
        } finally {
            setIsLoading(false);
        }
    }, [docId, token, isAuthenticated, isEditing]);

    useEffect(() => {
        fetchDocument();
    }, [fetchDocument]);

    // Handle save (create or update)
    const handleSave = useCallback(async () => {
        if (!title.trim() && !content.trim()) {
            setError('Both title and content are required');
            return;
        }
        if (!title.trim()) {
            setError('Title is required');
            return;
        }
        if (!content.trim()) {
            setError('Content is required');
            return;
        }
        if (!token || !isAuthenticated) {
            setError('Authentication required');
            return;
        }

        try {
            setIsSaving(true);
            setError(null);
            if (docId === 'new') {
                await createDocument({
                    token,
                    title,
                    context: content
                });
            } else {
                await updateDocument({
                    token,
                    docId: docId || '',
                    title,
                    context: content
                });
            }
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save document');
        } finally {
            setIsSaving(false);
        }
    }, [title, content, token, isAuthenticated, docId, navigate]);

    // Simulate Gemini summarize
    const handleSummarize = useCallback(async () => {
        if (!content.trim()) {
            setError('Content is required to summarize');
            return;
        }
        try {
            setIsLoading(true);
            setError(null);
            // Simulate API call to Gemini
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Summary: This is a simulated summary from Gemini AI.');
        } catch (err) {
            setError('Failed to generate summary');
        } finally {
            setIsLoading(false);
        }
    }, [content]);

    // Simulate Gemini tag generation
    const handleGenerateTags = useCallback(async () => {
        if (!content.trim()) {
            setError('Content is required to generate tags');
            return;
        }
        try {
            setIsLoading(true);
            setError(null);
            // Simulate API call to Gemini
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Generated Tags: tag1, tag2, tag3');
        } catch (err) {
            setError('Failed to generate tags');
        } finally {
            setIsLoading(false);
        }
    }, [content]);

    const handleCancel = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const handleTitleChange = useCallback((newTitle: string) => {
        setTitle(newTitle);
        setError(null);
    }, []);

    const handleContentChange = useCallback((newContent: string) => {
        setContent(newContent);
        setError(null);
    }, []);

    return {
        // State
        title,
        content,
        error,
        isLoading,
        isSaving,
        isEditing,
        isAuthenticated,

        // Actions
        setTitle: handleTitleChange,
        setContent: handleContentChange,
        setError,
        handleSave,
        handleSummarize,
        handleGenerateTags,
        handleCancel,
    };
};