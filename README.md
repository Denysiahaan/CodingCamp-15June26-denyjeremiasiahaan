# Productivity Dashboard

A clean, minimal productivity web application built with vanilla HTML, CSS, and JavaScript. This dashboard helps you stay focused and organized with time-based greetings, a Pomodoro timer, to-do list management, and quick access to your favorite websites.

## Features

### 🎨 Light / Dark Mode
- Beautiful light and dark themes
- Toggle with a single click
- Persistent theme preference
- Smooth transitions between modes
- Eye-friendly color schemes

### 👤 Personalized Greeting
- Set your custom name in settings
- Personalized greeting messages
- Real-time clock display (HH:MM:SS format)
- Current date with full weekday and month names
- Time-based greeting messages:
  - Good Morning (5:00 AM - 11:59 AM)
  - Good Afternoon (12:00 PM - 4:59 PM)
  - Good Evening (5:00 PM - 8:59 PM)
  - Good Night (9:00 PM - 4:59 AM)

### ⏱️ Customizable Focus Timer
- Configurable Pomodoro duration (1-60 minutes)
- Visual progress bar showing time remaining
- Start, Stop, and Reset controls
- Large, easy-to-read display
- Browser notification when session completes
- Persistent timer settings

### ✅ Smart To-Do List
- Add new tasks with duplicate detection
- Edit existing tasks
- Mark tasks as complete/incomplete
- Delete tasks with confirmation
- **Sort tasks by:**
  - Default order (creation time)
  - Alphabetical (A-Z)
  - Completed last
  - Active first
- Task statistics (total & completed count)
- Persistent storage using Local Storage
- Visual feedback and animations

### 🔗 Quick Links
- Add favorite websites with custom names
- Click to open links in new tabs
- Delete links with confirmation
- Persistent storage using Local Storage
- Responsive grid layout
- Animated hover effects

## Technical Stack

- **HTML5** - Structure and semantics
- **CSS3** - Styling with gradients and modern layouts
- **Vanilla JavaScript** - All functionality without frameworks
- **Local Storage API** - Client-side data persistence

## Project Structure

```
CodingCamp-15June26-denyjeremiasiahaan/
├── index.html          # Main HTML structure
├── css/
│   └── style.css       # All styles in one file
├── js/
│   └── app.js          # All JavaScript functionality
└── README.md           # Project documentation
```

## Installation & Usage

1. Clone or download this repository
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari)
3. No installation or build process required!

### Browser Compatibility
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Edge (latest)
- ✅ Safari (latest)

## Features in Detail

### Settings Modal
Access via the gear icon (⚙️) in the top bar:
- **Your Name**: Personalize your greeting message
- **Pomodoro Duration**: Set custom timer length (1-60 minutes)
- Settings persist across sessions

### Theme Toggle
Click the moon/sun icon (🌙/☀️) to instantly switch between:
- **Light Mode**: Clean purple gradients with white cards
- **Dark Mode**: Deep blue tones with dark cards for reduced eye strain

### Greeting Section
The greeting automatically updates based on the current time and displays:
- Dynamic greeting message with optional personalization
- Live clock updating every second
- Full date with day of week

### Focus Timer
A customizable Pomodoro-style timer to help you focus:
- Set your preferred duration in settings (default 25 minutes)
- Visual progress bar shows remaining time
- Start/Stop for pause functionality
- Reset to return to configured duration
- Browser notification when time is up (if permissions granted)

### To-Do List
Full CRUD functionality with smart features:
- **Create**: Add tasks via input field (Enter key or button)
- **Read**: View all tasks with completion status and stats
- **Update**: Edit task text, toggle completion checkbox
- **Delete**: Remove tasks with confirmation
- **Duplicate Prevention**: Warns when adding identical tasks
- **Sorting Options**:
  - Default order (as created)
  - Alphabetical (A-Z)
  - Completed last (active tasks first)
  - Active first (same as completed last)
- Real-time task statistics
- All changes saved automatically to Local Storage

### Quick Links
Manage your favorite websites:
- Add links with custom names and URLs
- URL validation (must include http:// or https://)
- Click cards to open websites in new tabs
- Animated hover effects
- Delete button on each card
- Links persist across browser sessions

## Data Storage

All data is stored locally in your browser using the Local Storage API:
- **Settings**: Theme preference, user name, timer duration under key `settings`
- **To-Do List**: Stored as JSON array under key `todos`
- **Quick Links**: Stored as JSON array under key `links`
- No server required
- Data persists until browser cache is cleared

## Design Philosophy

- **Simplicity**: Clean, intuitive interface with easy access to all features
- **Performance**: Fast load times, smooth animations, responsive interactions
- **Accessibility**: Clear visual hierarchy, readable typography, proper contrast ratios
- **Modern**: CSS variables for theming, gradient backgrounds, smooth transitions, card-based layouts
- **Customization**: User-controlled settings for personalization
- **Smart UX**: Duplicate prevention, visual feedback, success messages, confirmation dialogs

## UI/UX Enhancements

### Visual Feedback
- ✨ Smooth animations on all interactions
- 🎯 Hover effects on buttons and cards
- 📊 Visual progress bar for timer
- 📈 Real-time task statistics
- 💬 Success toast messages for actions
- ⚠️ Warning indicators for duplicates

### Animations
- Fade-in scale effect on greeting
- Slide-in animations for new tasks and links
- Smooth modal transitions
- Progress bar animation
- Shake effect for duplicate warnings
- Rotate effects on icon buttons

### Responsive Design
- Mobile-friendly layout
- Adaptive grid for quick links
- Collapsible sections on small screens
- Touch-optimized buttons and controls

## Future Enhancements (Not in MVP)

- Multiple timer presets (Pomodoro, short break, long break)
- Task categories/tags with color coding
- Task priority levels
- Export/import data as JSON
- Task search and filtering
- Keyboard shortcuts for quick actions
- Sound notifications with custom sounds
- Task deadline/due dates
- Recurring tasks
- Daily/weekly productivity statistics
- Drag-and-drop task reordering

## License

This project is open source and available for educational purposes.

## Author

Created as part of Coding Camp - June 2026
Mini Project
