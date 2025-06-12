// 随机颜色变换
(function () {
    const msgbox = document.querySelector('div.msgholderBox');
    
    // 生成随机十六进制颜色
    function getRandomColor() {
        return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }
    
    // 确保颜色不会太暗（可选）
    function getBrightRandomColor() {
        let color;
        do {
            color = getRandomColor();
            // 计算亮度 (0-255)
            const r = parseInt(color.substr(0, 2), 16);
            const g = parseInt(color.substr(2, 2), 16);
            const b = parseInt(color.substr(4, 2), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        } while (brightness < 128); // 确保亮度不低于128
        
        return color;
    }

    const msgOB = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const userId = node.getAttribute('data-id')?.split('_')[0];
                    if (userId && userId == uid) {
                        inputcolorhex = getRandomColor(); // 或使用 getBrightRandomColor()
                        break;
                    }
                }
            }
        }
    });

    msgOB.observe(msgbox, { 
        childList: true, 
        subtree: true // 添加subtree以更好地检测嵌套变化
    });
})();
