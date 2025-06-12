(function () {
    // 获取当前用户ID（假设已存在）
    const uid = window.uid || '';
    // 获取消息容器
    const msgbox = document.querySelector('div.msgholderBox');
    
    // 生成随机但美观的颜色函数
    function getRandomColor() {
        // 使用HSL色彩模式生成更协调的颜色
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70 + Math.floor(Math.random() * 30); // 70-100%
        const lightness = 50 + Math.floor(Math.random() * 20); // 50-70%
        
        // 转换HSL到HEX
        const hslToHex = (h, s, l) => {
            l /= 100;
            const a = s * Math.min(l, 1 - l) / 100;
            const f = n => {
                const k = (n + h / 30) % 12;
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color).toString(16).padStart(2, '0');
            };
            return `${f(0)}${f(8)}${f(4)}`;
        };
        
        return hslToHex(hue, saturation, lightness);
    }
    
    // 获取每日颜色标识（每天一个主色调）
    function getDailyColorSeed() {
        const today = new Date().toDateString();
        let seed = localStorage.getItem('dailyColorSeed');
        let storedDate = localStorage.getItem('dailyColorDate');
        
        // 如果是新的一天则生成新种子
        if (storedDate !== today || !seed) {
            seed = Math.floor(Math.random() * 360); // 0-359的色相值
            localStorage.setItem('dailyColorSeed', seed);
            localStorage.setItem('dailyColorDate', today);
        }
        
        return parseInt(seed);
    }
    
    // 基于每日种子生成变体颜色
    function getDailyVariantColor() {
        const baseHue = getDailyColorSeed();
        const hueVariation = 30; // 允许的色相变化范围
        
        // 在基础色相附近随机变化
        const hue = (baseHue + Math.floor(Math.random() * hueVariation * 2) - hueVariation) % 360;
        const saturation = 70 + Math.floor(Math.random() * 20); // 70-90%
        const lightness = 50 + Math.floor(Math.random() * 20); // 50-70%
        
        // 转换HSL到HEX
        const hslToHex = (h, s, l) => {
            l /= 100;
            const a = s * Math.min(l, 1 - l) / 100;
            const f = n => {
                const k = (n + h / 30) % 12;
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color).toString(16).padStart(2, '0');
            };
            return `${f(0)}${f(8)}${f(4)}`;
        };
        
        return hslToHex(hue, saturation, lightness);
    }
    
    // 创建MutationObserver监听消息变化
    const msgOB = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                // 确保是元素节点且有data-id属性
                if (node.nodeType === 1 && node.hasAttribute('data-id')) {
                    const userId = node.getAttribute('data-id').split('_')[0];
                    // 如果是当前用户的消息
                    if (uid === userId) {
                        // 获取颜色（每日基础色+随机变体）
                        const bubbleColor = getDailyVariantColor();
                        
                        // 设置消息气泡样式
                        node.style.backgroundColor = `#${bubbleColor}`;
                        node.style.color = '#ffffff'; // 文字颜色
                        node.style.borderRadius = '12px'; // 圆角
                        node.style.padding = '8px 12px'; // 内边距
                        node.style.margin = '4px 0'; // 外边距
                        node.style.maxWidth = '80%'; // 最大宽度
                        node.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)'; // 阴影
                        
                        // 添加平滑过渡效果
                        node.style.transition = 'all 0.3s ease';
                        
                        // 存储颜色到data属性
                        node.setAttribute('data-bubble-color', bubbleColor);
                        node.setAttribute('data-message-time', new Date().toISOString());
                    }
                }
            });
        });
    });
    
    // 开始观察消息容器
    if (msgbox) {
        msgOB.observe(msgbox, { 
            childList: true, 
            subtree: true // 监听子树变化
        });
    } else {
        console.warn('消息容器 div.msgholderBox 未找到');
    }
    
    // 添加样式到页面头部
    const style = document.createElement('style');
    style.textContent = `
        [data-bubble-color] {
            transition: all 0.3s ease !important;
        }
        [data-bubble-color]:hover {
            transform: scale(1.02) !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.15) !important;
        }
    `;
    document.head.appendChild(style);
})();
