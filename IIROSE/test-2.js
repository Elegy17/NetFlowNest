// 动态彩虹渐变 (屏蔽绿色)
(function () {
    const msgbox = document.querySelector('div.msgholderBox');

    // 定义绿色屏蔽范围
    const GREEN_MIN = 80;   // 绿色起始色相
    const GREEN_MAX = 160;  // 绿色结束色相

    // HSL色彩模式参数
    let currentHue = getNonGreenHue(); // 初始非绿色色相
    const saturation = 80 + Math.random() * 20; // 饱和度 80-100%
    const lightness = 70 + Math.random() * 15; // 亮度 70-85% (保持浅色调)
    const hueStep = 10 + Math.random() * 5; // 色相变化步长 10-15度

    // 生成非绿色的初始色相
    function getNonGreenHue() {
        let hue;
        do {
            hue = Math.random() * 360;
        } while (hue >= GREEN_MIN && hue <= GREEN_MAX); // 确保不在绿色范围
        return hue;
    }

    // HSL转十六进制颜色
    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `${f(0)}${f(8)}${f(4)}`.toUpperCase();
    }

    // 获取下一个渐变色（跳过绿色）
    function getNextGradientColor() {
        let nextHue;
        do {
            currentHue = (currentHue + hueStep) % 360;
            nextHue = currentHue;
        } while (nextHue >= GREEN_MIN && nextHue <= GREEN_MAX); // 跳过绿色范围

        // 动态调整亮度和饱和度，创造波浪效果
        const waveFactor = Math.sin(Date.now() / 5000) * 0.2 + 0.8;
        const currentLightness = lightness * waveFactor;
        const currentSaturation = saturation * (1.2 - waveFactor);

        return hslToHex(nextHue, currentSaturation, currentLightness);
    }

    // 观察消息变化
    const msgOB = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const userId = node.getAttribute('data-id')?.split('_')[0];
                    if (userId && userId == uid) {
                        inputcolorhex = getNextGradientColor();
                        break;
                    }
                }
            }
        }
    });

    msgOB.observe(msgbox, { 
        childList: true, 
        subtree: true
    });

    // 添加平滑过渡效果
    const style = document.createElement('style');
    style.textContent = `
        [data-id^="${uid}_"] .msg-content {
            transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            background-blend-mode: overlay;
        }
        [data-id^="${uid}_"] .msg-content:hover {
            filter: brightness(105%);
        }
    `;
    document.head.appendChild(style);

    // 初始随机颜色
    inputcolorhex = getNextGradientColor();
})();