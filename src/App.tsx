// src/App.tsx
import { Routes, Route , Link} from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';

// Components
import SignIn from './Pages/SingIn';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import LandingPage from './Pages/Landing';
import ProtectedRoute from './Components/ProtectedRoute';
import ProductDetails from './Pages/ProductDetails';
import NavBar from './Components/NavBar';
function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Wrap the entire application in the AuthProvider */}
      <AuthProvider>
        <NavBar />
        <Routes>
          {/* Public Landing Page (Home) */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication Pages */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Route Group */}
          {/* Only accessible if a user is logged in (via AuthContext) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '50px' }}><h1>404 Not Found</h1><Link to="/">Go Home</Link></div>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;