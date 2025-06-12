// 彩虹渐变
(function () {
    const msgbox = document.querySelector('div.msgholderBox');
    
    // 彩虹色渐变序列（从浅到深）
    const rainbowGradient = [
        // 红色系
        'FFB3B3', 'FF8080', 'FF4D4D', 'FF1A1A', 'E60000',
        // 橙色系
        'FFD9B3', 'FFBF80', 'FFA64D', 'FF8C1A', 'E67300',
        // 黄色系
        'FFF2B3', 'FFEB80', 'FFE44D', 'FFDD1A', 'E6D600',
        // 绿色系
        'D9FFB3', 'C2FF80', 'ABFF4D', '94FF1A', '80E600',
        // 蓝色系
        'B3D9FF', '80C2FF', '4DABFF', '1A94FF', '0080E6',
        // 靛蓝色系
        'B3B3FF', '8080FF', '4D4DFF', '1A1AFF', '0000E6',
        // 紫色系
        'E0B3FF', 'CC80FF', 'B84DFF', 'A41AFF', '8C00E6'
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
})();
