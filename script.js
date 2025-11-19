// Global State & Sound Initialization
let currentZIndex = 1100;
let isMuted = false;

const clickSound = new Audio('assets/zapsplat_multimedia_button_click_bright_002_92099.mp3');
clickSound.volume = 0.5; 
const closeSound = new Audio('assets/zapsplat_multimedia_button_click_fast_short_001_79285.mp3');
closeSound.volume = 0.5;

function playClickSound() {
    if (isMuted) return;
    clickSound.currentTime = 0;
    clickSound.play();
}

function playCloseSound() {
    if (isMuted) return;
    closeSound.currentTime = 0;
    closeSound.play();
}

// Main Application Start
document.addEventListener('DOMContentLoaded', () => {

    // --- Query DOM Elements ---

    // Terminal
    const terminalButton = document.querySelector('.task-button.terminal');
    const terminalWindow = document.querySelector('#terminal-window');
    const terminalCloseBtn = terminalWindow.querySelector('.control-btn.close');
    const terminalMinimizeBtn = terminalWindow.querySelector('.control-btn.minimize');
    const terminalMaximizeBtn = terminalWindow.querySelector('.control-btn.maximize');
    const terminalContent = document.querySelector('#terminal-content');

    // Home
    const homeButton = document.querySelector('.task-button.home');
    const homeWindow = document.querySelector('#home-window');
    const homeCloseBtn = homeWindow.querySelector('.control-btn.close');
    const homeMinimizeBtn = homeWindow.querySelector('.control-btn.minimize');
    const homeMaximizeBtn = homeWindow.querySelector('.control-btn.maximize');
    const homeContent = homeWindow.querySelector('.window-content');

    // Links
    const linksButton = document.querySelector('.task-button.links');
    const linksWindow = document.querySelector('#links-window');
    const linksCloseBtn = linksWindow.querySelector('.control-btn.close');
    const linksMinimizeBtn = linksWindow.querySelector('.control-btn.minimize');
    const linksMaximizeBtn = linksWindow.querySelector('.control-btn.maximize');
    const linksContent = linksWindow.querySelector('.window-content');

    // Projects
    const projectButton = document.querySelector('.task-button.project');
    const projectWindow = document.querySelector('#project-window');
    const projectCloseBtn = projectWindow.querySelector('.control-btn.close');
    const projectMinimizeBtn = projectWindow.querySelector('.control-btn.minimize');
    const projectMaximizeBtn = projectWindow.querySelector('.control-btn.maximize');
    const projectContent = projectWindow.querySelector('.window-content');

    // Calculator
    const calcWindow = document.querySelector('#calculator-window');
    const calcCloseBtn = calcWindow.querySelector('.control-btn.close');
    const calcMinimizeBtn = calcWindow.querySelector('.control-btn.minimize');
    const calcMaximizeBtn = calcWindow.querySelector('.control-btn.maximize');
    const calcDisplay = document.querySelector('#calc-display');
    const calcButtons = document.querySelectorAll('.calc-btn');

    // System
    const muteButton = document.querySelector('#mute-button');
    const muteIcon = muteButton.querySelector('img');

    // Launcher
    const cmdButton = document.querySelector('.task-button.cmd');
    const launcher = document.querySelector('#launcher');
    const launcherSearchInput = document.querySelector('#launcher-search-input');
    const launcherItems = document.querySelectorAll('.launcher-item');
    const launcherSidebar = document.querySelector('.launcher-sidebar');


    // --- Taskbar & Window Control Event Listeners ---

    // 1. Terminal Window
    terminalButton.addEventListener('click', () => {
        playClickSound();
        terminalWindow.classList.toggle('show');
        if (terminalWindow.classList.contains('show')) {
            bringToFront(terminalWindow);
            // Focus input if it exists
            const input = terminalContent.querySelector('.terminal-input');
            if(input) input.focus();
        }
    });
    terminalCloseBtn.addEventListener('click', () => {
        terminalWindow.classList.remove('show');
        playCloseSound();
    });
    terminalMinimizeBtn.addEventListener('click', () => {
        if (terminalWindow.classList.contains('maximized')) return;
        terminalWindow.classList.toggle('minimized');
        playClickSound();
    });
    terminalMaximizeBtn.addEventListener('click', () => {
        if (terminalWindow.classList.contains('minimized')) return;
        handleMaximize(terminalWindow);
        playClickSound();
    });

    // 2. Home Window
    homeButton.addEventListener('click', () => {
        playClickSound();
        homeWindow.classList.toggle('show');
        if (homeWindow.classList.contains('show')) {
            bringToFront(homeWindow);
        }
    });
    homeCloseBtn.addEventListener('click', () => {
        homeWindow.classList.remove('show');
        playCloseSound();
    });
    homeMinimizeBtn.addEventListener('click', () => {
        if (homeWindow.classList.contains('maximized')) return;
        homeWindow.classList.toggle('minimized');
        playClickSound();
    });
    homeMaximizeBtn.addEventListener('click', () => {
        if (homeWindow.classList.contains('minimized')) return;
        handleMaximize(homeWindow);
        playClickSound();
    });

    // 3. Links Window
    linksButton.addEventListener('click', () => {
        playClickSound();
        linksWindow.classList.toggle('show');
        if (linksWindow.classList.contains('show')) {
            bringToFront(linksWindow);
        }
    });
    linksCloseBtn.addEventListener('click', () => {
        linksWindow.classList.remove('show');
        playCloseSound();
    });
    linksMinimizeBtn.addEventListener('click', () => {
        if (linksWindow.classList.contains('maximized')) return;
        linksWindow.classList.toggle('minimized');
        playClickSound();
    });
    linksMaximizeBtn.addEventListener('click', () => {
        if (linksWindow.classList.contains('minimized')) return;
        handleMaximize(linksWindow);
        playClickSound();
    });

    // 4. Project Window
    projectButton.addEventListener('click', () => {
        playClickSound();
        projectWindow.classList.toggle('show');
        if (projectWindow.classList.contains('show')) {
            bringToFront(projectWindow);
        }
    });
    projectCloseBtn.addEventListener('click', () => {
        projectWindow.classList.remove('show');
        playCloseSound();
    });
    projectMinimizeBtn.addEventListener('click', () => {
        if (projectWindow.classList.contains('maximized')) return;
        projectWindow.classList.toggle('minimized');
        playClickSound();
    });
    projectMaximizeBtn.addEventListener('click', () => {
        if (projectWindow.classList.contains('minimized')) return;
        handleMaximize(projectWindow);
        playClickSound();
    });

    // 5. Calculator Window
    if(calcWindow) {
        calcWindow.addEventListener('mousedown', () => {
            bringToFront(calcWindow);
        });
        
        calcCloseBtn.addEventListener('click', () => {
            calcWindow.classList.remove('show');
            playCloseSound();
            // Reset calculator on close
            if(calcDisplay) calcDisplay.innerText = '0';
        });

        calcMinimizeBtn.addEventListener('click', () => {
            if (calcWindow.classList.contains('maximized')) return;
            calcWindow.classList.toggle('minimized');
            playClickSound();
        });

        calcMaximizeBtn.addEventListener('click', () => {
            if (calcWindow.classList.contains('minimized')) return;
            handleMaximize(calcWindow);
            playClickSound();
        });
        
        // Initialize Drag
        makeDraggable(calcWindow);
    }

    // Calculator Button Logic
    calcButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            playClickSound(); 
            handleCalcInput(btn.innerText);
        });
    });


    // --- SYSTEM CONTROLS ---

    // Mute Button
    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
            muteIcon.src = 'assets/sound-off.svg';
            muteIcon.alt = 'Unmute';
        } else {
            muteIcon.src = 'assets/sound-on.svg';
            muteIcon.alt = 'Mute';
        }
        clickSound.currentTime = 0;
        clickSound.play();
    });

    // --- LAUNCHER LOGIC ---
    
    // Toggle Launcher
    cmdButton.addEventListener('click', (e) => {
        playClickSound();
        e.stopPropagation();
        launcher.classList.toggle('show');
        if (launcher.classList.contains('show')) {
            launcherSearchInput.focus();
            launcherSearchInput.value = ''; // Clear search
            // Show all items
            launcherItems.forEach(item => item.style.display = 'flex');
        }
    });

    // Search Filtering
    launcherSearchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        launcherItems.forEach(item => {
            const text = item.innerText.toLowerCase();
            if(text.includes(term)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Close Launcher when clicking outside
    document.addEventListener('click', (e) => {
        if (launcher.classList.contains('show') && !launcher.contains(e.target) && !cmdButton.contains(e.target)) {
            launcher.classList.remove('show');
        }
    });

    // Reset text when the mouse leaves the list
    if (launcherSidebar) {
        launcherSidebar.addEventListener('mouseleave', () => {
            showDetails('Select an app...');
        });
    }

    // --- DRAGGABLE WINDOWS ---
    makeDraggable(terminalWindow);
    makeDraggable(homeWindow);
    makeDraggable(linksWindow);
    makeDraggable(projectWindow);


    // --- CONTENT FOCUS LOGIC ---
    // Clicking content brings window to front
    
    terminalWindow.addEventListener('click', (e) => {
        if (e.target.closest('.window-content')) {
            bringToFront(terminalWindow);
            const input = terminalContent.querySelector('.terminal-input');
            if (input) input.focus();
        }
    });

    if(homeContent) {
        homeContent.addEventListener('mousedown', () => {
            bringToFront(homeWindow);
        });
    }

    if(linksContent) {
        linksContent.addEventListener('mousedown', () => {
            bringToFront(linksWindow);
        });
    }

    if(projectContent) {
        projectContent.addEventListener('mousedown', () => {
            bringToFront(projectWindow);
        });
    }


    // --- TERMINAL LOGIC (Fixed) ---
    
    // 1. Initial Welcome Message
    // We check if a 'p' tag already exists to prevent duplicates
    if (!terminalContent.querySelector('p')) {
        const welcomeMessage = document.createElement('p');
        terminalContent.prepend(welcomeMessage);
        
        // Use the typewrite function
        typewrite(welcomeMessage, "Welcome to char@kali. Type 'help' for available commands.", () => {
            // Only add an input line if one doesn't exist yet
            if (!terminalContent.querySelector('.terminal-input')) {
                addNewInputLine(terminalContent);
            }
            terminalContent.scrollTop = terminalContent.scrollHeight;
        });
    }

    // 2. Key Listener
    terminalContent.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter' && e.target.classList.contains('terminal-input')) {
            const inputElement = e.target;
            const command = inputElement.value.trim();
            const currentLine = inputElement.parentElement;

            // Convert input line to static log
            const logLine = document.createElement('div');
            logLine.classList.add('log');
            logLine.innerHTML = `
                <span class="prompt">izitchar@kali:~$</span>
                <span class="command-log">${command}</span>
            `;
            currentLine.replaceWith(logLine); 

            // Process Command
            if (command) {
                await processCommand(command, terminalContent);
            }

            // Create new line (unless clear was used)
            if (command !== 'clear') {
                addNewInputLine(terminalContent);
            }

            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
    });


    // --- GLOBAL SOUND (Click anywhere) ---
    document.addEventListener('mousedown', (e) => {
        // Ignore specific elements to avoid double sounds or unwanted sounds
        if (e.target.closest('#mute-button')) return;
        if (e.target.classList.contains('close')) return;
        if (e.target.closest('.title-bar')) return;
        if (e.target.closest('.window-content')) return;
        if (e.target.closest('.launcher')) return;
        
        // Play sound for any other button (taskbar, etc)
        if (e.target.closest('button')) {
            playClickSound();
        }
    });

    // Initialize Icons
    feather.replace();

}); // End DOMContentLoaded


