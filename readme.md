/vanilla-os-desktop/
│
├── index.html
├── css/
│   ├── base.css        // Common layout styles
│   ├── theme-light.css // Theme A
│   ├── theme-dark.css  // Theme B
│   └── theme-mac.css   // Optional
├── js/
│   ├── main.js               // Initialization, global events
│   ├── windowManager.js      // Handle windows stack, z-index, open/close
│   ├── taskbar.js            // Clock, open window buttons
│   ├── contextMenu.js        // Right-click menu logic
│   ├── fileSystem.js         // Folder, file management logic
│   ├── apps/
│   │   ├── explorer.js
│   │   ├── notes.js
│   │   └── terminal.js
├── assets/
│   ├── icons/
│   └── wallpapers/
├── data/
│   └── defaultStructure.json  // Initial folders & files
├── README.md
