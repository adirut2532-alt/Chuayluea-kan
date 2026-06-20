// -------------------------------------------------------------
// Application State Management
// -------------------------------------------------------------
const appState = {
    designMode: 'hi-fi', // 'hi-fi' or 'wireframe'
    role: 'seeker',      // 'seeker' (user) or 'provider' (helper)
    activeTab: 'home',   // 'home', 'map', 'community', 'notifications', 'profile'
    activeOverlay: null, // 'subservices', 'sos', 'ai-assistant', 'chat', 'active-job', 'job-done'
    volunteerPoints: 120, // 🏆 คะแนนจิตอาสาเริ่มต้น
    emergencyContact: '081-234-5678', // 📞 เบอร์โทรติดต่อฉุกเฉิน/เบอร์ญาติ
    
    // 🔐 ระบบล็อกอิน
    isLoggedIn: false, 
    loginMode: 'choose', // 'choose', 'otp'
    loginPhone: '',
    loggedInUser: { name: 'คุณ นนทวัชร์ วงศ์สุวรรณ', avatar: '👨', type: 'phone' },
    
    // Subservices parameters
    selectedCategoryIndex: null,

    // Database Mockups
    categories: [
        {
            title: "🚨 ฉุกเฉิน",
            subtitle: "SOS, กู้ภัย, รถพยาบาล",
            badge: "SOS",
            theme: "bg-red-light",
            subservices: [
                { name: "SOS ขอความช่วยเหลือ", icon: "🚨", action: "sos" },
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
                { name: "รับเลี้ยงหมาแมจรจัด", icon: "🏡", action: "community" }
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
    ],

    communityFeed: [
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
    ],

    notifications: [
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
    ],

    mapPins: [
        {
            id: "pin-1",
            lat: 60, // Percent Y on map SVG
            lng: 55, // Percent X on map SVG
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
        }
    ],

    activeMapFilter: "all",
    selectedPin: null,

    // Chat states
    activeChatPartner: null,
    chats: {
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
    },

    // AI states
    aiChatHistory: [
        { sender: "bot", text: "สวัสดีครับพี่น้องชาวกาญจนบุรีและนักท่องเที่ยวทุกคน ผมคือ 🤖 'ผู้ช่วยกาญ' AI อัจฉริยะประจําแอป มีอะไรให้ผมรับใช้หรือต้องการคำแนะนำด่วนไหมครับ?" }
    ],

    // SOS states
    sosTimer: null,
    sosCountdown: 5,
    sosStatus: 'idle', // 'idle', 'counting', 'dispatched'
    sosPhotoSelected: false,
    sosIncidentType: 'medical',

    // Provider state variables
    providerStatus: 'offline', // 'offline' or 'online'
    providerStats: {
        completed: 12,
        rating: "4.9",
        earnings: "3,250 ฿"
    },
    providerJobs: [
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
        }
    ],
    activeJob: null,

    // Real-time Logger function
    logActivity: function(type, message) {
        const consoleBody = document.getElementById("log-console-body");
        if (!consoleBody) return;
        
        const timestamp = new Date().toLocaleTimeString();
        const line = document.createElement("div");
        line.className = `log-line ${type}`;
        line.innerText = `[${timestamp}] ${message}`;
        
        consoleBody.appendChild(line);
        consoleBody.scrollTop = consoleBody.scrollHeight;
    },

    // UI Routing Navigation Helper
    changeScreen: function(tabName, overlayName = null) {
        this.activeTab = tabName;
        this.activeOverlay = overlayName;
        this.logActivity('info', `สลับหน้าจอ -> แท็บ: ${tabName}${overlayName ? `, เลเยอร์ซ้อน: ${overlayName}` : ''}`);
        
        // Remove active from all nav items
        document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
        
        // Set active to tab btn if not overlay
        if (!overlayName && tabName) {
            const tabBtn = document.getElementById(`nav-${tabName}`);
            if (tabBtn) tabBtn.classList.add('active');
        }

        this.renderCurrentScreen();
    },

    // Handle back button clicked
    goBack: function() {
        if (this.activeOverlay) {
            this.logActivity('info', `กดย้อนกลับจาก เลเยอร์ซ้อน: ${this.activeOverlay}`);
            this.activeOverlay = null;
        } else if (this.activeTab !== 'home') {
            this.logActivity('info', `กดย้อนกลับจาก แท็บ: ${this.activeTab} -> กลับหน้าหลัก`);
            this.activeTab = 'home';
        }
        this.renderCurrentScreen();
    },

    // Update screen title dynamically
    updateHeaderBar: function() {
        const header = document.getElementById('app-header-bar');
        const titleText = document.getElementById('app-title-text');
        const backBtn = document.getElementById('btn-app-back');
        const roleBadge = document.getElementById('app-role-badge');
        
        if (!header || !titleText || !backBtn) return;

        // Set role badge
        roleBadge.innerText = this.role.toUpperCase();
        roleBadge.className = `active-badge ${this.role === 'provider' ? 'bg-green-light' : 'bg-blue-light'}`;
        if (this.role === 'provider') {
            roleBadge.style.color = 'var(--primary-green)';
            roleBadge.style.backgroundColor = 'var(--primary-green-light)';
        } else {
            roleBadge.style.color = 'var(--primary-blue)';
            roleBadge.style.backgroundColor = 'var(--primary-blue-light)';
        }

        // Show/hide back button
        if (this.activeTab === 'home' && !this.activeOverlay) {
            backBtn.style.visibility = 'hidden';
        } else {
            backBtn.style.visibility = 'visible';
        }

        // Screen title selection
        let title = "ช่วยเหลือกาญ";
        
        if (this.activeOverlay) {
            switch(this.activeOverlay) {
                case 'subservices':
                    title = this.categories[this.selectedCategoryIndex]?.title || "บริการย่อย";
                    break;
                case 'sos':
                    title = "🚨 สัญญาณฉุกเฉิน SOS";
                    break;
                case 'ai-assistant':
                    title = "🤖 ผู้ช่วยกาญ AI";
                    break;
                case 'chat':
                    title = this.activeChatPartner || "ห้องสนทนา";
                    break;
                case 'active-job':
                    title = "📍 นำทางปฏิบัติงาน";
                    break;
                case 'job-done':
                    title = "🎉 ภารกิจเสร็จสิ้น";
                    break;
            }
        } else {
            switch(this.activeTab) {
                case 'home':
                    title = this.role === 'provider' ? "ศูนย์บริการช่าง/อาสา" : "หน้าแรก";
                    break;
                case 'map':
                    title = "แผนที่ช่วยเหลือ";
                    break;
                case 'community':
                    title = "บอร์ดชุมชนกาญ";
                    break;
                case 'notifications':
                    title = "กล่องแจ้งเตือนภัย";
                    break;
                case 'profile':
                    title = "ข้อมูลส่วนตัว";
                    break;
            }
        }
        titleText.innerText = title;
    },

    // Trigger AI message processing
    askAI: function(promptText) {
        if (!promptText.trim()) return;

        // Launch assistant overlay if not open
        if (this.activeOverlay !== 'ai-assistant') {
            this.changeScreen('home', 'ai-assistant');
        }

        this.logActivity('event', `ผู้ใช้ส่งคำถามถึง AI: "${promptText}"`);
        
        // Add user message
        this.aiChatHistory.push({ sender: 'user', text: promptText });
        this.renderCurrentScreen();

        // Simulate thinking and replying
        setTimeout(() => {
            let replyText = "ขออภัยครับ ผมยังไม่มีข้อมูลสําหรับเรื่องนี้ คุณต้องการให้ผมต่อสายโทรติดต่อประสานงานท้องถิ่นให้แทนไหมครับ?";
            
            const promptNorm = promptText.toLowerCase();
            
            if (promptNorm.includes('รถเสีย') && promptNorm.includes('ไทรโยค')) {
                replyText = "🔧 ได้รับข้อมูลฉุกเฉินครับ! สัญญาณรถเสียบริเวณ อ.ไทรโยค แนะนำบริการ:\n1. 'ศูนย์กู้ภัยพิทักษ์กาญจน์ ไทรโยค' โทร 034-XX-XXX \n2. 'ช่างเดชา ระบบไฟและเครื่องยนต์' ห่างออกไป 8 กม.\n\nคุณสามารถกดปุ่ม 'ค้นหาแผนที่' หรือ 'ติดต่อช่างวิทย์' ได้ในแท็บแผนที่เลยครับ";
            } else if (promptNorm.includes('กรุ๊ป o') || promptNorm.includes('เลือด')) {
                replyText = "🩸 *ประกาศเร่งด่วน*: ทางโรงพยาบาลพหลพลพยุหเสนา อ.เมืองกาญจนบุรี ต้องการเลือดกรุ๊ป O ด่วนที่สุดสำหรับผู้ป่วยผ่าตัดใหญ่\n\n👉 *คำแนะนำ*: เดินทางไปธนาคารเลือด รพ.พหลฯ ชั้น 2 หรือแชตประสานงานขอกู้ภัยกิตติคุณนำส่งได้ครับ คุณสามารถกดสร้างโพสต์ระดมพลในแท็บ 'ชุมชนช่วยกัน' เพื่อกระจายข่าวสารได้ครับ";
            } else if (promptNorm.includes('ปะยาง') || promptNorm.includes('ใกล้ฉัน')) {
                replyText = "📍 ชาญฉลาด! กำลังประมวลผลตำแหน่ง GPS ของคุณ... ตรวจพบร้านช่างวิทย์ปะยางอยู่ห่างออกไป 1.2 กม. ผมจะพาคุณย้ายหน้าจอไปยังแผนที่ช่วยเหลือทันทีพร้อมกรองเฉพาะตำแหน่งช่างรถเสียครับ...";
                
                // Deep link side effect
                setTimeout(() => {
                    this.activeMapFilter = "mechanic";
                    this.changeScreen('map');
                    this.logActivity('api', `AI สั่ง Deep-link: ค้นหา 'ช่างซ่อม' ในพื้นที่รอบตัวผู้ใช้`);
                }, 2000);
            } else if (promptNorm.includes('สัตว์') || promptNorm.includes('หมา') || promptNorm.includes('แมว')) {
                replyText = "🐶 โรงพยาบาลสัตว์ในตัวเมืองกาญจนบุรีที่เปิดให้บริการตลอด 24 ชั่วโมง ได้แก่ 'รพ.สัตว์เมืองกาญจน์' (ตั้งอยู่ใกล้สี่แยกแก่งเสี้ยน) โทร 034-51X-XXX หรือหากสัตว์สูญหาย สามารถเข้าไปเพิ่มข่าวแจ้งเตือนในแท็บ 'ชุมชน' ได้เช่นกันครับ";
            }

            this.aiChatHistory.push({ sender: 'bot', text: replyText });
            this.logActivity('api', `AI ประมวลผลคำตอบสําเร็จ`);
            this.renderCurrentScreen();
        }, 1200);
    },

    // Trigger specific dashboard action
    triggerAction: function(actionName) {
        this.logActivity('info', `คำสั่งแดชบอร์ด -> ดำเนินการ: ${actionName}`);
        
        if (actionName === 'sos-guide') {
            this.changeScreen('home', 'sos');
            // Start countdown simulation
            this.triggerSOSCountdown();
        } else if (actionName === 'map-guide') {
            this.activeMapFilter = 'all';
            this.changeScreen('map');
        } else if (actionName === 'ai-guide') {
            this.changeScreen('home', 'ai-assistant');
        } else if (actionName === 'verification-guide') {
            this.changeScreen('profile');
            setTimeout(() => {
                const formEl = document.querySelector('.provider-registration-box');
                if (formEl) {
                    formEl.scrollIntoView({ behavior: 'smooth' });
                    formEl.style.outline = "2px solid var(--primary-blue)";
                    setTimeout(() => formEl.style.outline = "none", 2000);
                }
            }, 300);
        }
    },

    // Connects Dashboard Walkthrough steps to live Emulator
    triggerFlowStep: function(persona, stepIndex) {
        // Toggle active styling in the dashboard UI list
        document.querySelectorAll('.flow-step').forEach(step => step.classList.remove('active-step'));
        
        if (persona === 'user') {
            const stepEl = document.getElementById(`step-u${stepIndex}`);
            if (stepEl) stepEl.classList.add('active-step');
            
            this.logActivity('info', `ทดสอบขั้นตอนผู้ใช้ Seeker #${stepIndex}`);
            
            // Toggle persona if mismatch
            if (this.role !== 'seeker') {
                this.togglePersona('seeker');
            }

            // Route emulator
            switch(stepIndex) {
                case 1:
                    this.changeScreen('home');
                    break;
                case 2:
                    this.changeScreen('home', 'sos');
                    break;
                case 3:
                    this.activeMapFilter = "all";
                    this.changeScreen('map');
                    break;
                case 4:
                    this.activeChatPartner = "ช่างวิทย์ ปะยาง (Verified)";
                    this.changeScreen('map', 'chat');
                    break;
                case 5:
                    this.activeMapFilter = "all";
                    this.changeScreen('map');
                    setTimeout(() => {
                        this.selectedPin = this.mapPins[0]; // Select mechanic
                        this.renderCurrentScreen();
                    }, 200);
                    break;
            }
        } else {
            const stepEl = document.getElementById(`step-p${stepIndex}`);
            if (stepEl) stepEl.classList.add('active-step');
            
            this.logActivity('info', `ทดสอบขั้นตอนผู้ให้บริการ Provider #${stepIndex}`);

            // Toggle persona if mismatch
            if (this.role !== 'provider') {
                this.togglePersona('provider');
            }

            // Route emulator
            switch(stepIndex) {
                case 1:
                    this.changeScreen('profile');
                    break;
                case 2:
                    this.changeScreen('home');
                    this.providerStatus = 'online';
                    this.logActivity('state', `สลับผู้ใช้ -> สถานะผู้ให้บริการ: ONLINE`);
                    break;
                case 3:
                    this.changeScreen('notifications');
                    break;
                case 4:
                    this.activeJob = this.providerJobs[0];
                    this.changeScreen('home', 'active-job');
                    break;
                case 5:
                    this.changeScreen('home', 'job-done');
                    break;
            }
        }
    },

    // Toggle active Seeker/Provider view
    togglePersona: function(roleName) {
        this.role = roleName;
        this.activeOverlay = null;
        this.activeTab = 'home';
        
        // Update dashboard buttons
        const btnSeeker = document.getElementById('btn-seeker');
        const btnProvider = document.getElementById('btn-provider');
        if (btnSeeker && btnProvider) {
            if (roleName === 'seeker') {
                btnSeeker.classList.add('active');
                btnProvider.classList.remove('active');
            } else {
                btnProvider.classList.add('active');
                btnSeeker.classList.remove('active');
            }
        }

        this.logActivity('state', `เปลี่ยนบทบาทผู้ใช้จำลองเป็น: ${roleName.toUpperCase()}`);
        this.renderCurrentScreen();
    },

    // Start SOS 5 seconds countdown
    triggerSOSCountdown: function() {
        if (this.sosTimer) clearInterval(this.sosTimer);
        
        this.sosStatus = 'counting';
        this.sosCountdown = 5;
        this.logActivity('event', `เริ่มนับถอยหลัง SOS... กำลังระบุพิกัดดาวเทียม`);
        
        this.renderCurrentScreen();

        this.sosTimer = setInterval(() => {
            this.sosCountdown--;
            this.logActivity('event', `SOS นับถอยหลัง: ${this.sosCountdown} วินาที...`);
            
            if (this.sosCountdown <= 0) {
                clearInterval(this.sosTimer);
                this.sosStatus = 'dispatched';
                this.logActivity('event', `🚨 SOS ทำงาน! ส่งแพ็กเกจข้อมูล GPS พิกัดดาวเทียม (14.0227, 99.5327) สำเร็จ ไปยังกองกู้ภัยจังหวัดกาญจนบุรี`);
                this.notifications.unshift({
                    icon: "🚨",
                    title: "ส่งเหตุฉุกเฉิน SOS สำเร็จ",
                    body: "เจ้าหน้ากู้ภัยรับทราบพิกัดและกำลังเดินทางเข้ามาช่วยเหลือคุณอย่างเร่งด่วน",
                    time: "เมื่อสักครู่",
                    unread: true,
                    theme: "bg-red-light"
                });
                
                // Show notification badge dot
                const notiDot = document.getElementById('noti-badge-dot');
                if (notiDot) notiDot.style.display = 'block';

                // Update provider job queue interactively!
                // Add this SOS to provider jobs list if they are in online mode
                this.providerJobs.unshift({
                    id: "job-sos",
                    type: "accident",
                    typeText: "🚨 วิกฤต! SOS ขอช่วยเหลือด่วน",
                    distance: "0.8 กม. (ใกล้คุณ)",
                    detail: "ผู้ใช้ส่งสัญญาณ SOS ขอความช่วยเหลือกรณีฉุกเฉินกรุณารุดเข้าตรวจสอบพิกัดด่วนที่สุด!",
                    location: "พิกัด: 📍 14.0227° N, 99.5327° E (ใกล้สะพานข้ามแม่น้ำแคว)",
                    victimName: "คุณ ผู้ใช้งานแอป (SOS)",
                    lat: 48,
                    lng: 52
                });
            }
            this.renderCurrentScreen();
        }, 1000);
    },

    // Cancel active SOS timer
    cancelSOS: function() {
        if (this.sosTimer) {
            clearInterval(this.sosTimer);
            this.sosTimer = null;
        }
        this.sosStatus = 'idle';
        this.sosCountdown = 5;
        this.logActivity('info', `ยกเลิกสัญญาณ SOS สำเร็จ หลีกเลี่ยงสัญญาณหลอก`);
        this.changeScreen('home');
    },

    // Submit user feedback in community
    submitPost: function(text, tag) {
        if (!text.trim()) return;

        const newPost = {
            id: this.communityFeed.length + 1,
            author: "คุณ (ผู้ใช้งานทั่วไป)",
            avatar: "👤",
            time: "เมื่อสักครู่",
            tag: tag || "ทั่วไป",
            tagStyle: tag === "ต้องการเลือด" || tag === "ของหาย" ? "tag-urgent" : "tag-general",
            content: text,
            likes: 0,
            liked: false,
            comments: []
        };

        this.communityFeed.unshift(newPost);
        this.logActivity('event', `โพสต์เรื่องใหม่ในชุมชนสำเร็จ: "${text.substring(0, 30)}..."`);
        
        // Hide post modal
        const overlay = document.getElementById('post-dialog-overlay');
        if (overlay) overlay.classList.remove('active');

        this.changeScreen('community');
    },

    // 🏆 คะแนนสะสมเครดิตความดี
    earnPoints: function(activityType, postId) {
        const post = this.communityFeed.find(p => p.id === postId);
        if (post && post.actionTaken) {
            alert("คุณเข้าร่วมกิจกรรมนี้และรับคะแนนเรียบร้อยแล้ว!");
            return;
        }

        let pts = 0;
        let name = "";
        switch(activityType) {
            case 'blood_donation':
                pts = 50;
                name = "บริจาคเลือดด่วน";
                break;
            case 'car_help':
                pts = 20;
                name = "ช่วยรถเสีย";
                break;
            case 'item_donation':
                pts = 15;
                name = "บริจาคสิ่งของ";
                break;
            case 'public_activity':
                pts = 10;
                name = "ร่วมกิจกรรมสาธารณะ";
                break;
        }

        this.volunteerPoints += pts;
        this.logActivity('event', `ได้รับคะแนนจิตอาสา +${pts} คะแนน จากกิจกรรม: "${name}" (ยอดสะสมปัจจุบัน: ${this.volunteerPoints} คะแนน)`);
        
        if (post) {
            post.actionTaken = true;
        }
        
        alert(`🎉 ยินดีด้วย! คุณได้รับคะแนนจิตอาสา +${pts} คะแนน จากการ "${name}"`);
        this.renderCurrentScreen();
    },

    // -------------------------------------------------------------
    // TEMPLATE RENDERING FUNCTIONS
    // -------------------------------------------------------------
    
    renderCurrentScreen: function() {
        const bodyContainer = document.getElementById('app-content-body');
        if (!bodyContainer) return;
        
        // Hide/Show navigation components depending on login state
        const navBar = document.getElementById('app-nav-bar');
        const newsTicker = document.getElementById('news-ticker');
        const aiBtn = document.getElementById('btn-ai-assistant');
        const sosBtn = document.getElementById('sos-trigger-container');
        const headerBar = document.getElementById('app-header-bar');
        
        if (!this.isLoggedIn) {
            // Render Login Screen
            bodyContainer.innerHTML = this.templateLogin();
            if (navBar) navBar.style.display = 'none';
            if (newsTicker) newsTicker.style.display = 'none';
            if (aiBtn) aiBtn.style.display = 'none';
            if (sosBtn) sosBtn.style.display = 'none';
            if (headerBar) headerBar.style.display = 'none';
            
            // Allow login screen to utilize full device space
            bodyContainer.style.height = '100%';
            bodyContainer.style.paddingTop = '10px';
            bodyContainer.style.paddingBottom = '10px';
            return;
        }
        
        // Restore elements for logged in state
        if (navBar) navBar.style.display = 'flex';
        if (newsTicker) newsTicker.style.display = 'flex';
        if (aiBtn) aiBtn.style.display = 'flex';
        if (sosBtn) sosBtn.style.display = 'block';
        if (headerBar) headerBar.style.display = 'flex';
        bodyContainer.style.height = '';
        bodyContainer.style.paddingTop = '';
        bodyContainer.style.paddingBottom = '90px'; // Pad space for nav bar
        
        this.updateHeaderBar();

        // Check if there is an active overlay screen first
        if (this.activeOverlay) {
            switch (this.activeOverlay) {
                case 'subservices':
                    bodyContainer.innerHTML = this.templateSubservices();
                    break;
                case 'sos':
                    bodyContainer.innerHTML = this.templateSOS();
                    break;
                case 'ai-assistant':
                    bodyContainer.innerHTML = this.templateAIAssistant();
                    // Auto scroll chat to bottom
                    const chatBox = document.getElementById('ai-chat-body');
                    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
                    break;
                case 'chat':
                    bodyContainer.innerHTML = this.templateChat();
                    // Auto scroll messages to bottom
                    const msgBox = document.getElementById('chat-msg-body');
                    if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
                    break;
                case 'active-job':
                    bodyContainer.innerHTML = this.templateActiveJob();
                    break;
                case 'job-done':
                    bodyContainer.innerHTML = this.templateJobDone();
                    break;
            }
            return;
        }

        // Render main tab views
        if (this.role === 'seeker') {
            switch(this.activeTab) {
                case 'home':
                    bodyContainer.innerHTML = this.templateHomeSeeker();
                    break;
                case 'map':
                    bodyContainer.innerHTML = this.templateMap();
                    break;
                case 'community':
                    bodyContainer.innerHTML = this.templateCommunity();
                    break;
                case 'notifications':
                    bodyContainer.innerHTML = this.templateNotifications();
                    break;
                case 'profile':
                    bodyContainer.innerHTML = this.templateProfileSeeker();
                    break;
            }
        } else {
            // Provider Role Views
            switch(this.activeTab) {
                case 'home':
                    bodyContainer.innerHTML = this.templateHomeProvider();
                    break;
                case 'map':
                    bodyContainer.innerHTML = this.templateMap(); // Map shared for both
                    break;
                case 'community':
                    bodyContainer.innerHTML = this.templateCommunity(); // Feed shared
                    break;
                case 'notifications':
                    bodyContainer.innerHTML = this.templateNotifications(); // Alert list shared
                    break;
                case 'profile':
                    bodyContainer.innerHTML = this.templateProfileProvider();
                    break;
            }
        }
    },

    // -------------------------------------------------------------
    // TEMPLATE STRINGS DEFINITION
    // -------------------------------------------------------------

    // 🔐 LOGIN TEMPLATE
    templateLogin: function() {
        if (this.loginMode === 'otp') {
            return `
                <div style="padding: 2.5rem 1rem 1rem 1rem; display: flex; flex-direction: column; height: 100%; justify-content: space-between; text-align: center;">
                    <div>
                        <div style="margin-top: 1.5rem; font-size: 3rem;">📱</div>
                        <h3 style="font-size: 1.3rem; font-weight: 700; margin-top: 1rem; color: var(--text-dark);">ยืนยันรหัส OTP</h3>
                        <p style="font-size: 0.75rem; color: var(--text-medium); margin-top: 0.5rem; line-height: 1.4;">
                            ระบบได้ส่งรหัส OTP 6 หลักไปที่เบอร์ <br><strong style="color: var(--primary-blue);">${this.loginPhone}</strong> แล้ว
                        </p>
                        
                        <div style="margin-top: 2rem;">
                            <input type="text" id="otp-input-field" class="search-input" placeholder="กรอกรหัส OTP 6 หลัก (จำลอง: 123456)" style="text-align: center; font-size: 1.1rem; letter-spacing: 4px; padding-left: 1rem;" maxlength="6">
                            <p style="font-size: 0.65rem; color: var(--text-light); margin-top: 0.5rem;">ทดสอบการล็อกอิน กรอกรหัสอะไรก็ได้ หรือใช้: <strong>123456</strong></p>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <button class="btn-reg-submit" style="background: var(--primary-blue);" onclick="appState.verifyOTP(document.getElementById('otp-input-field').value)">
                            ยืนยันและเข้าใช้งาน
                        </button>
                        <button class="btn-sos-cancel" style="color: var(--text-medium); border: 1px solid var(--border-color); background: transparent;" onclick="appState.loginMode = 'choose'; appState.renderCurrentScreen();">
                            ย้อนกลับเพื่อเปลี่ยนเบอร์
                        </button>
                    </div>
                </div>
            `;
        }

        // Default: Choose login method
        return `
            <div style="padding: 2rem 1.25rem 1rem 1.25rem; display: flex; flex-direction: column; height: 100%; justify-content: space-between;">
                <!-- Logo & Brand Header -->
                <div style="text-align: center; margin-top: 2rem;">
                    <img src="logo.jpg" alt="ช่วยเหลือกาญ Logo" style="height: 120px; object-fit: contain; border-radius: 18px; border: 2px solid var(--border-color); box-shadow: var(--shadow-lg);">
                    <h2 style="font-size: 1.5rem; font-weight: 800; margin-top: 1rem; color: var(--text-dark); letter-spacing: 0.5px;">ช่วยเหลือกาญ</h2>
                    <p style="font-size: 0.75rem; color: var(--primary-blue); font-weight: 700; margin-top: 0.25rem; word-spacing: 1px;">ช่วยเร็ว • เข้าถึงง่าย • อุ่นใจทุกเวลา</p>
                </div>

                <!-- Input section -->
                <div style="margin-top: 1.5rem;">
                    <div class="reg-form-group">
                        <label class="reg-form-label" style="font-size: 0.75rem;">เบอร์โทรศัพท์สำหรับเข้าใช้งาน:</label>
                        <input type="tel" id="login-phone-field" class="search-input" placeholder="ระบุเบอร์โทรศัพท์ 10 หลัก..." style="padding-left: 1rem; font-size: 0.85rem;" onkeypress="if(event.key === 'Enter') appState.sendOTP(document.getElementById('login-phone-field').value)">
                    </div>
                    
                    <button class="btn-reg-submit" style="background: var(--primary-blue); width: 100%; margin-top: 0.5rem;" onclick="appState.sendOTP(document.getElementById('login-phone-field').value)">
                        เข้าสู่ระบบด้วยเบอร์โทรศัพท์ (OTP)
                    </button>
                </div>

                <!-- Divider -->
                <div style="display: flex; align-items: center; text-align: center; margin: 1rem 0; font-size: 0.7rem; color: var(--text-light);">
                    <div style="flex: 1; border-bottom: 1px solid var(--border-color);"></div>
                    <span style="padding: 0 10px; font-weight: 600;">หรือเข้าสู่ระบบผ่านช่องทางอื่น</span>
                    <div style="flex: 1; border-bottom: 1px solid var(--border-color);"></div>
                </div>

                <!-- Social & Guest Actions -->
                <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 1rem;">
                    <!-- Facebook Login Button -->
                    <button onclick="appState.loginWithFacebook()" style="background: #1877F2; color: white; border: none; padding: 0.75rem; border-radius: 12px; font-weight: 700; font-family: inherit; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: opacity var(--transition-fast);">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        เข้าสู่ระบบด้วย Facebook
                    </button>

                    <!-- Guest Mode Button -->
                    <button onclick="appState.loginAsGuest()" style="background: var(--bg-light); color: var(--text-medium); border: 1px solid var(--border-color); padding: 0.6rem; border-radius: 12px; font-weight: 600; font-family: inherit; font-size: 0.75rem; cursor: pointer; transition: background var(--transition-fast);">
                        เข้าใช้งานในฐานะผู้มาเยือน (Guest)
                    </button>
                </div>
            </div>
        `;
    },

    sendOTP: function(phone) {
        if (!phone || phone.trim().length < 9) {
            alert("กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง (อย่างน้อย 9-10 หลัก)");
            return;
        }
        this.loginPhone = phone;
        this.loginMode = 'otp';
        this.logActivity('event', `ขอรหัส OTP สำหรับหมายเลขโทรศัพท์: ${phone}`);
        this.renderCurrentScreen();
    },

    verifyOTP: function(otp) {
        if (!otp || otp.trim().length < 4) {
            alert("กรุณากรอกรหัสผ่าน OTP ที่ส่งไปยังโทรศัพท์ของคุณ");
            return;
        }
        
        this.isLoggedIn = true;
        this.loggedInUser = {
            name: `เบอร์โทร ${this.loginPhone}`,
            avatar: '📱',
            type: 'phone'
        };
        this.logActivity('event', `ยืนยัน OTP สำเร็จ ล็อกอินด้วยเบอร์โทร: ${this.loginPhone}`);
        this.changeScreen('home');
    },

    loginWithFacebook: function() {
        this.logActivity('event', `เริ่มการเชื่อมต่อระบบบัญชี Facebook...`);
        
        // Simulating Facebook Auth popup
        const confirmFb = confirm("ช่วยเหลือกาญ ต้องการเข้าถึงข้อมูลของคุณ (ชื่อ, รูปภาพโปรไฟล์) ผ่านทาง Facebook\n\nกดตกลงเพื่อเข้าสู่ระบบในชื่อ 'สมเกียรติ รักกาญจน์'");
        if (confirmFb) {
            this.isLoggedIn = true;
            this.loggedInUser = {
                name: 'คุณ สมเกียรติ รักกาญจน์',
                avatar: '🔵',
                type: 'facebook'
            };
            this.logActivity('event', `ล็อกอินสำเร็จด้วยบัญชี Facebook: สมเกียรติ รักกาญจน์`);
            this.changeScreen('home');
        } else {
            this.logActivity('info', `ยกเลิกการล็อกอินด้วย Facebook`);
        }
    },

    loginAsGuest: function() {
        this.isLoggedIn = true;
        this.loggedInUser = {
            name: 'ผู้มาเยือน (Guest)',
            avatar: '👤',
            type: 'guest'
        };
        this.logActivity('event', `เข้าสู่ระบบในฐานะผู้มาเยือนชั่วคราว (Guest Mode)`);
        this.changeScreen('home');
    },

    logout: function() {
        this.isLoggedIn = false;
        this.loginMode = 'choose';
        this.loginPhone = '';
        this.logActivity('event', `ผู้ใช้ออกจากระบบ (Logged out)`);
        
        // Switch tab back to home
        this.activeTab = 'home';
        this.activeOverlay = null;
        this.renderCurrentScreen();
    },

    // SEEKER HOME VIEW
    templateHomeSeeker: function() {
        return `
            <div style="text-align: center; padding-top: 35px; margin-bottom: 0.5rem;">
                <img src="logo.jpg" alt="ช่วยเหลือกาญ Logo" style="height: 55px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.05)); border-radius: 6px;">
            </div>
            <div class="greeting-section" style="margin-top: 0; margin-bottom: 1rem;">
                <div class="location-info">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>ตำแหน่งปัจจุบัน: อ.เมืองกาญจนบุรี</span>
                </div>
                <h3 class="greeting-title">วันนี้มีอะไรให้เราช่วยไหม?</h3>
            </div>

            <div class="search-container">
                <input type="text" class="search-input" id="search-input-box" placeholder="ค้นหาบริการ หรือขอความช่วยเหลือ..." onkeyup="if(event.key === 'Enter') appState.askAI(this.value)">
                <span class="search-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </span>
            </div>

            <div class="category-grid">
                ${this.categories.map((cat, idx) => `
                    <div class="category-card" onclick="appState.selectedCategoryIndex = ${idx}; appState.changeScreen('home', 'subservices');">
                        <div class="category-icon ${cat.theme}">${cat.title.split(' ')[0]}</div>
                        <span class="category-title">${cat.title.substring(cat.title.indexOf(' ') + 1)}</span>
                        <span class="category-subtitle">${cat.subtitle}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },

    // SUBSERVICES DETAIL OVERLAY
    templateSubservices: function() {
        const cat = this.categories[this.selectedCategoryIndex];
        if (!cat) return `<p>พบข้อผิดพลาดในการโหลดข้อมูล</p>`;

        return `
            <div class="sub-services-header cat-${this.selectedCategoryIndex}">
                <h3>${cat.title}</h3>
                <p>หมวดหมู่: ${cat.subtitle}</p>
            </div>
            <div class="sub-services-list">
                ${cat.subservices.map(sub => `
                    <div class="sub-service-item" onclick="appState.handleSubserviceAction('${sub.action}', '${sub.filter || ''}', '${sub.number || ''}', '${sub.provider || ''}')">
                        <div class="sub-service-info">
                            <span class="sub-service-icon">${sub.icon}</span>
                            <span class="sub-service-name">${sub.name}</span>
                        </div>
                        <span class="sub-service-action-badge">${sub.action === 'call' ? '📞 โทรฟรี' : '👉 เลือก'}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },

    handleSubserviceAction: function(action, filter, number, provider) {
        this.logActivity('info', `ดำเนินการเมนูย่อย -> action: ${action}, filter: ${filter}`);
        
        if (action === 'sos') {
            this.changeScreen('home', 'sos');
            this.triggerSOSCountdown();
        } else if (action === 'call') {
            this.logActivity('event', `จำลองโทรสายด่วนโทรศัพท์: ${number}`);
            alert(`จำลองการกดโทรศัพท์: โทรหา ${number}`);
        } else if (action === 'map') {
            this.activeMapFilter = filter || 'all';
            this.changeScreen('map');
        } else if (action === 'chat') {
            this.activeChatPartner = provider;
            this.changeScreen('home', 'chat');
        } else if (action === 'community') {
            this.changeScreen('community');
        } else if (action === 'notifications') {
            this.changeScreen('notifications');
        }
    },

    // SOS EMERGENCY CALL TIMER OVERLAY
    templateSOS: function() {
        if (this.sosStatus === 'counting') {
            return `
                <div class="sos-overlay">
                    <div class="sos-header-title">
                        <h2>🚨 ตรวจจับเหตุฉุกเฉิน</h2>
                        <p>กำลังประมวลสัญญาณส่งศูนย์ช่วยเหลือภัยกู้ชีพกาญจน์</p>
                    </div>

                    <div class="sos-gps-card">
                        <div class="gps-title">📍 ตําแหน่งดาวเทียมของท่าน</div>
                        <div class="gps-coords">14.0227° N, 99.5327° E</div>
                        <div style="font-size: 0.6rem; color: #94a3b8; margin-top: 4px;">ความแม่นยำสูง (อ.เมืองกาญจนบุรี)</div>
                    </div>

                    <div class="sos-countdown-container">
                        <div class="countdown-circle">${this.sosCountdown}</div>
                        <div class="countdown-label">ระบบจะส่งสัญญาณอัตโนมัติหากไม่กดยกเลิก</div>
                    </div>

                    <div class="sos-actions">
                        <button class="btn-sos-cancel" onclick="appState.cancelSOS()">❌ กดยกเลิกสัญญาณ</button>
                    </div>
                </div>
            `;
        } else if (this.sosStatus === 'dispatched') {
            return `
                <div class="sos-overlay">
                    <div class="sos-header-title">
                        <h2 style="color: var(--primary-green);">🚑 ศูนย์รับเรื่องแจ้งแล้ว</h2>
                        <p>รหัสพิกัดสัญญาณ: SOS-90221</p>
                    </div>

                    <div class="sos-dispatch-card">
                        <div class="dispatch-status">เจ้าหน้าที่กู้ภัยกำลังเดินทาง</div>
                        <div class="dispatch-details">
                            <p><strong>ผู้เข้าช่วยเหลือ:</strong> ทีมอาสากู้ชีพพิทักษ์กาญจน์</p>
                            <p><strong>ระยะเวลาเดินทางถึงจุดเกิดเหตุ:</strong> ~10 นาที</p>
                            <p><strong>โทรแจ้งญาติ/เบอร์หลัก:</strong> ${this.emergencyContact} (แชร์พิกัดแล้ว)</p>
                        </div>
                    </div>

                    <div class="sos-gps-card" style="margin: 0.5rem 0;">
                        <div class="gps-title" style="color: var(--primary-green);">พิกัดที่แชร์กับเจ้าหน้าที่</div>
                        <div class="gps-coords">14.0227° N, 99.5327° E</div>
                    </div>

                    <div class="sos-actions">
                        <button class="btn-sos-cancel" onclick="appState.cancelSOS()" style="background: var(--primary-green); margin-bottom: 0.5rem;">เสร็จสิ้น / ปิดหน้าต่าง</button>
                        <div class="sos-call-grid" style="grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 4px;">
                            <button class="sos-call-btn" onclick="alert('โทร 1669')">📞 โทร 1669</button>
                            <button class="sos-call-btn" onclick="appState.activeChatPartner='ศูนย์กู้ภัยพิทักษ์กาญจน์ (ไทรโยค)'; appState.changeScreen('home', 'chat');">💬 แชตกับกู้ภัย</button>
                        </div>
                        <button class="sos-call-btn" style="width: 100%; padding: 8px; font-weight: bold; background: var(--accent-red); margin-top: 4px;" onclick="alert('กำลังต่อสายด่วนไปยังเบอร์ญาติฉุกเฉิน: ' + appState.emergencyContact)">
                            📞 โทรหาเบอร์ฉุกเฉินที่ลงไว้ (${this.emergencyContact})
                        </button>
                    </div>
                </div>
            `;
        }

        // Idle state of SOS
        return `
            <div class="sos-overlay">
                <div class="sos-header-title">
                    <h2>🚨 ส่งสัญญาณช่วยเหลือด่วน</h2>
                    <p>กรุณาระบุรายละเอียดเบื้องต้นเพื่อความแม่นยำ</p>
                </div>

                <div class="sos-options">
                    <div class="reg-form-group">
                        <label class="reg-form-label" style="color: white;">ประเภทเหตุฉุกเฉิน:</label>
                        <select class="sos-select-type" id="sos-type-select" onchange="appState.sosIncidentType=this.value">
                            <option value="medical">🚑 เจป่วย/อุบัติเหตุทางการแพทย์</option>
                            <option value="road">🚗 รถเสีย/อุบัติเหตุทางรถยนต์</option>
                            <option value="water">⛵ ขอความช่วยเหลือทางน้ำ</option>
                            <option value="disaster">🔥 อัคคีภัย/ภัยพิบัติทางธรรมชาติ</option>
                        </select>
                    </div>

                    <div class="reg-form-group">
                        <label class="reg-form-label" style="color: white;">ระบุเบอร์โทรฉุกเฉิน (เบอร์ญาติหรือหน่วยประสานงาน):</label>
                        <input type="tel" class="reg-form-input" id="sos-phone-input" value="${this.emergencyContact}" oninput="appState.emergencyContact=this.value" style="background: #1e293b; border: 1px solid rgba(255, 255, 255, 0.15); color: white; padding: 0.5rem; border-radius: 8px; font-family: inherit; font-size: 0.8rem; outline: none; width: 100%;">
                    </div>

                    <div class="reg-form-group">
                        <label class="reg-form-label" style="color: white;">รูปภาพประกอบ (ถ้ามี):</label>
                        <div class="sos-photo-selector" onclick="appState.mockSOSPhotoUpload()">
                            📸 กดเพื่อจำลองการถ่ายรูป/อัปโหลดรูป
                            <div class="sos-photo-preview" id="sos-photo-preview-text">✓ แนบไฟล์รูปภาพแล้ว: incident_image.jpg</div>
                        </div>
                    </div>
                </div>

                <div class="sos-gps-card">
                    <div class="gps-title">📍 พิกัดดาวเทียมปัจจุบันของคุณ</div>
                    <div class="gps-coords">14.0227° N, 99.5327° E</div>
                </div>

                <div class="sos-actions">
                    <button class="btn-reg-submit" style="background: var(--accent-red);" onclick="appState.triggerSOSCountdown()">🚨 ส่งสัญญาณ SOS ทันที</button>
                    <button class="btn-sos-cancel" onclick="appState.changeScreen('home')">ยกเลิก</button>
                </div>
            </div>
        `;
    },

    mockSOSPhotoUpload: function() {
        this.sosPhotoSelected = true;
        this.logActivity('event', `แนบไฟล์รูปถ่ายอุบัติเหตุเพื่อความคมชัดในการตรวจสอบเหตุ`);
        const el = document.getElementById('sos-photo-preview-text');
        if (el) el.style.display = 'block';
    },

    // MAP SCREEN VIEW
    templateMap: function() {
        // Find visible pins based on activeFilter
        const visiblePins = this.activeMapFilter === 'all' 
            ? this.mapPins 
            : this.mapPins.filter(pin => pin.type === this.activeMapFilter);

        return `
            <div class="map-screen-container">
                <div class="map-mock-bg">
                    <!-- Filters Overlay -->
                    <div class="map-filters">
                        <button class="map-filter-btn ${this.activeMapFilter === 'all' ? 'active' : ''}" onclick="appState.setMapFilter('all')">ทั้งหมด</button>
                        <button class="map-filter-btn ${this.activeMapFilter === 'mechanic' ? 'active' : ''}" onclick="appState.setMapFilter('mechanic')">🔧 ช่างซ่อม</button>
                        <button class="map-filter-btn ${this.activeMapFilter === 'rescue' ? 'active' : ''}" onclick="appState.setMapFilter('rescue')">🚒 กู้ภัย</button>
                        <button class="map-filter-btn ${this.activeMapFilter === 'water-rescue' ? 'active' : ''}" onclick="appState.setMapFilter('water-rescue')">⛵ กู้ภัยทางน้ำ</button>
                        <button class="map-filter-btn ${this.activeMapFilter === 'hospital' ? 'active' : ''}" onclick="appState.setMapFilter('hospital')">🏥 โรงพยาบาล</button>
                    </div>

                    <!-- Custom SVG Map Drawing -->
                    <svg class="map-svg-mock" viewBox="0 0 375 600">
                        <!-- Simulated river Kwai -->
                        <path d="M 0,250 C 100,280 200,180 375,220 L 375,250 C 200,210 100,310 0,280 Z" fill="#bbdefb" />
                        <!-- River label -->
                        <text x="120" y="270" fill="#1e88e5" font-size="10" transform="rotate(10, 120, 270)">แม่น้ำแควใหญ่</text>
                        <!-- Simulated Main Road -->
                        <path d="M 50,0 Q 180,200 180,600" fill="none" stroke="#cfd8dc" stroke-width="8" />
                        <path d="M 0,100 Q 200,300 375,300" fill="none" stroke="#cfd8dc" stroke-width="8" />
                        <!-- Bridge line -->
                        <line x1="150" y1="210" x2="200" y2="230" stroke="#78909c" stroke-width="5" />
                        <text x="140" y="195" fill="#546e7a" font-size="8">สะพานข้ามแม่น้ำแคว</text>
                        
                        <!-- Landmarks -->
                        <circle cx="170" cy="220" r="4" fill="#ff8f00" />
                        <text x="110" y="325" fill="#78909c" font-size="9">ศาลากลางจังหวัด</text>
                    </svg>

                    <!-- User Current Location Pin -->
                    <div class="user-current-pin" style="top: 48%; left: 48%;">
                        <div class="user-dot"></div>
                        <div class="user-dot-pulse"></div>
                    </div>

                    <!-- Map Pins Rendering -->
                    ${visiblePins.map(pin => {
                        let pinColor = 'pin-bg-blue';
                        if (pin.type === 'rescue') pinColor = 'pin-bg-red';
                        if (pin.type === 'water-rescue') pinColor = 'pin-bg-green';
                        if (pin.type === 'hospital') pinColor = 'pin-bg-orange';
                        
                        return `
                            <div class="map-pin" style="top: ${pin.lat}%; left: ${pin.lng}%;" onclick="appState.showMapPinDetails('${pin.id}')">
                                <div class="pin-icon-wrapper ${pinColor}">
                                    <span>${pin.avatar}</span>
                                </div>
                                <div class="pin-pulse"></div>
                            </div>
                        `;
                    }).join('')}

                    <!-- Detail Modal Overlay (Slide up) -->
                    <div class="map-detail-modal" id="map-detail-card">
                        ${this.selectedPin ? `
                            <div class="modal-header-info">
                                <div class="modal-avatar">${this.selectedPin.avatar}</div>
                                <div class="modal-meta">
                                    <div class="modal-title-row">
                                        <span class="modal-title">${this.selectedPin.name}</span>
                                        <span class="verified-icon">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                        </span>
                                    </div>
                                    <div class="modal-subtitle">${this.selectedPin.service}</div>
                                    <div class="modal-rating">
                                        ⭐ ${this.selectedPin.rating} 
                                        <span class="rating-count">(${this.selectedPin.reviews} รีวิว)</span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-desc">${this.selectedPin.desc}</div>
                            <div class="modal-actions">
                                <button class="modal-btn btn-modal-call" onclick="alert('จำลองการกดโทรติดต่อที่เบอร์โทรศัพท์ของบริการนี้')">📞 โทรสอบถาม</button>
                                <button class="modal-btn btn-modal-chat" onclick="appState.activeChatPartner='${this.selectedPin.name}'; appState.changeScreen('home', 'chat');">💬 แชตปรึกษา</button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    },

    setMapFilter: function(filterType) {
        this.activeMapFilter = filterType;
        this.selectedPin = null;
        this.logActivity('info', `กรองพิกัดบนแผนที่: ${filterType}`);
        this.renderCurrentScreen();
    },

    showMapPinDetails: function(pinId) {
        const pin = this.mapPins.find(p => p.id === pinId);
        this.selectedPin = pin;
        this.logActivity('event', `เลือกดูพิกัดปักหมุดช่วยเหลือ: "${pin.name}"`);
        this.renderCurrentScreen();
        
        // Timeout to trigger slide-in CSS animation class smoothly
        setTimeout(() => {
            const modal = document.getElementById('map-detail-card');
            if (modal) modal.classList.add('active');
        }, 50);
    },

    // COMMUNITY FEED SCREEN
    templateCommunity: function() {
        return `
            <div class="community-header">
                <h3>บอร์ดพูดคุย & ประชาสัมพันธ์</h3>
                <button class="btn-new-post" onclick="appState.openNewPostDialog()">✍️ ตั้งโพสต์</button>
            </div>

            <div class="community-feed">
                ${this.communityFeed.map(post => `
                    <div class="post-card">
                        <div class="post-header">
                            <div class="post-avatar">${post.avatar}</div>
                            <div class="post-author-meta">
                                <div class="post-author">${post.author}</div>
                                <div class="post-time">${post.time}</div>
                            </div>
                            <span class="post-tag ${post.tagStyle}">${post.tag}</span>
                        </div>
                        <div class="post-content">${post.content}</div>
                        
                        <!-- Volunteer Activity Earning Actions -->
                        ${this.role === 'seeker' ? `
                            ${post.tag === 'บริจาคเลือด' && !post.actionTaken ? `
                                <button class="btn-reg-submit" style="background: var(--accent-red); margin-top: 0.25rem; margin-bottom: 0.75rem; font-size: 0.7rem; padding: 6px 12px; width: 100%; border-radius: 8px; border: none; color: white; font-weight: bold; cursor: pointer;" onclick="appState.earnPoints('blood_donation', ${post.id})">
                                    🩸 ยืนยันร่วมบริจาคเลือด (+50 คะแนนจิตอาสา)
                                </button>
                            ` : ''}
                            ${post.tag === 'บริจาคของ' && !post.actionTaken ? `
                                <button class="btn-reg-submit" style="background: var(--warning-orange); margin-top: 0.25rem; margin-bottom: 0.75rem; font-size: 0.7rem; padding: 6px 12px; width: 100%; border-radius: 8px; border: none; color: white; font-weight: bold; cursor: pointer;" onclick="appState.earnPoints('item_donation', ${post.id})">
                                    🎁 ยืนยันร่วมบริจาคสิ่งของ (+15 คะแนนจิตอาสา)
                                </button>
                            ` : ''}
                            ${post.tag === 'จิตอาสา' && !post.actionTaken ? `
                                <button class="btn-reg-submit" style="background: var(--primary-green); margin-top: 0.25rem; margin-bottom: 0.75rem; font-size: 0.7rem; padding: 6px 12px; width: 100%; border-radius: 8px; border: none; color: white; font-weight: bold; cursor: pointer;" onclick="appState.earnPoints('public_activity', ${post.id})">
                                    🌱 ยืนยันเข้าร่วมกิจกรรมจิตอาสา (+10 คะแนนจิตอาสา)
                                </button>
                            ` : ''}
                            ${post.actionTaken ? `
                                <div style="background: var(--primary-green-light); color: var(--primary-green); border: 1px solid var(--primary-green); text-align: center; font-size: 0.65rem; padding: 6px; border-radius: 8px; font-weight: bold; margin-bottom: 0.75rem;">
                                    ✓ คุณได้รับคะแนนจากกิจกรรมนี้เรียบร้อยแล้ว
                                </div>
                            ` : ''}
                        ` : ''}
                        
                        <!-- Actions Row -->
                        <div class="post-actions-row">
                            <button class="post-action-btn ${post.liked ? 'liked' : ''}" onclick="appState.likePost(${post.id})">
                                ❤️ <span>${post.likes}</span> ถูกใจ
                            </button>
                            <button class="post-action-btn" onclick="appState.activeChatPartner='${post.author}'; appState.changeScreen('home', 'chat');">
                                💬 <span>${post.comments.length}</span> แชตประสานงาน
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- New Post Overlay Sheet -->
            <div class="post-dialog-overlay" id="post-dialog-overlay" onclick="if(event.target===this) this.classList.remove('active')">
                <div class="post-dialog-card">
                    <div class="post-dialog-header">
                        <h4>สร้างโพสต์ประกาศข่าวสาร</h4>
                        <button class="post-dialog-close" onclick="document.getElementById('post-dialog-overlay').classList.remove('active')">✕</button>
                    </div>
                    <div class="post-form">
                        <textarea class="post-textarea" id="post-text-input" placeholder="พิมพ์สิ่งที่คุณต้องการขอความช่วยเหลือหรือแจ้งภัย..."></textarea>
                        
                        <label class="reg-form-label">เลือกหัวข้อหลัก:</label>
                        <select class="post-select-tag" id="post-tag-input">
                            <option value="แจ้งเตือนภัย">🚨 แจ้งเตือนภัย</option>
                            <option value="บริจาคเลือด">🩸 บริจาคเลือดด่วน (+50 แต้ม)</option>
                            <option value="บริจาคของ">🎁 บริจาคของ/สิ่งของ (+15 แต้ม)</option>
                            <option value="จิตอาสา">🌱 กิจกรรมจิตอาสา (+10 แต้ม)</option>
                            <option value="ทั่วไป">💬 คุยสาระทั่วไปในชุมชน</option>
                        </select>
                        
                        <button class="btn-submit-post" onclick="appState.submitPost(document.getElementById('post-text-input').value, appState.selectedPostTag = document.getElementById('post-tag-input').value)">เผยแพร่ประกาศ</button>
                    </div>
                </div>
            </div>
        `;
    },

    openNewPostDialog: function() {
        this.logActivity('info', `เปิดกล่องเขียนโพสต์ชุมชนใหม่`);
        const overlay = document.getElementById('post-dialog-overlay');
        if (overlay) {
            overlay.classList.add('active');
            // Reset fields
            document.getElementById('post-text-input').value = '';
        }
    },

    likePost: function(postId) {
        const post = this.communityFeed.find(p => p.id === postId);
        if (!post) return;
        
        if (post.liked) {
            post.likes--;
            post.liked = false;
        } else {
            post.likes++;
            post.liked = true;
        }
        this.logActivity('event', `กดไลก์โพสต์ของ "${post.author}"`);
        this.renderCurrentScreen();
    },

    // AI ASSISTANT CHATBOT INTERFACE OVERLAY
    templateAIAssistant: function() {
        return `
            <div class="ai-chat-overlay">
                <div class="ai-chat-header">
                    <div class="ai-header-avatar">🤖</div>
                    <div class="ai-header-desc">
                        <h4>ผู้ช่วยกาญ AI</h4>
                        <p>พร้อมตอบทุกคำถามด่วน ท่องเที่ยวภัยพิบัติ และช่างบริการ</p>
                    </div>
                    <button class="btn-close-ai" onclick="appState.changeScreen('home')">✕ ปิด</button>
                </div>

                <div class="ai-messages-body" id="ai-chat-body">
                    ${this.aiChatHistory.map(msg => `
                        <div class="chat-bubble ${msg.sender === 'bot' ? 'bot' : 'user'}">
                            ${msg.text.replace(/\n/g, '<br>')}
                        </div>
                    `).join('')}
                </div>

                <!-- Presets selection -->
                <div class="ai-presets-box">
                    <div class="presets-title">💡 คำถามแนะนำ:</div>
                    <div class="presets-scroller">
                        <button class="preset-chip-btn" onclick="appState.askAI('รถเสียแถวไทรโยค ทำยังไง')">🚗 รถเสียไทรโยค</button>
                        <button class="preset-chip-btn" onclick="appState.askAI('ต้องการเลือดกรุ๊ป O ด่วน')">🩸 ขอเลือดกรุ๊ป O</button>
                        <button class="preset-chip-btn" onclick="appState.askAI('หาปะยางใกล้ฉัน')">🔧 หาปะยางใกล้ฉัน</button>
                        <button class="preset-chip-btn" onclick="appState.askAI('โรงพยาบาลสัตว์เปิดตอนนี้ไหม')">🐶 โรงพยาบาลสัตว์ 24 ชม.</button>
                    </div>
                </div>

                <!-- Chat inputs -->
                <div class="ai-input-bar">
                    <input type="text" class="ai-input-field" id="ai-msg-input" placeholder="พิมพ์ถามผู้ช่วย AI ที่นี่..." onkeyup="if(event.key === 'Enter') appState.askAI(this.value)">
                    <button class="btn-ai-send" onclick="appState.askAI(document.getElementById('ai-msg-input').value)">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </div>
            </div>
        `;
    },

    // DIRECT CHAT OVERLAY SCREEN
    templateChat: function() {
        const chatHistory = this.chats[this.activeChatPartner] || [];

        return `
            <div class="chat-screen-overlay">
                <div class="chat-header">
                    <button class="chat-back-btn" onclick="appState.goBack()">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <div class="chat-user-avatar">💬</div>
                    <div class="chat-user-meta">
                        <h4>${this.activeChatPartner}</h4>
                        <p>🟢 กำลังออนไลน์ / แชตเข้ารหัสปลอดภัย</p>
                    </div>
                </div>

                <div class="chat-messages-body" id="chat-msg-body">
                    ${chatHistory.map(msg => `
                        <div class="chat-bubble ${msg.sender === 'sender' ? 'sender' : 'recipient'}">
                            ${msg.text}
                        </div>
                    `).join('')}
                </div>

                <div class="chat-input-bar">
                    <input type="text" class="chat-input-field" id="chat-text-input" placeholder="พิมพ์ข้อความคุยด่วนที่นี่..." onkeyup="if(event.key === 'Enter') appState.sendDirectMessage(this.value)">
                    <button class="btn-chat-send" onclick="appState.sendDirectMessage(document.getElementById('chat-text-input').value)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </div>
            </div>
        `;
    },

    sendDirectMessage: function(text) {
        if (!text.trim()) return;
        
        if (!this.chats[this.activeChatPartner]) {
            this.chats[this.activeChatPartner] = [];
        }
        
        this.chats[this.activeChatPartner].push({ sender: 'sender', text: text });
        this.logActivity('event', `ส่งข้อความถึง "${this.activeChatPartner}": "${text}"`);
        this.renderCurrentScreen();

        // Clear input box
        const input = document.getElementById('chat-text-input');
        if (input) input.value = '';

        // Mock automated response from provider
        setTimeout(() => {
            const replies = [
                "รับทราบรายละเอียดครับ พิกัดตรงนี้ผมรู้จักดี กำลังจัดของขึ้นรถออกเดินทางครับ",
                "ตกลงตามนี้ครับ คาดว่าจะถึงไม่เกิน 15 นาทีตาม GPS นำทาง",
                "มีรูปถ่ายเพิ่มเติมไหมครับ จะได้เตรียมเครื่องมือ/อะไหล่ไปให้ถูกต้องครบถ้วน"
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            
            this.chats[this.activeChatPartner].push({ sender: 'recipient', text: randomReply });
            this.logActivity('api', `ผู้ติดต่อตอบกลับข้อความแชตอัตโนมัติ`);
            this.renderCurrentScreen();
        }, 1500);
    },

    // NOTIFICATIONS VIEW
    templateNotifications: function() {
        // Hide badge dot on opening noti
        const notiDot = document.getElementById('noti-badge-dot');
        if (notiDot) notiDot.style.display = 'none';

        return `
            <div class="notifications-section">
                <div class="noti-list">
                    ${this.notifications.map(noti => `
                        <div class="noti-item ${noti.unread ? 'unread' : ''}" onclick="noti.unread=false; appState.renderCurrentScreen()">
                            <div class="noti-icon-box ${noti.theme}">${noti.icon}</div>
                            <div class="noti-info">
                                <div class="noti-title">${noti.title}</div>
                                <div class="noti-body">${noti.body}</div>
                                <div class="noti-time">${noti.time}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // SEEKER PROFILE VIEW (User config + Provider application)
    templateProfileSeeker: function() {
        return `
            <div class="profile-section">
                <div class="profile-card">
                    <div class="profile-img-mock">${this.loggedInUser ? this.loggedInUser.avatar : '👨'}</div>
                    <div class="profile-name">${this.loggedInUser ? this.loggedInUser.name : 'คุณ นนทวัชร์ วงศ์สุวรรณ'}</div>
                    <div class="profile-role-text">บทบาท: สมาชิกทั่วไป / นักท่องเที่ยว</div>
                    <div class="volunteer-points-badge" style="margin-top: 0.5rem; background: var(--primary-blue-light); border: 1px solid var(--primary-blue); padding: 0.4rem 0.8rem; border-radius: 99px; display: inline-flex; align-items: center; gap: 4px;">
                        <span>⭐</span>
                        <span style="font-weight: 700; color: var(--primary-blue); font-size: 0.75rem;">คะแนนจิตอาสา: ${this.volunteerPoints}</span>
                    </div>
                    <div style="margin-top: 0.5rem;"><span class="badge-verified-user">🛡️ ยืนยันตัวตนระดับพื้นฐาน</span></div>
                </div>

                <div class="content-card" style="margin-bottom: 1.25rem; background: white; border: 1px solid var(--border-color); border-radius: 16px; padding: 1rem; text-align: left;">
                    <h4 style="font-weight: 700; margin-bottom: 0.25rem; font-size: 0.8rem; display: flex; align-items: center; gap: 4px;">🏆 เครดิตความดี (คะแนนจิตอาสา)</h4>
                    <p style="font-size: 0.65rem; color: var(--text-medium); margin-bottom: 0.75rem; line-height: 1.3;">สะสมคะแนนจากการช่วยเหลือสังคมและการร่วมกิจกรรม</p>
                    <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.7rem; font-weight: 600;">
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 4px;">
                            <span>🩸 บริจาคเลือดด่วน</span>
                            <span style="color: var(--primary-blue);">+50</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 4px;">
                            <span>🚗 ช่วยรถเสีย / เดินทาง</span>
                            <span style="color: var(--primary-blue);">+20</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 4px;">
                            <span>🎁 บริจาคสิ่งของ</span>
                            <span style="color: var(--primary-blue);">+15</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 2px;">
                            <span>🌱 ร่วมกิจกรรมสาธารณะ</span>
                            <span style="color: var(--primary-blue);">+10</span>
                        </div>
                    </div>
                </div>

                <div class="profile-menu">
                    <div class="profile-menu-item" onclick="const newNum = prompt('ระบุเบอร์โทรญาติหรือหน่วยติดต่อฉุกเฉินเพื่อเชื่อมโยงกับปุ่ม SOS:', appState.emergencyContact); if (newNum !== null) { appState.emergencyContact = newNum; appState.logActivity('state', 'แก้ไขเบอร์ญาติฉุกเฉินเป็น: ' + newNum); appState.renderCurrentScreen(); }">
                        <div class="menu-item-left"><span class="icon">👪</span> ตั้งค่าเบอร์โทรญาติฉุกเฉิน</div>
                        <span>❯</span>
                    </div>
                    <div class="profile-menu-item" onclick="alert('ประวัติการขอความช่วยเหลือ')">
                        <div class="menu-item-left"><span class="icon">📜</span> ประวัติรับบริการ / แจ้ง SOS</div>
                        <span>❯</span>
                    </div>
                    <div class="profile-menu-item" onclick="appState.logout()" style="color: var(--accent-red); border-top: 1px solid var(--border-color); margin-top: 0.5rem; padding-top: 0.75rem;">
                        <div class="menu-item-left" style="color: var(--accent-red); font-weight: bold;"><span class="icon">🚪</span> ออกจากระบบ (Logout)</div>
                        <span style="color: var(--accent-red);">❯</span>
                    </div>
                </div>

                <div class="provider-registration-box" id="reg-box">
                    <h4>💼 สมัครเป็นผู้ช่วยเหลือ / ช่างบริการ</h4>
                    <p>เปิดบัญชีของคุณเพื่อให้บริการซ่อมแซม ขนย้าย ปะยาง หรือลงทะเบียนอาสาสมัครกู้ภัยในพื้นที่จังหวัดกาญจนบุรี หารายได้เสริมและช่วยเหลือสังคมไปด้วยกัน</p>
                    
                    <div class="provider-reg-form">
                        <div class="reg-form-group">
                            <label class="reg-form-label">ประเภทความเชี่ยวชาญ:</label>
                            <select class="reg-form-select" id="reg-skill">
                                <option value="mechanic">🔧 ช่างซ่อมรถยนต์ / ปะยาง</option>
                                <option value="handyman">⚡ ช่างไฟฟ้า / ช่างประปา / ล้างแอร์</option>
                                <option value="rescue">🚒 อาสาสมัครกู้ภัย / กู้ชีพ</option>
                                <option value="volunteer">🌱 จิตอาสาทั่วไป / ระดมบุญ</option>
                            </select>
                        </div>

                        <div class="reg-form-group">
                            <label class="reg-form-label">บัตรประจำตัววิชาชีพ / บัตรประชาชน (แนบไฟล์):</label>
                            <div class="reg-form-file-btn" onclick="appState.mockFileUpload()">
                                📄 อัปโหลดไฟล์เอกสารยืนยันตัวตน
                                <div class="reg-file-status" id="reg-file-ok">✓ ตรวจสอบความถูกต้องของไฟล์แล้ว</div>
                            </div>
                        </div>

                        <button class="btn-reg-submit" onclick="appState.submitProviderRegistration()">ส่งเอกสารยืนยันตัวตน</button>
                    </div>
                </div>
            </div>
        `;
    },

    mockFileUpload: function() {
        this.logActivity('event', `ผู้ใช้จำลองการอัปโหลดไฟล์เอกสารการรับรองช่าง/กู้ภัยเพื่อตรวจสอบความประพฤติ`);
        const el = document.getElementById('reg-file-ok');
        if (el) el.style.display = 'block';
    },

    submitProviderRegistration: function() {
        this.logActivity('event', `ส่งแบบฟอร์มตรวจสอบสิทธิ์การเป็นผู้ให้บริการ... กำลังอนุมัติเอกสารเบื้องหลัง`);
        alert("ส่งข้อมูลการลงทะเบียนผู้ให้บริการสำเร็จ! ระบบจะทำการอนุมัติสิทธิ์ (Verified Seeker) อัตโนมัติในทันที เพื่อสนับสนุนการทดสอบ");
        
        // Upgrade persona
        this.togglePersona('provider');
        this.changeScreen('profile');
    },

    // -------------------------------------------------------------
    // PROVIDER PERSONA SCREENS & LOGIC
    // -------------------------------------------------------------

    templateProfileProvider: function() {
        return `
            <div class="profile-section">
                <div class="profile-card">
                    <div class="profile-img-mock" style="background-color: var(--primary-green-light)">${this.loggedInUser ? this.loggedInUser.avatar : '👨‍🔧'}</div>
                    <div class="profile-name">ช่าง${this.loggedInUser ? this.loggedInUser.name.replace('คุณ ', '') : 'วิทย์ ปะยาง'} (Verified)</div>
                    <div class="profile-role-text">บทบาท: ช่างบริการนอกสถานที่ / อาสาสมัคร</div>
                    <div class="volunteer-points-badge" style="margin-top: 0.5rem; background: var(--primary-green-light); border: 1px solid var(--primary-green); padding: 0.4rem 0.8rem; border-radius: 99px; display: inline-flex; align-items: center; gap: 4px;">
                        <span>⭐</span>
                        <span style="font-weight: 700; color: var(--primary-green); font-size: 0.75rem;">คะแนนจิตอาสา: ${this.volunteerPoints}</span>
                    </div>
                    <div style="margin-top: 0.5rem;"><span class="badge-verified-user" style="background: var(--primary-green-light); color: var(--primary-green);">✓ ผู้ให้บริการที่ยืนยันตัวตนแล้ว</span></div>
                </div>

                <div class="profile-menu">
                    <div class="profile-menu-item" onclick="appState.togglePersona('seeker')">
                        <div class="menu-item-left" style="color: var(--primary-blue)"><span class="icon">👤</span> สลับกลับไปบทบาท Seeker (ผู้ใช้ทั่วไป)</div>
                        <span>❯</span>
                    </div>
                    <div class="profile-menu-item" onclick="alert('จัดการบริการของฉัน')">
                        <div class="menu-item-left"><span class="icon">🛠️</span> จัดการอัตราค่าบริการและทักษะ</div>
                        <span>❯</span>
                    </div>
                    <div class="profile-menu-item" onclick="alert('ข้อมูลถอนเงิน')">
                        <div class="menu-item-left"><span class="icon">💰</span> บัญชีรับรายได้ / ยอดเงินสะสม</div>
                        <span>❯</span>
                    </div>
                    <div class="profile-menu-item" onclick="appState.logout()" style="color: var(--accent-red); border-top: 1px solid var(--border-color); margin-top: 0.5rem; padding-top: 0.75rem;">
                        <div class="menu-item-left" style="color: var(--accent-red); font-weight: bold;"><span class="icon">🚪</span> ออกจากระบบ (Logout)</div>
                        <span style="color: var(--accent-red);">❯</span>
                    </div>
                </div>
            </div>
        `;
    },

    // PROVIDER HOME SCREEN (DASHBOARD FOR TECHNICIAN / VOLUNTEER)
    templateHomeProvider: function() {
        return `
            <div class="provider-home-header">
                <h3>โต๊ะทำงานผู้ให้บริการ</h3>
                
                <div class="provider-status-toggle" onclick="appState.toggleProviderOnlineStatus()">
                    <div class="status-dot ${this.providerStatus === 'online' ? 'active' : ''}"></div>
                    <span class="status-label">${this.providerStatus === 'online' ? 'เปิดรับงาน (ONLINE)' : 'ปิดรับงาน (OFFLINE)'}</span>
                </div>
            </div>

            <!-- Stats Bar -->
            <div class="provider-stats-grid">
                <div class="stat-item-box">
                    <div class="stat-value">${this.providerStats.completed}</div>
                    <div class="stat-label">งานสำเร็จ</div>
                </div>
                <div class="stat-item-box">
                    <div class="stat-value">⭐ ${this.providerStats.rating}</div>
                    <div class="stat-label">เรตติ้ง</div>
                </div>
                <div class="stat-item-box">
                    <div class="stat-value">${this.providerStats.earnings}</div>
                    <div class="stat-label">รายได้รวม</div>
                </div>
            </div>

            <h4 class="jobs-queue-header">🎯 คำขอส่งด่วนใกล้ตัวคุณ (${this.providerJobs.length})</h4>
            
            ${this.providerStatus === 'offline' ? `
                <div class="content-card" style="text-align: center; padding: 2rem 1rem;">
                    <span style="font-size: 2rem;">💤</span>
                    <h5 style="margin-top: 0.5rem; font-weight:700;">สถานะของคุณคือออฟไลน์</h5>
                    <p style="font-size: 0.65rem;">กรุณากดเปิดสถานะ ONLINE ที่มุมขวาเพื่อรับข้อเสนอช่วยเหลือด่วนรอบตัว</p>
                </div>
            ` : `
                <div class="provider-jobs-list">
                    ${this.providerJobs.map(job => `
                        <div class="job-card ${job.id === 'job-sos' ? 'emergency-job' : ''}">
                            <div class="job-card-header">
                                <span class="job-type-tag ${job.id === 'job-sos' ? 'tag-urgent' : 'tag-general'}">${job.typeText}</span>
                                <span class="job-distance">${job.distance}</span>
                            </div>
                            <div class="job-info-body">
                                <strong>ผู้ร้องขอ:</strong> ${job.victimName}<br>
                                <strong>ปัญหา:</strong> ${job.detail}<br>
                                <div class="job-location-str">${job.location}</div>
                            </div>
                            <div class="job-card-actions">
                                <button class="job-btn btn-job-decline" onclick="appState.declineJob('${job.id}')">ปฏิเสธ</button>
                                <button class="job-btn btn-job-accept" onclick="appState.acceptJob('${job.id}')">ตอบรับงาน</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        `;
    },

    toggleProviderOnlineStatus: function() {
        this.providerStatus = this.providerStatus === 'online' ? 'offline' : 'online';
        this.logActivity('state', `สลับสถานะช่างผู้ให้บริการ -> ${this.providerStatus.toUpperCase()}`);
        this.renderCurrentScreen();
    },

    declineJob: function(jobId) {
        this.providerJobs = this.providerJobs.filter(j => j.id !== jobId);
        this.logActivity('info', `ช่างปฏิเสธใบงาน: ${jobId}`);
        this.renderCurrentScreen();
    },

    acceptJob: function(jobId) {
        const job = this.providerJobs.find(j => j.id === jobId);
        if (!job) return;

        this.activeJob = job;
        this.logActivity('event', `ช่างกดรับภารกิจช่วยเหลือ: "${job.victimName}" ปัญหา: "${job.detail}"`);
        
        // Remove from list
        this.providerJobs = this.providerJobs.filter(j => j.id !== jobId);
        
        // Change view to navigation view
        this.changeScreen('home', 'active-job');
    },

    // PROVIDER ACTIVE JOB NAVIGATION VIEW OVERLAY
    templateActiveJob: function() {
        if (!this.activeJob) return `<p>ไม่มีใบงานที่กำลังดำเนินการอยู่</p>`;

        return `
            <div class="map-screen-container" style="top: 88px; height: calc(100% - 88px - 140px)">
                <!-- Reusing the map template but optimized for navigation -->
                <div class="map-mock-bg">
                    <svg class="map-svg-mock" viewBox="0 0 375 600">
                        <path d="M 0,250 C 100,280 200,180 375,220 L 375,250 C 200,210 100,310 0,280 Z" fill="#bbdefb" />
                        <path d="M 50,0 Q 180,200 180,600" fill="none" stroke="#cfd8dc" stroke-width="8" />
                        
                        <!-- Navigation path (Dotted line between Provider and Victim) -->
                        <path d="M 170,220 L 175,280 L 220,330" fill="none" stroke="var(--primary-blue)" stroke-width="4" stroke-dasharray="6,4" />
                    </svg>

                    <!-- Provider Dot -->
                    <div class="user-current-pin" style="top: 36%; left: 45%;">
                        <div class="user-dot" style="background: var(--primary-green); box-shadow: 0 0 10px var(--primary-green);"></div>
                    </div>

                    <!-- Victim Dot -->
                    <div class="user-current-pin" style="top: 55%; left: 58%;">
                        <div class="user-dot" style="background: var(--accent-red); box-shadow: 0 0 10px var(--accent-red);"></div>
                        <div class="user-dot-pulse" style="border-color: var(--accent-red)"></div>
                    </div>
                </div>
            </div>

            <!-- Float Info Overlay -->
            <div class="active-job-details" style="position: absolute; bottom: 15px; left: 10px; right: 10px; z-index:35;">
                <div class="active-job-header">
                    <span class="job-type-tag tag-urgent">${this.activeJob.typeText}</span>
                    <span class="active-job-title">นำทางไปยังผู้ประสบภัย</span>
                </div>
                <div class="active-job-desc">
                    <strong>ชื่อผู้ติดต่อ:</strong> ${this.activeJob.victimName}<br>
                    <strong>จุดเกิดเหตุ:</strong> ${this.activeJob.location.replace('พิกัด: 📍', '')}<br>
                    <strong>อาการ:</strong> ${this.activeJob.detail}
                </div>
                <div class="active-job-actions">
                    <button class="active-job-btn btn-act-chat" onclick="appState.activeChatPartner='${this.activeJob.victimName}'; appState.changeScreen('home', 'chat');">💬 แชตหา</button>
                    <button class="active-job-btn btn-act-call" onclick="alert('โทรประสานงาน')">📞 โทรติดต่อ</button>
                    <button class="active-job-btn btn-act-done" onclick="appState.completeActiveJob()">✅ เสร็จงาน</button>
                </div>
            </div>
        `;
    },

    completeActiveJob: function() {
        let pts = 20; // ช่วยรถเสีย +20
        this.volunteerPoints += pts;
        this.logActivity('event', `ช่างวิทย์ ปฏิบัติหน้าที่ช่วยเหลือเสร็จสิ้น ปิดงานสำเร็จ (+${pts} คะแนนจิตอาสา: ช่วยรถเสีย, สะสมรวม: ${this.volunteerPoints})`);
        
        // Update stats
        this.providerStats.completed++;
        this.providerStats.earnings = (parseInt(this.providerStats.earnings.replace(/\D/g,'')) + 450) + " ฿";

        // Route to success screen
        this.changeScreen('home', 'job-done');
    },

    // JOB COMPLETION SUCCESS SCREEN OVERLAY
    templateJobDone: function() {
        return `
            <div class="job-done-screen">
                <div class="success-check-icon">🏆</div>
                <h3>ขอบคุณสำหรับการทำดี!</h3>
                <p>คุณส่งมอบการช่วยเหลือและแก้ปัญหาให้กับผู้ใช้บริการสำเร็จ การกระทำนี้ช่วยให้จังหวัดกาญจนบุรีปลอดภัยขึ้น</p>

                <div class="job-summary-card">
                    <h4 style="font-weight: 700; margin-bottom: 0.5rem; text-align: center;">สรุปรายการช่วยเหลือ</h4>
                    <div class="summary-row">
                        <span>ประเภทงาน:</span>
                        <span>${this.activeJob?.typeText || 'บริการทั่วไป'}</span>
                    </div>
                    <div class="summary-row">
                        <span>ผู้รับการช่วยเหลือ:</span>
                        <span>${this.activeJob?.victimName || 'ผู้ใช้แอป'}</span>
                    </div>
                    <div class="summary-row">
                        <span>รายรับของงาน:</span>
                        <span style="color: var(--primary-green); font-weight:700;">+ 450.00 บาท</span>
                    </div>
                    <div class="summary-row">
                        <span>คะแนนจิตอาสาที่ได้รับ:</span>
                        <span style="color: var(--primary-blue); font-weight:700;">+ 20 คะแนน (ช่วยรถเสีย)</span>
                    </div>
                </div>

                <button class="btn-reg-submit" onclick="appState.activeJob=null; appState.changeScreen('home')">กลับไปยังหน้าควบคุมหลัก</button>
            </div>
        `;
    }
};

// -------------------------------------------------------------
// Interactive Core Initialization & Event Listeners
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    appState.renderCurrentScreen();

    // 1. Time Ticker Setup
    const updateTime = () => {
        const timeEl = document.getElementById('status-time');
        if (timeEl) {
            const now = new Date();
            const hrs = String(now.getHours()).padStart(2, '0');
            const mins = String(now.getMinutes()).padStart(2, '0');
            timeEl.innerText = `${hrs}:${mins}`;
        }
    };
    updateTime();
    setInterval(updateTime, 60000);

    // 2. Navigation Tab Click Event Listeners
    document.querySelectorAll('.nav-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.currentTarget;
            const tabName = btn.getAttribute('data-tab');
            appState.changeScreen(tabName);
        });
    });

    // 3. SOS Large Button Event Trigger
    const sosTrigger = document.getElementById('btn-sos-trigger');
    if (sosTrigger) {
        sosTrigger.addEventListener('click', () => {
            appState.changeScreen('home', 'sos');
            appState.triggerSOSCountdown();
        });
    }

    // 4. Back Arrow Click action
    const backBtn = document.getElementById('btn-app-back');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            appState.goBack();
        });
    }

    // 5. AI Assistant Float Click Action
    const aiBtn = document.getElementById('btn-ai-assistant');
    if (aiBtn) {
        aiBtn.addEventListener('click', () => {
            appState.changeScreen('home', 'ai-assistant');
        });
    }

    // 6. Header Design Mode switches (Hi-Fi UI vs Lo-Fi Wireframe)
    const btnHiFi = document.getElementById('btn-hi-fi');
    const btnWire = document.getElementById('btn-wireframe');
    const appScreen = document.getElementById('app-screen');

    if (btnHiFi && btnWire && appScreen) {
        btnHiFi.addEventListener('click', () => {
            btnHiFi.classList.add('active');
            btnWire.classList.remove('active');
            appScreen.classList.remove('wireframe');
            appState.designMode = 'hi-fi';
            appState.logActivity('info', `สลับโหมดดีไซน์: High-Fidelity UI Mockup`);
        });

        btnWire.addEventListener('click', () => {
            btnWire.classList.add('active');
            btnHiFi.classList.remove('active');
            appScreen.classList.add('wireframe');
            appState.designMode = 'wireframe';
            appState.logActivity('info', `สลับโหมดดีไซน์: Low-Fidelity Wireframe`);
        });
    }

    // 7. Header Persona Views Switches (Seeker vs Provider)
    const btnSeeker = document.getElementById('btn-seeker');
    const btnProvider = document.getElementById('btn-provider');

    if (btnSeeker && btnProvider) {
        btnSeeker.addEventListener('click', () => {
            appState.togglePersona('seeker');
        });
        btnProvider.addEventListener('click', () => {
            appState.togglePersona('provider');
        });
    }

    // 8. Right side Dashboard tabs click events
    document.querySelectorAll('.dash-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const clickedTab = e.currentTarget;
            const targetContentId = clickedTab.getAttribute('data-dash');
            
            // Remove active from all tabs
            document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
            // Hide all tab contents
            document.querySelectorAll('.dash-tab-content').forEach(c => c.classList.remove('active'));
            
            // Activate current
            clickedTab.classList.add('active');
            const contentEl = document.getElementById(`dash-${targetContentId}`);
            if (contentEl) contentEl.classList.add('active');
        });
    });

    // 9. Clear logs console button action
    const clearLogBtn = document.getElementById('btn-clear-log');
    if (clearLogBtn) {
        clearLogBtn.addEventListener('click', () => {
            const consoleEl = document.getElementById('log-console-body');
            if (consoleEl) {
                consoleEl.innerHTML = `<div class="log-line system">[SYSTEM] เคลียร์บันทึก Developer Logs ล้างข้อมูลหน้าต่างคอนโซลเสร็จสิ้น...</div>`;
            }
        });
    }
});
