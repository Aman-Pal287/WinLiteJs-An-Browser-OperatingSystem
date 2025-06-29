function contextMenu() {
    const refreashBtn = document.querySelector("#refreash-btn")
    const contextMenu = document.querySelector(".cursor-context-menu")
    refreashBtn.addEventListener('click', (e) => {
        console.log("hello");
        location.reload()
    })
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        // Cursor ki exact position pe set
        contextMenu.style.top = `${e.pageY}px`;
        contextMenu.style.left = `${e.pageX}px`;
        contextMenu.style.display = "block";
    });

    document.addEventListener('click', () => {
        const contextMenu = document.querySelector(".cursor-context-menu");
        contextMenu.style.display = "none";
    });


}
contextMenu()

function connectivityMenu() {
    const connectivityMenu = document.querySelector(".connectivity-menu")
    const connectivity = document.querySelector(".connectivity")
    let isMenuOpen = false;

    connectivity.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent body click

        if (!isMenuOpen) {
            connectivityMenu.style.display = "flex"
            isMenuOpen = true;
        } else {
            connectivityMenu.style.display = "none";
            isMenuOpen = false;
        }
    });



    // Brightness control functionality
    const brightnessSlider = document.getElementById('brightnessSlider');
    const brightnessValue = document.getElementById('brightnessValue');

    brightnessSlider.addEventListener('input', () => {
        const brightness = brightnessSlider.value;
        brightnessValue.textContent = `${brightness}%`;

        // Apply brightness to the whole OS UI (simulated)
        document.documentElement.style.filter = `brightness(${brightness}%)`;

        // Save to localStorage
        localStorage.setItem('brightness', brightness);
    });

    // Initialize brightness from saved value
    const savedBrightness = localStorage.getItem('brightness') || 100;
    brightnessSlider.value = savedBrightness;
    brightnessValue.textContent = `${savedBrightness}%`;
    document.documentElement.style.filter = `brightness(${savedBrightness}%)`;
}
connectivityMenu()

function thisPc() {

    const thisPc = document.querySelector('.this-pc')
    const thisPcCloseBtn = document.querySelector('.title-bar-close-btn')
    const thisPcIcon = document.querySelector('.this-pc-icon')
    thisPcIcon.addEventListener('dblclick', () => {
        setTimeout(() => {
            thisPc.style.display = "block"

        }, 100);
    })

    thisPcCloseBtn.addEventListener('click', (e) => {
        thisPc.style.display = "none"
    })
}
thisPc()

function windowStartMenu() {


    const windowStartMenu = document.querySelector(".window-start-menu")
    const startButton = document.querySelector(".start-button")
    let isMenuOpen = false;

    startButton.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent body click

        if (!isMenuOpen) {
            windowStartMenu.style.display = "flex"
            isMenuOpen = true;
        } else {
            windowStartMenu.style.display = "none"
            isMenuOpen = false;
        }


    })
}
windowStartMenu()

function calendar() {
    const dateTime = document.querySelector(".date-time")
    const calender = document.querySelector(".calender ")
    let isMenuOpen = false;


    dateTime.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent body click
        if (!isMenuOpen) {
            calender.style.display = "block"
            isMenuOpen = true;
        } else {
            calender.style.display = "none"
            isMenuOpen = false;
        }
    })
    // Function to update time and date in real-time
    function updateDateTime() {
        const now = new Date();

        // Update time (HH:MM:SS)
        const timeElement = document.querySelector(".current-time");
        timeElement.textContent = now.toLocaleTimeString();

        // Update full date (Weekday, Month Day, Year)
        const dateElement = document.querySelector(".current-date");
        dateElement.textContent = now.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Update month and year in header
        const monthYearElement = document.querySelector(".month-year");
        monthYearElement.textContent = now.toLocaleDateString(undefined, {
            month: 'long',
            year: 'numeric'
        });

        // Update current day highlight
        const currentDay = now.getDate();
        const days = document.querySelectorAll(".day");
        days.forEach(day => {
            day.classList.remove("current-day");
            if (parseInt(day.textContent) === currentDay && !day.classList.contains("other-month")) {
                day.classList.add("current-day");
            }
        });

        // Update memo section with current time and date
        const memoElement = document.querySelector(".memo");
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const year = now.getFullYear();
        memoElement.innerHTML = `${hours}:${minutes < 10 ? '0' + minutes : minutes} Memoan<br>${month}.${day}.${year}`;
    }

    // Initial call to set the calendar
    updateDateTime();

    // Update time every second
    const timeInterval = setInterval(updateDateTime, 1000);

    return () => {
        clearInterval(timeInterval);
    };
}
calendar();

