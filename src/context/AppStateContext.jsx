import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AppStateContext = createContext();

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
    // -------------------------------------------------------------
    // Core State Variables
    // -------------------------------------------------------------
    const [designMode, setDesignMode] = useState('hi-fi'); // 'hi-fi' or 'wireframe'
    const [role, setRole] = useState('seeker'); // 'seeker' or 'provider'
    const [activeTab, setActiveTab] = useState('home'); // 'home', 'map', 'community', 'notifications', 'profile'
    const [activeOverlay, setActiveOverlay] = useState(null); // 'subservices', 'sos', 'ai-assistant', 'chat', 'active-job', 'job-done'
    const [volunteerPoints, setVolunteerPoints] = useState(120);
    const [emergencyContact, setEmergencyContact] = useState('081-234-5678');
    
    // Login System
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginMode, setLoginMode] = useState('choose'); // 'choose', 'otp'
    const [loginPhone, setLoginPhone] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    // Navigation & Routing Sub-states
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
    const [activeMapFilter, setActiveMapFilter] = useState('all');
    const [selectedPin, setSelectedPin] = useState(null);
    const [activeChatPartner, setActiveChatPartner] = useState(null);

    // Map pins data
    const mapPins = [
        {
            id: "pin-1",
            lat: 60,
            lng: 55,
            type: "mechanic",
            name: "ช่างวิทย์ ปะยาง (Verified)",
            service: "บริการปะยาง พ่วงแบต รถยก 24 ชม.",
            rating: 4.8,
            reviews: 128,
            desc: "ร้านตั้งอยู่ติดถนนใหญ่เยื้องวัดถ้ำเสือ อ.ท่าม่วง บริการด่วนทุกที่ในรัศมี 15 กม. มีเข็มกลัดการันตีความปลอดภัยและราคามาตรฐาน",
            avatar: "👨‍🔧"
        },
        {
            id: "pin-2",
            lat: 40,
            lng: 30,
            type: "rescue",
            name: "ศูนย์กู้ภัยพิทักษ์กาญจน์ (ไทรโยค)",
            service: "ทีมกู้ชีพกู้ภัย บรรเทาสาธารณภัย",
            rating: 4.9,
            reviews: 340,
            desc: "พร้อมสแตนด์บายรับเหตุช่วยเหลือ 24 ชั่วโมง ทั้งอุบัติเหตุทางถนน ปฐมพยาบาลเบื้องต้น และจับสัตว์มีพิษในบ้านเรือน",
            avatar: "🚒"
        },
        {
            id: "pin-3",
            lat: 50,
            lng: 48,
            type: "mechanic",
            name: "ช่างเดชา ซ่อมไฟรถยนต์",
            service: "แก้ไขระบบไฟ ไดสตาร์ต แอร์รถยนต์",
            rating: 4.7,
            reviews: 84,
            desc: "ช่างซ่อมระบบไฟฟ้านอกสถานที่ ตัวเมืองกาญจนบุรีและแก่งเสี้ยน รับซ่อมด่วนในราคากันเอง",
            avatar: "🛠️"
        },
        {
            id: "pin-4",
            lat: 30,
            lng: 65,
            type: "water-rescue",
            name: "อาสากู้ภัยทางน้ำ ศรีนครินทร์",
            service: "ช่วยเหลือทางน้ำ ค้นหา และกู้ภัยเขื่อน",
            rating: 4.9,
            reviews: 95,
            desc: "ทีมอาสากู้ภัยพิเศษ เชี่ยวชาญการกู้ภัยทางน้ำประจำเขื่อนศรีนครินทร์และช่องสะเดา ประสบการณ์มากกว่า 10 ปี",
            avatar: "⛵"
        },
        {
            id: "pin-5",
            lat: 48,
            lng: 52,
            type: "hospital",
            name: "รพ.พหลพลพยุหเสนา",
            service: "โรงพยาบาลศูนย์ประจำจังหวัด",
            rating: 4.5,
            reviews: 1420,
            desc: "โรงพยาบาลขนาดใหญ่ บริการรักษาโรคทั่วไปและแผนกฉุกเฉินระดับตติยภูมิ เปิด 24 ชั่วโมง เบอร์ประสานงานศูนย์สั่งการ: 034-511-252",
            avatar: "🏥"
        },
        {
            id: "pin-6",
            lat: 53,
            lng: 50,
            type: "caregiver",
            name: "ศูนย์ดูแลผู้สูงอายุเมืองกาญจน์ (วรรณา Care)",
            service: "รับดูแลผู้สูงอายุ ผู้ป่วยติดเตียง รายวัน/รายเดือน",
            rating: 4.9,
            reviews: 112,
            desc: "ให้บริการคนดูแลและพยาบาลเฝ้าไข้ถึงบ้านเรือน ผ่านการฝึกอบรมระดับวิชาชีพ มีระบบประวัติพนักงานที่โปร่งใส ตรวจประวัติอาชญากรรมเรียบร้อยแล้ว",
            avatar: "👵"
        }
    ];

    // Categories grid
    const categories = [
        {
            title: "🚨 ฉุกเฉิน",
            subtitle: "SOS, กู้ภัย, รถพยาบาล",
            badge: "SOS",
            theme: "bg-red-light",
            subservices: [
                { name: "SOS ขอความช่วยเหลือ", icon: "🚨", action: "sos" },
                { name: "แจ้งขอช่วยอุทกภัย (น้ำท่วม)", icon: "🌊", action: "sos-flood" },
                { name: "แจ้งจับงูพิษ / สัตว์ร้าย", icon: "🐍", action: "sos-snake" },
                { name: "รถพยาบาลฉุกเฉิน (1669)", icon: "🚑", action: "call", number: "1669" },
                { name: "มูลนิธิกู้ภัยในพื้นที่", icon: "🚒", action: "map", filter: "rescue" },
                { name: "สถานีตำรวจภูธร (191)", icon: "👮", action: "call", number: "191" },
                { name: "สถานีดับเพลิงกาญจนบุรี", icon: "🔥", action: "call", number: "199" },
                { name: "โรงพยาบาลพหลพลพยุหเสนา", icon: "🏥", action: "call", number: "034511252" }
            ]
        },
        {
            title: "🚗 รถเสีย & เดินทาง",
            subtitle: "ปะยาง, พ่วงแบต, ช่างรถ",
            badge: "ด่วน",
            theme: "bg-blue-light",
            subservices: [
                { name: "บริการปะยางด่วน 24 ชม.", icon: "🔧", action: "map", filter: "mechanic" },
                { name: "รถยก / รถสไลด์", icon: "🚛", action: "map", filter: "mechanic" },
                { name: "พ่วงแบตเตอรี่ฉุกเฉิน", icon: "🔋", action: "map", filter: "mechanic" },
                { name: "น้ำมันหมดกลางทาง", icon: "⛽", action: "chat", provider: "ช่างวิทย์ ปะยาง (Verified)" },
                { name: "ช่างซ่อมเครื่องยนต์นอกสถานที่", icon: "🚗", action: "map", filter: "mechanic" },
                { name: "ช่างกุญแจสะเดาะกลอน", icon: "🔑", action: "chat", provider: "ช่างเดชา ระบบไฟและเครื่องยนต์" }
            ]
        },
        {
            title: "🔧 หาคนช่วยงาน",
            subtitle: "ช่างไฟ, ล้างแอร์, ตัดหญ้า",
            badge: "งานช่าง",
            theme: "bg-green-light",
            subservices: [
                { name: "ช่างไฟเดินสายไฟฟ้า", icon: "⚡", action: "chat", provider: "ช่างเดชา ระบบไฟและเครื่องยนต์" },
                { name: "ช่างประปาแก้ท่อตัน", icon: "🚰", action: "chat", provider: "ช่างเดชา ระบบไฟและเครื่องยนต์" },
                { name: "ล้างแอร์ติดผนัง", icon: "❄️", action: "chat", provider: "ช่างเดชา ระบบไฟและเครื่องยนต์" },
                { name: "ตัดหญ้า / จัดสวน", icon: "🌿", action: "chat", provider: "ช่างเดชา ระบบไฟและเครื่องยนต์" },
                { name: "บริการขนย้ายของ", icon: "📦", action: "chat", provider: "ช่างเดชา ระบบไฟและเครื่องยนต์" },
                { name: "งานด่วนรายชั่วโมง", icon: "🕒", action: "chat", provider: "ช่างเดชา ระบบไฟและเครื่องยนต์" }
            ]
        },
        {
            title: "❤️ ชุมชนช่วยกัน",
            subtitle: "ห้องปรับทุกข์, ขอคำปรึกษา",
            badge: "สังคม",
            theme: "bg-purple-light",
            subservices: [
                { name: "ห้องปรับทุกข์ คลายเครียด", icon: "💬", action: "community" },
                { name: "ขอคำปรึกษาปัญหากฎหมาย", icon: "⚖️", action: "community" },
                { name: "ขอความช่วยเหลือสิ่งของ", icon: "🤝", action: "community" },
                { name: "แจ้งเตือนผู้สูงอายุพลัดหลง", icon: "👴", action: "community" },
                { name: "แจ้งคนหาย/บุคคลสูญหาย", icon: "🔍", action: "community" }
            ]
        },
        {
            title: "🩸 บริจาค & ทำดี",
            subtitle: "บริจาคเลือด, จิตอาสา",
            badge: "บุญ",
            theme: "bg-orange-light",
            subservices: [
                { name: "ขอรับบริจาคเลือดด่วน", icon: "🩸", action: "community" },
                { name: "บริจาคสิ่งของเครื่องใช้", icon: "🎁", action: "community" },
                { name: "ฝากทำบุญวัดในกาญจนบุรี", icon: "🙏", action: "community" },
                { name: "กิจกรรมจิตอาสากาญจน์", icon: "🌱", action: "community" },
                { name: "ระดมทุนช่วยเหลือผู้ประสบภัย", icon: "💰", action: "community" }
            ]
        },
        {
            title: "🐶 สัตว์เลี้ยง",
            subtitle: "สัตว์หาย, โรงพยาบาลสัตว์",
            badge: "น้องหมาน้องแมว",
            theme: "bg-pink-light",
            subservices: [
                { name: "แจ้งสัตว์เลี้ยงสูญหาย", icon: "🐕", action: "community" },
                { name: "แจ้งพบสัตว์พลัดหลง", icon: "🐈", action: "community" },
                { name: "โรงพยาบาลสัตว์ 24 ชม.", icon: "🏥", action: "map", filter: "hospital" },
                { name: "รับเลี้ยงหมาแมวจรจัด", icon: "🏡", action: "community" }
            ]
        },
        {
            title: "🏞️ ท่องเที่ยวปลอดภัย",
            subtitle: "จุดช่วยเหลือ, กู้ภัยทางน้ำ",
            badge: "ท่องเที่ยว",
            theme: "bg-teal-light",
            subservices: [
                { name: "SOS นักท่องเที่ยวต่างชาติ", icon: "🌍", action: "sos" },
                { name: "กู้ภัยทางน้ำ (เขื่อนศรีนครินทร์)", icon: "⛵", action: "map", filter: "water-rescue" },
                { name: "แจ้งเหตุในอุทยานแห่งชาติ", icon: "🏞️", action: "call", number: "1362" },
                { name: "จุดช่วยเหลือใกล้ตัวคุณ", icon: "📍", action: "map" }
            ]
        },
        {
            title: "👵 ดูแลผู้ป่วย/ผู้สูงวัย",
            subtitle: "หาผู้ดูแล, รับจ้างเฝ้าไข้",
            badge: "จับคู่ด่วน",
            theme: "bg-teal-light",
            subservices: [
                { name: "ค้นหาผู้ดูแลและพยาบาลเฝ้าไข้บนแผนที่", icon: "📍", action: "map", filter: "caregiver" },
                { name: "ติดต่อศูนย์พยาบาลเฝ้าไข้วรรณา", icon: "💬", action: "chat", provider: "ศูนย์ดูแลผู้สูงอายุเมืองกาญจน์ (วรรณา Care)" },
                { name: "ประกาศรับจ้าง/หาคนดูแลในบอร์ด", icon: "📝", action: "community" },
                { name: "ปรึกษาผู้ช่วย AI การดูแลผู้สูงวัย", icon: "🤖", action: "ai-assistant" }
            ]
        },
        {
            title: "📢 ข่าวสารชุมชน",
            subtitle: "แจ้งไฟดับ, น้ำไม่ไหล",
            badge: "ข่าว",
            theme: "bg-indigo-light",
            subservices: [
                { name: "แจ้งพิกัดไฟดับ", icon: "🔌", action: "notifications" },
                { name: "แจ้งพิกัดน้ำไม่ไหล", icon: "💧", action: "notifications" },
                { name: "แจ้งอุบัติเหตุบนท้องถนน", icon: "💥", action: "notifications" },
                { name: "แจ้งถนนปิดปรับปรุง", icon: "🚧", action: "notifications" },
                { name: "ประกาศข่าวสารจังหวัด", icon: "📰", action: "notifications" }
            ]
        }
    ];

    // Chats messages database
    const [chats, setChats] = useState({
        "ช่างวิทย์ ปะยาง (Verified)": [
            { sender: "recipient", text: "สวัสดีครับ ช่างวิทย์ ปะยาง ยินดีให้บริการครับ เกิดปัญหาตรงจุดไหน ส่งโลเคชันกับอาการมาได้เลยครับ" },
            { sender: "sender", text: "สวัสดีค่ะ รถยางแบนแถวถนนริมน้ำเมืองกาญจนบุรีค่ะ รบกวนช่างทีค่ะ" }
        ],
        "ช่างเดชา ระบบไฟและเครื่องยนต์": [
            { sender: "recipient", text: "สวัสดีครับ ช่างเดชาครับ ซ่อมไฟฟ้ารถยนต์ ไฟบ้าน หรือล้างแอร์ ปรึกษาได้เลยครับ" }
        ],
        "ศูนย์กู้ภัยพิทักษ์กาญจน์ (ไทรโยค)": [
            { sender: "recipient", text: "รับทราบเหตุครับ กำลังเตรียมพร้อมเคลื่อนย้ายทีมไปสนับสนุนครับ" }
        ]
    });

    // AI Assistant history
    const [aiChatHistory, setAiChatHistory] = useState([
        { sender: "bot", text: "สวัสดีครับพี่น้องชาวกาญจนบุรีและนักท่องเที่ยวทุกคน ผมคือ 🤖 'ผู้ช่วยกาญ' AI อัจฉริยะประจําแอป มีอะไรให้ผมรับใช้หรือต้องการคำแนะนำด่วนไหมครับ?" }
    ]);

    // SOS States
    const [sosStatus, setSosStatus] = useState('idle'); // 'idle', 'counting', 'dispatched'
    const [sosCountdown, setSosCountdown] = useState(5);
    const [sosIncidentType, setSosIncidentType] = useState('medical');
    const [sosPhotoSelected, setSosPhotoSelected] = useState(false);
    const sosTimer = useRef(null);

    // Provider (Helper) state variables
    const [providerStatus, setProviderStatus] = useState('offline'); // 'offline' or 'online'
    const [providerStats, setProviderStats] = useState({
        completed: 12,
        rating: "4.9",
        earnings: "3,250 ฿"
    });
    const [providerJobs, setProviderJobs] = useState([
        {
            id: "job-1",
            type: "accident",
            typeText: "🚨 อุบัติเหตุฉุกเฉิน",
            distance: "1.2 กม. (อ.เมือง)",
            detail: "รถจักรยานยนต์ล้มคว่ำ มีผู้บาดเจ็บถลอกตามตัว ต้องการการปฐมพยาบาลด่วน",
            location: "พิกัด: 📍 ถนนสิงคโปร์ ต.บ้านเหนือ (ทางไปสะพานข้ามแม่น้ำแคว)",
            victimName: "คุณ นนท์ นักท่องเที่ยว",
            lat: 48,
            lng: 52
        },
        {
            id: "job-2",
            type: "mechanic",
            typeText: "🔧 ช่างรถเสีย",
            distance: "3.5 กม. (ท่าม่วง)",
            detail: "รถเก๋งสตาร์ตไม่ติด ไฟหน้าปัดวูบ น่าจะแบตเตอรี่เสื่อม ต้องการพ่วงแบต",
            location: "พิกัด: 📍 ลานจอดรถวัดถ้ำเสือ ต.ม่วงชุม อ.ท่าม่วง",
            victimName: "คุณ วิภาดา ชาวบ้าน",
            lat: 60,
            lng: 55
        },
        {
            id: "job-3",
            type: "caregiver",
            typeText: "👵 จ้างดูแลผู้สูงอายุ/ผู้ป่วย",
            distance: "2.1 กม. (อ.เมือง)",
            detail: "ต้องการคนเฝ้าไข้ดูแลผู้สูงอายุติดเตียง ช่วยทำกายภาพและจัดยาตามรอบเวลา 4 ชั่วโมง",
            location: "พิกัด: 📍 บ้านเลขที่ 45 ซอยริเวอร์ไซด์ ต.แก่งเสี้ยน อ.เมือง",
            victimName: "คุณ ยายสมจิตร์ (ญาติจ้างงาน)",
            lat: 53,
            lng: 50
        }
    ]);
    const [activeJob, setActiveJob] = useState(null);

    // Community Feed Mock database
    const [communityFeed, setCommunityFeed] = useState([
        {
            id: 1,
            author: "ลุงบุญช่วย (ท่าม่วง)",
            avatar: "👴",
            time: "15 นาทีที่แล้ว",
            tag: "แจ้งน้ำไม่ไหล",
            tagStyle: "tag-urgent",
            content: "แจ้งเรื่องน้ำไม่ไหลมาตั้งแต่เช้าตรู่ครับ บริเวณซอย 4 ท่าม่วง ใครอยู่แถวนี้เป็นเหมือนกันไหมครับ หรือมีใครรู้ข่าวซ่อมท่อบ้าง?",
            likes: 12,
            liked: false,
            comments: [
                { author: "ช่างวิทย์ ปะยาง", text: "น่าจะซ่อมท่อหลักริมถนนกาญจนบุรี-อู่ทองครับ เห็นเจ้าหน้าที่กำลังทำอยู่" }
            ]
        },
        {
            id: 2,
            author: "น้องฝน นักเดินทาง",
            avatar: "👩",
            time: "1 ชั่วโมงที่แล้ว",
            tag: "สัตว์เลี้ยงหาย",
            tagStyle: "tag-urgent",
            content: "ช่วยแชร์ด้วยค่ะ! สุนัขชิวาวาเพศเมีย ชื่อ 'คุ้กกี้' สีน้ำตาลอ่อน หายไปใกล้ๆ สะพานข้ามแม่น้ำแคว ตอนนี้กังวลมาก ใครพบเห็นโปรดโทรติดต่อหรือแชตมาบอกทีค่ะ มีสินน้ำใจให้ค่ะ 🐶❤️",
            likes: 45,
            liked: false,
            comments: []
        },
        {
            id: 3,
            author: "กู้ภัยพิทักษ์กาญจน์",
            avatar: "🚒",
            time: "2 ชั่วโมงที่แล้ว",
            tag: "บริจาคเลือด",
            tagStyle: "tag-urgent",
            content: "ด่วนที่สุด! โรงพยาบาลพหลพลพยุหเสนา ขาดแคลนเลือดกรุ๊ป O และ A เนื่องจากอุบัติเหตุหมู่เมื่อคืนนี้ ขอเรียนเชิญผู้มีจิตศรัทธาบริจาคเลือดได้ที่ธนาคารเลือดของโรงพยาบาลได้เลยครับ ขอบคุณครับ",
            likes: 89,
            liked: true,
            comments: []
        },
        {
            id: 4,
            author: "สมาคมจิตอาสารักษ์กาญจน์",
            avatar: "🌱",
            time: "3 ชั่วโมงที่แล้ว",
            tag: "จิตอาสา",
            tagStyle: "tag-general",
            content: "ขออาสาสมัครร่วมทำความสะอาดและฟื้นฟูพื้นที่ท่องเที่ยวบริเวณวัดถ้ำเสือหลังสถานการณ์น้ำลด วันเสาร์นี้ เริ่ม 09:00 น. มีข้าวกล่องและน้ำดื่มเลี้ยงครับ มาร่วมกันฟื้นฟูเมืองกาญจน์กันนะครับ 🌱",
            likes: 34,
            liked: false,
            comments: []
        },
        {
            id: 5,
            author: "มูลนิธิกู้ชีพกิตติคุณ",
            avatar: "🎁",
            time: "5 ชั่วโมงที่แล้ว",
            tag: "บริจาคของ",
            tagStyle: "tag-general",
            content: "เปิดรับบริจาคผ้าห่ม เสื้อกันหนาว และยารักษาโรค เพื่อนำไปจัดส่งให้ผู้ประสบภัยน้ำท่วมน้ำป่าไหลหลากในพื้นที่ อ.ทองผาภูมิ และ อ.สังขละบุรี ครับ ร่วมบริจาคได้ที่มูลนิธิ 🎁",
            likes: 56,
            liked: false,
            comments: []
        }
    ]);

    // Live regional Notifications
    const [notifications, setNotifications] = useState([
        {
            icon: "🚨",
            title: "เตือนภัยระดับน้ำล้นตลิ่ง",
            body: "แจ้งเตือนเฝ้าระวังระดับน้ำบริเวณแพริมน้ำหน้าเมืองกาญจนบุรี เนื่องจากมีการปล่อยน้ำเพิ่มขึ้นจากเขื่อนวชิราลงกรณ์",
            time: "10 นาทีที่แล้ว",
            unread: true,
            theme: "bg-red-light"
        },
        {
            icon: "⚡",
            title: "แจ้งกระแสไฟฟ้าขัดข้อง",
            body: "การไฟฟ้าส่วนภูมิภาคจะงดจ่ายกระแสไฟฟ้าเพื่อบำรุงรักษาระบบสายส่ง บริเวณ อ.ท่าม่วง วันนี้ เวลา 09:00 - 15:00 น.",
            time: "1 ชั่วโมงที่แล้ว",
            unread: true,
            theme: "bg-orange-light"
        },
        {
            icon: "🩸",
            title: "ด่วน! ขอรับบริจาคเลือดกรุ๊ป O",
            body: "ต้องการเลือดกรุ๊ป O ด่วนที่สุด ณ รพ.พหลพลพยุหเสนา เพื่อช่วยเหลือผู้บาดเจ็บทางถนน",
            time: "2 ชั่วโมงที่แล้ว",
            unread: false,
            theme: "bg-blue-light"
        }
    ]);

    // Logs output console entries
    const [logs, setLogs] = useState([]);

    // -------------------------------------------------------------
    // App Actions & Methods
    // -------------------------------------------------------------

    const logActivity = (type, message) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, { timestamp, type, message }]);
    };

    const changeScreen = (tabName, overlayName = null) => {
        setActiveTab(tabName);
        setActiveOverlay(overlayName);
        logActivity('info', `สลับหน้าจอ -> แท็บ: ${tabName}${overlayName ? `, เลเยอร์ซ้อน: ${overlayName}` : ''}`);
    };

    const goBack = () => {
        if (activeOverlay) {
            logActivity('info', `กดย้อนกลับจาก เลเยอร์ซ้อน: ${activeOverlay}`);
            setActiveOverlay(null);
        } else if (activeTab !== 'home') {
            logActivity('info', `กดย้อนกลับจาก แท็บ: ${activeTab} -> กลับหน้าหลัก`);
            setActiveTab('home');
        }
    };

    const togglePersona = (roleName) => {
        setRole(roleName);
        setActiveOverlay(null);
        setActiveTab('home');
        logActivity('state', `เปลี่ยนบทบาทผู้ใช้จำลองเป็น: ${roleName.toUpperCase()}`);
    };

    const toggleDesignMode = () => {
        const nextMode = designMode === 'hi-fi' ? 'wireframe' : 'hi-fi';
        setDesignMode(nextMode);
        logActivity('state', `สลับโหมดการแสดงผลจำลองเป็น: ${nextMode.toUpperCase()}`);
    };

    // Simulated Authentication
    const sendOTP = (phone) => {
        if (!phone || phone.trim().length < 9) {
            alert("กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง (อย่างน้อย 9-10 หลัก)");
            return;
        }
        setLoginPhone(phone);
        setLoginMode('otp');
        logActivity('event', `ขอรหัส OTP สำหรับหมายเลขโทรศัพท์: ${phone}`);
    };

    const verifyOTP = (otp) => {
        if (!otp || otp.trim().length < 4) {
            alert("กรุณากรอกรหัสผ่าน OTP ที่ส่งไปยังโทรศัพท์ของคุณ");
            return;
        }
        setIsLoggedIn(true);
        setLoggedInUser({
            name: `เบอร์โทร ${loginPhone}`,
            avatar: '📱',
            type: 'phone'
        });
        logActivity('event', `ยืนยัน OTP สำเร็จ ล็อกอินด้วยเบอร์โทร: ${loginPhone}`);
        changeScreen('home');
    };

    const loginWithFacebook = () => {
        logActivity('event', `เริ่มการเชื่อมต่อระบบบัญชี Facebook...`);
        setIsLoggedIn(true);
        setLoggedInUser({
            name: 'คุณ สมเกียรติ รักกาญจน์',
            avatar: '🔵',
            type: 'facebook'
        });
        logActivity('event', `ล็อกอินสำเร็จด้วยบัญชี Facebook: สมเกียรติ รักกาญจน์`);
        changeScreen('home');
    };

    const loginAsGuest = () => {
        setIsLoggedIn(true);
        setLoggedInUser({
            name: 'ผู้มาเยือน (Guest)',
            avatar: '👤',
            type: 'guest'
        });
        logActivity('event', `เข้าสู่ระบบในฐานะผู้มาเยือนชั่วคราว (Guest Mode)`);
        changeScreen('home');
    };

    const logout = () => {
        setIsLoggedIn(false);
        setLoginMode('choose');
        setLoginPhone('');
        setLoggedInUser(null);
        logActivity('event', `ผู้ใช้ออกจากระบบ (Logged out)`);
        setActiveTab('home');
        setActiveOverlay(null);
    };

    // AI Assistant simulation
    const askAI = (promptText) => {
        if (!promptText.trim()) return;

        if (activeOverlay !== 'ai-assistant') {
            changeScreen('home', 'ai-assistant');
        }

        logActivity('event', `ผู้ใช้ส่งคำถามถึง AI: "${promptText}"`);
        setAiChatHistory(prev => [...prev, { sender: 'user', text: promptText }]);

        setTimeout(() => {
            let replyText = "ขออภัยครับ ผมยังไม่มีข้อมูลสําหรับเรื่องนี้ คุณต้องการให้ผมต่อสายโทรติดต่อประสานงานท้องถิ่นให้แทนไหมครับ?";
            const promptNorm = promptText.toLowerCase();

            if (promptNorm.includes('รถเสีย') && promptNorm.includes('ไทรโยค')) {
                replyText = "🔧 ได้รับข้อมูลฉุกเฉินครับ! สัญญาณรถเสียบริเวณ อ.ไทรโยค แนะนำบริการ:\n1. 'ศูนย์กู้ภัยพิทักษ์กาญจน์ ไทรโยค' โทร 034-XX-XXX \n2. 'ช่างเดชา ระบบไฟและเครื่องยนต์' ห่างออกไป 8 กม.\n\nคุณสามารถกดปุ่ม 'ค้นหาแผนที่' หรือ 'ติดต่อช่างวิทย์' ได้ในแท็บแผนที่เลยครับ";
            } else if (promptNorm.includes('กรุ๊ป o') || promptNorm.includes('เลือด')) {
                replyText = "🩸 *ประกาศเร่งด่วน*: ทางโรงพยาบาลพหลพลพยุหเสนา อ.เมืองกาญจนบุรี ต้องการเลือดกรุ๊ป O ด่วนที่สุดสำหรับผู้ป่วยผ่าตัดใหญ่\n\n👉 *คำแนะนำ*: เดินทางไปธนาคารเลือด รพ.พหลฯ ชั้น 2 หรือแชตประสานงานขอกู้ภัยกิตติคุณนำส่งได้ครับ คุณสามารถกดสร้างโพสต์ระดมพลในแท็บ 'ชุมชนช่วยกัน' เพื่อกระจายข่าวสารได้ครับ";
            } else if (promptNorm.includes('ปะยาง') || promptNorm.includes('ใกล้ฉัน')) {
                replyText = "📍 ชาญฉลาด! กำลังประมวลผลตำแหน่ง GPS ของคุณ... ตรวจพบร้านช่างวิทย์ปะยางอยู่ห่างออกไป 1.2 กม. ผมจะพาคุณย้ายหน้าจอไปยังแผนที่ช่วยเหลือทันทีพร้อมกรองเฉพาะตำแหน่งช่างรถเสียครับ...";
                
                setTimeout(() => {
                    setActiveMapFilter("mechanic");
                    changeScreen('map');
                    logActivity('api', `AI สั่ง Deep-link: ค้นหา 'ช่างซ่อม' ในพื้นที่รอบตัวผู้ใช้`);
                }, 2000);
            } else if (promptNorm.includes('สัตว์') || promptNorm.includes('หมา') || promptNorm.includes('แมว')) {
                replyText = "🐶 โรงพยาบาลสัตว์ในตัวเมืองกาญจนบุรีที่เปิดให้บริการตลอด 24 ชั่วโมง ได้แก่ 'รพ.สัตว์เมืองกาญจน์' (ตั้งอยู่ใกล้สี่แยกแก่งเสี้ยน) โทร 034-51X-XXX หรือหากสัตว์สูญหาย สามารถเข้าไปเพิ่มข่าวแจ้งเตือนในแท็บ 'ชุมชน' ได้เช่นกันครับ";
            }

            setAiChatHistory(prev => [...prev, { sender: 'bot', text: replyText }]);
            logActivity('api', `AI ประมวลผลคำตอบสําเร็จ`);
        }, 1200);
    };

    // Chat with Providers
    const sendDirectMessage = (text) => {
        if (!text.trim() || !activeChatPartner) return;

        setChats(prev => {
            const history = prev[activeChatPartner] || [];
            return {
                ...prev,
                [activeChatPartner]: [...history, { sender: 'sender', text }]
            };
        });
        logActivity('event', `ส่งข้อความถึง "${activeChatPartner}": "${text}"`);

        setTimeout(() => {
            const replies = [
                "รับทราบรายละเอียดครับ พิกัดตรงนี้ผมรู้จักดี กำลังจัดของขึ้นรถออกเดินทางครับ",
                "ตกลงตามนี้ครับ คาดว่าจะถึงไม่เกิน 15 นาทีตาม GPS นำทาง",
                "มีรูปถ่ายเพิ่มเติมไหมครับ จะได้เตรียมเครื่องมือ/อะไหล่ไปให้ถูกต้องครบถ้วน"
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];

            setChats(prev => {
                const history = prev[activeChatPartner] || [];
                return {
                    ...prev,
                    [activeChatPartner]: [...history, { sender: 'recipient', text: randomReply }]
                };
            });
            logActivity('api', `ผู้ติดต่อตอบกลับข้อความแชตอัตโนมัติ`);
        }, 1500);
    };

    // SOS Emergency Timer Simulation
    const triggerSOSCountdown = () => {
        if (sosTimer.current) clearInterval(sosTimer.current);

        setSosStatus('counting');
        setSosCountdown(5);
        logActivity('event', `เริ่มนับถอยหลัง SOS... กำลังระบุพิกัดดาวเทียม`);

        sosTimer.current = setInterval(() => {
            setSosCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(sosTimer.current);
                    setSosStatus('dispatched');
                    
                    let logMsg = `🚨 SOS ทำงาน! ส่งพิกัด GPS (14.0227, 99.5327) ไปยังกองกู้ภัยจังหวัดกาญจนบุรี`;
                    let notiBody = "เจ้าหน้าที่กู้ภัยรับทราบพิกัดและกำลังเดินทางเข้ามาช่วยเหลือคุณอย่างเร่งด่วน";
                    let jobDetail = "ผู้ใช้ส่งสัญญาณ SOS ขอความช่วยเหลือกรณีฉุกเฉิน กรุณารุดเข้าตรวจสอบพิกัดด่วนที่สุด!";
                    let jobTypeText = "🚨 วิกฤต! SOS ขอช่วยเหลือด่วน";
                    let jobType = "accident";

                    if (sosIncidentType === 'flood') {
                        logMsg = `🌊 SOS อุทกภัยทำงาน! ส่งพิกัดพื้นที่น้ำท่วม ไปยังหน่วยเฉพาะกิจบรรเทาสาธารณภัยทางน้ำเพื่อส่งเรือเข้าช่วยเหลือ`;
                        notiBody = "หน่วยเฉพาะกิจบรรเทาสาธารณภัยส่งทีมอพยพพร้อมเรือท้องแบนไปยังพิกัดของคุณแล้ว";
                        jobDetail = "ผู้ใช้ติดอยู่ในพื้นที่อุทกภัยน้ำท่วมสูง ต้องการความช่วยเหลือและการอพยพเร่งด่วนด้วยเรือ!";
                        jobTypeText = "🌊 วิกฤต! SOS อุทกภัยน้ำท่วม";
                        jobType = "rescue";
                    } else if (sosIncidentType === 'snake') {
                        logMsg = `🐍 SOS อสรพิษทำงาน! ประสานงานผู้เชี่ยวชาญการจับงูพิษรุดไปยังพิกัดของท่านเพื่อจับสัตว์มีพิษร้ายแรง`;
                        notiBody = "ผู้เชี่ยวชาญทีมเผชิญเหตุอสรพิษวิทยากำลังเดินทางไปยังพิกัดของคุณพร้อมอุปกรณ์จับสัตว์ร้าย";
                        jobDetail = "ผู้ใช้แจ้งพบงูพิษ/สัตว์มีพิษร้ายแรงในบ้านเรือน ต้องการผู้เชี่ยวชาญพร้อมอุปกรณ์จับสัตว์ร้ายด่วน!";
                        jobTypeText = "🐍 วิกฤต! SOS แจ้งจับงูพิษ";
                        jobType = "rescue";
                    } else if (sosIncidentType === 'water') {
                        logMsg = `⛵ SOS กู้ภัยทางน้ำทำงาน! ส่งพิกัดไปยังทีมกู้ชีพทางน้ำ มูลนิธิกู้ภัยในพื้นที่`;
                        notiBody = "ทีมกู้ชีพทางน้ำพร้อมเรือและอุปกรณ์ชูชีพกำลังรุดไปยังพิกัดของคุณ";
                        jobDetail = "ผู้ใช้ต้องการการช่วยเหลือทางน้ำ/เกิดอุบัติเหตุทางน้ำในแม่น้ำแคว กรุณาส่งเจ็ทสกีหรือเรือยางช่วยชีวิต!";
                        jobTypeText = "⛵ วิกฤต! SOS กู้ภัยทางน้ำ";
                        jobType = "rescue";
                    }

                    logActivity('event', logMsg);
                    
                    setNotifications(prevNoti => [
                        {
                            icon: sosIncidentType === 'flood' ? "🌊" : sosIncidentType === 'snake' ? "🐍" : "🚨",
                            title: sosIncidentType === 'flood' ? "แจ้งขอช่วยอุทกภัยสำเร็จ" : sosIncidentType === 'snake' ? "แจ้งจับงูพิษสำเร็จ" : "ส่งเหตุฉุกเฉิน SOS สำเร็จ",
                            body: notiBody,
                            time: "เมื่อสักครู่",
                            unread: true,
                            theme: "bg-red-light"
                        },
                        ...prevNoti
                    ]);

                    setProviderJobs(prevJobs => [
                        {
                            id: "job-sos",
                            type: jobType,
                            typeText: jobTypeText,
                            distance: "0.8 กม. (ใกล้คุณ)",
                            detail: jobDetail,
                            location: "พิกัด: 📍 14.0227° N, 99.5327° E (ใกล้สะพานข้ามแม่น้ำแคว)",
                            victimName: "คุณ ผู้ใช้งานแอป (SOS)",
                            lat: 48,
                            lng: 52
                        },
                        ...prevJobs
                    ]);
                    return 0;
                }
                logActivity('event', `SOS นับถอยหลัง: ${prev - 1} วินาที...`);
                return prev - 1;
            });
        }, 1000);
    };

    const cancelSOS = () => {
        if (sosTimer.current) {
            clearInterval(sosTimer.current);
            sosTimer.current = null;
        }
        setSosStatus('idle');
        setSosCountdown(5);
        logActivity('info', `ยกเลิกสัญญาณ SOS สำเร็จ หลีกเลี่ยงสัญญาณหลอก`);
        changeScreen('home');
    };

    // Community post submit
    const submitPost = (text, tag) => {
        if (!text.trim()) return;

        const newPost = {
            id: communityFeed.length + 1,
            author: loggedInUser ? loggedInUser.name : "คุณ (ผู้ใช้งานทั่วไป)",
            avatar: loggedInUser ? loggedInUser.avatar : "👤",
            time: "เมื่อสักครู่",
            tag: tag || "ทั่วไป",
            tagStyle: tag === "ต้องการเลือด" || tag === "ของหาย" ? "tag-urgent" : "tag-general",
            content: text,
            likes: 0,
            liked: false,
            comments: []
        };

        setCommunityFeed(prev => [newPost, ...prev]);
        logActivity('event', `โพสต์เรื่องใหม่ในชุมชนสำเร็จ: "${text.substring(0, 30)}..."`);
        changeScreen('community');
    };

    const earnPoints = (activityType, postId) => {
        const postIndex = communityFeed.findIndex(p => p.id === postId);
        if (postIndex !== -1 && communityFeed[postIndex].actionTaken) {
            alert("คุณเข้าร่วมกิจกรรมนี้และรับคะแนนเรียบร้อยแล้ว!");
            return;
        }

        let pts = 0;
        let activityName = "";
        switch(activityType) {
            case 'blood_donation':
                pts = 50;
                activityName = "บริจาคเลือดด่วน";
                break;
            case 'car_help':
                pts = 20;
                activityName = "ช่วยรถเสีย";
                break;
            case 'item_donation':
                pts = 15;
                activityName = "บริจาคสิ่งของ";
                break;
            case 'public_activity':
                pts = 10;
                activityName = "ร่วมกิจกรรมสาธารณะ";
                break;
            default:
                break;
        }

        setVolunteerPoints(prev => {
            const nextPoints = prev + pts;
            logActivity('event', `ได้รับคะแนนจิตอาสา +${pts} คะแนน จากกิจกรรม: "${activityName}" (ยอดสะสมปัจจุบัน: ${nextPoints} คะแนน)`);
            return nextPoints;
        });
        
        setCommunityFeed(prev => {
            const copy = [...prev];
            if (copy[postIndex]) {
                copy[postIndex].actionTaken = true;
            }
            return copy;
        });
        
        alert(`🎉 ยินดีด้วย! คุณได้รับคะแนนจิตอาสา +${pts} คะแนน จากการ "${activityName}"`);
    };

    // Provider online status
    const toggleProviderOnlineStatus = () => {
        setProviderStatus(prev => {
            const nextStatus = prev === 'online' ? 'offline' : 'online';
            logActivity('state', `สลับสถานะช่างผู้ให้บริการ -> ${nextStatus.toUpperCase()}`);
            return nextStatus;
        });
    };

    const declineJob = (jobId) => {
        setProviderJobs(prev => prev.filter(j => j.id !== jobId));
        logActivity('info', `ช่างปฏิเสธใบงาน: ${jobId}`);
    };

    const acceptJob = (jobId) => {
        const job = providerJobs.find(j => j.id === jobId);
        if (!job) return;

        setActiveJob(job);
        logActivity('event', `ช่างกดรับภารกิจช่วยเหลือ: "${job.victimName}" ปัญหา: "${job.detail}"`);
        setProviderJobs(prev => prev.filter(j => j.id !== jobId));
        changeScreen('home', 'active-job');
    };

    const finishJob = () => {
        if (!activeJob) return;

        logActivity('event', `ช่างเคลียร์งานและเสร็จสิ้นภารกิจช่วยเหลือแล้ว!`);
        
        // Add 20 points for resolving a car help or accident
        setVolunteerPoints(prev => {
            const next = prev + 20;
            logActivity('event', `ได้รับคะแนนจิตอาสากลุ่มผู้ให้บริการ +20 คะแนน จากการช่วยเหลือรถเสีย/ฉุกเฉิน (ยอดสะสมปัจจุบัน: ${next} คะแนน)`);
            return next;
        });

        setProviderStats(prev => ({
            ...prev,
            completed: prev.completed + 1,
            earnings: `${parseInt(prev.earnings.replace(/[^0-9]/g, '')) + 350} ฿`
        }));

        changeScreen('home', 'job-done');
    };

    const submitProviderRegistration = () => {
        logActivity('event', `ส่งแบบฟอร์มตรวจสอบสิทธิ์การเป็นผู้ให้บริการ... กำลังอนุมัติเอกสารเบื้องหลัง`);
        alert("ส่งข้อมูลการลงทะเบียนผู้ให้บริการสำเร็จ! ระบบจะทำการอนุมัติสิทธิ์ (Verified Seeker) อัตโนมัติในทันที เพื่อสนับสนุนการทดสอบ");
        togglePersona('provider');
        changeScreen('profile');
    };

    // Sync Dashboard steps with Emulator State
    const triggerFlowStep = (persona, stepIndex) => {
        logActivity('info', `ทดสอบขั้นตอน #${stepIndex} ของบทบาท ${persona.toUpperCase()}`);
        if (persona === 'user') {
            if (role !== 'seeker') setRole('seeker');
            switch(stepIndex) {
                case 1:
                    changeScreen('home');
                    break;
                case 2:
                    changeScreen('home', 'sos');
                    break;
                case 3:
                    setActiveMapFilter('all');
                    changeScreen('map');
                    break;
                case 4:
                    setActiveChatPartner("ช่างวิทย์ ปะยาง (Verified)");
                    changeScreen('map', 'chat');
                    break;
                case 5:
                    setActiveMapFilter('all');
                    changeScreen('map');
                    setSelectedPin(mapPins[0]);
                    break;
                default:
                    break;
            }
        } else {
            if (role !== 'provider') setRole('provider');
            switch(stepIndex) {
                case 1:
                    changeScreen('profile');
                    break;
                case 2:
                    changeScreen('home');
                    setProviderStatus('online');
                    break;
                case 3:
                    changeScreen('notifications');
                    break;
                case 4:
                    setActiveJob(providerJobs[0]);
                    changeScreen('home', 'active-job');
                    break;
                case 5:
                    changeScreen('home', 'job-done');
                    break;
                default:
                    break;
            }
        }
    };

    const likePost = (postId) => {
        setCommunityFeed(prev => {
            return prev.map(post => {
                if (post.id === postId) {
                    const liked = !post.liked;
                    const likes = liked ? post.likes + 1 : post.likes - 1;
                    logActivity('event', `กด${liked ? '' : 'ยกเลิก'}ไลก์โพสต์ของ "${post.author}"`);
                    return { ...post, liked, likes };
                }
                return post;
            });
        });
    };

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (sosTimer.current) clearInterval(sosTimer.current);
        };
    }, []);

    return (
        <AppStateContext.Provider value={{
            designMode, toggleDesignMode,
            role, togglePersona,
            activeTab, setActiveTab,
            activeOverlay, setActiveOverlay,
            volunteerPoints, setVolunteerPoints,
            emergencyContact, setEmergencyContact,
            isLoggedIn,
            loginMode, setLoginMode,
            loginPhone, setLoginPhone,
            loggedInUser, setLoggedInUser,
            selectedCategoryIndex, setSelectedCategoryIndex,
            activeMapFilter, setActiveMapFilter,
            selectedPin, setSelectedPin,
            activeChatPartner, setActiveChatPartner,
            mapPins,
            categories,
            chats,
            aiChatHistory, setAiChatHistory,
            sosStatus, setSosStatus,
            sosCountdown, setSosCountdown,
            sosIncidentType, setSosIncidentType,
            sosPhotoSelected, setSosPhotoSelected,
            providerStatus, setProviderStatus,
            providerStats, setProviderStats,
            providerJobs, setProviderJobs,
            activeJob, setActiveJob,
            communityFeed, setCommunityFeed,
            notifications, setNotifications,
            logs,
            logActivity,
            changeScreen,
            goBack,
            sendOTP,
            verifyOTP,
            loginWithFacebook,
            loginAsGuest,
            logout,
            askAI,
            sendDirectMessage,
            triggerSOSCountdown,
            cancelSOS,
            submitPost,
            likePost,
            earnPoints,
            toggleProviderOnlineStatus,
            declineJob,
            acceptJob,
            finishJob,
            submitProviderRegistration,
            triggerFlowStep
        }}>
            {children}
        </AppStateContext.Provider>
    );
};
