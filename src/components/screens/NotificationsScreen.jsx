import React, { useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';

const NotificationsScreen = () => {
    const {
        notifications,
        setNotifications
    } = useAppState();

    // Mark all notifications as read when entering this screen
    useEffect(() => {
        setNotifications(prev => 
            prev.map(noti => noti.unread ? { ...noti, unread: false } : noti)
        );
    }, [setNotifications]);

    return (
        <div className="notifications-section">
            <div className="noti-list">
                {notifications.map((noti, idx) => (
                    <div key={idx} className={`noti-item ${noti.unread ? 'unread' : ''}`}>
                        <div className={`noti-icon-box ${noti.theme}`}>{noti.icon}</div>
                        <div className="noti-info">
                            <div className="noti-title">{noti.title}</div>
                            <div className="noti-body">{noti.body}</div>
                            <div className="noti-time">{noti.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsScreen;