function browserSearchInput() {

    const goButton = document.querySelector('.go-btn');
    const urlInput = document.querySelector('.url-input');
    const browserContentDiv = document.querySelector('.browser-content');

    // ✅ Whitelist of iframe-safe websites
    const embeddableSites = [
        'https://www.wikipedia.org',
        'https://www.google.com/maps',
        'https://codesandbox.io',
        'https://openstreetmap.org',
        'https://www.w3schools.com',
        'https://developer.mozilla.org'
    ];

    goButton.addEventListener('click', () => {
        let url = urlInput.value.trim();

        if (!url) {
            url = 'https://www.google.com/maps';
        }

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        const isEmbeddable = embeddableSites.some(site => url.startsWith(site));

        if (!isEmbeddable) {
            browserContentDiv.innerHTML = `
            <div style="padding: 20px; color: red;">
                🚫 Sorry! This website does not allow embedding in an iframe.<br/>
                Try visiting it in a new tab instead: <a href="${url}" target="_blank">${url}</a>
            </div>
        `;
            return;
        }

        browserContentDiv.innerHTML = `
        <iframe width='100%' height='100%' src="${url}" frameborder="0" allowfullscreen></iframe>
    `;
    });


}
browserSearchInput();


function browserDrag() {
    const browser = document.querySelector(".brave-browser-window");
    const browserTitleBar = document.querySelector(".browser-toolbar");

    // Initialize CSS properties
    browser.style.position = "absolute";

    // Track states
    let isDragging = false;
    let isFullscreen = false;
    let originalPosition = { left: 0, top: 0, width: "", height: "" };
    let offsetX, offsetY;

    // Store original size before fullscreen
    function storeOriginalPosition() {
        if (!isFullscreen) {
            originalPosition = {
                left: browser.style.left,
                top: browser.style.top,
                width: browser.style.width,
                height: browser.style.height
            };
        }
    }

    // Toggle fullscreen function
    function toggleFullscreen() {
        if (isFullscreen) {
            // Restore original position
            Object.assign(browser.style, originalPosition);
        } else {
            // Go fullscreen
            storeOriginalPosition();
            Object.assign(browser.style, {
                left: "0",
                top: "0",
                width: "100vw",
                height: "100vh",
                zIndex: "9999"
            });
        }
        isFullscreen = !isFullscreen;
    }

    // Double click for fullscreen
    browserTitleBar.addEventListener("dblclick", toggleFullscreen);

    // Existing drag code with fullscreen check
    browserTitleBar.addEventListener("mousedown", (e) => {
        if (isFullscreen) return; // Disable drag in fullscreen
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;

        isDragging = true;
        const rect = browser.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        if (!e.target.closest('input, button, [contenteditable]')) {
            e.preventDefault();
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging || isFullscreen) return;
        browser.style.left = `${e.clientX - offsetX}px`;
        browser.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Input field protection
    document.querySelectorAll('.browser-toolbar input').forEach(input => {
        input.addEventListener('mousedown', e => e.stopPropagation());
    });
}
browserDrag()


function browserClose() {
    const braveBrowserWindow = document.querySelector(".brave-browser-window")
    const browserWindowCloseBtn = document.querySelector(".bowser-close-btn")
    const braveIconDiv = document.querySelector(".brave-icon-div")
    browserWindowCloseBtn.addEventListener('click', () => {
        braveBrowserWindow.style.display = "none"
    })
    braveIconDiv.addEventListener('click', () => {
        braveBrowserWindow.style.display = "flex"
    })
}
browserClose()

function themeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeMenu = document.getElementById('themeMenu');
    const themeOptions = document.querySelectorAll('.theme-option');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Initialize theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);

    // Toggle menu visibility only (no theme change)
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        themeMenu.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeMenu.contains(e.target) && e.target !== themeToggle) {
            themeMenu.classList.add('hidden');
        }
    });

    // Theme selection from menu
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeMenu.classList.add('hidden');
            updateToggleIcon(theme);
        });
    });

    // Update the toggle button icon
    function updateToggleIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            // For Font Awesome
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            // For Remix Icons:
            // icon.className = theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
        }
    }
}
themeToggle();



