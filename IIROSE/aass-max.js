(function () {
    const msgbox = document.querySelector('div.msgholderBox');
    
    // 超级丰富的彩虹渐变序列（12色系×5阶，共60色）
    const rainbowGradient = [
        // 浅粉色系
        'FFF0F5', 'FFD6E7', 'FFBCD9', 'FFA2CB', 'FF88BD',
        // 珊瑚色系
        'FFEEE8', 'FFD9CC', 'FFC4B0', 'FFAF94', 'FF9A78',
        // 浅橙色系
        'FFF0E0', 'FFE0C2', 'FFD0A4', 'FFC086', 'FFB068',
        // 浅黄色系
        'FFFDEB', 'FFFBD8', 'FFF9C5', 'FFF7B2', 'FFF59F',
        // 浅黄绿色系
        'F5FFEB', 'E6FFD6', 'D7FFC1', 'C8FFAC', 'B9FF97',
        // 浅绿色系
        'E8FFEE', 'CCFFD9', 'B0FFC4', '94FFAF', '78FF9A',
        // 浅蓝绿色系
        'E8FFFF', 'CCFFFF', 'B0FFFF', '94FFFF', '78FFFF',
        // 浅蓝色系
        'E8F4FF', 'CCE9FF', 'B0DEFF', '94D3FF', '78C8FF',
        // 浅靛蓝色系
        'F0E8FF', 'E1CCFF', 'D2B0FF', 'C394FF', 'B478FF',
        // 浅紫色系
        'F5E8FF', 'EBCCFF', 'E1B0FF', 'D794FF', 'CD78FF',
        // 浅紫红色系
        'FFE8F9', 'FFCCF3', 'FFB0ED', 'FF94E7', 'FF78E1',
        // 浅红色系
        'FFE8E8', 'FFCCCC', 'FFB0B0', 'FF9494', 'FF7878',
        
        // 中等饱和度色系（保持渐变）
        // 粉红色系
        'FFC0CB', 'FFA8B8', 'FF90A5', 'FF7892', 'FF607F',
        // 橙色系
        'FFB380', 'FFA266', 'FF914C', 'FF8133', 'FF7019',
        // 黄色系
        'FFFF99', 'FFFF80', 'FFFF66', 'FFFF4D', 'FFFF33',
        // 绿色系
        '99FF99', '80FF80', '66FF66', '4DFF4D', '33FF33',
        // 蓝绿色系
        '99FFFF', '80FFFF', '66FFFF', '4DFFFF', '33FFFF',
        // 蓝色系
        '99CCFF', '80B8FF', '66A3FF', '4D8FFF', '337AFF',
        // 靛蓝色系
        'CC99FF', 'B880FF', 'A366FF', '8F4DFF', '7A33FF',
        // 紫色系
        'E099FF', 'D680FF', 'CC66FF', 'C34DFF', 'B933FF',
        // 紫红色系
        'FF99FF', 'FF80FF', 'FF66FF', 'FF4DFF', 'FF33FF',
        // 红色系
        'FF9999', 'FF8080', 'FF6666', 'FF4D4D', 'FF3333'
    ];
    
    let colorIndex = 0;
    
    function getNextRainbowColor() {
        const color = rainbowGradient[colorIndex];
        colorIndex = (colorIndex + 1) % rainbowGradient.length;
        return color;
    }

    const msgOB = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const userId = node.getAttribute('data-id')?.split('_')[0];
                    if (userId && userId == uid) {
                        inputcolorhex = getNextRainbowColor();
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

    // 预加载颜色样式
    const style = document.createElement('style');
    style.textContent = `
        [data-id^="${uid}_"] .msg-content {
            transition: background-color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
})();
