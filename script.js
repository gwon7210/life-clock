document.addEventListener('DOMContentLoaded', () => {
    const ageInput = document.getElementById('ageInput');
    const timeText = document.getElementById('timeText');
    const periodText = document.getElementById('periodText');
    const messageText = document.getElementById('messageText');
    const body = document.body;

    const LIFESPAN = 100; // Human lifespan assumption

    // Background themes
    const THEMES = {
        morning: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', // 0-25 (00:00 - 06:00)
        day: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)', // 25-50 (06:00 - 12:00)
        evening: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // 50-75 (12:00 - 18:00)
        night: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' // 75-100 (18:00 - 24:00)
    };

    // Messages based on age range
    const MESSAGES = [
        { max: 20, msg: "새벽의 고요함 속에서 하루를 준비하는 시간입니다. 무엇이든 될 수 있는 당신, 서두르지 말고 천천히 눈을 뜨세요." },
        { max: 30, msg: "아침의 싱그러운 햇살이 비치기 시작합니다. 당신의 가능성이 꽃피울 준비를 하고 있습니다." },
        { max: 40, msg: "오전의 활기찬 에너지가 가득합니다. 당신의 인생에서 가장 역동적이고 뜨거운 순간을 즐기세요." },
        { max: 50, msg: "정오의 태양처럼 당신은 지금 가장 높이 떠 있습니다. 흔들리지 않는 단단함으로 세상을 비추세요." },
        { max: 60, msg: "오후의 따스하고 여유로운 볕이 듭니다. 그동안 쌓아올린 결실들이 아름답게 익어가는 시간입니다." },
        { max: 70, msg: "저녁 노을의 아름다움을 만끽하세요. 치열했던 하루를 위로하며, 주변을 따뜻하게 물들이는 시기입니다." },
        { max: 80, msg: "하루를 정리하며 평온한 휴식을 맞이할 시간입니다. 당신의 지혜는 밤하늘의 별처럼 빛납니다." },
        { max: 101, msg: "깊은 밤, 고요한 평화 속에 머무릅니다. 당신의 하루는 누구보다 충분히 아름다웠습니다." }
    ];

    function updateClock(age) {
        if (age === '' || age < 0) {
            resetClock();
            return;
        }

        // 1. Calculate Time
        // 100 years = 24 hours = 1440 minutes
        // 1 year = 14.4 minutes
        const totalMinutes = (age / LIFESPAN) * 1440;
        
        // Handle > 100 years
        if (totalMinutes > 1440) {
            timeText.textContent = "24:00+";
            periodText.textContent = "초월하는 시간";
            messageText.textContent = "당신은 이미 전설입니다. 새로운 하루를 시작하고 계시군요!";
            body.style.background = THEMES.night;
            return;
        }

        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);

        // Format: HH:MM
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        timeText.textContent = formattedTime;

        // 2. Determine Period & Theme
        let period = '';
        let theme = '';

        if (hours < 6) {
            period = '새벽';
            theme = THEMES.morning;
        } else if (hours < 12) {
            period = '오전';
            theme = THEMES.day;
        } else if (hours < 18) {
            period = '오후';
            theme = THEMES.evening;
        } else {
            period = '저녁/밤';
            theme = THEMES.night;
        }

        periodText.textContent = `당신의 ${period}`;
        body.style.background = theme;

        // 3. Get Message
        const message = MESSAGES.find(m => age < m.max) || MESSAGES[MESSAGES.length - 1];
        messageText.textContent = message.msg;
    }

    function resetClock() {
        timeText.textContent = "--:--";
        periodText.textContent = "안녕!";
        messageText.textContent = "나이를 입력하면 당신의 시간이 보입니다.";
        body.style.background = THEMES.morning; // Default
    }

    // Input Event Listener
    ageInput.addEventListener('input', (e) => {
        updateClock(e.target.value);
    });
});
