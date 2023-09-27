document.addEventListener('DOMContentLoaded', function() {
    const pausedTabsList = document.getElementById('pausedTabsList');
    const resumeAllButton = document.getElementById('resumeAllButton');

    // Dummy data for paused tabs (replace with your data)
    const pausedTabsData = [
        { id: 1, title: 'Tab 1' },
        { id: 2, title: 'Tab 2' },
        { id: 3, title: 'Tab 3' }
    ];

    // Function to populate the paused tabs list
    function populatePausedTabsList() {
        pausedTabsList.innerHTML = '';
        pausedTabsData.forEach(tab => {
            const li = document.createElement('li');
            li.textContent = tab.title;
            pausedTabsList.appendChild(li);
        });
    }

    // Event listener for the "Resume All Tabs" button
    resumeAllButton.addEventListener('click', function() {
        // Send a message to the background script to request the resumption of all paused tabs
        chrome.runtime.sendMessage({ action: 'resumeAllTabs' });
        
        // Clear the UI by re-populating the pausedTabsList (which will now be empty)
        pausedTabsData.length = 0;
        populatePausedTabsList(); // Repopulate the UI
    });

    // Populate the paused tabs list when the popup is loaded
    populatePausedTabsList();
});
