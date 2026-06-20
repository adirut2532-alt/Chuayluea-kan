import React from 'react';
import { useAppState } from '../../context/AppStateContext';

const SubservicesScreen = () => {
    const {
        selectedCategoryIndex,
        categories,
        changeScreen,
        triggerSOSCountdown,
        setSosIncidentType,
        setActiveMapFilter,
        setActiveChatPartner,
        logActivity
    } = useAppState();

    const cat = categories[selectedCategoryIndex];
    if (!cat) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>พบข้อผิดพลาดในการโหลดข้อมูลหมวดหมู่ย่อย</p>
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

    const handleSubserviceAction = (action, filter, number, provider) => {
        logActivity('info', `ดำเนินการเมนูย่อย -> action: ${action}, filter: ${filter}`);
        
        if (action === 'sos') {
            setSosIncidentType('medical');
            changeScreen('home', 'sos');
            triggerSOSCountdown();
        } else if (action === 'sos-flood') {
            setSosIncidentType('flood');
            changeScreen('home', 'sos');
            triggerSOSCountdown();
        } else if (action === 'sos-snake') {
            setSosIncidentType('snake');
            changeScreen('home', 'sos');
            triggerSOSCountdown();
        } else if (action === 'call') {
            logActivity('event', `จำลองโทรสายด่วนโทรศัพท์: ${number}`);
            alert(`จำลองการกดโทรศัพท์: โทรหา ${number}`);
        } else if (action === 'map') {
            setActiveMapFilter(filter || 'all');
            changeScreen('map');
        } else if (action === 'chat') {
            setActiveChatPartner(provider);
            changeScreen('home', 'chat');
        } else if (action === 'community') {
            changeScreen('community');
        } else if (action === 'notifications') {
            changeScreen('notifications');
        } else if (action === 'ai-assistant') {
            changeScreen('home', 'ai-assistant');
        }
    };

    return (
        <div>
            <div className={`sub-services-header cat-${selectedCategoryIndex}`}>
                <h3>{cat.title}</h3>
                <p>หมวดหมู่: {cat.subtitle}</p>
            </div>
            <div className="sub-services-list">
                {cat.subservices.map((sub, idx) => (
                    <div 
                        key={idx} 
                        className="sub-service-item" 
                        onClick={() => handleSubserviceAction(sub.action, sub.filter, sub.number, sub.provider)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="sub-service-info">
                            <span className="sub-service-icon">{sub.icon}</span>
                            <span className="sub-service-name">{sub.name}</span>
                        </div>
                        <span className="sub-service-action-badge">
                            {sub.action === 'call' ? '📞 โทรฟรี' : '👉 เลือก'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubservicesScreen;
