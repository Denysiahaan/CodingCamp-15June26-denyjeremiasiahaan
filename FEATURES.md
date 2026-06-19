# 🎯 Productivity Dashboard - Feature Guide

## 🚀 Quick Start

1. Open `index.html` in your browser
2. Click the **gear icon (⚙️)** to open settings
3. Enter your name and set your preferred timer duration
4. Click the **moon icon (🌙)** to toggle dark mode

---

## ✨ New Features Added

### 1. 🌓 Light / Dark Mode Toggle
**Location:** Top-right corner (moon/sun icon)

**What it does:**
- Instantly switch between light and dark themes
- Preference saved automatically
- Beautiful color transitions
- Eye-friendly dark mode for night work

**Light Mode:**
- Purple gradient background
- Bright white cards
- High contrast for daytime use

**Dark Mode:**
- Deep blue gradient background
- Dark cards with reduced brightness
- Reduced eye strain for night use

---

### 2. 👤 Custom Name in Greeting
**Location:** Settings modal (gear icon)

**What it does:**
- Personalize your greeting message
- Shows "Good Morning, [Your Name]"
- Name persists across sessions
- Optional - works without a name too

**Example:**
- Without name: "Good Morning"
- With name: "Good Morning, Alex"

---

### 3. ⏱️ Customizable Pomodoro Timer
**Location:** Settings modal (gear icon)

**What it does:**
- Set timer duration from 1 to 60 minutes
- Visual progress bar shows completion
- Settings saved for future sessions
- Perfect for different work styles

**Features:**
- Progress bar fills as time passes
- Browser notification on completion
- Start/Stop/Reset controls
- Large digital display

---

### 4. 🚫 Duplicate Task Prevention
**Location:** To-Do List section

**What it does:**
- Detects identical tasks (case-insensitive)
- Shows warning message
- Prevents clutter in your task list
- Visual shake animation on duplicate attempt

**How it works:**
- Try adding "Buy groceries" twice
- System warns: "⚠️ This task already exists!"
- Also works when editing tasks

---

### 5. 📊 Task Sorting Options
**Location:** To-Do List section (dropdown menu)

**Sorting Options:**

**Default Order**
- Tasks shown in creation order
- Most recent at bottom

**Alphabetical (A-Z)**
- Tasks sorted by name
- Easy to find specific tasks

**Completed Last**
- Active tasks shown first
- Completed tasks at bottom
- Focus on what needs to be done

**Active First**
- Same as "Completed Last"
- Keeps uncompleted tasks visible

---

## 📊 Task Statistics

**Location:** Above task list

**What it shows:**
- Total number of tasks
- Number of completed tasks
- Updates in real-time

**Example:**
- "5 tasks" | "2 completed"

---

## 💡 UI/UX Improvements

### Visual Enhancements
✅ Smooth fade-in animations on page load
✅ Hover effects on all interactive elements
✅ Success toast messages for user actions
✅ Modal with smooth transitions
✅ Progress bar animation
✅ Gradient text effects
✅ Card hover lift effects

### User Experience
✅ Keyboard support (Enter key to add tasks/links)
✅ Confirmation dialogs for destructive actions
✅ Input validation with helpful messages
✅ Auto-save on all changes
✅ Mobile-responsive design
✅ Accessible color contrast
✅ Focus states on all inputs

---

## 🎨 Color Schemes

### Light Mode
- Background: Purple to Pink gradient (#667eea → #764ba2)
- Cards: White with subtle transparency
- Text: Dark gray (#333)
- Accents: Purple tones

### Dark Mode
- Background: Dark blue gradient (#1a1a2e → #16213e)
- Cards: Dark blue-gray (rgba(30, 30, 46, 0.95))
- Text: Light gray (#e0e0e0)
- Accents: Purple tones (maintained)

---

## ⌨️ Keyboard Shortcuts

- **Enter** in task input → Add task
- **Enter** in link URL input → Add link
- **Escape** in settings modal → Close modal

---

## 📱 Mobile Responsive

The dashboard automatically adapts to small screens:
- Top bar reduces padding
- Single column layout for tasks
- Full-width quick links
- Touch-optimized button sizes
- Readable text sizes

---

## 🔔 Browser Notifications

**Timer Completion:**
- Desktop notification when Pomodoro completes
- Requires one-time permission grant
- Works even when tab is in background
- Fallback to toast message if denied

---

## 💾 Data Persistence

All settings and data are saved automatically:

**Settings Storage:**
```javascript
{
  userName: "Your Name",
  timerDuration: 25,
  darkMode: true
}
```

**Todo Storage:**
```javascript
[
  {
    id: 1234567890,
    text: "Complete project",
    completed: false
  }
]
```

**Links Storage:**
```javascript
[
  {
    name: "GitHub",
    url: "https://github.com"
  }
]
```

---

## 🎯 Best Practices

### For Maximum Productivity:
1. Set your name for motivation
2. Choose a timer duration that fits your focus span
3. Use dark mode for evening work
4. Sort tasks by "Active First" to focus on incomplete items
5. Keep links to frequently used resources
6. Review completed tasks regularly

### For Clean Task Management:
1. Use clear, actionable task names
2. Mark tasks complete as you finish them
3. Delete old/irrelevant tasks regularly
4. Use the alphabetical sort to find tasks quickly

---

## 🐛 Troubleshooting

**Dark mode not persisting?**
- Check if browser cookies/storage is enabled
- Clear cache and try again

**Notifications not working?**
- Grant notification permission when prompted
- Check browser notification settings

**Timer resets when closing browser?**
- This is expected behavior for privacy
- Timer state is not saved (by design)

**Tasks/Links disappearing?**
- Don't clear browser Local Storage
- Consider bookmarking the page
- Export data feature coming in future update

---

## 📄 Technical Details

**Built With:**
- Pure HTML5
- CSS3 with CSS Variables for theming
- Vanilla JavaScript (ES6+)
- Local Storage API
- Notification API

**Browser Support:**
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

**File Size:**
- HTML: ~3 KB
- CSS: ~10 KB
- JavaScript: ~8 KB
- Total: ~21 KB (uncompressed)

**Performance:**
- Load time: <100ms
- Interactive: Instant
- No external dependencies
- No network requests

---

## 🎉 Credits

Created with ❤️ for Coding Camp - June 2026

**Features:**
- ✅ Light/Dark mode toggle
- ✅ Custom name greeting
- ✅ Customizable Pomodoro timer
- ✅ Duplicate task prevention
- ✅ Task sorting (4 options)
- ✅ Beautiful animations
- ✅ Mobile responsive
- ✅ Local storage persistence
