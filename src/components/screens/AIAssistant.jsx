import React, { useState, useRef, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';

const AIAssistant = () => {
    const {
        aiChatHistory,
        askAI,
        changeScreen
    } = useAppState();

    const [input, setInput] = useState('');
    const msgEndRef = useRef(null);

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim()) {
            askAI(input);
            setInput('');
        }
    };

    const handlePresetClick = (presetText) => {
        askAI(presetText);
    };

    // Auto scroll chat to bottom when history updates
    useEffect(() => {
        if (msgEndRef.current) {
            msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [aiChatHistory]);

    return (
        <div className="ai-chat-overlay" style={{ height: '100%' }}>
            <div className="ai-chat-header">
                <div className="ai-header-avatar">🤖</div>
                <div className="ai-header-desc">
                    <h4 style={{ fontWeight: 700 }}>ผู้ช่วยกาญ AI</h4>
                    <p style={{ fontSize: '0.6rem' }}>พร้อมตอบทุกคำถามด่วน ท่องเที่ยวภัยพิบัติ และช่างบริการ</p>
                </div>
                <button className="btn-close-ai" onClick={() => changeScreen('home')} style={{ cursor: 'pointer' }}>✕ ปิด</button>
            </div>

            <div className="ai-messages-body" id="ai-chat-body" style={{ overflowY: 'auto', flex: 1, padding: '10px' }}>
                {aiChatHistory.map((msg, idx) => (
                    <div key={idx} className={`chat-bubble ${msg.sender === 'bot' ? 'bot' : 'user'}`}>
                        {msg.text.split('\n').map((line, lineIdx) => (
                            <React.Fragment key={lineIdx}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
                ))}
                <div ref={msgEndRef} />
            </div>

            {/* Presets selection */}
            <div className="ai-presets-box" style={{ padding: '5px 10px' }}>
                <div className="presets-title" style={{ fontSize: '0.65rem', fontWeight: 'bold', marginBottom: '4px' }}>💡 คำถามแนะนำ:</div>
                <div className="presets-scroller" style={{ display: 'flex', gap: '5px', overflowX: 'auto', paddingBottom: '5px' }}>
                    <button className="preset-chip-btn" onClick={() => handlePresetClick('รถเสียแถวไทรโยค ทำยังไง')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>🚗 รถเสียไทรโยค</button>
                    <button className="preset-chip-btn" onClick={() => handlePresetClick('ต้องการเลือดกรุ๊ป O ด่วน')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>🩸 ขอเลือดกรุ๊ป O</button>
                    <button className="preset-chip-btn" onClick={() => handlePresetClick('หาปะยางใกล้ฉัน')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>🔧 หาปะยางใกล้ฉัน</button>
                    <button className="preset-chip-btn" onClick={() => handlePresetClick('โรงพยาบาลสัตว์เปิดตอนนี้ไหม')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>🐶 โรงพยาบาลสัตว์ 24 ชม.</button>
                </div>
            </div>

            {/* Chat inputs */}
            <form onSubmit={handleSend} className="ai-input-bar" style={{ display: 'flex', padding: '10px', gap: '5px' }}>
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="ai-input-field" 
                    placeholder="พิมพ์ถามผู้ช่วย AI ที่นี่..." 
                    style={{ flex: 1 }}
                />
                <button type="submit" className="btn-ai-send" style={{ cursor: 'pointer' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default AIAssistant;