// --- HELPER FUNCTIONS ---

function showDetails(text) {
    const preview = document.getElementById('preview-text');
    if (preview) {
        preview.innerText = text;
    }
}

function openApp(appName) {
    const launcher = document.querySelector('#launcher');
    launcher.classList.remove('show');
    playClickSound();

    if (appName === 'terminal') {
        const win = document.querySelector('#terminal-window');
        win.classList.add('show');
        bringToFront(win);
        const input = win.querySelector('.terminal-input');
        if(input) input.focus();
    } else if (appName === 'home') {
        const win = document.querySelector('#home-window');
        win.classList.add('show');
        bringToFront(win);
    } else if (appName === 'links') {
        const win = document.querySelector('#links-window');
        win.classList.add('show');
        bringToFront(win);
    } else if (appName === 'project') {
        const win = document.querySelector('#project-window');
        win.classList.add('show');
        bringToFront(win);
    } else if (appName === 'calculator') {
        const win = document.querySelector('#calculator-window');
        win.classList.add('show');
        bringToFront(win);
    } else {
        alert('Application "' + appName + '" is under construction!');
    }
}

function bringToFront(windowElement) {
    currentZIndex++;
    windowElement.style.zIndex = currentZIndex;
}

function addNewInputLine(container) {
    const line = document.createElement('div');
    line.classList.add('terminal-line');
    line.innerHTML = `
        <span class="prompt">izitchar@kali:~$</span>
        <input type="text" class="terminal-input" spellcheck="false">
    `;
    container.appendChild(line);
    const input = line.querySelector('.terminal-input');
    if(input) input.focus();
}

