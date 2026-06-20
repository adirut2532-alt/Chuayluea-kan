import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';

const HomeScreen = () => {
    const {
        role,
        categories,
        providerStatus,
        toggleProviderOnlineStatus,
        providerStats,
        providerJobs,
        declineJob,
        acceptJob,
        setSelectedCategoryIndex,
        changeScreen,
        askAI
    } = useAppState();

    const [searchInput, setSearchInput] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            askAI(searchInput);
        }
    };

    // -------------------------------------------------------------
    // PROVIDER HOME VIEW (DASHBOARD FOR TECHNICIAN / VOLUNTEER)
    // -------------------------------------------------------------
    if (role === 'provider') {
        return (
            <div style={{ padding: '10px 15px' }}>
                <div className="provider-home-header">
                    <h3 style={{ fontWeight: 700 }}>โต๊ะทำงานผู้ให้บริการ</h3>
                    
                    <div className="provider-status-toggle" onClick={toggleProviderOnlineStatus}>
                        <div className={`status-dot ${providerStatus === 'online' ? 'active' : ''}`}></div>
                        <span className="status-label">
                            {providerStatus === 'online' ? 'เปิดรับงาน (ONLINE)' : 'ปิดรับงาน (OFFLINE)'}
                        </span>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="provider-stats-grid">
                    <div className="stat-item-box">
                        <div className="stat-value">{providerStats.completed}</div>
                        <div className="stat-label">งานสำเร็จ</div>
                    </div>
                    <div className="stat-item-box">
                        <div className="stat-value">⭐ {providerStats.rating}</div>
                        <div className="stat-label">เรตติ้ง</div>
                    </div>
                    <div className="stat-item-box">
                        <div className="stat-value">{providerStats.earnings}</div>
                        <div className="stat-label">รายได้รวม</div>
                    </div>
                </div>

                <h4 className="jobs-queue-header">
                    🎯 คำขอส่งด่วนใกล้ตัวคุณ ({providerJobs.length})
                </h4>
                
                {providerStatus === 'offline' ? (
                    <div className="content-card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                        <span style={{ fontSize: '2rem' }}>💤</span>
                        <h5 style={{ marginTop: '0.5rem', fontWeight: 700 }}>สถานะของคุณคือออฟไลน์</h5>
                        <p style={{ fontSize: '0.65rem' }}>กรุณากดเปิดสถานะ ONLINE ที่มุมขวาเพื่อรับข้อเสนอช่วยเหลือด่วนรอบตัว</p>
                    </div>
                ) : (
                    <div className="provider-jobs-list">
                        {providerJobs.length === 0 ? (
                            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-medium)', padding: '1rem' }}>
                                รอคำขอความช่วยเหลือใหม่เข้ามา...
                            </p>
                        ) : (
                            providerJobs.map(job => (
                                <div key={job.id} className={`job-card ${job.id === 'job-sos' ? 'emergency-job' : ''}`}>
                                    <div className="job-card-header">
                                        <span className={`job-type-tag ${job.id === 'job-sos' ? 'tag-urgent' : 'tag-general'}`}>
                                            {job.typeText}
                                        </span>
                                        <span className="job-distance">{job.distance}</span>
                                    </div>
                                    <div className="job-info-body">
                                        <strong>ผู้ร้องขอ:</strong> {job.victimName}<br />
                                        <strong>ปัญหา:</strong> {job.detail}<br />
                                        <div className="job-location-str">{job.location}</div>
                                    </div>
                                    <div className="job-card-actions">
                                        <button className="job-btn btn-job-decline" onClick={() => declineJob(job.id)}>ปฏิเสธ</button>
                                        <button className="job-btn btn-job-accept" onClick={() => acceptJob(job.id)}>ตอบรับงาน</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        );
    }

    // -------------------------------------------------------------
    // SEEKER HOME VIEW (NORMAL USER VIEW)
    // -------------------------------------------------------------
    return (
        <div style={{ padding: '10px 15px' }}>
            <div style={{ textAlign: 'center', paddingTop: '15px', marginBottom: '0.5rem' }}>
                <img 
                    src="/logo.jpg" 
                    alt="ช่วยเหลือกาญ Logo" 
                    style={{ height: '55px', objectFit: 'contain', borderRadius: '6px' }} 
                />
            </div>
            <div className="greeting-section" style={{ marginTop: 0, marginBottom: '1rem' }}>
                <div className="location-info">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>ตำแหน่งปัจจุบัน: อ.เมืองกาญจนบุรี</span>
                </div>
                <h3 className="greeting-title" style={{ fontWeight: 700 }}>วันนี้มีอะไรให้เราช่วยไหม?</h3>
            </div>

            <form onSubmit={handleSearchSubmit} className="search-container">
                <input 
                    type="text" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="search-input" 
                    placeholder="ค้นหาบริการ หรือขอความช่วยเหลือ..." 
                />
                <span className="search-icon" onClick={() => searchInput.trim() && askAI(searchInput)} style={{ cursor: 'pointer' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </span>
            </form>

            <div className="category-grid">
                {categories.map((cat, idx) => (
                    <div 
                        key={idx} 
                        className={`category-item-box ${cat.theme}`}
                        onClick={() => {
                            setSelectedCategoryIndex(idx);
                            changeScreen('home', 'subservices');
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        {cat.badge && <span className="cat-badge">{cat.badge}</span>}
                        <div className="cat-icon-emoji">{cat.title.split(' ')[0]}</div>
                        <div className="cat-title-text">{cat.title.replace(/^[^\s]+\s+/, '')}</div>
                        <div className="cat-desc-text">{cat.subtitle}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;
