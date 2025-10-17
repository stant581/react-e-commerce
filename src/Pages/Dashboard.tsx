// src/components/Dashboard.tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';

const Dashboard = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signout();
    navigate('/signin');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to the E-Commerce Dashboard, {user?.name || user?.email}! 🚀</h1>
      <p>Your email is: {user?.email}</p>
      <p>This is your private, protected content, managed by AuthContext.</p>
      <button 
        onClick={handleSignOut} 
        style={{ 
          padding: '10px 20px', 
          background: '#dc3545', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;