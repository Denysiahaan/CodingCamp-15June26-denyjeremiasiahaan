// ========================================
// SETTINGS & THEME MANAGEMENT
// ========================================

let settings = {
    userName: '',
    timerDuration: 25,
    darkMode: false
};

function loadSettings() {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
    }
    applySettings();
}

function saveSettings() {
    localStorage.setItem('settings', JSON.stringify(settings));
}

function applySettings() {
    // Apply dark mode
    if (settings.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    // Apply timer duration
    if (!isTimerRunning) {
        remainingSeconds = settings.timerDuration * 60;
        totalSeconds = settings.timerDuration * 60;
        updateTimerDisplay();
    }
}

function toggleTheme() {
    settings.darkMode = !settings.darkMode;
    saveSettings();
    applySettings();
    showSuccessMessage(settings.darkMode ? 'Dark mode enabled' : 'Light mode enabled');
}

function showSuccessMessage(message) {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageEl = document.createElement('div');
    messageEl.className = 'success-message';
    messageEl.textContent = message;
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.remove();
    }, 2000);
}

function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    const nameInput = document.getElementById('user-name');
    const durationInput = document.getElementById('timer-duration');
    
    nameInput.value = settings.userName;
    durationInput.value = settings.timerDuration;
    
    modal.classList.add('active');
}

function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    modal.classList.remove('active');
}

function saveSettingsFromModal() {
    const nameInput = document.getElementById('user-name');
    const durationInput = document.getElementById('timer-duration');
    
    settings.userName = nameInput.value.trim();
    settings.timerDuration = parseInt(durationInput.value) || 25;
    
    if (settings.timerDuration < 1) settings.timerDuration = 1;
    if (settings.timerDuration > 60) settings.timerDuration = 60;
    
    saveSettings();
    applySettings();
    closeSettingsModal();
    updateGreeting();
    showSuccessMessage('Settings saved!');
}

function initSettings() {
    loadSettings();
    
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('set-name-btn').addEventListener('click', openSettingsModal);
    document.getElementById('change-duration-btn').addEventListener('click', openSettingsModal);
    document.getElementById('close-settings').addEventListener('click', closeSettingsModal);
    document.getElementById('save-settings').addEventListener('click', saveSettingsFromModal);
    
    // Close modal on outside click
    document.getElementById('settings-modal').addEventListener('click', (e) => {
        if (e.target.id === 'settings-modal') {
            closeSettingsModal();
        }
    });
}

// ========================================
// GREETING FUNCTIONALITY
// ========================================

function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const greetingElement = document.getElementById('greeting');
    
    let greetingMessage;
    if (hour >= 5 && hour < 12) {
        greetingMessage = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
        greetingMessage = 'Good afternoon';
    } else if (hour >= 17 && hour < 21) {
        greetingMessage = 'Good evening';
    } else {
        greetingMessage = 'Good night';
    }
    
    // Add custom name if set
    if (settings.userName) {
        greetingMessage += `, ${settings.userName}`;
    }
    
    greetingElement.textContent = greetingMessage + '.';
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('current-time').textContent = timeString;
}

function updateDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    }).toUpperCase();
    document.getElementById('current-date').textContent = dateString;
}

// Update greeting, time and date every second
function initGreeting() {
    updateGreeting();
    updateTime();
    updateDate();
    setInterval(() => {
        updateGreeting();
        updateTime();
    }, 1000);
}

// ========================================
// FOCUS TIMER FUNCTIONALITY
// ========================================

let timerInterval = null;
let remainingSeconds = 25 * 60;
let totalSeconds = 25 * 60;
let isTimerRunning = false;

function updateTimerDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    
    document.getElementById('timer-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('timer-seconds').textContent = String(seconds).padStart(2, '0');
    
    // Update progress bar
    const progressPercent = (remainingSeconds / totalSeconds) * 100;
    document.getElementById('timer-progress-bar').style.width = progressPercent + '%';
}

function startTimer() {
    if (isTimerRunning) return;
    
    isTimerRunning = true;
    timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateTimerDisplay();
        } else {
            stopTimer();
            showSuccessMessage('⏰ Focus session complete!');
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Focus Dash', {
                    body: 'Focus session complete! Time for a break.',
                });
            }
        }
    }, 1000);
}

