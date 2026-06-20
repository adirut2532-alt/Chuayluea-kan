import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';

const CommunityScreen = () => {
    const {
        role,
        communityFeed,
        submitPost,
        earnPoints,
        likePost, // Will add to AppStateContext in next step
        setActiveChatPartner,
        changeScreen,
        logActivity
    } = useAppState();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [postText, setPostText] = useState('');
    const [postTag, setPostTag] = useState('แจ้งเตือนภัย');

    const handleOpenDialog = () => {
        logActivity('info', 'เปิดกล่องเขียนโพสต์ชุมชนใหม่');
        setPostText('');
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSubmitPost = (e) => {
        e.preventDefault();
        if (postText.trim()) {
            submitPost(postText, postTag);
            setIsDialogOpen(false);
        }
    };

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <div className="community-header">
                <h3 style={{ fontWeight: 700 }}>บอร์ดพูดคุย & ประชาสัมพันธ์</h3>
                <button className="btn-new-post" onClick={handleOpenDialog}>✍️ ตั้งโพสต์</button>
            </div>

            <div className="community-feed">
                {communityFeed.map(post => (
                    <div key={post.id} className="post-card">
                        <div className="post-header">
                            <div className="post-avatar">{post.avatar}</div>
                            <div className="post-author-meta">
                                <div className="post-author">{post.author}</div>
                                <div className="post-time">{post.time}</div>
                            </div>
                            <span className={`post-tag ${post.tagStyle}`}>{post.tag}</span>
                        </div>
                        <div className="post-content" style={{ whiteSpace: 'pre-wrap' }}>{post.content}</div>
                        
                        {/* Volunteer Activity Earning Actions */}
                        {role === 'seeker' && (
                            <>
                                {post.tag === 'บริจาคเลือด' && !post.actionTaken && (
                                    <button 
                                        className="btn-reg-submit" 
                                        style={{ background: 'var(--accent-red)', marginTop: '0.25rem', marginBottom: '0.75rem', fontSize: '0.7rem', padding: '6px 12px', width: '100%', borderRadius: '8px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }} 
                                        onClick={() => earnPoints('blood_donation', post.id)}
                                    >
                                        🩸 ยืนยันร่วมบริจาคเลือด (+50 คะแนนจิตอาสา)
                                    </button>
                                )}
                                {post.tag === 'บริจาคของ' && !post.actionTaken && (
                                    <button 
                                        className="btn-reg-submit" 
                                        style={{ background: 'var(--warning-orange)', marginTop: '0.25rem', marginBottom: '0.75rem', fontSize: '0.7rem', padding: '6px 12px', width: '100%', borderRadius: '8px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }} 
                                        onClick={() => earnPoints('item_donation', post.id)}
                                    >
                                        🎁 ยืนยันร่วมบริจาคสิ่งของ (+15 คะแนนจิตอาสา)
                                    </button>
                                )}
                                {post.tag === 'จิตอาสา' && !post.actionTaken && (
                                    <button 
                                        className="btn-reg-submit" 
                                        style={{ background: 'var(--primary-green)', marginTop: '0.25rem', marginBottom: '0.75rem', fontSize: '0.7rem', padding: '6px 12px', width: '100%', borderRadius: '8px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }} 
                                        onClick={() => earnPoints('public_activity', post.id)}
                                    >
                                        🌱 ยืนยันเข้าร่วมกิจกรรมจิตอาสา (+10 คะแนนจิตอาสา)
                                    </button>
                                )}
                                {post.actionTaken && (
                                    <div style={{ background: 'var(--primary-green-light)', color: 'var(--primary-green)', border: '1px solid var(--primary-green)', textAlign: 'center', fontSize: '0.65rem', padding: '6px', borderRadius: '8px', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                                        ✓ คุณได้รับคะแนนจากกิจกรรมนี้เรียบร้อยแล้ว
                                    </div>
                                )}
                            </>
                        )}
                        
                        {/* Actions Row */}
                        <div className="post-actions-row">
                            <button 
                                className={`post-action-btn ${post.liked ? 'liked' : ''}`} 
                                onClick={() => likePost ? likePost(post.id) : null}
                            >
                                ❤️ <span>{post.likes}</span> ถูกใจ
                            </button>
                            <button 
                                className="post-action-btn" 
                                onClick={() => {
                                    setActiveChatPartner(post.author);
                                    changeScreen('home', 'chat');
                                }}
                            >
                                💬 <span>{post.comments ? post.comments.length : 0}</span> แชตประสานงาน
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* New Post Overlay Sheet */}
            {isDialogOpen && (
                <div className="post-dialog-overlay active" onClick={(e) => e.target === e.currentTarget && handleCloseDialog()}>
                    <div className="post-dialog-card">
                        <div className="post-dialog-header">
                            <h4 style={{ fontWeight: 700 }}>สร้างโพสต์ประกาศข่าวสาร</h4>
                            <button className="post-dialog-close" onClick={handleCloseDialog}>✕</button>
                        </div>
                        <form onSubmit={handleSubmitPost} className="post-form">
                            <textarea 
                                className="post-textarea" 
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                                placeholder="พิมพ์สิ่งที่คุณต้องการขอความช่วยเหลือหรือแจ้งภัย..."
                                required
                            />
                            
                            <label className="reg-form-label">เลือกหัวข้อหลัก:</label>
                            <select 
                                className="post-select-tag" 
                                value={postTag}
                                onChange={(e) => setPostTag(e.target.value)}
                            >
                                <option value="แจ้งเตือนภัย">🚨 แจ้งเตือนภัย</option>
                                <option value="บริจาคเลือด">🩸 บริจาคเลือดด่วน (+50 แต้ม)</option>
                                <option value="บริจาคของ">🎁 บริจาคของ/สิ่งของ (+15 แต้ม)</option>
                                <option value="จิตอาสา">🌱 กิจกรรมจิตอาสา (+10 แต้ม)</option>
                                <option value="ทั่วไป">💬 คุยสาระทั่วไปในชุมชน</option>
                            </select>
                            
                            <button type="submit" className="btn-submit-post">เผยแพร่ประกาศ</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommunityScreen;
