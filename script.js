// ===================================
// GLOBAL VARIABLES AND STATE MANAGEMENT
// ===================================

// Global variables to track current state of the application
let currentTab = 'tab1'; // Tracks which tab is currently active (default: tab1)
let isLoading = false;   // Prevents multiple simultaneous API calls

/**
 * ===================================
 * APPLICATION INITIALIZATION
 * ===================================
 */

/**
 * Initialize the application when DOM is fully loaded
 * This ensures all HTML elements are available before JavaScript runs
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all major components of the application
    initializeTabSystem();     // Set up tab switching functionality
    initializeMenuItems();     // Set up menu item click handlers
    updateStatusMessage('Application initialized - Ready to use'); // Show ready status
});

/**
 * ===================================
 * TAB SYSTEM FUNCTIONALITY
 * ===================================
 */

/**
 * Initialize the tab switching system
 * Sets up event listeners for tab buttons and handles tab switching logic
 */
function initializeTabSystem() {
    // Get all tab buttons from the DOM
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Prevent switching if currently loading (API call in progress)
            if (isLoading) {
                updateStatusMessage('Please wait for current operation to complete', 'error');
                return; // Exit function early
            }
            
            // Get the target tab ID from the button's data attribute
            const targetTab = this.getAttribute('data-tab');
            // Switch to the selected tab
            switchToTab(targetTab);
        });
    });
}

/**
 * Switch to a specific tab
 * Handles all visual changes and state updates for tab switching
 * @param {string} tabId - The ID of the tab to switch to (e.g., 'tab1', 'tab2', 'tab3')
 */
function switchToTab(tabId) {
    // Update current tab tracking variable
    currentTab = tabId;
    
    // Remove active class from all tab buttons
    const allTabButtons = document.querySelectorAll('.tab-button');
    allTabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to the clicked tab button
    const activeTabButton = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeTabButton) {
        activeTabButton.classList.add('active');
    }
    
    // Hide all tab content panels
    const allTabContent = document.querySelectorAll('.tab-content');
    allTabContent.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show the selected tab content panel
    const activeTabContent = document.getElementById(tabId);
    if (activeTabContent) {
        activeTabContent.classList.add('active');
    }
    
    // Update status message to reflect the tab change
    const tabName = getTabDisplayName(tabId);
    updateStatusMessage(`Switched to ${tabName}`, 'success');
}

/**
 * Get human-readable display name for tab ID
 * Converts technical tab IDs to user-friendly names
 * @param {string} tabId - The technical tab ID (e.g., 'tab1')
 * @returns {string} - Human readable tab name (e.g., 'Main Dishes')
 */
function getTabDisplayName(tabId) {
    // Mapping object for tab ID to display name conversion
    const tabNames = {
        'tab1': 'Main Dishes',
        'tab2': 'Beverages', 
        'tab3': 'Desserts'
    };
    // Return mapped name or fallback to original ID if not found
    return tabNames[tabId] || tabId;
}

/**
 * ===================================
 * MENU ITEM FUNCTIONALITY
 * ===================================
 */

/**
 * Initialize menu item click handlers
 * Sets up event listeners for all menu items to simulate REST API calls
 */
function initializeMenuItems() {
    // Get all menu item buttons from the DOM
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Add click event listeners to all menu items
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Prevent multiple simultaneous API calls
            if (isLoading) {
                updateStatusMessage('API call already in progress - Please wait', 'error');
                return; // Exit function early
            }
            
            // Get the item name from the button's data attribute
            const itemName = this.getAttribute('data-item');
            // Simulate a REST API call for this item
            simulateRestApiCall(itemName);
        });
    });
}

/**
 * ===================================
 * REST API SIMULATION
 * ===================================
 */

/**
 * Simulate a REST API call for the selected menu item
 * Includes realistic delays, loading states, and occasional failures
 * @param {string} itemName - Name of the menu item to "order"
 */
