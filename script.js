// 显示当前日期
function showCurrentDate() {
    const date = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long' 
    };
    document.getElementById('currentDate').textContent = 
        date.toLocaleDateString('zh-CN', options);
}

// 页面加载时显示日期
document.addEventListener('DOMContentLoaded', showCurrentDate);

// 保存按钮点击事件
document.querySelector('.save-btn').addEventListener('click', function() {
    const content = document.querySelector('textarea').value;
    if (content.trim() !== '') {
        saveDiary(content);
        document.querySelector('textarea').value = '';
    }
});

// 保存日记
function saveDiary(content) {
    const date = new Date();
    const diaryEntry = {
        content: content,
        date: date.toISOString(),
    };
    
    // 获取现有日记
    let diaries = JSON.parse(localStorage.getItem('diaries') || '[]');
    diaries.unshift(diaryEntry);
    
    // 保存到本地存储
    localStorage.setItem('diaries', JSON.stringify(diaries));
    
    // 更新显示
    displayDiaries();
}

// 显示日记列表
function displayDiaries() {
    const diaries = JSON.parse(localStorage.getItem('diaries') || '[]');
    const container = document.querySelector('.entry-cards');
    container.innerHTML = '';
    
    diaries.forEach(diary => {
        const date = new Date(diary.date);
        const card = document.createElement('div');
        card.className = 'diary-card';
        card.innerHTML = `
            <div class="diary-date">${date.toLocaleDateString('zh-CN')}</div>
            <div class="diary-content">${diary.content}</div>
        `;
        container.appendChild(card);
    });
}

// 页面加载时显示已有日记
document.addEventListener('DOMContentLoaded', displayDiaries); 