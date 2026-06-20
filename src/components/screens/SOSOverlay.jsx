import React from 'react';
import { useAppState } from '../../context/AppStateContext';

const SOSOverlay = () => {
    const {
        sosStatus,
        sosCountdown,
        sosIncidentType,
        setSosIncidentType,
        sosPhotoSelected,
        setSosPhotoSelected,
        emergencyContact,
        setEmergencyContact,
        triggerSOSCountdown,
        cancelSOS,
        changeScreen,
        setActiveChatPartner,
        logActivity
    } = useAppState();

    const handlePhotoUpload = () => {
        setSosPhotoSelected(true);
        logActivity('event', 'แนบไฟล์รูปถ่ายอุบัติเหตุเพื่อความคมชัดในการตรวจสอบเหตุ');
    };

    const getDispatchDetails = () => {
        switch (sosIncidentType) {
            case 'medical':
                return {
                    status: "รถพยาบาลฉุกเฉินและกู้ชีพกำลังเดินทาง",
                    team: "ทีมอาสากู้ชีพพิทักษ์กาญจน์ (หน่วยส่งกลับแพทย์)",
                    eta: "~8 นาที",
                    icon: "🚑"
                };
            case 'road':
                return {
                    status: "ทีมช่างบริการกู้ภัยรถเสียกำลังเดินทาง",
                    team: "ทีมช่างกู้ภัยเคลื่อนที่เร็วสมาคมรถสไลด์กาญจน์",
                    eta: "~12 นาที",
                    icon: "🚗"
                };
            case 'water':
                return {
                    status: "ทีมกู้ภัยทางน้ำและเรือเจ็ทสกีได้รับแจ้งแล้ว",
                    team: "ชุดปฏิบัติการใต้น้ำกู้ภัยพิทักษ์กาญจน์",
                    eta: "~15 นาที",
                    icon: "⛵"
                };
            case 'disaster':
                return {
                    status: "รถดับเพลิงและบรรเทาสาธารณภัยกำลังเดินทาง",
                    team: "สถานีดับเพลิงและบรรเทาสาธารณภัยเทศบาลเมืองกาญจนบุรี",
                    eta: "~7 นาที",
                    icon: "🔥"
                };
            case 'flood':
                return {
                    status: "ทีมอพยพภัยพิบัติและเรือท้องแบนกำลังรุดเข้าช่วยเหลือ",
                    team: "หน่วยเฉพาะกิจบรรเทาสาธารณภัยอุทกภัยกาญจนบุรี",
                    eta: "~14 นาที",
                    icon: "🌊"
                };
            case 'snake':
                return {
                    status: "ผู้เชี่ยวชาญการจับอสรพิษกำลังเดินทางพร้อมอุปกรณ์",
                    team: "ทีมเผชิญเหตุอสรพิษวิทยาพิทักษ์กาญจน์ (Snake Wrangler)",
                    eta: "~9 นาที",
                    icon: "🐍"
                };
            default:
                return {
                    status: "เจ้าหน้าที่กู้ภัยกำลังเดินทาง",
                    team: "ทีมอาสากู้ชีพพิทักษ์กาญจน์",
                    eta: "~10 นาที",
                    icon: "🚨"
                };
        }
    };

    const dispatchInfo = getDispatchDetails();

    if (sosStatus === 'counting') {
        return (
            <div className="sos-overlay">
                <div className="sos-header-title">
                    <h2>🚨 ตรวจจับเหตุฉุกเฉิน</h2>
                    <p>กำลังประมวลสัญญาณส่งศูนย์ช่วยเหลือภัยกู้ชีพกาญจน์</p>
                </div>

                <div className="sos-gps-card">
                    <div className="gps-title">📍 ตําแหน่งดาวเทียมของท่าน</div>
                    <div className="gps-coords">14.0227° N, 99.5327° E</div>
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', marginTop: '4px' }}>ความแม่นยำสูง (อ.เมืองกาญจนบุรี)</div>
                </div>

                <div className="sos-countdown-container">
                    <div className="countdown-circle">{sosCountdown}</div>
                    <div className="countdown-label">ระบบจะส่งสัญญาณอัตโนมัติหากไม่กดยกเลิก</div>
                </div>

                <div className="sos-actions">
                    <button className="btn-sos-cancel" onClick={cancelSOS}>❌ กดยกเลิกสัญญาณ</button>
                </div>
            </div>
        );
    }

    if (sosStatus === 'dispatched') {
        return (
            <div className="sos-overlay">
                <div className="sos-header-title">
                    <h2 style={{ color: 'var(--primary-green)' }}>{dispatchInfo.icon} ศูนย์รับเรื่องแจ้งแล้ว</h2>
                    <p>รหัสพิกัดสัญญาณ: SOS-90221</p>
                </div>

                <div className="sos-dispatch-card">
                    <div className="dispatch-status">{dispatchInfo.status}</div>
                    <div className="dispatch-details">
                        <p><strong>ผู้เข้าช่วยเหลือ:</strong> {dispatchInfo.team}</p>
                        <p><strong>ระยะเวลาเดินทางถึงจุดเกิดเหตุ:</strong> {dispatchInfo.eta}</p>
                        <p><strong>โทรแจ้งญาติ/เบอร์หลัก:</strong> {emergencyContact} (แชร์พิกัดแล้ว)</p>
                    </div>
                </div>

                <div className="sos-gps-card" style={{ margin: '0.5rem 0' }}>
                    <div className="gps-title" style={{ color: 'var(--primary-green)' }}>พิกัดที่แชร์กับเจ้าหน้าที่</div>
                    <div className="gps-coords">14.0227° N, 99.5327° E</div>
                </div>

                <div className="sos-actions">
                    <button className="btn-sos-cancel" onClick={cancelSOS} style={{ background: 'var(--primary-green)', marginBottom: '0.5rem' }}>เสร็จสิ้น / ปิดหน้าต่าง</button>
                    <div className="sos-call-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '4px' }}>
                        <button className="sos-call-btn" onClick={() => alert('จำลองการต่อสายด่วนช่วยเหลือ')}>📞 โทรสายด่วน</button>
                        <button className="sos-call-btn" onClick={() => {
                            setActiveChatPartner(dispatchInfo.team);
                            changeScreen('home', 'chat');
                        }}>💬 แชตกับผู้ช่วยเหลือ</button>
                    </div>
                    <button className="sos-call-btn" style={{ width: '100%', padding: '8px', fontWeight: 'bold', background: 'var(--accent-red)', marginTop: '4px' }} onClick={() => alert('กำลังต่อสายด่วนไปยังเบอร์ญาติฉุกเฉิน: ' + emergencyContact)}>
                        📞 โทรหาเบอร์ฉุกเฉินที่ลงไว้ ({emergencyContact})
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="sos-overlay">
            <div className="sos-header-title">
                <h2>🚨 ส่งสัญญาณช่วยเหลือด่วน</h2>
                <p>กรุณาระบุรายละเอียดเบื้องต้นเพื่อความแม่นยำ</p>
            </div>

            <div className="sos-options">
                <div className="reg-form-group">
                    <label className="reg-form-label" style={{ color: 'white' }}>ประเภทเหตุฉุกเฉิน:</label>
                    <select 
                        className="sos-select-type" 
                        value={sosIncidentType} 
                        onChange={(e) => setSosIncidentType(e.target.value)}
                    >
                        <option value="medical">🚑 เจ็บป่วย/อุบัติเหตุทางการแพทย์</option>
                        <option value="road">🚗 รถเสีย/อุบัติเหตุทางรถยนต์</option>
                        <option value="water">⛵ ขอความช่วยเหลือทางน้ำ</option>
                        <option value="disaster">🔥 อัคคีภัย/ภัยพิบัติทางธรรมชาติ</option>
                        <option value="flood">🌊 อุทกภัย / น้ำท่วมป่าไหลหลาก</option>
                        <option value="snake">🐍 จับงูพิษ / สัตว์เลื้อยคลานมีพิษ</option>
                    </select>
                </div>

                <div className="reg-form-group">
                    <label className="reg-form-label" style={{ color: 'white' }}>ระบุเบอร์โทรฉุกเฉิน (เบอร์ญาติหรือหน่วยประสานงาน):</label>
                    <input 
                        type="tel" 
                        className="reg-form-input" 
                        value={emergencyContact} 
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        style={{ background: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.15)', color: 'white', padding: '0.5rem', borderRadius: '8px', fontFamily: 'inherit', fontSize: '0.8rem', outline: 'none', width: '100%' }}
                    />
                </div>

                <div className="reg-form-group">
                    <label className="reg-form-label" style={{ color: 'white' }}>รูปภาพประกอบ (ถ้ามี):</label>
                    <div className="sos-photo-selector" onClick={handlePhotoUpload} style={{ cursor: 'pointer' }}>
                        📸 กดเพื่อจำลองการถ่ายรูป/อัปโหลดรูป
                        <div className="sos-photo-preview" style={{ display: sosPhotoSelected ? 'block' : 'none' }}>
                            ✓ แนบไฟล์รูปภาพแล้ว: incident_image.jpg
                        </div>
                    </div>
                </div>
            </div>

            <div className="sos-gps-card">
                <div className="gps-title">📍 พิกัดดาวเทียมปัจจุบันของคุณ</div>
                <div className="gps-coords">14.0227° N, 99.5327° E</div>
            </div>

            <div className="sos-actions">
                <button className="btn-reg-submit" style={{ background: 'var(--accent-red)' }} onClick={triggerSOSCountdown}>🚨 ส่งสัญญาณ SOS ทันที</button>
                <button className="btn-sos-cancel" onClick={() => changeScreen('home')}>ยกเลิก</button>
            </div>
        </div>
    );
};

export default SOSOverlay;
