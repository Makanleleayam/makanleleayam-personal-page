let currentZIndex = 101;
const clickSound = new Audio('assets/zapsplat_multimedia_button_click_bright_002_92099.mp3');
clickSound.volume = 0.5; 
const closeSound = new Audio('assets/zapsplat_multimedia_button_click_fast_short_001_79285.mp3');
closeSound.volume = 0.5;

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function playCloseSound() {
    closeSound.currentTime = 0;
    closeSound.play();
}

document.addEventListener('DOMContentLoaded', () => {
    const terminalButton = document.querySelector('.task-button.terminal');
    const terminalWindow = document.querySelector('#terminal-window');
    const terminalCloseBtn = terminalWindow.querySelector('.control-btn.close');
    const terminalMinimizeBtn = terminalWindow.querySelector('.control-btn.minimize');
    const terminalMaximizeBtn = terminalWindow.querySelector('.control-btn.maximize');
    const terminalContent = document.querySelector('#terminal-content');

    const homeButton = document.querySelector('.task-button.home');
    const homeWindow = document.querySelector('#home-window');
    const homeCloseBtn = homeWindow.querySelector('.control-btn.close');
    const homeMinimizeBtn = homeWindow.querySelector('.control-btn.minimize');
    const homeMaximizeBtn = homeWindow.querySelector('.control-btn.maximize');

    const linksButton = document.querySelector('.task-button.links');
    const linksWindow = document.querySelector('#links-window');
    const linksCloseBtn = linksWindow.querySelector('.control-btn.close');
    const linksMinimizeBtn = linksWindow.querySelector('.control-btn.minimize');
    const linksMaximizeBtn = linksWindow.querySelector('.control-btn.maximize');

    const projectButton = document.querySelector('.task-button.project');
    const projectWindow = document.querySelector('#project-window');
    const projectCloseBtn = projectWindow.querySelector('.control-btn.close');
    const projectMinimizeBtn = projectWindow.querySelector('.control-btn.minimize');
    const projectMaximizeBtn = projectWindow.querySelector('.control-btn.maximize');

    terminalButton.addEventListener('click', () => {
        terminalWindow.classList.toggle('show');
        if (terminalWindow.classList.contains('show')) {
            bringToFront(terminalWindow);
            terminalContent.querySelector('.terminal-input').focus();
        }
    });
    terminalCloseBtn.addEventListener('click', () => {
        terminalWindow.classList.remove('show');
        playCloseSound();
    });
    terminalMinimizeBtn.addEventListener('click', () => {
        if (terminalWindow.classList.contains('maximized')) return;
        terminalWindow.classList.toggle('minimized');
    });
    terminalMaximizeBtn.addEventListener('click', () => {
        if (terminalWindow.classList.contains('minimized')) return;
        handleMaximize(terminalWindow);
    });

    homeButton.addEventListener('click', () => {
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
    });
    homeMaximizeBtn.addEventListener('click', () => {
        if (homeWindow.classList.contains('minimized')) return;
        handleMaximize(homeWindow);
    });

    linksButton.addEventListener('click', () => {
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
    });
    linksMaximizeBtn.addEventListener('click', () => {
        if (linksWindow.classList.contains('minimized')) return;
        handleMaximize(linksWindow);
    });

    projectButton.addEventListener('click', () => {
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
    });
    projectMaximizeBtn.addEventListener('click', () => {
        if (projectWindow.classList.contains('minimized')) return;
        handleMaximize(projectWindow);
    });

    makeDraggable(terminalWindow);
    makeDraggable(homeWindow);
    makeDraggable(linksWindow);
    makeDraggable(projectWindow);

    terminalWindow.addEventListener('mousedown', () => {
        bringToFront(terminalWindow);
    });
    homeWindow.addEventListener('mousedown', () => {
        bringToFront(homeWindow);
    });
    linksWindow.addEventListener('mousedown', () => {
        bringToFront(linksWindow);
    });
    projectWindow.addEventListener('mousedown', () => {
        bringToFront(projectWindow);
    });

    const welcomeMessage = document.createElement('p');
    terminalContent.prepend(welcomeMessage);
    typewrite(welcomeMessage, "Welcome to char@kali. Type 'help' for available commands.", () => {
        terminalContent.scrollTop = terminalContent.scrollHeight;
    });

    terminalWindow.addEventListener('click', (e) => {
        if (e.target.classList.contains('window-content') || e.target.classList.contains('terminal-line') || e.target.classList.contains('prompt')) {
            const input = terminalContent.querySelector('.terminal-input');
            if (input) input.focus();
        }
    });

    terminalContent.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter' && e.target.classList.contains('terminal-input')) {
            const inputElement = e.target;
            const command = inputElement.value.trim();

            const currentLine = inputElement.parentElement;
            const logLine = document.createElement('div');
            logLine.classList.add('log');
            logLine.innerHTML = `
                <span class="prompt">izitchar@kali:~$</span>
                <span class="command-log">${command}</span>
            `;
            currentLine.replaceWith(logLine); 

            if (command) {
                await processCommand(command, terminalContent);
            }

            if (command !== 'clear') {
                addNewInputLine(terminalContent);
            }

            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
    });

    document.addEventListener('mousedown', (e) => {
        if (e.target.closest('button, .title-bar')) {
            if (e.target.classList.contains('close')) {
                return;
            }
            playClickSound();
        }
    });
});

function bringToFront(windowElement) {
    currentZIndex++;
    windowElement.style.zIndex = currentZIndex;
}

function addNewInputLine(container) {
    const line = document.createElement('div');
    line.classList.add('terminal-line');
    line.innerHTML = `
        <span class="prompt">izitchar@kali:~$</span>
        <input type="text" class="terminal-input">
    `;
    container.appendChild(line);
    line.querySelector('.terminal-input').focus();
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
        const speed = 1;
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

    titleBar.style.cursor = 'grab';
}