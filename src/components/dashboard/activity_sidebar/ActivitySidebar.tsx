import React from 'react';
import '../../../styles/ActivitySidebar.css';

const ActivitySidebar: React.FC = () => {

    const activities = [
        {
            id: 1,
            documentTitle: 'React Best Practices',
            action: 'updated',
            author: 'You',
            timestamp: '30 minutes ago',
            avatar: '👤'
        },
        {
            id: 2,
            documentTitle: 'API Design Principles',
            action: 'created',
            author: 'Sarah Chen',
            timestamp: '5 hours ago',
            avatar: '👩‍💻'
        },
        {
            id: 3,
            documentTitle: 'Database Optimization',
            action: 'updated',
            author: 'Mike Johnson',
            timestamp: '2 days ago',
            avatar: '👨‍💼'
        },
        {
            id: 4,
            documentTitle: 'Team Guidelines',
            action: 'created',
            author: 'You',
            timestamp: '3 days ago',
            avatar: '👤'
        },
        {
            id: 5,
            documentTitle: 'Project Roadmap',
            action: 'updated',
            author: 'Lisa Wong',
            timestamp: '4 days ago',
            avatar: '👩‍🎨'
        }
    ];

    return (
        <div className="activity-sidebar">
            <div className="sidebar-header">
                <h3 className="sidebar-title">Team Activity</h3>
                <span className="sidebar-subtitle">Recent document updates</span>
            </div>

            <div className="activity-list">
                {activities.map((activity) => (
                    <div key={activity.id} className="activity-item">
                        <div className="activity-avatar">
                            {activity.avatar}
                        </div>

                        <div className="activity-content">
                            <div className="activity-message">
                                <span className="activity-author">{activity.author}</span>
                                <span className="activity-action">{activity.action}</span>
                                <span className="activity-document">{activity.documentTitle}</span>
                            </div>
                            <span className="activity-time">{activity.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="sidebar-footer">
                <button className="view-all-btn">
                    View All Activity
                </button>
            </div>
        </div>
    );
};

export default ActivitySidebar;