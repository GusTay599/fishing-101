// Main App component
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CatchLogPage } from './pages/CatchLogPage';
import { AddCatchPage } from './pages/AddCatchPage';
import { TidesPage } from './pages/TidesPage';
import { WeatherPage } from './pages/WeatherPage';
import { SpotsPage } from './pages/SpotsPage';
import { StatsPage } from './pages/StatsPage';
import { SettingsPage } from './pages/SettingsPage';
import { FishGuidePage } from './pages/FishGuidePage';
import { BaitGuidePage } from './pages/BaitGuidePage';
import { RigsPage } from './pages/RigsPage';
import { KnotsPage } from './pages/KnotsPage';
import { ForumPage } from './pages/ForumPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useAuth } from './hooks/useAuth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <div className="spinner-lg" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export function App() {
  return (
    <div className="page">
      <Header />
      <main className="page-content" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catches" element={
            <ProtectedRoute>
              <CatchLogPage />
            </ProtectedRoute>
          } />
          <Route path="/catches/new" element={
            <ProtectedRoute>
              <AddCatchPage />
            </ProtectedRoute>
          } />
          <Route path="/catches/:id/edit" element={
            <ProtectedRoute>
              <AddCatchPage />
            </ProtectedRoute>
          } />
          <Route path="/tides" element={<TidesPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/spots" element={<SpotsPage />} />
          <Route path="/guide" element={<FishGuidePage />} />
          <Route path="/bait-guide" element={<BaitGuidePage />} />
          <Route path="/rigs" element={<RigsPage />} />
          <Route path="/knots" element={<KnotsPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/stats" element={
            <ProtectedRoute>
              <StatsPage />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}