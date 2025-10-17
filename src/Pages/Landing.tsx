// src/components/LandingPage.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';

const LandingPage = () => {
    const { user } = useAuth();

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to Animesh Market! 👋</h1>
            {user ? (
                // If logged in
                <div>
                    <p>You are logged in as **{user.name}**.</p>
                    <Link to="/dashboard" style={{ margin: '0 10px', textDecoration: 'none', padding: '8px 15px', background: '#17a2b8', color: 'white', borderRadius: '5px' }}>
                        Go to Dashboard
                    </Link>
                </div>
            ) : (
                // If logged out
                <div>
                    <p>Please Sign Up or Sign In to access the Dashboard.</p>
                    <div style={{ marginTop: '20px' }}>
                        <Link to="/signin" style={{ margin: '0 10px', textDecoration: 'none', padding: '8px 15px', border: '1px solid #007bff', borderRadius: '5px' }}>Sign In</Link>
                        <Link to="/signup" style={{ margin: '0 10px', textDecoration: 'none', padding: '8px 15px', border: '1px solid #28a745', borderRadius: '5px' }}>Sign Up</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;