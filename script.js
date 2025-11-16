document.addEventListener('DOMContentLoaded', () => {

    const terminalButton = document.querySelector('.task-button.terminal');
    const terminalWindow = document.querySelector('#terminal-window');
    const terminalCloseBtn = terminalWindow.querySelector('.control-btn.close');
    const terminalMinimizeBtn = terminalWindow.querySelector('.control-btn.minimize');
    const terminalMaximizeBtn = terminalWindow.querySelector('.control-btn.maximize');

    const homeButton = document.querySelector('.task-button.home');
    const homeWindow = document.querySelector('#home-window');
    const homeCloseBtn = homeWindow.querySelector('.control-btn.close');
    const homeMinimizeBtn = homeWindow.querySelector('.control-btn.minimize');
    const homeMaximizeBtn = homeWindow.querySelector('.control-btn.maximize');

    terminalButton.addEventListener('click', () => {
        terminalWindow.classList.toggle('show');
    });
    terminalCloseBtn.addEventListener('click', () => {
        terminalWindow.classList.remove('show');
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
    });
    homeCloseBtn.addEventListener('click', () => {
        homeWindow.classList.remove('show');
    });
    homeMinimizeBtn.addEventListener('click', () => {
        if (homeWindow.classList.contains('maximized')) return;
        homeWindow.classList.toggle('minimized');
    });
    homeMaximizeBtn.addEventListener('click', () => {
        if (homeWindow.classList.contains('minimized')) return;
        handleMaximize(homeWindow);
    });

    makeDraggable(terminalWindow);
    makeDraggable(homeWindow);
});

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