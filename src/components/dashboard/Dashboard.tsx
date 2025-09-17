// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';

interface Document {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    summary: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    authorName?: string;
}

interface Activity {
    docId: string;
    docTitle: string;
    userId: string;
    userName: string;
    action: string;
    timestamp: string;
}

const Dashboard: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
    const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showQnA, setShowQnA] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    // Fetch documents and activity on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // In a real app, these would be API calls
                const docs: Document[] = [
                    {
                        _id: '1',
                        title: 'Project Requirements',
                        content: 'Detailed project requirements document...',
                        tags: ['project', 'requirements', 'planning'],
                        summary: 'Summary of project requirements and deliverables',
                        createdBy: '1',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        authorName: 'John Doe'
                    },
                    {
                        _id: '2',
                        title: 'API Documentation',
                        content: 'Comprehensive API documentation...',
                        tags: ['api', 'documentation', 'development'],
                        summary: 'Overview of all available API endpoints',
                        createdBy: '2',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        authorName: 'Jane Smith'
                    },
                    {
                        _id: '3',
                        title: 'Design Guidelines',
                        content: 'UI/UX design guidelines for the project...',
                        tags: ['design', 'ui', 'ux'],
                        summary: 'Visual design standards and component library',
                        createdBy: '3',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        authorName: 'Alex Johnson'
                    },
                    {
                        _id: '4',
                        title: 'Deployment Process',
                        content: 'Step-by-step deployment instructions...',
                        tags: ['deployment', 'devops', 'infrastructure'],
                        summary: 'CI/CD pipeline and deployment checklist',
                        createdBy: '1',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        authorName: 'John Doe'
                    }
                ];

                const activity: Activity[] = [
                    {
                        docId: '1',
                        docTitle: 'Project Requirements',
                        userId: '2',
                        userName: 'Jane Smith',
                        action: 'edited',
                        timestamp: new Date(Date.now() - 3600000).toISOString()
                    },
                    {
                        docId: '2',
                        docTitle: 'API Documentation',
                        userId: '1',
                        userName: 'John Doe',
                        action: 'viewed',
                        timestamp: new Date(Date.now() - 7200000).toISOString()
                    },
                    {
                        docId: '4',
                        docTitle: 'Deployment Process',
                        userId: '3',
                        userName: 'Alex Johnson',
                        action: 'commented on',
                        timestamp: new Date(Date.now() - 10800000).toISOString()
                    },
                    {
                        docId: '3',
                        docTitle: 'Design Guidelines',
                        userId: '2',
                        userName: 'Jane Smith',
                        action: 'updated',
                        timestamp: new Date(Date.now() - 14400000).toISOString()
                    }
                ];

                setDocuments(docs);
                setFilteredDocuments(docs);
                setRecentActivity(activity);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter documents based on search term and selected tags
    useEffect(() => {
        let results = documents;

        if (searchTerm) {
            results = results.filter(doc =>
                doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (selectedTags.length > 0) {
            results = results.filter(doc =>
                selectedTags.every(tag => doc.tags.includes(tag))
            );
        }

        setFilteredDocuments(results);
    }, [searchTerm, selectedTags, documents]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleTagClick = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleAskQuestion = async () => {
        // In a real app, this would call your backend API
        // which would use Gemini to generate an answer
        setAnswer('This is a simulated answer from Gemini AI. In the real application, this would be generated based on your team\'s documents. The AI would analyze all stored documents to provide a comprehensive answer to your question.');
    };

    const getAllTags = () => {
        const allTags = documents.flatMap(doc => doc.tags);
        return Array.from(new Set(allTags));
    };

    if (isLoading) {
        return <div className="dashboard-loading">Loading documents...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <div className="dashboard-content">
                    <div className="main-content">
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search documents by title, content, or tags..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="search-input"
                            />
                            <button
                                className={`btn-primary ${showQnA ? 'active' : ''}`}
                                onClick={() => setShowQnA(!showQnA)}
                            >
                                {showQnA ? 'Hide AI Assistant' : 'Ask AI Assistant'}
                            </button>
                        </div>

                        {showQnA && (
                            <div className="qna-section">
                                <h3>Ask Our AI Assistant About Your Documents</h3>
                                <div className="qna-input">
                                    <input
                                        type="text"
                                        placeholder="Ask a question about your team's knowledge..."
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                                    />
                                    <button className="btn-primary" onClick={handleAskQuestion} disabled={!question.trim()}>
                                        Ask
                                    </button>
                                </div>
                                {answer && (
                                    <div className="answer">
                                        <h4>AI Response:</h4>
                                        <p>{answer}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="tags-filter">
                            <h3>Filter by Tags:</h3>
                            <div className="tags-list">
                                {getAllTags().map(tag => (
                                    <button
                                        key={tag}
                                        className={`tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                                        onClick={() => handleTagClick(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                                {selectedTags.length > 0 && (
                                    <button className="tag-clear" onClick={() => setSelectedTags([])}>
                                        Clear all
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="documents-grid">
                            <div className="documents-header">
                                <h2>Team Documents ({filteredDocuments.length})</h2>
                                <button className="btn-primary">
                                    + New Document
                                </button>
                            </div>

                            {filteredDocuments.length === 0 ? (
                                <div className="no-documents">
                                    <p>No documents found. Try adjusting your search or filters.</p>
                                </div>
                            ) : (
                                <div className="documents-list">
                                    {filteredDocuments.map(doc => (
                                        <div key={doc._id} className="document-card">
                                            <h3>{doc.title}</h3>
                                            <p className="summary">{doc.summary}</p>
                                            <div className="tags">
                                                {doc.tags.map(tag => (
                                                    <span key={tag} className="tag">{tag}</span>
                                                ))}
                                            </div>
                                            <div className="document-meta">
                                                <span className="author">By {doc.authorName}</span>
                                                <span className="date">{new Date(doc.updatedAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="document-actions">
                                                <button className="btn-secondary">View</button>
                                                <button className="btn-secondary">Edit</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="sidebar">
                        <div className="activity-feed">
                            <h3>Recent Team Activity</h3>
                            {recentActivity.length === 0 ? (
                                <p>No recent activity</p>
                            ) : (
                                <ul>
                                    {recentActivity.map((activity, index) => (
                                        <li key={index}>
                                            <div className="activity-content">
                                                <span className="user-name">{activity.userName}</span>
                                                <span className="action">{activity.action}</span>
                                                <span className="doc-title">"{activity.docTitle}"</span>
                                            </div>
                                            <span className="activity-time">
                                                {new Date(activity.timestamp).toLocaleTimeString()}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="quick-actions">
                            <h3>Quick Actions</h3>
                            <button className="btn-primary">Create New Document</button>
                            <button className="btn-secondary">View All Tags</button>
                            <button className="btn-secondary">Import Documents</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;