function textEditor() {

    // --------- Editor Basic Formatting Controls ---------
    const editor = document.getElementById("editor");
    const formatButtons = document.querySelectorAll(".format-btn");
    const fontSelect = document.getElementById("font-select");
    const sizeSelect = document.getElementById("size-select");
    const wordCount = document.querySelector(".word-count");

    // Execute formatting command
    formatButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const command = btn.getAttribute("data-command");
            document.execCommand(command, false, null);
            btn.classList.toggle("active");
            updateWordCount();
        });
    });

    // Font change
    fontSelect.addEventListener("change", () => {
        document.execCommand("fontName", false, fontSelect.value);
    });

    // Font size change
    sizeSelect.addEventListener("change", () => {
        document.execCommand("fontSize", false, sizeSelect.value);
    });

    // --------- Word Count ---------
    function updateWordCount() {
        const text = editor.innerText.trim();
        const words = text === "" ? 0 : text.split(/\s+/).length;
        wordCount.textContent = `Words: ${words}`;
    }

    editor.addEventListener("input", updateWordCount);

    // --------- Window Controls ---------
    const editorWindow = document.querySelector(".rich-text-editor-window");
    const minimizeBtn = document.getElementById("minimize-btn");
    const fullscreenBtn = document.getElementById("fullscreen-btn");
    const closeBtn = document.getElementById("close-btn");



    const notePadIcon = document.querySelector(".notepad-icon")
    notePadIcon.addEventListener('dblclick', () => {
        console.log("helo");

        editorWindow.style.display = 'flex'
    })




    // Minimize (just hide content & statusbar for demo)
    minimizeBtn.addEventListener("click", () => {
        const content = editorWindow.querySelector(".editor-content");
        const status = editorWindow.querySelector(".editor-statusbar");
        const isMinimized = content.style.display === "none";
        content.style.display = isMinimized ? "block" : "none";
        status.style.display = isMinimized ? "flex" : "none";
    });

    // Fullscreen Toggle Button
    fullscreenBtn.addEventListener("click", () => {
        console.log("so;jidgh");

        editorWindow.classList.toggle("fullscreen");
    });

    // Close Button
    closeBtn.addEventListener("click", () => {
        editorWindow.style.display = "none";
    });

    // --------- Double Click to Toggle Fullscreen on Toolbar ---------
    const toolbar = editorWindow.querySelector(".editor-toolbar");

    toolbar.addEventListener("dblclick", () => {
        console.log("sdiulg");

        editorWindow.classList.toggle("fullscreen");
    });

    function dragWindow(toolbar) {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        // Start dragging
        toolbar.addEventListener("mousedown", (e) => {
            if (editorWindow.classList.contains("fullscreen")) return; // No drag in fullscreen

            isDragging = true;
            const rect = editorWindow.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            editorWindow.style.transition = "none"; // remove smoothness while dragging
        });

        // Move window
        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;

            editorWindow.style.left = `${x}px`;
            editorWindow.style.top = `${y}px`;
        });

        // Stop dragging
        document.addEventListener("mouseup", () => {
            isDragging = false;
            editorWindow.style.transition = ""; // restore transition
        });

    }
    dragWindow(toolbar)
}
textEditor()