function stopTimer() {
    isTimerRunning = false;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    remainingSeconds = settings.timerDuration * 60;
    totalSeconds = settings.timerDuration * 60;
    updateTimerDisplay();
}

function initTimer() {
    remainingSeconds = settings.timerDuration * 60;
    totalSeconds = settings.timerDuration * 60;
    updateTimerDisplay();
    
    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('stop-timer').addEventListener('click', stopTimer);
    document.getElementById('reset-timer').addEventListener('click', resetTimer);
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// ========================================
// TO-DO LIST FUNCTIONALITY
// ========================================

let todos = [];
let currentSort = 'default';

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateTodoStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    
    document.getElementById('todo-count').textContent = `${total} task${total !== 1 ? 's' : ''}`;
    document.getElementById('todo-completed').textContent = `${completed} completed`;
}

function sortTodos() {
    const sortedTodos = [...todos];
    
    switch (currentSort) {
        case 'alphabetical':
            sortedTodos.sort((a, b) => a.text.localeCompare(b.text));
            break;
        case 'completed':
            sortedTodos.sort((a, b) => {
                if (a.completed === b.completed) return 0;
                return a.completed ? 1 : -1;
            });
            break;
        case 'active':
            sortedTodos.sort((a, b) => {
                if (a.completed === b.completed) return 0;
                return a.completed ? 1 : -1;
            });
            break;
        default:
            // Keep original order
            break;
    }
    
    return sortedTodos;
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    const todoEmpty = document.getElementById('todo-empty');
    todoList.innerHTML = '';
    
    const sortedTodos = sortTodos();
    
    if (sortedTodos.length === 0) {
        todoEmpty.style.display = 'block';
        todoList.style.display = 'none';
    } else {
        todoEmpty.style.display = 'none';
        todoList.style.display = 'block';
        
        sortedTodos.forEach((todo) => {
            const originalIndex = todos.findIndex(t => t.id === todo.id);
            const li = document.createElement('li');
            li.className = `todo-item${todo.completed ? ' completed' : ''}`;
            
            // Create checkbox
            const todoLeft = document.createElement('div');
            todoLeft.className = 'todo-left';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'todo-checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleTodo(originalIndex));
            
            const todoText = document.createElement('span');
            todoText.className = 'todo-text';
            todoText.textContent = todo.text;
            
            todoLeft.appendChild(checkbox);
            todoLeft.appendChild(todoText);
            
            // Create action buttons
            const todoActions = document.createElement('div');
            todoActions.className = 'todo-actions';
            
            const editBtn = document.createElement('button');
            editBtn.className = 'btn-icon';
            editBtn.innerHTML = '✏️';
            editBtn.title = 'Edit';
            editBtn.addEventListener('click', () => editTodo(originalIndex));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-icon';
            deleteBtn.innerHTML = '🗑️';
            deleteBtn.title = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTodo(originalIndex));
            
            todoActions.appendChild(editBtn);
            todoActions.appendChild(deleteBtn);
            
            li.appendChild(todoLeft);
            li.appendChild(todoActions);
            todoList.appendChild(li);
        });
    }
    
    updateTodoStats();
}

function checkDuplicateTodo(text) {
    const normalizedText = text.trim().toLowerCase();
    return todos.some(todo => todo.text.trim().toLowerCase() === normalizedText);
}

function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    
    if (text === '') {
        showSuccessMessage('⚠️ Please enter a task');
        input.focus();
        return;
    }
    
    // Check for duplicates
    if (checkDuplicateTodo(text)) {
        showSuccessMessage('⚠️ This task already exists!');
        return;
    }
    
    todos.push({
        id: Date.now(),
        text: text,
        completed: false
    });
    
    input.value = '';
    saveTodos();
    renderTodos();
    showSuccessMessage('✅ Task added!');
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function editTodo(index) {
    const newText = prompt('Edit task:', todos[index].text);
    if (newText !== null && newText.trim() !== '') {
        const trimmedText = newText.trim();
        
        // Check if the new text is a duplicate (excluding current task)
        const isDuplicate = todos.some((todo, i) => 
            i !== index && todo.text.trim().toLowerCase() === trimmedText.toLowerCase()
        );
        
        if (isDuplicate) {
            showSuccessMessage('⚠️ This task already exists!');
            return;
        }
        
        todos[index].text = trimmedText;
        saveTodos();
        renderTodos();
        showSuccessMessage('✏️ Task updated!');
    }
}

