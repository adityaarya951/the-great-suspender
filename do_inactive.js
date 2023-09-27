// Suppose you have an array of tab IDs that you want to set as inactive
const tabsToSetInactive = [1, 2, 3];

// Loop through the array of tab IDs and set each tab as inactive
tabsToSetInactive.forEach(tabId => {
    chrome.tabs.update(tabId, { active: false }, (updatedTab) => {
        // Callback function (optional) that runs after the tab is updated
        if (chrome.runtime.lastError) {
            // Handle any errors that may occur during the update
            console.error(chrome.runtime.lastError);
        } else {
            // The tab has been set as inactive
            console.log(`Tab ${tabId} is now inactive.`);
        }
    });
});
