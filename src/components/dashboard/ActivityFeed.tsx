import React from 'react';
import type { Activity } from '../../types/dashboard.types';

interface ActivityFeedProps {
    recentActivity: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ recentActivity }) => {
    return (
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
    );
};

export default ActivityFeed;