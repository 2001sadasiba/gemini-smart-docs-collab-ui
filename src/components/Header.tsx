import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { logoutUser, getOwnDetails } from '../services/authService';
import '../styles/Header.css';

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                const response = await getOwnDetails(token);
                console.log("The response we get for user details: ", response.data.data.firstName);
                setUser(response.data.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
                dispatch(logout());
                localStorage.removeItem('authToken');
                navigate('/login');
            }
        };

        fetchUser();
    }, [isAuthenticated, token, dispatch, navigate]);

    const toggleMenu = () => {
        setMobileMenuOpen(prev => !prev);
    };

    const handleLogout = async () => {
        try {
            if (token) {
                await logoutUser(token);
            }
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            dispatch(logout());
            localStorage.removeItem('authToken');
            setMobileMenuOpen(false);
            navigate('/login');
        }
    };

    return (
        <header className="app-header">
            <div className="header-container">
                <div className="logo" onClick={() => navigate('/dashboard')}>
                    🧠 AI Knowledge Hub
                </div>

                <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                    {isAuthenticated ? (
                        <>
                            <span className="user-welcome">
                                {(
                                    `👋 Hello, ${user?.firstName || user?.lastName || 'User'}`
                                )}
                            </span>
                            <button className="logout-btn" onClick={handleLogout}>
                                🚪 Logout
                            </button>
                        </>
                    ) : (
                        <a href="/login" className="login-btn">🔐 Login</a>
                    )}
                </nav>

            </div>
        </header>
    );
};

export default Header;