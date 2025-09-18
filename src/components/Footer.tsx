import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            🧠 AI Knowledge Hub
                        </div>
                        <p className="footer-description">
                            Collaborative platform for teams to create, manage, and search
                            knowledge documents with AI-powered features.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/">Dashboard</a></li>
                            <li><a href="/documents">My Documents</a></li>
                            <li><a href="/search">Search</a></li>
                            <li><a href="/ask">Team Q&A</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Features</h4>
                        <ul className="footer-links">
                            <li>AI Summarization</li>
                            <li>Smart Tagging</li>
                            <li>Semantic Search</li>
                            <li>Version History</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Support</h4>
                        <ul className="footer-links">
                            <li><a href="/help">Help Center</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/feedback">Feedback</a></li>
                            <li><a href="/docs">API Documentation</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-divider"></div>
                    <p className="copyright">
                        © 2025 AI Knowledge Hub. Built with ❤️ using MERN Stack & Gemini AI.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;