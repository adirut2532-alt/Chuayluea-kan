import React from 'react';
import { useAppState } from '../../context/AppStateContext';

const ActiveJobScreen = () => {
    const {
        activeJob,
        finishJob,
        setActiveChatPartner,
        changeScreen
    } = useAppState();

    if (!activeJob) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>ไม่มีใบงานที่กำลังดำเนินการอยู่</p>
                <button 
                    className="btn-sos-cancel" 
                    style={{ color: 'var(--text-medium)', border: '1px solid var(--border-color)', background: 'transparent', marginTop: '1rem', cursor: 'pointer' }}
                    onClick={() => changeScreen('home')}
                >
                    กลับหน้าหลัก
                </button>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <div className="map-screen-container" style={{ top: '88px', height: 'calc(100% - 88px - 140px)' }}>
                {/* Reusing the map template but optimized for navigation */}
                <div className="map-mock-bg">
                    <svg className="map-svg-mock" viewBox="0 0 375 600">
                        <path d="M 0,250 C 100,280 200,180 375,220 L 375,250 C 200,210 100,310 0,280 Z" fill="#bbdefb" />
                        <path d="M 50,0 Q 180,200 180,600" fill="none" stroke="#cfd8dc" strokeWidth="8" />
                        
                        {/* Navigation path (Dotted line between Provider and Victim) */}
                        <path d="M 170,220 L 175,280 L 220,330" fill="none" stroke="var(--primary-blue)" strokeWidth="4" strokeDasharray="6,4" />
                    </svg>

                    {/* Provider Dot */}
                    <div className="user-current-pin" style={{ top: '36%', left: '45%' }}>
                        <div className="user-dot" style={{ background: 'var(--primary-green)', boxShadow: '0 0 10px var(--primary-green)' }}></div>
                    </div>

                    {/* Victim Dot */}
                    <div className="user-current-pin" style={{ top: '55%', left: '58%' }}>
                        <div className="user-dot" style={{ background: 'var(--accent-red)', boxShadow: '0 0 10px var(--accent-red)' }}></div>
                        <div className="user-dot-pulse" style={{ borderColor: 'var(--accent-red)' }}></div>
                    </div>
                </div>
            </div>

            {/* Float Info Overlay */}
            <div className="active-job-details" style={{ position: 'absolute', bottom: '15px', left: '10px', right: '10px', zIndex: 35 }}>
                <div className="active-job-header">
                    <span className="job-type-tag tag-urgent">{activeJob.typeText}</span>
                    <span className="active-job-title">นำทางไปยังผู้ประสบภัย</span>
                </div>
                <div className="active-job-desc" style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>
                    <strong>ชื่อผู้ติดต่อ:</strong> {activeJob.victimName}<br />
                    <strong>จุดเกิดเหตุ:</strong> {activeJob.location.replace('พิกัด: 📍', '')}<br />
                    <strong>อาการ:</strong> {activeJob.detail}
                </div>
                <div className="active-job-actions">
                    <button className="active-job-btn btn-act-chat" onClick={() => {
                        setActiveChatPartner(activeJob.victimName);
                        changeScreen('home', 'chat');
                    }}>💬 แชตหา</button>
                    <button className="active-job-btn btn-act-call" onClick={() => alert('โทรประสานงานติดต่อกู้ชีพ/ผู้แจ้ง')}>📞 โทรติดต่อ</button>
                    <button className="active-job-btn btn-act-done" onClick={finishJob}>✅ เสร็จงาน</button>
                </div>
            </div>
        </div>
    );
};

export default ActiveJobScreen;
