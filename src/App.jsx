import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MapSection from './components/MapSection';
import MetricsSidebar from './components/MetricsSidebar';
import AlertsView from './components/AlertsView';
import HistoryView from './components/HistoryView';
import HelpView from './components/HelpView';
import Login from './components/login';
import LandingPage from './components/LandingPage';
import MissionModal from './components/MissionModal';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeService, setActiveService] = useState('sea-ice');
  const [forecastDay, setForecastDay] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Navigation Coordinate States
  const [startCoord, setStartCoord] = useState('-60.00, -62.00');
  const [destCoord, setDestCoord] = useState('-75.00, -35.00');
  const [hasActiveMission, setHasActiveMission] = useState(false);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [modalStartCoord, setModalStartCoord] = useState('-60.00, -62.00');
  const [modalDestCoord, setModalDestCoord] = useState('-75.00, -35.00');

  // Current Vessel Location State
  const [vesselLocation] = useState({ lat: '-61.24', lon: '-59.10' });

  const handleSelectService = (service) => {
    setActiveService(service);
    setIsCalculating(true);
  };

  useEffect(() => {
    if (!isCalculating) return;
    const timer = setTimeout(() => setIsCalculating(false), 1500);
    return () => clearTimeout(timer);
  }, [isCalculating]);

  const handleRecalculate = () => {
    setIsCalculating(true);
  };

  const handleOpenMissionModal = () => {
    setModalStartCoord(startCoord || `${vesselLocation.lat}, ${vesselLocation.lon}`);
    setModalDestCoord(destCoord || '-75.00, -35.00');
    setIsMissionModalOpen(true);
  };

  const handleStartMission = (e) => {
    if (e) e.preventDefault();
    if (!modalStartCoord.trim() || !modalDestCoord.trim()) return;
    setStartCoord(modalStartCoord);
    setDestCoord(modalDestCoord);
    setHasActiveMission(true);
    setIsMissionModalOpen(false);
    handleRecalculate();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(false);
  };

  if (!isAuthenticated && showLogin) {
    return (
      <Login
        onLogin={() => {
          setIsAuthenticated(true);
          setShowLogin(false);
        }}
        onBack={() => setShowLogin(false)}
      />
    );
  }

  if (!isAuthenticated) {
    return <LandingPage onLoginClick={() => setShowLogin(true)} />;
  }

  const isMapService = activeService === 'sea-ice' || activeService === 'icebergs' || activeService === 'navigation';

  return (
    <div className="dashboard-container">
      <Sidebar
        activeService={activeService}
        setActiveService={handleSelectService}
        vesselLocation={vesselLocation}
        onLogout={handleLogout}
      />

      <main className="main-content">
        <Header
          activeService={activeService}
          forecastDay={forecastDay}
          setForecastDay={setForecastDay}
          isCalculating={isCalculating}
        />

        {/* Conditional views for alerts, history, help */}
        {activeService === 'alerts' && (
          <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            <AlertsView />
          </div>
        )}

        {activeService === 'history' && (
          <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            <HistoryView />
          </div>
        )}

        {activeService === 'help' && (
          <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            <HelpView />
          </div>
        )}

        {isMapService && (
          <div style={{ flexGrow: 1, display: 'flex', gap: '20px', minHeight: 0, height: '100%' }}>
            <MapSection
              activeService={activeService}
              forecastDay={forecastDay}
              isCalculating={isCalculating}
              hasActiveMission={hasActiveMission}
              startCoord={startCoord}
              destCoord={destCoord}
              onOpenMissionModal={handleOpenMissionModal}
              onRecalculate={handleRecalculate}
            />

            <MetricsSidebar
              activeService={activeService}
              forecastDay={forecastDay}
            />
          </div>
        )}
      </main>

      {/* CREATE NEW MISSION MODAL POPUP */}
      <MissionModal
        isOpen={isMissionModalOpen}
        onClose={() => setIsMissionModalOpen(false)}
        onStartMission={handleStartMission}
        modalStartCoord={modalStartCoord}
        setModalStartCoord={setModalStartCoord}
        modalDestCoord={modalDestCoord}
        setModalDestCoord={setModalDestCoord}
        vesselLocation={vesselLocation}
      />
    </div>
  );
}

export default App;