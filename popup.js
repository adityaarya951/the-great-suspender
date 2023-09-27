document.addEventListener('DOMContentLoaded', function() {
    const pausedTabsList = document.getElementById('pausedTabsList');
    const resumeAllButton = document.getElementById('resumeAllButton');
    const pausedTabsCount = document.getElementById('pausedTabsCount');
    const efficiencyIncrease = document.getElementById('efficiencyIncrease');

    // Dummy data for paused tabs (replace with your data)
    const pausedTabsData = [
        { id: 1, title: 'Tab 1', efficiency: 10 }, // Example efficiency values (you can calculate actual values)
        { id: 2, title: 'Tab 2', efficiency: 15 },
        { id: 3, title: 'Tab 3', efficiency: 20 }
    ];

    // Function to populate the paused tabs list and calculate efficiency
    function populatePausedTabsList() {
        pausedTabsList.innerHTML = '';
        let totalEfficiency = 0;

        pausedTabsData.forEach(tab => {
            const li = document.createElement('li');
            li.textContent = tab.title;
            pausedTabsList.appendChild(li);

            totalEfficiency += tab.efficiency; // Calculate total efficiency
        });

        // Display the number of paused tabs
        pausedTabsCount.textContent = pausedTabsData.length;

        // Display the total efficiency increase
        efficiencyIncrease.textContent = totalEfficiency + '%';
    }

    // Event listener for the "Resume All Tabs" button
    resumeAllButton.addEventListener('click', function() {
        // Send a message to the background script to request the resumption of all paused tabs
        chrome.runtime.sendMessage({ action: 'resumeAllTabs' });
        
        // Clear the UI by re-populating the pausedTabsList (which will now be empty)
        pausedTabsData.length = 0;
        populatePausedTabsList(); // Repopulate the UI
    });

    // Populate the paused tabs list and display statistics when the popup is loaded
    populatePausedTabsList();
});
