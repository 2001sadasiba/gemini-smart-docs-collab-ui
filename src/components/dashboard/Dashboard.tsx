import React from 'react';
import { DocumentGrid } from './document_grid';
import { ActivitySidebar } from './activity_sidebar';
import '../../styles/Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-main">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">My Knowledge Hub</h1>
                    <p className="dashboard-subtitle">Manage and explore your team's knowledge</p>
                </div>
                <DocumentGrid />
            </div>
            <ActivitySidebar />
        </div>
    );
};

export default Dashboard;