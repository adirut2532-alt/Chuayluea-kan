import React, { useState, useRef, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';

const ChatScreen = () => {
    const {
        chats,
        activeChatPartner,
        sendDirectMessage,
        goBack
    } = useAppState();

    const [input, setInput] = useState('');
    const msgEndRef = useRef(null);

    const chatHistory = chats[activeChatPartner] || [];

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim()) {
            sendDirectMessage(input);
            setInput('');
        }
    };

    // Auto scroll chat to bottom when messages update
    useEffect(() => {
        if (msgEndRef.current) {
            msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);

    return (
        <div className="chat-screen-overlay" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="chat-header" style={{ display: 'flex', alignItems: 'center' }}>
                <button className="chat-back-btn" onClick={goBack} style={{ cursor: 'pointer' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div className="chat-user-avatar">💬</div>
                <div className="chat-user-meta">
                    <h4 style={{ fontWeight: 700 }}>{activeChatPartner}</h4>
                    <p style={{ fontSize: '0.6rem' }}>🟢 กำลังออนไลน์ / แชตเข้ารหัสปลอดภัย</p>
                </div>
            </div>

            <div className="chat-messages-body" id="chat-msg-body" style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`chat-bubble ${msg.sender === 'sender' ? 'sender' : 'recipient'}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={msgEndRef} />
            </div>

            <form onSubmit={handleSend} className="chat-input-bar" style={{ display: 'flex', padding: '10px', gap: '5px' }}>
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="chat-input-field" 
                    placeholder="พิมพ์ข้อความคุยด่วนที่นี่..." 
                    style={{ flex: 1 }}
                />
                <button type="submit" className="btn-chat-send" style={{ cursor: 'pointer' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default ChatScreen;
