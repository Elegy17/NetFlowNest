// 动态彩虹渐变 - 增强无限色版 (修复版)
(function () {
    const msgbox = document.querySelector('div.msgholderBox');
    
    // 获取当前用户ID (关键修复)
    const uid = window.__IIROSE_VARS__?.user?.id || 
                document.querySelector('div.myinfoBox')?.getAttribute('data-uid') ||
                'default_uid';

    // 动态HSL参数
    let currentHue = Math.random() * 360; // 随机起始色相
    let hueDirection = Math.random() > 0.5 ? 1 : -1; // 随机色相变化方向
    const baseSaturation = 85; // 固定高饱和度
    const baseLightness = 70; // 固定中等亮度

    // 更健壮的HSL转十六进制函数
    function hslToHex(h, s, l) {
        h = h % 360;
        s = Math.min(100, Math.max(0, s)) / 100;
        l = Math.min(100, Math.max(0, l)) / 100;
        
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        
        let r, g, b;
        if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
        else if (h < 120) [r, g, b] = [x, c, 0];
        else if (h < 180) [r, g, b] = [0, c, x];
        else if (h < 240) [r, g, b] = [0, x, c];
        else if (h < 300) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];
        
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
    }

    // 获取下一个渐变色 (简化版)
    function getNextGradientColor() {
        // 随机色相变化 (15-90度)
        const hueChange = 15 + Math.random() * 75;
        currentHue = (currentHue + hueChange * hueDirection) % 360;
        
        // 随机改变方向 (15%概率)
        if (Math.random() < 0.15) hueDirection *= -1;

        // 波浪效果参数
        const time = Date.now() / 3000; // 3秒周期
        const wave = Math.sin(time) * 0.3 + 0.7;
        
        // 动态调整亮度和饱和度
        const saturation = baseSaturation * (0.8 + 0.2 * Math.sin(time * 1.5));
        const lightness = baseLightness * (0.7 + 0.3 * Math.cos(time * 0.8));
        
        return hslToHex(currentHue, saturation, lightness);
    }

    // 观察消息变化
    const msgOB = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // ELEMENT_NODE
                    const msgId = node.getAttribute('data-id');
                    if (msgId && msgId.startsWith(uid)) {
                        // 设置气泡颜色
                        const content = node.querySelector('.msg-content');
                        if (content) {
                            const newColor = getNextGradientColor();
                            content.style.backgroundColor = newColor;
                        }
                    }
                }
            });
        });
    });

    msgOB.observe(msgbox, { 
        childList: true, 
        subtree: true 
    });

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        [data-id^="${uid}_"] .msg-content {
            transition: background-color 0.7s ease-out !important;
            background-blend-mode: overlay;
            box-shadow: 0 2px 6px rgba(0,0,0,0.08);
            border-radius: 12px !important;
        }
        [data-id^="${uid}_"] .msg-content:hover {
            filter: brightness(1.06) saturate(1.1);
            transform: translateY(-1px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.12);
        }
    `;
    document.head.appendChild(style);
})();