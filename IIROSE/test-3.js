// 动态彩虹渐变 - 增强无限色版
(function () {
    const msgbox = document.querySelector('div.msgholderBox');

    // 动态HSL参数
    let currentHue = Math.random() * 360; // 随机起始色相
    let hueDirection = Math.random() > 0.5 ? 1 : -1; // 随机色相变化方向
    const baseSaturation = 85 + Math.random() * 15; // 基础饱和度 85-100%
    const baseLightness = 60 + Math.random() * 20; // 基础亮度 60-80%

    // HSL转十六进制颜色 (优化算法)
    function hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // 灰度
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        const toHex = x => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    }

    // 获取下一个渐变色 (完全随机化)
    function getNextGradientColor() {
        // 随机化色相变化 (30-150度之间随机变化)
        const hueChange = 30 + Math.random() * 120;
        currentHue = (currentHue + hueChange * hueDirection) % 360;
        
        // 随机改变方向 (10%概率)
        if (Math.random() < 0.1) hueDirection *= -1;

        // 增强波浪效果
        const timeFactor = Date.now() / 4000;
        const waveFactor = 0.7 + 0.3 * (
            Math.sin(timeFactor) * 0.6 + 
            Math.cos(timeFactor * 0.7) * 0.4
        );

        // 动态饱和度和亮度 (更大的变化范围)
        const saturation = baseSaturation * (0.8 + 0.2 * Math.sin(timeFactor * 1.2));
        const lightness = baseLightness * (0.7 + 0.3 * Math.cos(timeFactor * 0.8));

        return hslToHex(currentHue, saturation, lightness);
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

    // 增强平滑过渡效果
    const style = document.createElement('style');
    style.textContent = `
        [data-id^="${uid}_"] .msg-content {
            transition: 
                background-color 0.7s cubic-bezier(0.33, 1, 0.68, 1),
                box-shadow 0.4s ease;
            background-blend-mode: overlay;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        [data-id^="${uid}_"] .msg-content:hover {
            filter: brightness(1.08) saturate(1.2);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
    `;
    document.head.appendChild(style);

    // 初始随机颜色
    inputcolorhex = getNextGradientColor();
})();