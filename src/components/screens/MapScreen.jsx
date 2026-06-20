import React from 'react';
import { useAppState } from '../../context/AppStateContext';

const MapScreen = () => {
    const {
        activeMapFilter,
        setActiveMapFilter,
        selectedPin,
        setSelectedPin,
        mapPins,
        setActiveChatPartner,
        changeScreen,
        logActivity
    } = useAppState();

    const handleFilterChange = (filterType) => {
        setActiveMapFilter(filterType);
        setSelectedPin(null);
        logActivity('info', `กรองพิกัดบนแผนที่: ${filterType}`);
    };

    const handlePinClick = (pin, e) => {
        e.stopPropagation(); // Prevent map click from closing modal
        setSelectedPin(pin);
        logActivity('event', `เลือกดูพิกัดปักหมุดช่วยเหลือ: "${pin.name}"`);
    };

    const handleMapClick = () => {
        setSelectedPin(null);
    };

    const visiblePins = activeMapFilter === 'all'
        ? mapPins
        : mapPins.filter(pin => pin.type === activeMapFilter);

    return (
        <div className="map-screen-container" onClick={handleMapClick}>
            <div className="map-mock-bg">
                {/* Filters Overlay */}
                <div className="map-filters" onClick={(e) => e.stopPropagation()}>
                    <button className={`map-filter-btn ${activeMapFilter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>ทั้งหมด</button>
                    <button className={`map-filter-btn ${activeMapFilter === 'caregiver' ? 'active' : ''}`} onClick={() => handleFilterChange('caregiver')}>👵 คนดูแล</button>
                    <button className={`map-filter-btn ${activeMapFilter === 'mechanic' ? 'active' : ''}`} onClick={() => handleFilterChange('mechanic')}>🔧 ช่างซ่อม</button>
                    <button className={`map-filter-btn ${activeMapFilter === 'rescue' ? 'active' : ''}`} onClick={() => handleFilterChange('rescue')}>🚒 กู้ภัย</button>
                    <button className={`map-filter-btn ${activeMapFilter === 'water-rescue' ? 'active' : ''}`} onClick={() => handleFilterChange('water-rescue')}>⛵ กู้ภัยทางน้ำ</button>
                    <button className={`map-filter-btn ${activeMapFilter === 'hospital' ? 'active' : ''}`} onClick={() => handleFilterChange('hospital')}>🏥 โรงพยาบาล</button>
                </div>

                {/* Custom SVG Map Drawing */}
                <svg className="map-svg-mock" viewBox="0 0 375 600">
                    {/* Simulated river Kwai */}
                    <path d="M 0,250 C 100,280 200,180 375,220 L 375,250 C 200,210 100,310 0,280 Z" fill="#bbdefb" />
                    {/* River label */}
                    <text x="120" y="270" fill="#1e88e5" fontSize="10" transform="rotate(10, 120, 270)">แม่น้ำแควใหญ่</text>
                    {/* Simulated Main Road */}
                    <path d="M 50,0 Q 180,200 180,600" fill="none" stroke="#cfd8dc" strokeWidth="8" />
                    <path d="M 0,100 Q 200,300 375,300" fill="none" stroke="#cfd8dc" strokeWidth="8" />
                    {/* Bridge line */}
                    <line x1="150" y1="210" x2="200" y2="230" stroke="#78909c" strokeWidth="5" />
                    <text x="140" y="195" fill="#546e7a" fontSize="8">สะพานข้ามแม่น้ำแคว</text>
                    
                    {/* Landmarks */}
                    <circle cx="170" cy="220" r="4" fill="#ff8f00" />
                    <text x="110" y="325" fill="#78909c" fontSize="9">ศาลากลางจังหวัด</text>
                </svg>

                {/* User Current Location Pin */}
                <div className="user-current-pin" style={{ top: '48%', left: '48%' }}>
                    <div className="user-dot"></div>
                    <div className="user-dot-pulse"></div>
                </div>

                {/* Map Pins Rendering */}
                {visiblePins.map(pin => {
                    let pinColor = 'pin-bg-blue';
                    if (pin.type === 'rescue') pinColor = 'pin-bg-red';
                    if (pin.type === 'water-rescue') pinColor = 'pin-bg-green';
                    if (pin.type === 'hospital') pinColor = 'pin-bg-orange';
                    if (pin.type === 'caregiver') pinColor = 'pin-bg-teal';
                    
                    return (
                        <div 
                            key={pin.id} 
                            className="map-pin" 
                            style={{ top: `${pin.lat}%`, left: `${pin.lng}%`, cursor: 'pointer' }}
                            onClick={(e) => handlePinClick(pin, e)}
                        >
                            <div className={`pin-icon-wrapper ${pinColor}`}>
                                <span>{pin.avatar}</span>
                            </div>
                            <div className="pin-pulse"></div>
                        </div>
                    );
                })}

                {/* Detail Modal Overlay (Slide up) */}
                <div className={`map-detail-modal ${selectedPin ? 'active' : ''}`} id="map-detail-card" onClick={(e) => e.stopPropagation()}>
                    {selectedPin && (
                        <>
                            <div className="modal-header-info">
                                <div className="modal-avatar">{selectedPin.avatar}</div>
                                <div className="modal-meta">
                                    <div className="modal-title-row">
                                        <span className="modal-title">{selectedPin.name}</span>
                                        <span className="verified-icon">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="modal-subtitle">{selectedPin.service}</div>
                                    <div className="modal-rating">
                                        ⭐ {selectedPin.rating} 
                                        <span className="rating-count">({selectedPin.reviews} รีวิว)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-desc">{selectedPin.desc}</div>
                            <div className="modal-actions">
                                <button className="modal-btn btn-modal-call" onClick={() => alert('จำลองการกดโทรติดต่อที่เบอร์โทรศัพท์ของบริการนี้')}>📞 โทรสอบถาม</button>
                                <button className="modal-btn btn-modal-chat" onClick={() => {
                                    setActiveChatPartner(selectedPin.name);
                                    changeScreen('home', 'chat');
                                }}>💬 แชตปรึกษา</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapScreen;
