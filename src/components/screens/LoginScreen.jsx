import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';

const LoginScreen = () => {
    const {
        loginMode,
        setLoginMode,
        loginPhone,
        sendOTP,
        verifyOTP,
        loginWithFacebook,
        loginAsGuest
    } = useAppState();

    const [phoneInput, setPhoneInput] = useState('');
    const [otpInput, setOtpInput] = useState('');
    const [showFbModal, setShowFbModal] = useState(false);

    const handleSendOTP = (e) => {
        e.preventDefault();
        sendOTP(phoneInput);
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        verifyOTP(otpInput);
    };

    if (loginMode === 'otp') {
        return (
            <div style={{ padding: '2.5rem 1rem 1rem 1rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', textAlign: 'center' }}>
                <div>
                    <div style={{ marginTop: '1.5rem', fontSize: '3rem' }}>📱</div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: '1rem', color: 'var(--text-dark)' }}>ยืนยันรหัส OTP</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-medium)', marginTop: '0.5rem', lineHeight: 1.4 }}>
                        ระบบได้ส่งรหัส OTP 6 หลักไปที่เบอร์ <br />
                        <strong style={{ color: 'var(--primary-blue)' }}>{loginPhone}</strong> แล้ว
                    </p>
                    
                    <form onSubmit={handleVerifyOTP} style={{ marginTop: '2rem' }}>
                        <input 
                            type="text" 
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                            className="search-input" 
                            placeholder="กรอกรหัส OTP 6 หลัก (จำลอง: 123456)" 
                            style={{ textAlign: 'center', fontSize: '1.1rem', letterSpacing: '4px', paddingLeft: '1rem' }} 
                            maxLength={6}
                        />
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>
                            ทดสอบการล็อกอิน กรอกรหัสอะไรก็ได้ หรือใช้: <strong>123456</strong>
                        </p>
                        <button type="submit" style={{ display: 'none' }} />
                    </form>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button className="btn-reg-submit" style={{ background: 'var(--primary-blue)' }} onClick={() => verifyOTP(otpInput)}>
                        ยืนยันและเข้าใช้งาน
                    </button>
                    <button className="btn-sos-cancel" style={{ color: 'var(--text-medium)', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer' }} onClick={() => setLoginMode('choose')}>
                        ย้อนกลับเพื่อเปลี่ยนเบอร์
                    </button>
                </div>
            </div>
        );
    }

    // Default: Choose login method
    return (
        <div style={{ padding: '2rem 1.25rem 1rem 1.25rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            {/* Logo & Brand Header */}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <img src="/logo.jpg" alt="ช่วยเหลือกาญ Logo" style={{ height: '120px', objectFit: 'contain', borderRadius: '18px', border: '2px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '1rem', color: 'var(--text-dark)', letterSpacing: '0.5px' }}>ช่วยเหลือกาญ</h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', fontWeight: 700, marginTop: '0.25rem', wordSpacing: '1px' }}>ช่วยเร็ว • เข้าถึงง่าย • อุ่นใจทุกเวลา</p>
            </div>

            {/* Input section */}
            <div style={{ marginTop: '1.5rem' }}>
                <form onSubmit={handleSendOTP} className="reg-form-group">
                    <label className="reg-form-label" style={{ fontSize: '0.75rem' }}>เบอร์โทรศัพท์สำหรับเข้าใช้งาน:</label>
                    <input 
                        type="tel" 
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        className="search-input" 
                        placeholder="ระบุเบอร์โทรศัพท์ 10 หลัก..." 
                        style={{ paddingLeft: '1rem', fontSize: '0.85rem' }} 
                    />
                </form>
                
                <button className="btn-reg-submit" style={{ background: 'var(--primary-blue)', width: '100%', marginTop: '0.5rem' }} onClick={() => sendOTP(phoneInput)}>
                    เข้าสู่ระบบด้วยเบอร์โทรศัพท์ (OTP)
                </button>
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', margin: '1rem 0', fontSize: '0.7rem', color: 'var(--text-light)' }}>
                <div style={{ flex: 1, borderBottom: '1px solid var(--border-color)' }}></div>
                <span style={{ padding: '0 10px', fontWeight: 600 }}>หรือเข้าสู่ระบบผ่านช่องทางอื่น</span>
                <div style={{ flex: 1, borderBottom: '1px solid var(--border-color)' }}></div>
            </div>

            {/* Social & Guest Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
                {/* Facebook Login Button */}
                <button onClick={() => setShowFbModal(true)} style={{ background: '#1877F2', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '12px', fontWeight: 700, fontFamily: 'inherit', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'opacity var(--transition-fast)' }}>
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    เข้าสู่ระบบด้วย Facebook
                </button>

                {/* Guest Mode Button */}
                <button onClick={loginAsGuest} style={{ background: 'var(--bg-light)', color: 'var(--text-medium)', border: '1px solid var(--border-color)', padding: '0.6rem', borderRadius: '12px', fontWeight: 600, fontFamily: 'inherit', fontSize: '0.75rem', cursor: 'pointer', transition: 'background var(--transition-fast)' }}>
                    เข้าใช้งานในฐานะผู้มาเยือน (Guest)
                </button>
            </div>

            {/* Custom Facebook Confirmation Modal Overlay */}
            {showFbModal && (
                <div className="fb-modal-overlay">
                    <div className="fb-modal-card">
                        <div className="fb-modal-header">
                            <svg width="20" height="20" fill="#1877F2" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="fb-modal-title">เชื่อมต่อด้วย Facebook</span>
                        </div>
                        <div className="fb-modal-body">
                            <div className="fb-app-info">
                                <img src="/logo.jpg" alt="ช่วยเหลือกาญ" className="fb-app-logo" />
                                <div>
                                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-dark)' }}>ช่วยเหลือกาญ (ChuayLueaKan)</strong>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-medium)', margin: 0 }}>ขอเข้าถึงสิทธิ์บัญชีผู้ใช้</p>
                                </div>
                            </div>
                            <div className="fb-permission-box">
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', fontWeight: 600, marginBottom: '6px', margin: 0 }}>แอปพลิเคชันนี้จะได้รับสิทธิ์เข้าถึง:</p>
                                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.7rem', color: 'var(--text-medium)', lineHeight: 1.5, margin: 0 }}>
                                    <li>ชื่อโปรไฟล์ (ข้อมูลสาธารณะ)</li>
                                    <li>รูปภาพโปรไฟล์</li>
                                </ul>
                            </div>
                            <div className="fb-user-preview">
                                <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🔵</span>
                                <div style={{ textAlign: 'left' }}>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', display: 'block' }}>เข้าสู่ระบบในชื่อ:</span>
                                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-dark)' }}>สมเกียรติ รักกาญจน์</strong>
                                </div>
                            </div>
                        </div>
                        <div className="fb-modal-footer">
                            <button className="fb-btn-confirm" onClick={() => { setShowFbModal(false); loginWithFacebook(); }}>
                                ดำเนินการต่อในชื่อ สมเกียรติ
                            </button>
                            <button className="fb-btn-cancel" onClick={() => setShowFbModal(false)}>
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginScreen;