function terminalWindow() {
    class WinLiteTerminal {
        constructor() {
            this.terminalWindow = document.querySelector('.terminal-window');
            this.terminalOutput = document.getElementById('terminal-output');
            this.terminalInput = document.getElementById('terminal-input');
            this.maximizeBtn = document.querySelector('.control-btn.maximize');
            this.minimizeBtn = document.querySelector('.control-btn.minimize');
            this.closeBtn = document.querySelector('.control-btn.close');

            this.isDragging = false;
            this.offsetX = 0;
            this.offsetY = 0;
            this.isFullscreen = false;
            this.commandHistory = [];
            this.historyIndex = -1;

            this.init();
        }

        init() {
            // Event listeners
            this.terminalInput.addEventListener('keydown', this.handleInput.bind(this));
            this.maximizeBtn.addEventListener('click', this.toggleFullscreen.bind(this));
            this.minimizeBtn.addEventListener('click', this.minimize.bind(this));
            this.closeBtn.addEventListener('click', this.close.bind(this));

            // Make window draggable
            this.makeDraggable();

            // Focus input
            this.terminalInput.focus();
        }

        handleInput(e) {
            if (e.key === 'Enter') {
                const command = this.terminalInput.value.trim();
                if (command) {
                    this.processCommand(command);
                    this.commandHistory.push(command);
                    this.historyIndex = this.commandHistory.length;
                }
                this.terminalInput.value = '';
                this.scrollToBottom();
            } else if (e.key === 'ArrowUp') {
                if (this.commandHistory.length > 0) {
                    if (this.historyIndex > 0) {
                        this.historyIndex--;
                    }
                    this.terminalInput.value = this.commandHistory[this.historyIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    this.terminalInput.value = this.commandHistory[this.historyIndex] || '';
                } else {
                    this.historyIndex = this.commandHistory.length;
                    this.terminalInput.value = '';
                }
            }
        }

        processCommand(command) {
            // Add command to output
            this.addLine(command, 'command');

            // Process command
            const response = this.executeCommand(command);
            this.addLine(response, 'output');
        }

        executeCommand(command) {
            const cmd = command.toLowerCase().split(' ')[0];
            const args = command.split(' ').slice(1);

            switch (cmd) {
                case 'help':
                    return `Available commands:
- help: Show this help message
- clear: Clear terminal
- echo [text]: Repeat text
- matrix: Activate matrix mode
- hack: Start hacking simulation
- nuke: Just try it 😈
- troll: Fun surprise
- sysinfo: Show fake system info
- bitcoin: Mine fake crypto
- godmode: 😇`;

                case 'matrix':
                    this.startMatrixEffect();
                    return "Entering matrix mode... Ctrl+C to cancel";

                case 'hack':
                    return this.startHackSimulation();

                case 'clear':
                    this.terminalOutput.innerHTML = '';
                    return '';
                case 'nuke':
                    return this.nukeEffect();

                case 'troll':
                    return this.trollEffect();

                case 'sysinfo':
                    return this.fakeSystemInfo();

                case 'bitcoin':
                    return this.mineBitcoin();

                case 'godmode':
                    return this.godModeEffect();

                // ... (keep previous commands)

                default:
                    return `Command not found: ${cmd}. Type 'help' for commands`;
            }
        }

        addLine(text, type = 'output') {
            const line = document.createElement('div');
            line.className = 'terminal-line';

            if (type === 'command') {
                line.innerHTML = `
        <span class="prompt">user@winlite:~$</span>
        <span class="command">${text}</span>
      `;
            } else {
                line.innerHTML = `<span class="output">${text}</span>`;
            }

            this.terminalOutput.appendChild(line);
            this.scrollToBottom();
        }

        scrollToBottom() {
            this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
        }

        toggleFullscreen() {
            this.isFullscreen = !this.isFullscreen;
            this.terminalWindow.classList.toggle('fullscreen');
            this.maximizeBtn.innerHTML = this.isFullscreen
                ? '<i class="fas fa-compress"></i>'
                : '<i class="fas fa-expand"></i>';
        }

        minimize() {
            this.terminalWindow.style.display = 'none';
            // In a real app, you'd want to add it to taskbar
        }

        close() {
            this.terminalWindow.style.display = 'none';
        }

        makeDraggable() {
            const header = this.terminalWindow.querySelector('.terminal-header');

            header.addEventListener('mousedown', (e) => {
                if (e.target === header || e.target.closest('.terminal-title')) {
                    this.isDragging = true;
                    this.offsetX = e.clientX - this.terminalWindow.getBoundingClientRect().left;
                    this.offsetY = e.clientY - this.terminalWindow.getBoundingClientRect().top;
                    this.terminalWindow.classList.add('draggable');
                }
            });

            document.addEventListener('mousemove', (e) => {
                if (this.isDragging && !this.isFullscreen) {
                    this.terminalWindow.style.left = `${e.clientX - this.offsetX}px`;
                    this.terminalWindow.style.top = `${e.clientY - this.offsetY}px`;
                }
            });

            document.addEventListener('mouseup', () => {
                this.isDragging = false;
                this.terminalWindow.classList.remove('draggable');
            });
        }


        // ! === Special Effects === !//

        startMatrixEffect() {
            const chars = "01アイウエオカキクケコ";
            const output = this.terminalOutput;
            output.innerHTML = '';

            const addLine = () => {
                let line = '';
                for (let i = 0; i < 80; i++) {
                    line += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                const div = document.createElement('div');
                div.className = 'matrix-line';
                div.textContent = line;
                div.style.color = `hsl(${Math.random() * 120 + 100}, 100%, 50%)`;
                output.appendChild(div);
                output.scrollTop = output.scrollHeight;
            };

            this.matrixInterval = setInterval(addLine, 100);
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'c') {
                    clearInterval(this.matrixInterval);
                    this.addLine("Matrix mode deactivated", "output");
                }
            }, { once: true });
        }

        startHackSimulation() {
            const phrases = [
                "Bypassing firewall...",
                "Accessing mainframe... 23%",
                "Injecting SQL payload...",
                "Brute-forcing credentials...",
                "Found vulnerability: CVE-2023-🔥",
                "Root access granted!",
                "Downloading all your memes...",
                "Deleting system32... just kidding 😜"
            ];

            let i = 0;
            this.hackInterval = setInterval(() => {
                if (i < phrases.length) {
                    this.addLine(phrases[i], "output");
                    i++;
                } else {
                    clearInterval(this.hackInterval);
                    this.addLine("Hacking complete! (just kidding)", "output");
                }
            }, 1500);

            return "Initiating hack sequence...";
        }

        nukeEffect() {
            this.terminalOutput.innerHTML = '';
            const nuke = [
                "Initializing nuclear launch sequence...",
                "Target coordinates set: 12.3456° N, 98.7654° W",
                "Bypassing safety protocols...",
                "3... 2... 1...",
                "🚀💥 NUKE LAUNCHED 💥🚀",
                "",
                "Just kidding! You've been trolled 😂",
                "Type 'troll' for more fun"
            ];

            nuke.forEach((line, i) => {
                setTimeout(() => {
                    this.addLine(line, "output");
                    if (line.includes("💥")) {
                        document.body.style.backgroundColor = "red";
                        setTimeout(() => {
                            document.body.style.backgroundColor = "";
                        }, 500);
                    }
                }, i * 800);
            });

            return "";
        }

        trollEffect() {
            const trollMessages = [
                "ERROR: Keyboard not found. Press F1 to continue",
                "Your computer has been infected with 420 viruses",
                "Downloading more RAM...",
                "Deleting all your browser history...",
                "Injecting chocolate into your USB ports...",
                "Rotating screen 180 degrees...",
                "Enabling infinite loop in your code...",
                "Congratulations! You won a free iPhone! (not)"
            ];

            let i = 0;
            this.trollInterval = setInterval(() => {
                this.addLine(trollMessages[i], "output");
                i = (i + 1) % trollMessages.length;
            }, 2000);

            return "Trolling initiated! Type 'clear' to stop";
        }

        fakeSystemInfo() {
            const fakeSpecs = [
                "CPU: Intel i9-99999K @ 10.5GHz",
                "GPU: RTX 9090 Ti (128GB VRAM)",
                "RAM: 128GB DDR6 @ 6000MHz",
                "Storage: 10TB NVMe SSD",
                "OS: Windows 15 Pro",
                "Internet: 100Gbps fiber",
                "Cooling: Liquid nitrogen",
                "Power: 9001W PSU (over 9000!)"
            ];

            return fakeSpecs.join('\n');
        }

        mineBitcoin() {
            let mined = 0;
            this.bitcoinInterval = setInterval(() => {
                mined += Math.random() * 0.0001;
                this.addLine(`Mining... ${mined.toFixed(8)} BTC earned`, "output");
            }, 500);

            return "Started mining Bitcoin (fake ones)";
        }

        godModeEffect() {
            const godMessages = [
                "Divine privileges granted 🌟",
                "Unlimited power! ⚡",
                "You now have admin rights to the universe",
                "All commands will now work",
                "Try typing anything... it will 'work'"
            ];

            this.originalExecute = this.executeCommand.bind(this);
            this.executeCommand = () => "Command executed successfully by divine power";

            godMessages.forEach((msg, i) => {
                setTimeout(() => this.addLine(msg, "output"), i * 1000);
            });

            setTimeout(() => {
                this.addLine("God mode expiring in 5... 4... 3... 2... 1...", "output");
                this.executeCommand = this.originalExecute;
                this.addLine("Back to mortal status 😔", "output");
            }, 10000);

            return "ACTIVATING GOD MODE...";
        }
    }


    const terminalWindow = document.querySelector(".terminal-window")
    const terminalIcon = document.querySelector(".terminal-icon")
    terminalIcon.addEventListener("dblclick", () => {
        terminalWindow.style.display = "flex"
    })

    // Initialize terminal when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        new WinLiteTerminal();
    });
}

terminalWindow();







window.addEventListener("load", () => {
    const bootSound = document.getElementById("bootSound");
    const bootScreen = document.getElementById("bootScreen");

    // Wait a bit then play sound
    setTimeout(() => {
        bootSound.play();
    }, 1000); // delay before playing sound

    // Remove boot screen after full animation
    setTimeout(() => {
        bootScreen.style.display = "none";
    }, 4000); // match the fadeOut delay
});






// window ke top ko desktop ke top par marte hai toh full screen ho jata