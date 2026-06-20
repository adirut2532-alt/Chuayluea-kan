import React from 'react';
import { useAppState } from '../../context/AppStateContext';

const JobDoneScreen = () => {
    const {
        activeJob,
        setActiveJob,
        changeScreen
    } = useAppState();

    const handleReturnToHome = () => {
        setActiveJob(null);
        changeScreen('home');
    };

    return (
        <div className="job-done-screen">
            <div className="success-check-icon">🏆</div>
            <h3 style={{ fontWeight: 700 }}>ขอบคุณสำหรับการทำดี!</h3>
            <p style={{ fontSize: '0.75rem', lineHeight: 1.4, color: 'var(--text-medium)' }}>
                คุณส่งมอบการช่วยเหลือและแก้ปัญหาให้กับผู้ใช้บริการสำเร็จ การกระทำนี้ช่วยให้จังหวัดกาญจนบุรีปลอดภัยขึ้น
            </p>

            <div className="job-summary-card">
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}>สรุปรายการช่วยเหลือ</h4>
                <div className="summary-row">
                    <span>ประเภทงาน:</span>
                    <span>{activeJob?.typeText || 'บริการทั่วไป'}</span>
                </div>
                <div className="summary-row">
                    <span>ผู้รับการช่วยเหลือ:</span>
                    <span>{activeJob?.victimName || 'ผู้ใช้แอป'}</span>
                </div>
                <div className="summary-row">
                    <span>รายรับของงาน:</span>
                    <span style={{ color: 'var(--primary-green)', fontWeight: 700 }}>+ 450.00 บาท</span>
                </div>
                <div className="summary-row">
                    <span>คะแนนจิตอาสาที่ได้รับ:</span>
                    <span style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>+ 20 คะแนน (ช่วยรถเสีย)</span>
                </div>
            </div>

            <button className="btn-reg-submit" onClick={handleReturnToHome}>กลับไปยังหน้าควบคุมหลัก</button>
        </div>
    );
};

export default JobDoneScreen;