async function processCommand(command, container) {
    const output = document.createElement('p');
    container.appendChild(output);
    
    const [cmd, ...args] = command.split(' ');
    let argString = args.join(' ');

    switch (cmd.toLowerCase()) {
        case 'echo':
            if ((argString.startsWith("'") && argString.endsWith("'")) || (argString.startsWith('"') && argString.endsWith('"'))) {
                argString = argString.substring(1, argString.length - 1);
            }
            await typewrite(output, argString);
            break;
        case 'help':
            const helpText = `
Available commands:
  help            - Shows this help message
  echo 'message'  - Prints 'message' to the terminal
  clear           - Clears the terminal screen
  date            - Displays the current date and time
`;
            await typewrite(output, helpText);
            break;
        case 'clear':
            container.innerHTML = '';
            addNewInputLine(container);
            break;
        case 'date':
            await typewrite(output, new Date().toString());
            break;
        case '':
            container.removeChild(output);
            break;
        default:
            await typewrite(output, `command not found: ${cmd}`);
            break;
    }
}

function typewrite(element, text, callback) {
    return new Promise((resolve) => {
        let i = 0;
        const speed = 5; // Faster typing
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                if (text.charAt(i) === '\n') {
                    element.innerHTML += '<br>';
                } else {
                    element.innerHTML += text.charAt(i);
                }
                i++;
                setTimeout(type, speed);
            } else {
                if (callback) callback();
                resolve();
            }
        }
        type();
    });
}