function simulateRestApiCall(itemName) {
    // Set loading state to prevent multiple simultaneous calls
    isLoading = true;
    updateStatusMessage(`Simulating REST API call for "${itemName}"...`, 'loading');
    
    // Disable all menu items during loading to prevent user confusion
    disableMenuItems(true);
    
    // Simulate realistic API call delay (1-3 seconds)
    const delay = Math.random() * 2000 + 1000; // Random delay between 1000-3000ms
    
    // Use setTimeout to simulate network delay
    setTimeout(() => {
        // Simulate occasional API failures (10% chance of failure)
        const success = Math.random() > 0.1; // 90% success rate
        
        // Handle success or failure
        if (success) {
            handleApiSuccess(itemName);
        } else {
            handleApiError(itemName);
        }
        
        // Reset loading state and re-enable menu items
        isLoading = false;
        disableMenuItems(false);
    }, delay);
}

/**
 * Handle successful API response
 * Updates status message with success indication and timestamp
 * @param {string} itemName - Name of the menu item that was successfully "ordered"
 */
function handleApiSuccess(itemName) {
    // Get current time for timestamp
    const currentTime = new Date().toLocaleTimeString();
    // Update status with success message including timestamp
    updateStatusMessage(`✓ API call successful for "${itemName}" at ${currentTime}`, 'success');
}

/**
 * Handle API error response
 * Updates status message with error indication and timestamp
 * @param {string} itemName - Name of the menu item that failed to "order"
 */
function handleApiError(itemName) {
    // Get current time for timestamp
    const currentTime = new Date().toLocaleTimeString();
    // Update status with error message including timestamp
    updateStatusMessage(`✗ API call failed for "${itemName}" at ${currentTime}`, 'error');
}

/**
 * ===================================
 * USER INTERFACE UTILITIES
 * ===================================
 */

/**
 * Update the status message in the status bar
 * Handles both message content and visual styling based on message type
 * @param {string} message - The message to display to the user
 * @param {string} type - The type of message ('loading', 'success', 'error', or default)
 */
function updateStatusMessage(message, type = '') {
    // Get the status message element from the DOM
    const statusElement = document.getElementById('statusMessage');
    
    // Only proceed if the element exists (defensive programming)
    if (statusElement) {
        // Update the text content
        statusElement.textContent = message;
        
        // Remove all existing status classes to reset styling
        statusElement.classList.remove('loading', 'success', 'error');
        
        // Add appropriate class based on message type for styling
        if (type) {
            statusElement.classList.add(type);
        }
    }
}

/**
 * Enable or disable all menu items
 * Used during API calls to prevent user interaction and provide visual feedback
 * @param {boolean} disabled - Whether to disable the items (true) or enable them (false)
 */
function disableMenuItems(disabled) {
    // Get all menu item buttons from the DOM
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Apply disabled state and styling to each menu item
    menuItems.forEach(item => {
        // Set the disabled property
        item.disabled = disabled;
        
        // Apply visual styling based on disabled state
        if (disabled) {
            item.style.opacity = '0.6';        // Make items appear faded
            item.style.cursor = 'not-allowed'; // Show "not allowed" cursor
        } else {
            item.style.opacity = '1';          // Restore full opacity
            item.style.cursor = 'pointer';     // Restore pointer cursor
        }
    });
}

/**
 * ===================================
 * DEBUGGING AND UTILITY FUNCTIONS
 * ===================================
 */

/**
 * Get current tab information (utility function for debugging)
 * Useful for debugging and monitoring application state
 * @returns {object} - Object containing current application state information
 */
function getCurrentTabInfo() {
    return {
        currentTab: currentTab,           // Currently active tab
        isLoading: isLoading,            // Whether an API call is in progress
        timestamp: new Date().toISOString() // Current timestamp in ISO format
    };
}

// ===================================
// END OF SCRIPT
// ===================================

/*
 * ADDITIONAL NOTES FOR DEVELOPERS:
 * 
 * 1. Error Handling: The application includes defensive programming practices
 *    such as checking if DOM elements exist before manipulating them.
 * 
 * 2. State Management: Global variables are used to track application state.
 *    In a larger application, consider using a state management library.
 * 
 * 3. Performance: Event listeners are attached once during initialization
 *    rather than being added/removed dynamically for better performance.
 * 
 * 4. Accessibility: Consider adding ARIA attributes and keyboard navigation
 *    support for better accessibility in future versions.
 * 
 * 5. Extensibility: The modular function structure makes it easy to add
 *    new features like additional tabs, menu items, or API endpoints.
 */