// 动态彩虹渐变 - 无限随机色版
(function () {
    const msgbox = document.querySelector('div.msgholderBox');

    // 动态HSL参数
    let currentHue = Math.random() * 360; // 随机起始色相
    const baseSaturation = 85; // 固定高饱和度
    const baseLightness = 70; // 固定中等亮度
    let hueDirection = Math.random() > 0.5 ? 1 : -1; // 随机色相变化方向

    // HSL转十六进制颜色 (优化版)
    function hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
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
            const hex = Math.round(x * 255).toString(16).padStart(2, '0');
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    }

    // 获取下一个渐变色 (完全随机化)
    function getNextGradientColor() {
        // 随机色相变化 (30-150度)
        const hueChange = 30 + Math.random() * 120;
        currentHue = (currentHue + hueChange * hueDirection) % 360;
        
        // 随机改变方向 (15%概率)
        if (Math.random() < 0.15) hueDirection *= -1;

        // 时间因子用于波浪效果
        const time = Date.now() / 3000;
        
        // 创建复合波形
        const waveFactor = 0.7 + 0.3 * (
            Math.sin(time) * 0.5 + 
            Math.cos(time * 0.7) * 0.3 +
            Math.sin(time * 1.5) * 0.2
        );

        // 动态调整亮度和饱和度
        const saturation = baseSaturation * (0.8 + 0.2 * Math.sin(time * 1.2));
        const lightness = baseLightness * (0.7 + 0.3 * Math.cos(time * 0.8));

        return hslToHex(currentHue, saturation, lightness);
    }

    // 观察消息变化 (直接设置背景色)
    const msgOB = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const userId = node.getAttribute('data-id')?.split('_')[0];
                    if (userId && userId == uid) {
                        const content = node.querySelector('.msg-content');
                        if (content) {
                            content.style.backgroundColor = getNextGradientColor();
                        }
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
            transition: background-color 0.7s cubic-bezier(0.33, 1, 0.68, 1) !important;
            background-blend-mode: overlay;
            border-radius: 10px !important;
        }
        [data-id^="${uid}_"] .msg-content:hover {
            filter: brightness(108%);
            transform: translateY(-1px);
        }
    `;
    document.head.appendChild(style);

    // 初始随机颜色
    inputcolorhex = getNextGradientColor();
})();