document.addEventListener('DOMContentLoaded', function () {

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

    // function themeToggle() {
    //     const themeToggle = document.getElementById('themeToggle');
    //     // const currentTheme = localStorage.getItem('theme') || 'light';
    //     const themeMenu = document.getElementById('themeMenu');
    //     const currentTheme = localStorage.getItem('theme') || 'light';
    //     const themeOptions = document.querySelectorAll('.theme-option');
    //     // Apply saved theme
    //     document.documentElement.setAttribute('data-theme', currentTheme);

    //     themeToggle.addEventListener('click', () => {
    //         const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    //         document.documentElement.setAttribute('data-theme', newTheme);
    //         localStorage.setItem('theme', newTheme);
    //     });


    //     // Toggle menu visibility
    //     themeToggle.addEventListener('click', (e) => {
    //         e.stopPropagation();
    //         themeMenu.classList.toggle('hidden');
    //     });

    //     // Close menu when clicking outside
    //     document.addEventListener('click', () => {
    //         themeMenu.classList.add('hidden');
    //     });

    //     // Theme selection
    //     themeOptions.forEach(option => {
    //         option.addEventListener('click', () => {
    //             const theme = option.dataset.theme;
    //             document.documentElement.setAttribute('data-theme', theme);
    //             localStorage.setItem('theme', theme);
    //             themeMenu.classList.add('hidden');

    //             // Update icon based on theme
    //             const iconPath = theme === 'dark' ? 'icons/sun-icon.svg' : 'icons/moon-icon.svg';
    //             themeToggle.querySelector('img').src = iconPath;
    //         });
    //     });

    //     // Initialize theme
    //     document.documentElement.setAttribute('data-theme', currentTheme);
    //     const iconPath = currentTheme === 'dark' ? 'icons/sun-icon.svg' : 'icons/moon-icon.svg';
    //     themeToggle.querySelector('img').src = iconPath;

    //     // Toggle menu visibility
    //     themeToggle.addEventListener('click', (e) => {
    //         e.stopPropagation();
    //         themeMenu.classList.toggle('hidden');
    //     });

    //     // Close menu when clicking outside
    //     document.addEventListener('click', () => {
    //         themeMenu.classList.add('hidden');
    //     });

    //     // Theme selection
    //     themeOptions.forEach(option => {
    //         option.addEventListener('click', () => {
    //             const theme = option.dataset.theme;
    //             document.documentElement.setAttribute('data-theme', theme);
    //             localStorage.setItem('theme', theme);
    //             themeMenu.classList.add('hidden');
    //         });
    //     });

    //     // Initialize theme
    //     document.documentElement.setAttribute('data-theme', currentTheme);
    // }

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

});


// window ke top ko desktop ke top par marte hai toh full screen ho jata