function handleMaximize(windowElement) {
    bringToFront(windowElement);
    const isMaximized = windowElement.classList.contains('maximized');
    if (isMaximized) {
        const oldRect = windowElement.dataset;
        windowElement.style.width = oldRect.width;
        windowElement.style.height = oldRect.height;
        windowElement.style.top = oldRect.top;
        windowElement.style.left = oldRect.left;
        windowElement.classList.remove('maximized');
    } else {
        const rect = windowElement.getBoundingClientRect();
        windowElement.dataset.width = rect.width + 'px';
        windowElement.dataset.height = rect.height + 'px';
        windowElement.dataset.top = rect.top + 'px';
        windowElement.dataset.left = rect.left + 'px';
        windowElement.style.width = '100vw';
        windowElement.style.height = '100vh';
        windowElement.style.top = '0px';
        windowElement.style.left = '0px';
        windowElement.classList.add('maximized');
    }
}

function makeDraggable(element) {
    const titleBar = element.querySelector('.title-bar');
    if (!titleBar) return;

    let isDragging = false;
    let offsetX, offsetY;

    titleBar.addEventListener('mousedown', (e) => {
        bringToFront(element);

        if (element.classList.contains('maximized')) {
            return;
        }
        
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        titleBar.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        const viewportWidth = window.innerWidth;
        const elemWidth = element.offsetWidth;

        const minX = 0;
        const maxX = viewportWidth - elemWidth;
        const minY = 0; 
        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, newY); 

        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        titleBar.style.cursor = 'grab';
    });

    titleBar.addEventListener('mouseleave', () => {
        if (!isDragging) {
            titleBar.style.cursor = 'grab';
        }
    });
}

// Simple Calculator Logic
function handleCalcInput(value) {
    const display = document.querySelector('#calc-display');
    let currentText = display.innerText;

    if (value === 'C') {
        display.innerText = '0';
    } else if (value === '=') {
        try {
            const safeExpression = currentText.replace(/[^0-9+\-*/.]/g, '');
            display.innerText = eval(safeExpression); 
        } catch (e) {
            display.innerText = 'Error';
        }
    } else {
        if (currentText === '0' || currentText === 'Error') {
            if (['+', '-', '*', '/'].includes(value)) {
                display.innerText = currentText + value;
            } else {
                display.innerText = value;
            }
        } else {
            display.innerText += value;
        }
    }
}