function deleteTodo(index) {
    if (confirm('Delete this task?')) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
        showSuccessMessage('🗑️ Task deleted!');
    }
}

function changeSortOrder() {
    const sortSelect = document.getElementById('sort-todos');
    currentSort = sortSelect.value;
    renderTodos();
}

function initTodoList() {
    loadTodos();
    
    document.getElementById('add-todo').addEventListener('click', addTodo);
    document.getElementById('todo-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    document.getElementById('sort-todos').addEventListener('change', changeSortOrder);
}

// ========================================
// QUICK LINKS FUNCTIONALITY
// ========================================

let links = [];

function loadLinks() {
    const savedLinks = localStorage.getItem('links');
    if (savedLinks) {
        links = JSON.parse(savedLinks);
    }
    renderLinks();
}

function saveLinks() {
    localStorage.setItem('links', JSON.stringify(links));
}

function getIconForLink(url) {
    const domain = url.toLowerCase();
    if (domain.includes('google')) return '🔍';
    if (domain.includes('gmail')) return '📧';
    if (domain.includes('github')) return '💻';
    if (domain.includes('youtube')) return '▶️';
    if (domain.includes('twitter') || domain.includes('x.com')) return '🐦';
    if (domain.includes('facebook')) return '👥';
    if (domain.includes('instagram')) return '📷';
    if (domain.includes('linkedin')) return '💼';
    if (domain.includes('netflix')) return '🎬';
    if (domain.includes('spotify')) return '🎵';
    return '🔗';
}

function renderLinks() {
    const linksContainer = document.getElementById('links-container');
    linksContainer.innerHTML = '';
    
    links.forEach((link, index) => {
        const linkItem = document.createElement('a');
        linkItem.href = link.url;
        linkItem.target = '_blank';
        linkItem.className = 'link-item';
        linkItem.rel = 'noopener noreferrer';
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'link-delete';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', (event) => deleteLink(event, index));
        
        // Create icon
        const iconDiv = document.createElement('div');
        iconDiv.className = 'link-icon';
        iconDiv.textContent = getIconForLink(link.url);
        
        // Create name
        const nameDiv = document.createElement('div');
        nameDiv.className = 'link-name';
        nameDiv.textContent = link.name;
        
        linkItem.appendChild(deleteBtn);
        linkItem.appendChild(iconDiv);
        linkItem.appendChild(nameDiv);
        
        linksContainer.appendChild(linkItem);
    });
}

function openLinkModal() {
    const modal = document.getElementById('link-modal');
    const nameInput = document.getElementById('link-name-input');
    const urlInput = document.getElementById('link-url-input');
    
    nameInput.value = '';
    urlInput.value = '';
    
    modal.classList.add('active');
}

function closeLinkModal() {
    const modal = document.getElementById('link-modal');
    modal.classList.remove('active');
}

function addLink() {
    const nameInput = document.getElementById('link-name-input');
    const urlInput = document.getElementById('link-url-input');
    
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    
    if (name === '' || url === '') {
        showSuccessMessage('⚠️ Please enter both name and URL');
        return;
    }
    
    // Basic URL validation
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        showSuccessMessage('⚠️ URL must start with http:// or https://');
        return;
    }
    
    links.push({
        name: name,
        url: url
    });
    
    saveLinks();
    renderLinks();
    closeLinkModal();
    showSuccessMessage('✅ Link added!');
}

function deleteLink(event, index) {
    event.preventDefault();
    event.stopPropagation();
    
    if (confirm('Delete this link?')) {
        links.splice(index, 1);
        saveLinks();
        renderLinks();
        showSuccessMessage('🗑️ Link deleted!');
    }
}

function initQuickLinks() {
    loadLinks();
    
    document.getElementById('add-link-btn').addEventListener('click', openLinkModal);
    document.getElementById('save-link').addEventListener('click', addLink);
    document.getElementById('close-link-modal').addEventListener('click', closeLinkModal);
    
    // Close modal on outside click
    document.getElementById('link-modal').addEventListener('click', (e) => {
        if (e.target.id === 'link-modal') {
            closeLinkModal();
        }
    });
    
    document.getElementById('link-url-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addLink();
        }
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// INITIALIZE APP
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initSettings();
    initGreeting();
    initTimer();
    initTodoList();
    initQuickLinks();
});
