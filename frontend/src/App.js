import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage';
import CalendarPage from './components/CalendarPage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
           
            <Route path="/" element={<Header />} />

           
            <Route path="/login" element={<LoginRedirect><LoginPage /></LoginRedirect>} />
            <Route path="/signup" element={<LoginRedirect><SignupPage /></LoginRedirect>} />

            
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute roles={['admin']}><DashboardPage /></ProtectedRoute>} />

      
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

// 🔑 Prevent logged-in users from seeing login/signup again
const LoginRedirect = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

export default App;
