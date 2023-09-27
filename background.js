// in this file we will majorly be checking activity of tabs and will be sendiing an action 
// if they are not active or have time more than threshold 

// An object to store tab activity data
const tabActivity = {};

// Set the threshold for tab inactivity (e.g., 5 minutes)
const inactivityThreshold = 5 * 60 * 1000; // 5 minutes in milliseconds

// Track tab activity when tabs are updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
if (changeInfo.status === 'complete') {
    // Tab has finished loading
    tabActivity[tabId] = {
    lastActiveTime: Date.now(),
    active: true,
    };
}
});

// Track tab activity when tabs are activated
chrome.tabs.onActivated.addListener((activeInfo) => {
const tabId = activeInfo.tabId;
if (!tabActivity[tabId]) {
    // If the tab is not in the tabActivity object, initialize it
    tabActivity[tabId] = {
    lastActiveTime: Date.now(),
    active: true,
    };
} else {
    // If the tab is already in the tabActivity object, update its activity
    tabActivity[tabId].lastActiveTime = Date.now();
    tabActivity[tabId].active = true;
}
});

// Track tab activity when tabs are removed or closed
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
delete tabActivity[tabId];
});

// Check tab activity periodically and pause inactive tabs
setInterval(() => {
chrome.tabs.query({}, (tabs) => {
    const currentTime = Date.now();

    tabs.forEach((tab) => {
    const tabId = tab.id;

    if (tabActivity[tabId] && tabActivity[tabId].active) {
        const lastActiveTime = tabActivity[tabId].lastActiveTime;
        if (currentTime - lastActiveTime >= inactivityThreshold) {
          // Tab has been inactive for the threshold duration, pause it
        chrome.tabs.sendMessage(tabId, { action: 'pauseTab' });
        tabActivity[tabId].active = false;
        }
    }
    });
});
}, 10000); // Check every 10 seconds for inactivity
