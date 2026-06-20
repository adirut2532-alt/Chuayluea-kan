import React, { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';

// Import Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import CommunityScreen from '../screens/CommunityScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SOSOverlay from '../screens/SOSOverlay';
import AIAssistant from '../screens/AIAssistant';
import ChatScreen from '../screens/ChatScreen';
import ActiveJobScreen from '../screens/ActiveJobScreen';
import JobDoneScreen from '../screens/JobDoneScreen';
import SubservicesScreen from '../screens/SubservicesScreen';

const PhoneChassis = () => {
    const {
        isLoggedIn,
        activeTab,
        setActiveTab,
        activeOverlay,
        setActiveOverlay,
        role,
        goBack,
        categories,
        selectedCategoryIndex,
        activeChatPartner,
        activeJob,
        changeScreen,
        notifications
    } = useAppState();

    const [timeStr, setTimeStr] = useState('12:30');

    // Live clock for mobile status bar
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hrs = String(now.getHours()).padStart(2, '0');
            const mins = String(now.getMinutes()).padStart(2, '0');
            setTimeStr(`${hrs}:${mins}`);
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    // Get screen title dynamically based on active tab and overlay
    const getScreenTitle = () => {
        if (activeOverlay) {
            switch (activeOverlay) {
                case 'subservices':
                    return categories[selectedCategoryIndex]?.title || "บริการย่อย";
                case 'sos':
                    return "🚨 สัญญาณฉุกเฉิน SOS";
                case 'ai-assistant':
                    return "🤖 ผู้ช่วยกาญ AI";
                case 'chat':
                    return activeChatPartner || "ห้องสนทนา";
                case 'active-job':
                    return "📍 นำทางปฏิบัติงาน";
                case 'job-done':
                    return "🎉 ภารกิจเสร็จสิ้น";
                default:
                    return "ช่วยเหลือ";
            }
        } else {
            switch (activeTab) {
                case 'home':
                    return role === 'provider' ? "ศูนย์บริการช่าง/อาสา" : "หน้าแรก";
                case 'map':
                    return "แผนที่ช่วยเหลือ";
                case 'community':
                    return "บอร์ดชุมชนกาญ";
                case 'notifications':
                    return "กล่องแจ้งเตือนภัย";
                case 'profile':
                    return "ข้อมูลส่วนตัว";
                default:
                    return "ช่วยเหลือกาญ";
            }
        }
    };

    // Render active content inside device viewport
    const renderActiveContent = () => {
        if (!isLoggedIn) {
            return <LoginScreen />;
        }

        if (activeOverlay) {
            switch (activeOverlay) {
                case 'subservices':
                    return <SubservicesScreen />;
                case 'sos':
                    return <SOSOverlay />;
                case 'ai-assistant':
                    return <AIAssistant />;
                case 'chat':
                    return <ChatScreen />;
                case 'active-job':
                    return <ActiveJobScreen />;
                case 'job-done':
                    return <JobDoneScreen />;
                default:
                    return <HomeScreen />;
            }
        }

        switch (activeTab) {
            case 'home':
                return <HomeScreen />;
            case 'map':
                return <MapScreen />;
            case 'community':
                return <CommunityScreen />;
            case 'notifications':
                return <NotificationsScreen />;
            case 'profile':
                return <ProfileScreen />;
            default:
                return <HomeScreen />;
        }
    };

    const isBackBtnVisible = () => {
        return activeOverlay || activeTab !== 'home';
    };

    const isNewsTickerVisible = () => {
        return isLoggedIn && !activeOverlay;
    };

    const isSOSBtnVisible = () => {
        return isLoggedIn && activeOverlay !== 'sos' && activeOverlay !== 'active-job' && activeOverlay !== 'job-done';
    };

    const isNavBarVisible = () => {
        return isLoggedIn && activeOverlay !== 'sos' && activeOverlay !== 'active-job' && activeOverlay !== 'job-done';
    };

    const isAIFloatingBtnVisible = () => {
        return isLoggedIn && activeOverlay !== 'ai-assistant' && activeOverlay !== 'sos' && activeOverlay !== 'active-job' && activeOverlay !== 'job-done';
    };

    return (
        <section className="emulator-panel">
            <div className="device-chassis">
                <div className="device-notch"></div>
                <div className="device-volume-up"></div>
                <div className="device-volume-down"></div>
                <div className="device-power"></div>
                
                <div className="device-screen" id="app-screen">
                    {/* Status Bar */}
                    <div className="screen-status-bar">
                        <span className="status-time" id="status-time">{timeStr}</span>
                        <div className="status-indicators">
                            <svg className="icon-signal" width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                                <rect x="0" y="8" width="2" height="4" rx="0.5"/>
                                <rect x="3" y="6" width="2" height="6" rx="0.5"/>
                                <rect x="6" y="4" width="2" height="8" rx="0.5"/>
                                <rect x="9" y="2" width="2" height="10" rx="0.5"/>
                                <rect x="12" y="0" width="2" height="12" rx="0.5" fillOpacity="0.3"/>
                            </svg>
                            <svg className="icon-wifi" width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                                <path d="M8 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-3.5-3.5a5 5 0 0 1 7 0M2.5 6a7.5 7.5 0 0 1 11 0M0.5 3.5a11 11 0 0 1 15 0"/>
                            </svg>
                            <span className="status-battery">100%</span>
                            <div className="battery-bar"><div className="battery-level"></div></div>
                        </div>
                    </div>

                    {/* App Header (Dynamic title and back action) */}
                    {isLoggedIn && (
                        <div className="app-header-bar" id="app-header-bar" style={{ display: 'flex' }}>
                            <button 
                                className="header-back-btn" 
                                id="btn-app-back"
                                style={{ visibility: isBackBtnVisible() ? 'visible' : 'hidden', cursor: 'pointer' }}
                                onClick={goBack}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            <h2 className="app-title" id="app-title-text">{getScreenTitle()}</h2>
                            <div className="app-header-right">
                                <span 
                                    className={`active-badge ${role === 'provider' ? 'bg-green-light' : 'bg-blue-light'}`} 
                                    id="app-role-badge"
                                    style={{ 
                                        color: role === 'provider' ? 'var(--primary-green)' : 'var(--primary-blue)',
                                        backgroundColor: role === 'provider' ? 'var(--primary-green-light)' : 'var(--primary-blue-light)'
                                    }}
                                >
                                    {role.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* App Content Container (Scrollable) */}
                    <div 
                        className="app-main-content" 
                        id="app-content-body"
                        style={{
                            height: isLoggedIn ? '' : '100%',
                            paddingTop: isLoggedIn ? '' : '10px',
                            paddingBottom: isLoggedIn ? (isNavBarVisible() ? '90px' : '0px') : '10px'
                        }}
                    >
                        {renderActiveContent()}
                    </div>

                    {/* Mini Alert Ticker */}
                    {isNewsTickerVisible() && (
                        <div className="news-ticker-container" id="news-ticker" style={{ display: 'flex' }}>
                            <div className="ticker-badge">แจ้งด่วน</div>
                            <div className="ticker-text-wrapper">
                                <div className="ticker-text" id="ticker-content">
                                    แจ้งปิดถนนช่วงสะพานข้ามแม่น้ำแคว เวลา 18:00-22:00 น. วันนี้ เพื่อจัดงานเทศกาล...
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Floating AI Assistant Button */}
                    {isAIFloatingBtnVisible() && (
                        <button 
                            className="ai-floating-btn" 
                            id="btn-ai-assistant" 
                            style={{ display: 'flex' }}
                            onClick={() => changeScreen('home', 'ai-assistant')}
                        >
                            <div className="ai-avatar-badge">AI</div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </button>
                    )}

                    {/* SOS Emergency Button Indicator (Overlay trigger) */}
                    {isSOSBtnVisible() && (
                        <div className="sos-central-wrapper" id="sos-trigger-container" style={{ display: 'block' }}>
                            <button className="sos-btn" id="btn-sos-trigger" onClick={() => changeScreen('home', 'sos')}>
                                <span className="sos-ripple"></span>
                                <span className="sos-ripple delay-1"></span>
                                <span className="sos-text">SOS</span>
                            </button>
                        </div>
                    )}

                    {/* Navigation Bar */}
                    {isNavBarVisible() && (
                        <nav className="app-nav-bar" id="app-nav-bar" style={{ display: 'flex' }}>
                            <button className={`nav-item ${activeTab === 'home' && !activeOverlay ? 'active' : ''}`} onClick={() => changeScreen('home')} id="nav-home">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                <span>หน้าแรก</span>
                            </button>
                            <button className={`nav-item ${activeTab === 'map' ? 'active' : ''}`} onClick={() => changeScreen('map')} id="nav-map">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
                                <span>แผนที่</span>
                            </button>
                            
                            {/* Empty spacer for absolute floating SOS button */}
                            <div className="nav-sos-spacer"></div>
                            
                            <button className={`nav-item ${activeTab === 'community' ? 'active' : ''}`} onClick={() => changeScreen('community')} id="nav-community">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                <span>ชุมชน</span>
                            </button>
                            <button className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => changeScreen('notifications')} id="nav-notifications">
                                {notifications && notifications.some(n => n.unread) && <div className="badge-dot" id="noti-badge-dot"></div>}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                <span>แจ้งเตือน</span>
                            </button>
                            <button className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => changeScreen('profile')} id="nav-profile">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <span>โปรไฟล์</span>
                            </button>
                        </nav>
                    )}

                    {/* Home indicator */}
                    <div className="device-home-indicator"></div>
                </div>
            </div>
            <div className="device-shadow"></div>
        </section>
    );
};

export default PhoneChassis;
