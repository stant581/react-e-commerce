// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // If there is no user object, redirect them to the sign-in page.
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // If authenticated, render the nested route (the Dashboard).
  return <Outlet />;
};

export default ProtectedRoute;