import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';

const ProfileScreen = () => {
    const {
        role,
        volunteerPoints,
        emergencyContact,
        setEmergencyContact,
        loggedInUser,
        logout,
        togglePersona,
        submitProviderRegistration,
        logActivity
    } = useAppState();

    const [skill, setSkill] = useState('mechanic');
    const [fileUploaded, setFileUploaded] = useState(false);

    const handleFileUpload = () => {
        logActivity('event', 'ผู้ใช้จำลองการอัปโหลดไฟล์เอกสารการรับรองช่าง/กู้ภัยเพื่อตรวจสอบความประพฤติ');
        setFileUploaded(true);
    };

    const handleEmergencyContactChange = () => {
        const newNum = prompt('ระบุเบอร์โทรญาติหรือหน่วยติดต่อฉุกเฉินเพื่อเชื่อมโยงกับปุ่ม SOS:', emergencyContact);
        if (newNum !== null) {
            setEmergencyContact(newNum);
            logActivity('state', 'แก้ไขเบอร์ญาติฉุกเฉินเป็น: ' + newNum);
        }
    };

    // -------------------------------------------------------------
    // PROVIDER PROFILE VIEW
    // -------------------------------------------------------------
    if (role === 'provider') {
        return (
            <div className="profile-section">
                <div className="profile-card">
                    <div className="profile-img-mock" style={{ backgroundColor: 'var(--primary-green-light)' }}>
                        {loggedInUser ? loggedInUser.avatar : '👨‍🔧'}
                    </div>
                    <div className="profile-name">
                        ช่าง{loggedInUser ? loggedInUser.name.replace('คุณ ', '') : 'วิทย์ ปะยาง'} (Verified)
                    </div>
                    <div className="profile-role-text">บทบาท: ช่างบริการนอกสถานที่ / อาสาสมัคร</div>
                    <div className="volunteer-points-badge" style={{ marginTop: '0.5rem', background: 'var(--primary-green-light)', border: '1px solid var(--primary-green)', padding: '0.4rem 0.8rem', borderRadius: '99px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <span>⭐</span>
                        <span style={{ fontWeight: 700, color: 'var(--primary-green)', fontSize: '0.75rem' }}>
                            คะแนนจิตอาสา: {volunteerPoints}
                        </span>
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                        <span className="badge-verified-user" style={{ background: 'var(--primary-green-light)', color: 'var(--primary-green)' }}>
                            ✓ ผู้ให้บริการที่ยืนยันตัวตนแล้ว
                        </span>
                    </div>
                </div>

                <div className="profile-menu">
                    <div className="profile-menu-item" onClick={() => togglePersona('seeker')} style={{ cursor: 'pointer' }}>
                        <div className="menu-item-left" style={{ color: 'var(--primary-blue)' }}>
                            <span className="icon">👤</span> สลับกลับไปบทบาท Seeker (ผู้ใช้ทั่วไป)
                        </div>
                        <span>❯</span>
                    </div>
                    <div className="profile-menu-item" onClick={() => alert('จัดการบริการของฉัน')} style={{ cursor: 'pointer' }}>
                        <div className="menu-item-left"><span className="icon">🛠️</span> จัดการอัตราค่าบริการและทักษะ</div>
                        <span>❯</span>
                    </div>
                    <div className="profile-menu-item" onClick={() => alert('ข้อมูลถอนเงิน')} style={{ cursor: 'pointer' }}>
                        <div className="menu-item-left"><span className="icon">💰</span> บัญชีรับรายได้ / ยอดเงินสะสม</div>
                        <span>❯</span>
                    </div>
                    <div className="profile-menu-item" onClick={logout} style={{ color: 'var(--accent-red)', borderTop: '1px solid var(--border-color)', marginTop: '0.5rem', paddingTop: '0.75rem', cursor: 'pointer' }}>
                        <div className="menu-item-left" style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>
                            <span className="icon">🚪</span> ออกจากระบบ (Logout)
                        </div>
                        <span style={{ color: 'var(--accent-red)' }}>❯</span>
                    </div>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------
    // SEEKER PROFILE VIEW (User config + Provider application)
    // -------------------------------------------------------------
    return (
        <div className="profile-section">
            <div className="profile-card">
                <div className="profile-img-mock">{loggedInUser ? loggedInUser.avatar : '👨'}</div>
                <div className="profile-name">{loggedInUser ? loggedInUser.name : 'คุณ นนทวัชร์ วงศ์สุวรรณ'}</div>
                <div className="profile-role-text">บทบาท: สมาชิกทั่วไป / นักท่องเที่ยว</div>
                <div className="volunteer-points-badge" style={{ marginTop: '0.5rem', background: 'var(--primary-blue-light)', border: '1px solid var(--primary-blue)', padding: '0.4rem 0.8rem', borderRadius: '99px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span>⭐</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary-blue)', fontSize: '0.75rem' }}>
                        คะแนนจิตอาสา: {volunteerPoints}
                    </span>
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                    <span className="badge-verified-user">🛡️ ยืนยันตัวตนระดับพื้นฐาน</span>
                </div>
            </div>

            <div className="content-card" style={{ marginBottom: '1.25rem', background: 'white', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1rem', textAlign: 'left' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    🏆 เครดิตความดี (คะแนนจิตอาสา)
                </h4>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-medium)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                    สะสมคะแนนจากการช่วยเหลือสังคมและการร่วมกิจกรรม
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.7rem', fontWeight: 600 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '4px' }}>
                        <span>🩸 บริจาคเลือดด่วน</span>
                        <span style={{ color: 'var(--primary-blue)' }}>+50</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '4px' }}>
                        <span>🚗 ช่วยรถเสีย / เดินทาง</span>
                        <span style={{ color: 'var(--primary-blue)' }}>+20</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '4px' }}>
                        <span>🎁 บริจาคสิ่งของ</span>
                        <span style={{ color: 'var(--primary-blue)' }}>+15</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '2px' }}>
                        <span>🌱 ร่วมกิจกรรมสาธารณะ</span>
                        <span style={{ color: 'var(--primary-blue)' }}>+10</span>
                    </div>
                </div>
            </div>

            <div className="profile-menu">
                <div className="profile-menu-item" onClick={handleEmergencyContactChange} style={{ cursor: 'pointer' }}>
                    <div className="menu-item-left"><span className="icon">👪</span> ตั้งค่าเบอร์โทรญาติฉุกเฉิน</div>
                    <span>❯</span>
                </div>
                <div className="profile-menu-item" onClick={() => alert('ประวัติการขอความช่วยเหลือ')} style={{ cursor: 'pointer' }}>
                    <div className="menu-item-left"><span className="icon">📜</span> ประวัติรับบริการ / แจ้ง SOS</div>
                    <span>❯</span>
                </div>
                <div className="profile-menu-item" onClick={logout} style={{ color: 'var(--accent-red)', borderTop: '1px solid var(--border-color)', marginTop: '0.5rem', paddingTop: '0.75rem', cursor: 'pointer' }}>
                    <div className="menu-item-left" style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>
                        <span className="icon">🚪</span> ออกจากระบบ (Logout)
                    </div>
                    <span style={{ color: 'var(--accent-red)' }}>❯</span>
                </div>
            </div>

            <div className="provider-registration-box" id="reg-box">
                <h4 style={{ fontWeight: 700 }}>💼 สมัครเป็นผู้ช่วยเหลือ / ช่างบริการ</h4>
                <p>เปิดบัญชีของคุณเพื่อให้บริการซ่อมแซม ขนย้าย ปะยาง หรือลงทะเบียนอาสาสมัครกู้ภัยในพื้นที่จังหวัดกาญจนบุรี หารายได้เสริมและช่วยเหลือสังคมไปด้วยกัน</p>
                
                <div className="provider-reg-form">
                    <div className="reg-form-group">
                        <label className="reg-form-label">ประเภทความเชี่ยวชาญ:</label>
                        <select 
                            className="reg-form-select" 
                            value={skill} 
                            onChange={(e) => setSkill(e.target.value)}
                        >
                            <option value="mechanic">🔧 ช่างซ่อมรถยนต์ / ปะยาง</option>
                            <option value="handyman">⚡ ช่างไฟฟ้า / ช่างประปา / ล้างแอร์</option>
                            <option value="caregiver">👵 ผู้ดูแลผู้สูงอายุ / ผู้ป่วยติดเตียง (Caregiver)</option>
                            <option value="rescue">🚒 อาสาสมัครกู้ภัย / กู้ชีพ</option>
                            <option value="volunteer">🌱 จิตอาสาทั่วไป / ระดมบุญ</option>
                        </select>
                    </div>

                    <div className="reg-form-group">
                        <label className="reg-form-label">บัตรประจำตัววิชาชีพ / บัตรประชาชน (แนบไฟล์):</label>
                        <div className="reg-form-file-btn" onClick={handleFileUpload} style={{ cursor: 'pointer' }}>
                            📄 อัปโหลดไฟล์เอกสารยืนยันตัวตน
                            <div className="reg-file-status" id="reg-file-ok" style={{ display: fileUploaded ? 'block' : 'none' }}>
                                ✓ ตรวจสอบความถูกต้องของไฟล์แล้ว
                            </div>
                        </div>
                    </div>

                    <button className="btn-reg-submit" onClick={submitProviderRegistration}>ส่งเอกสารยืนยันตัวตน</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
