import axios from 'axios';
import { env } from '../config/env';

const API_BASE = env.BACKEND_URL;

export const createDocument = async (payload: { token: string, title: string, context: string }) => {
    const { token, title, context } = payload;
    const res = await axios.post(
        `${API_BASE}/api/v1/docs`,
        {
            title,
            content: context
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res;
};

export const getAllDocuments = async (payload: { token: string, page: string, limit: string }) => {
    const { token, page, limit } = payload;
    const res = await axios.get(`${API_BASE}/api/v1/docs?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res;
};

export const getDocumentDetailsById = async (payload: { token: string, docId: string }) => {
    const { token, docId } = payload;
    const res = await axios.get(`${API_BASE}/api/v1/docs/${docId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res;
};

export const updateDocument = async (payload: { token: string, docId: string, title: string, context: string }) => {
    const { token, docId, title, context } = payload;
    const res = await axios.put(
        `${API_BASE}/api/v1/docs/${docId}`,
        {
            title,
            context
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res;
};

export const tagBasedSearch = async (payload: { token: string, docTags: string, page: string, limit: string }) => {
    const { token, docTags, page, limit } = payload;
    const res = await axios.get(`${API_BASE}/api/v1/docs/tag/${docTags}?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res;
};