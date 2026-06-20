import React, { useState, useEffect, useRef } from 'react';
import { useAppState } from '../../context/AppStateContext';

const ControlDashboard = () => {
    const {
        logs,
        logActivity,
        triggerFlowStep,
        askAI,
        changeScreen
    } = useAppState();

    const [activeDashTab, setActiveDashTab] = useState('overview');
    const logConsoleEndRef = useRef(null);

    // Auto scroll logs console to bottom when new logs arrive
    useEffect(() => {
        if (logConsoleEndRef.current) {
            logConsoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    const handleClearLogs = () => {
        // We'll simulate clearing logs locally or just log a system event
        logActivity('system', 'ล้าง Developer Logs เรียบร้อย');
    };

    const handleFlowStepClick = (persona, stepIndex) => {
        triggerFlowStep(persona, stepIndex);
    };

    const handleAIChipClick = (promptText) => {
        askAI(promptText);
    };

    return (
        <section className="dashboard-panel">
            {/* Navigation Tabs for Dashboard */}
            <div className="dashboard-tabs">
                <button 
                    className={`dash-tab ${activeDashTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveDashTab('overview')}
                >
                    🚀 ภาพรวมแอป
                </button>
                <button 
                    className={`dash-tab ${activeDashTab === 'userflow' ? 'active' : ''}`}
                    onClick={() => setActiveDashTab('userflow')}
                >
                    🛣️ Flow ผู้ใช้งาน
                </button>
                <button 
                    className={`dash-tab ${activeDashTab === 'providerflow' ? 'active' : ''}`}
                    onClick={() => setActiveDashTab('providerflow')}
                >
                    🛠️ Flow ช่าง/กู้ภัย
                </button>
                <button 
                    className={`dash-tab ${activeDashTab === 'aiguide' ? 'active' : ''}`}
                    onClick={() => setActiveDashTab('aiguide')}
                >
                    🤖 ผู้ช่วย AI
                </button>
                <button 
                    className={`dash-tab ${activeDashTab === 'devlog' ? 'active' : ''}`}
                    onClick={() => setActiveDashTab('devlog')}
                >
                    💻 Developer Logs
                </button>
            </div>

            {/* Tab Content Container */}
            <div className="dashboard-content-wrapper" style={{ flex: 1, overflowY: 'auto' }}>
                {/* TAB 1: OVERVIEW */}
                {activeDashTab === 'overview' && (
                    <div className="dash-tab-content active" id="dash-overview">
                        <div className="content-card">
                            <h3 style={{ fontWeight: 700 }}>แนวคิดหลัก (Core Concept)</h3>
                            <p><strong>ช่วยเหลือกาญ (ChuayLueaKan)</strong> เป็น Super App สำหรับชาวจังหวัดกาญจนบุรีและนักท่องเที่ยว ใช้ในการแก้ปัญหาเร่งด่วน ขอความช่วยเหลือเหตุฉุกเฉิน บริการช่าง และเป็นเวทีสร้างสรรค์กิจกรรมจิตอาสาเพื่อสังคม</p>
                            <div className="tags-row">
                                <span className="app-tag tag-blue">ท่องเที่ยวปลอดภัย</span>
                                <span className="app-tag tag-green">ช่างใกล้บ้าน</span>
                                <span className="app-tag tag-red">SOS ฉุกเฉิน 24 ชม.</span>
                                <span className="app-tag tag-orange">ข่าวสารภัยพิบัติ</span>
                            </div>
                        </div>

                        <div className="grid-two-cols">
                            <div className="content-card">
                                <h4 style={{ fontWeight: 700 }}>🎨 ระบบสีและดีไซน์ (Design System)</h4>
                                <ul className="styled-list">
                                    <li><span className="color-swatch bg-green"></span> <strong>เขียว (Safety & Vitality)</strong>: สื่อถึงธรรมชาติ ความอุ่นใจ และความปลอดภัย</li>
                                    <li><span className="color-swatch bg-blue"></span> <strong>น้ำเงิน (Trust & Security)</strong>: สื่อถึงความเป็นมืออาชีพ ความน่าเชื่อถือ ความเป็นเอกลักษณ์</li>
                                    <li><span className="color-swatch bg-red"></span> <strong>แดง (SOS / Critical)</strong>: สื่อความเร่งด่วน ดึงดูดความสนใจ สูงสุด</li>
                                </ul>
                            </div>
                            <div className="content-card">
                                <h4 style={{ fontWeight: 700 }}>👥 กลุ่มเป้าหมายหลัก</h4>
                                <ol className="styled-list-numbers">
                                    <li><strong>ชาวกาญจนบุรี</strong>: ใช้หาช่าง แจ้งเรื่องร้องเรียน ดูกิจกรรม</li>
                                    <li><strong>นักท่องเที่ยว</strong>: แจ้งขอความช่วยเหลือในอุทยาน เส้นทางเดินทาง</li>
                                    <li><strong>ช่างและผู้บริการ</strong>: รับงาน หารายได้เสริมในพื้นที่</li>
                                    <li><strong>อาสาและกู้ภัย</strong>: อัปเดตสถานการณ์ฉุกเฉินและช่วยเหลือทันท่วงที</li>
                                </ol>
                            </div>
                        </div>

                        <div className="content-card">
                            <h3 style={{ fontWeight: 700 }}>ฟีเจอร์เด่นที่ทดสอบได้ในต้นแบบ (Interactive Features)</h3>
                            <div className="interactive-guides">
                                <div className="guide-item" onClick={() => { changeScreen('home', 'sos'); triggerFlowStep('user', 2); }} style={{ cursor: 'pointer' }}>
                                    <div className="guide-icon bg-red-light">🚨</div>
                                    <div className="guide-desc">
                                        <h5 style={{ fontWeight: 700 }}>ระบบ SOS อัจฉริยะ</h5>
                                        <p>กดปุ่ม <strong>SOS</strong> สีแดงที่ด้านล่างหน้าจอ เพื่อส่งพิกัด GPS ภาพถ่าย และประเภทเหตุ พร้อมระบบนับถอยหลังตัดสัญญาณโทรออก</p>
                                    </div>
                                </div>
                                <div className="guide-item" onClick={() => changeScreen('map')} style={{ cursor: 'pointer' }}>
                                    <div className="guide-icon bg-blue-light">📍</div>
                                    <div className="guide-desc">
                                        <h5 style={{ fontWeight: 700 }}>ค้นหาบริการใกล้ฉัน</h5>
                                        <p>กดแท็บ <strong>แผนที่</strong> เพื่อทดสอบฟิลเตอร์หาช่างปะยาง กู้ภัย หรือโรงพยาบาล กดดูรายละเอียดและกดเปิดแชตได้ทันที</p>
                                    </div>
                                </div>
                                <div className="guide-item" onClick={() => changeScreen('home', 'ai-assistant')} style={{ cursor: 'pointer' }}>
                                    <div className="guide-icon bg-green-light">🤖</div>
                                    <div className="guide-desc">
                                        <h5 style={{ fontWeight: 700 }}>AI ผู้ช่วยกาญ</h5>
                                        <p>กดปุ่ม <strong>ผู้ช่วย AI</strong> สีเขียวลอยตัวด้านขวา เพื่อจำลองถาม-ตอบการแก้ไขปัญหาด่วนด้วยความชาญฉลาด</p>
                                    </div>
                                </div>
                                <div className="guide-item" onClick={() => changeScreen('profile')} style={{ cursor: 'pointer' }}>
                                    <div className="guide-icon bg-orange-light">👤</div>
                                    <div className="guide-desc">
                                        <h5 style={{ fontWeight: 700 }}>ยืนยันตัวตนช่าง/อาสา</h5>
                                        <p>ไปที่แท็บ <strong>โปรไฟล์</strong> กด "ลงทะเบียนผู้ให้บริการ" เพื่อรับติ๊กถูกยืนยันความน่าเชื่อถือ และรับสิทธิ์สลับเข้ามุมมองผู้ช่วยเหลือได้</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: USER FLOW */}
                {activeDashTab === 'userflow' && (
                    <div className="dash-tab-content active" id="dash-userflow">
                        <div className="content-card">
                            <h3 style={{ fontWeight: 700 }}>การไหลของระบบสำหรับผู้ใช้งานทั่วไป (Help-Seeker Flow)</h3>
                            <p className="section-desc">คลิกที่แต่ละขั้นตอนเพื่อทดสอบการแสดงผลและเปลี่ยนหน้าจอใน Emulator อัตโนมัติ</p>
                            
                            {/* Graphical SVG Flowchart */}
                            <div className="flow-diagram-svg-container" style={{ textAlign: 'center', marginBottom: '1.25rem', background: 'white', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                                <svg width="100%" height="90" viewBox="0 0 540 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: 'inherit' }}>
                                    {/* Step 1 */}
                                    <rect x="5" y="15" width="85" height="40" rx="8" fill="var(--primary-blue-light)" stroke="var(--primary-blue)" strokeWidth="1.5"/>
                                    <text x="47.5" y="33" fill="var(--text-dark)" fontSize="9" fontWeight="700" textAnchor="middle">1. เลือกบริการ</text>
                                    <text x="47.5" y="45" fill="var(--text-medium)" fontSize="7" textAnchor="middle">(หน้าแรก / ค้นหา)</text>
                                    
                                    {/* Arrow 1 */}
                                    <path d="M 95 35 L 110 35" stroke="var(--text-light)" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M 105 32 L 110 35 L 105 38" stroke="var(--text-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    
                                    {/* Step 2 */}
                                    <rect x="115" y="15" width="85" height="40" rx="8" fill="var(--accent-red-light)" stroke="var(--accent-red)" strokeWidth="1.5"/>
                                    <text x="157.5" y="33" fill="var(--text-dark)" fontSize="9" fontWeight="700" textAnchor="middle">2. กด SOS ด่วน</text>
                                    <text x="157.5" y="45" fill="var(--text-medium)" fontSize="7" textAnchor="middle">(นับถอยหลัง 5 วินาที)</text>
                                    
                                    {/* Arrow 2 */}
                                    <path d="M 200 35 L 220 35" stroke="var(--text-light)" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M 215 32 L 220 35 L 215 38" stroke="var(--text-light)" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    
                                    {/* Step 3 */}
                                    <rect x="225" y="15" width="85" height="40" rx="8" fill="var(--primary-blue-light)" stroke="var(--primary-blue)" strokeWidth="1.5"/>
                                    <text x="267.5" y="33" fill="var(--text-dark)" fontSize="9" fontWeight="700" textAnchor="middle">3. กรองแผนที่</text>
                                    <text x="267.5" y="45" fill="var(--text-medium)" fontSize="7" textAnchor="middle">(ค้นหาช่าง/กู้ภัยใกล้ตัว)</text>
                                    
                                    {/* Arrow 3 */}
                                    <path d="M 310 35 L 330 35" stroke="var(--text-light)" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M 325 32 L 330 35 L 325 38" stroke="var(--text-light)" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    
                                    {/* Step 4 */}
                                    <rect x="335" y="15" width="85" height="40" rx="8" fill="var(--primary-blue-light)" stroke="var(--primary-blue)" strokeWidth="1.5"/>
                                    <text x="377.5" y="33" fill="var(--text-dark)" fontSize="9" fontWeight="700" textAnchor="middle">4. แชตตกลงงาน</text>
                                    <text x="377.5" y="45" fill="var(--text-medium)" fontSize="7" textAnchor="middle">(คุยรายละเอียด/ราคา)</text>
                                    
                                    {/* Arrow 4 */}
                                    <path d="M 420 35 L 440 35" stroke="var(--text-light)" stroke-width="1.5" strokeLinecap="round"/>
                                    <path d="M 435 32 L 440 35 L 435 38" stroke="var(--text-light)" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    
                                    {/* Step 5 */}
                                    <rect x="445" y="15" width="85" height="40" rx="8" fill="var(--primary-green-light)" stroke="var(--primary-green)" stroke-width="1.5"/>
                                    <text x="487.5" y="33" fill="var(--text-dark)" fontSize="9" fontWeight="700" textAnchor="middle">5. จบงาน & รีวิว</text>
                                    <text x="487.5" y="45" fill="var(--text-medium)" fontSize="7" textAnchor="middle">(ประเมินความปลอดภัย)</text>
                                </svg>
                            </div>

                            <div className="flow-steps-container">
                                {[
                                    { id: 1, title: 'เปิดแอป ค้นหาบริการหรือเลือกเมนูหลัก', desc: 'หน้าหลักออกแบบให้มองเห็นเมนูเร่งด่วนใน 3 คลิก ค้นหาด้วยคีย์เวิร์ด หรือเลิกดู 8 หมวดหมู่', action: 'หน้าหลัก (Home)' },
                                    { id: 2, title: 'กด SOS เมื่อเกิดเหตุฉุกเฉินระดับสูง', desc: 'ปุ่มแดงลอยตัวเข้าถึงได้ทุกหน้าจอ มีการคำนวณพิกัด GPS อัตโนมัติ ป้องกันการเผลอกดด้วยระบบถอยหลัง 5 วินาที', action: 'เมนู SOS' },
                                    { id: 3, title: 'กรองหาช่างหรือกู้ภัยใกล้เคียงบนแผนที่', desc: 'แสดงพิกัดแบบเรียลไทม์จำลองสถานที่จริงในกาญจนบุรี (เช่น ท่ามะกา, ไทรโยค, ตัวเมือง) พร้อมฟิลเตอร์ประเภทผู้ให้บริการ', action: 'แผนที่ (Map)' },
                                    { id: 4, title: 'แชตพูดคุยและส่งรายละเอียดให้ผู้ให้บริการ', desc: 'เปิดห้องสนทนา ส่งรูปภาพ แชร์โลเคชั่น อธิบายอาการเบื้องต้น (เช่น พ่วงแบตเตอรี่รถยนต์, ล้างแอร์)', action: 'ห้องแชต (Chat)' },
                                    { id: 5, title: 'รีวิวและให้คะแนนการช่วยเหลือ', desc: 'เมื่อบริการหรือการช่วยเหลือเสร็จสิ้น ผู้ใช้ประเมินความพึงพอใจและเขียนรีวิวเพื่อการันตีประวัติของช่าง/อาสา', action: 'รายละเอียดช่าง/รีวิว' }
                                ].map(step => (
                                    <div key={step.id} className="flow-step" onClick={() => handleFlowStepClick('user', step.id)} style={{ cursor: 'pointer' }}>
                                        <div className="step-num">{step.id}</div>
                                        <div className="step-details">
                                            <h5 style={{ fontWeight: 700 }}>{step.title}</h5>
                                            <p>{step.desc}</p>
                                            <span className="badge-action">เปลี่ยนหน้า: {step.action}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: PROVIDER FLOW */}
                {activeDashTab === 'providerflow' && (
                    <div className="dash-tab-content active" id="dash-providerflow">
                        <div className="content-card">
                            <h3 style={{ fontWeight: 700 }}>การไหลของระบบสำหรับช่าง/อาสากู้ภัย (Helper / Provider Flow)</h3>
                            <p className="section-desc">จำลองพฤติกรรมฝั่งผู้ให้บริการเพื่อรับมือกับคำร้องขอช่วยเหลือจากประชาชน</p>
                            
                            {/* Graphical SVG Flowchart */}
                            <div className="flow-diagram-svg-container" style={{ textAlign: 'center', marginBottom: '1.25rem', background: 'white', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                                <svg width="100%" height="90" viewBox="0 0 540 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: 'inherit' }}>
                                    {/* Step 1 */}
                                    <rect x="5" y="15" width="85" height="40" rx="8" fill="var(--primary-blue-light)" stroke="var(--primary-blue)" strokeWidth="1.5"/>
                                    <text x="47.5" y="33" fill="var(--text-dark)" fontSize="9" fontWeight="700" textAnchor="middle">1. ยืนยันตัวตน</text>
                                    <text x="47.5" y="45" fill="var(--text-medium)" fontSize="7" textAnchor="middle">(ส่งบัตร / อนุมัติสิทธิ์)</text>
                                    
                                    {/* Arrow 1 */}
                                    <path d="M 95 35 L 110 35" stroke="var(--text-light)" stroke-width="1.5" strokeLinecap="round"/>
                                    <path d="M 105 32 L 110 35 L 105 38" stroke="var(--text-light)" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    
                                    {/* Step 2 */}
                                    <rect x="115" y="15" width="85" height="40" rx="8" fill="var(--primary-green-light)" stroke="var(--primary-green)" strokeWidth="1.5"/>
                                    <text x="157.5" y="33" fill="var(--text-dark)" fontSize="9" fontWeight="700" textAnchor="middle">2. เปิดรับงาน</text>
                                    <text x="157.5" y="45" fill="var(--text-medium)" fontSize="7" textAnchor="middle">(สถานะ ONLINE)</text>
                                    
                                    {/* Arrow 2 */}
                                    <path d="M 200 35 L 220 35" stroke="var(--text-light)" stroke-width="1.5" strokeLinecap="round"/>
                                    <path d="M 215 32 L 220 35 L 215 38" stroke="var(--text-light)" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    
                                    {/* Step 3 */}
                                    <rect x="225" y="15" width="85" height="40" rx="8" fill="var(--primary-green-light)" stroke="var(--primary-green)" stroke-width="1.5"/>
                                    <text x="267.5" y="33" fill="var(--text-dark)" fontSize="9" fontWeight="700" textAnchor="middle">3. แจ้งเตือนงานเข้า</text>
                                    <text x="267.5" y="45" fill="var(--text-medium)" fontSize="7" textAnchor="middle">(แสดงรายละเอียด/จุดรับ)</text>
                                    
                                    {/* Arrow 3 */}
                                    <path d="M 310 35 L 330 35" stroke="var(--text-light)" stroke-width="1.5" strokeLinecap="round"/>
                                    <path d="M 325 32 L 330 35 L 325 38" stroke="var(--text-light)" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    
                                    {/* Step 4 */}
                                    <rect x="335" y="15" width="85" height="40" rx="8" fill="var(--primary-blue-light)" stroke="var(--primary-blue)" stroke-width="1.5"/>
                                    <text x="377.5" y="33" fill="var(--text-dark)" fontSize="9" fontWeight="700" textAnchor="middle">4. นำทางปฏิบัติงาน</text>
                                    <text x="377.5" y="45" fill="var(--text-medium)" fontSize="7" textAnchor="middle">(GPS ค้นหาผู้รับภัย)</text>
                                    
                                    {/* Arrow 4 */}
                                    <path d="M 420 35 L 440 35" stroke="var(--text-light)" stroke-width="1.5" strokeLinecap="round"/>
                                    <path d="M 435 32 L 440 35 L 435 38" stroke="var(--text-light)" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    
                                    {/* Step 5 */}
                                    <rect x="445" y="15" width="85" height="40" rx="8" fill="var(--primary-green-light)" stroke="var(--primary-green)" stroke-width="1.5"/>
                                    <text x="487.5" y="33" fill="var(--text-dark)" fontSize="9" fontWeight="700" textAnchor="middle">5. จบงานสำเร็จ</text>
                                    <text x="487.5" y="45" fill="var(--text-medium)" fontSize="7" textAnchor="middle">(รับเงิน / คะแนนสะสม)</text>
                                </svg>
                            </div>
                            
                            <div className="flow-steps-container">
                                {[
                                    { id: 1, title: 'กรอกข้อมูลยืนยันตัวตนผ่านแอป', desc: 'แนบเอกสารบัตรประชาชน ใบขับขี่ หรือทะเบียนการค้า เพื่อรับเข็มกลัดรับรองความปลอดภัย (Verified Badge)', action: 'ฟอร์มสมัครช่าง (Profile)' },
                                    { id: 2, title: 'เปิดรับงาน (สลับโหมดผู้ให้บริการ)', desc: 'หน้าตาแอปจะเปลี่ยนเป็นมุมมองสำหรับผู้ให้บริการทันทีเมื่อกดปุ่มสลับ สามารถเปิดสถานะออนไลน์/ออฟไลน์ได้', action: 'หน้าหลักผู้ให้บริการ' },
                                    { id: 3, title: 'รับการแจ้งเตือนงานด่วนเมื่อผู้ใช้แจ้งเข้ามา', desc: 'ระบบแจ้งเตือนแบบพุชตามพื้นที่งานใกล้เคียง แสดงระยะทาง ค่าบริการ และปัญหาเบื้องต้น', action: 'แจ้งเตือนรับงาน' },
                                    { id: 4, title: 'นำทางผ่านแผนที่ไปยังพิกัดเป้าหมาย', desc: 'ระบบคำนวณเส้นทางจากร้านค้า/ตำแหน่งของช่างไปยังจุดเกิดเหตุ พร้อมระบบโทรและแชตสอบถามรายละเอียดเพิ่มเติม', action: 'แผนที่นำทางผู้ให้บริการ' },
                                    { id: 5, title: 'จบงานและรับชำระเงิน/สะสมคะแนนความดี', desc: 'เมื่อยืนยันการทำภารกิจสำเร็จ ช่างจะได้รับค่าตอบแทน ส่วนอาสากู้ภัยจะได้รับคะแนนสะสมชั่วโมงความดีเพื่อใช้แลกสิทธิพิเศษ', action: 'ประวัติและคะแนน' }
                                ].map(step => (
                                    <div key={step.id} className="flow-step" onClick={() => handleFlowStepClick('provider', step.id)} style={{ cursor: 'pointer' }}>
                                        <div className="step-num">{step.id}</div>
                                        <div className="step-details">
                                            <h5 style={{ fontWeight: 700 }}>{step.title}</h5>
                                            <p>{step.desc}</p>
                                            <span className="badge-action">เปลี่ยนหน้า: {step.action}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 4: AI GUIDE */}
                {activeDashTab === 'aiguide' && (
                    <div className="dash-tab-content active" id="dash-aiguide">
                        <div className="content-card">
                            <h3 style={{ fontWeight: 700 }}>ผู้ช่วยอัจฉริยะ "ผู้ช่วยกาญ" (AI Assistant Integration)</h3>
                            <p>ระบบ AI ที่ขับเคลื่อนด้วยการประมวลผลข้อความ ช่วยให้ผู้ใช้งานเข้าถึงข้อมูลและการแจ้งภัยได้อย่างฉับไว ด้วยการแนะแนวทางที่ถูกต้องรวมถึงการส่งต่อไปยังปุ่มฟังก์ชันภายในแอปโดยตรง</p>
                            
                            <div className="ai-prompts-spec">
                                <h4>ทดลองกดคลิกเพื่อส่งคำถามตัวอย่างให้กับ AI ในเครื่องจำลอง:</h4>
                                
                                <div className="prompt-chip" onClick={() => handleAIChipClick('รถเสียแถวไทรโยค ทำยังไง')} style={{ cursor: 'pointer' }}>
                                    <strong>🚗 รถเสียแถวไทรโยค ทำยังไง?</strong>
                                    <span>วิเคราะห์พิกัดและแนะนำบริการช่างลากรถ/ปะยางที่เปิด 24 ชม. ในพื้นที่ไทรโยค</span>
                                </div>
                                
                                <div className="prompt-chip" onClick={() => handleAIChipClick('ต้องการเลือดกรุ๊ป O ด่วน')} style={{ cursor: 'pointer' }}>
                                    <strong>🩸 ต้องการเลือดกรุ๊ป O</strong>
                                    <span>สร้างโพสต์บริจาคในชุมชนและแจ้งเบอร์ธนาคารเลือด รพ.พหลพลพยุหเสนา</span>
                                </div>
                                
                                <div className="prompt-chip" onClick={() => handleAIChipClick('หาปะยางใกล้ฉัน')} style={{ cursor: 'pointer' }}>
                                    <strong>🔧 หาปะยางใกล้ฉัน</strong>
                                    <span>ทำการสลับหน้าไปยังแผนที่พร้อมเปิดฟิลเตอร์ช่างปะยางโดยอัตโนมัติ</span>
                                </div>
                                
                                <div className="prompt-chip" onClick={() => handleAIChipClick('โรงพยาบาลสัตว์เปิดตอนนี้ไหม')} style={{ cursor: 'pointer' }}>
                                    <strong>🐶 โรงพยาบาลสัตว์เปิดตอนนี้ไหม?</strong>
                                    <span>ลิสต์รายชื่อคลินิกรักษาสัตว์ในเมืองกาญจนบุรีที่เปิดให้บริการตลอด 24 ชั่วโมง</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 5: DEV LOG */}
                {activeDashTab === 'devlog' && (
                    <div className="dash-tab-content active" id="dash-devlog">
                        <div className="content-card">
                            <div className="devlog-header">
                                <h3 style={{ fontWeight: 700 }}>กิจกรรมระบบแบบเรียลไทม์ (Live Developer Log)</h3>
                                <button className="clear-log-btn" id="btn-clear-log" onClick={handleClearLogs} style={{ cursor: 'pointer' }}>ล้าง Log</button>
                            </div>
                            <p className="section-desc">บันทึกข้อมูลการทำงานเบื้องหลัง สถานะ API, พิกัด GPS และการเปลี่ยนแปลงค่า State เมื่อท่านโต้ตอบกับแอปพลิเคชัน</p>
                            
                            <div className="log-console" id="log-console-body" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                                <div className="log-line system">[SYSTEM] เริ่มต้นจำลองระบบ "ช่วยเหลือกาญ" (React PWA) สำเร็จ...</div>
                                <div className="log-line system">[SYSTEM] GPS พิกัดจำลองตั้งค่าเริ่มต้น: 📍 อ.เมืองกาญจนบุรี (14.0227, 99.5327)</div>
                                {logs.map((log, idx) => (
                                    <div key={idx} className={`log-line ${log.type}`}>
                                        [{log.timestamp}] {log.message}
                                    </div>
                                ))}
                                <div ref={logConsoleEndRef} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ControlDashboard;
