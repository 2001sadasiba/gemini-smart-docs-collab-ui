import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, RegisterPage, HomePage } from '../pages';
import ProtectedRoute from '../components/ProtectedRoute';
import { DocumentEditor } from '../components/dashboard';
import { Dashboard } from '../components/dashboard';

const PageRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/document/view/:docId"
                    element={
                        <ProtectedRoute>
                            <DocumentEditor />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/document/:docId?"
                    element={
                        <ProtectedRoute>
                            <DocumentEditor />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default PageRouter;