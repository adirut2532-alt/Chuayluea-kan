import React from 'react';
import { useAppState } from './context/AppStateContext';
import PhoneChassis from './components/chassis/PhoneChassis';
import ControlDashboard from './components/dashboard/ControlDashboard';

function App() {
  const {
    designMode,
    role,
    togglePersona,
    toggleDesignMode
  } = useAppState();

  return (
    <div className={`app-root ${designMode === 'wireframe' ? 'wireframe-mode' : ''}`}>
      {/* Header Area */}
      <header className="app-header">
        <div className="header-logo">
          <img src="/logo.jpg" alt="ช่วยเหลือกาญ Logo" style={{ height: '48px', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }} />
          <div className="logo-text">
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800 }}>ช่วยเหลือกาญ</h1>
            <span style={{ fontSize: '0.65rem' }}>ช่วยเร็ว • เข้าถึงง่าย • อุ่นใจทุกเวลา</span>
          </div>
        </div>
        <div className="header-controls">
          {/* Mode Toggle Control */}
          <div className="control-group">
            <span className="control-label">โหมดดีไซน์:</span>
            <div className="toggle-switch-container">
              <button 
                className={`toggle-btn ${designMode === 'hi-fi' ? 'active' : ''}`} 
                onClick={() => designMode !== 'hi-fi' && toggleDesignMode()}
              >
                Mockup สวยงาม (Hi-Fi)
              </button>
              <button 
                className={`toggle-btn ${designMode === 'wireframe' ? 'active' : ''}`} 
                onClick={() => designMode !== 'wireframe' && toggleDesignMode()}
              >
                Wireframe โครงสร้าง (Lo-Fi)
              </button>
            </div>
          </div>
          
          {/* Persona Toggle Control */}
          <div className="control-group">
            <span className="control-label">มุมมองผู้ใช้งาน:</span>
            <div className="toggle-switch-container">
              <button 
                className={`toggle-btn ${role === 'seeker' ? 'active' : ''}`} 
                onClick={() => role !== 'seeker' && togglePersona('seeker')}
              >
                ผู้ต้องการความช่วยเหลือ (Seeker)
              </button>
              <button 
                className={`toggle-btn ${role === 'provider' ? 'active' : ''}`} 
                onClick={() => role !== 'provider' && togglePersona('provider')}
              >
                ผู้ช่วยเหลือ/ช่าง (Provider)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="dashboard-container">
        <PhoneChassis />
        <ControlDashboard />
      </main>

      {/* Footer Area */}
      <footer className="app-footer">
        <p>© 2026 ช่วยเหลือกาญ (ChuayLueaKan) • พัฒนาขึ้นโดยความร่วมมือของจังหวัดกาญจนบุรีและชุมชนจิตอาสาเพื่อความปลอดภัยและการท่องเที่ยว</p>
      </footer>
    </div>
  );
}

export default App;
