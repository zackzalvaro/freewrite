// journal.js - Simple journal saving functionality for Freewrite app

// Make.com webhook URL (replace with your actual webhook URL)
const WEBHOOK_URL = 'https://hook.eu1.make.com/ybatru1rg16a5c2ddvefftrgoyqdb54f';

// Save journal function
async function saveJournal() {
    try {
        // Get the textarea element and its content
        const textarea = document.querySelector('.text-area');
        const content = textarea.value.trim();
        
        // Check if there's content to save
        if (!content) {
            alert('Nothing to save. Write something first!');
            return;
        }
        
        // Get current timestamp
        const timestamp = new Date().toISOString();
        
        // Create the payload
        const payload = {
            timestamp: timestamp,
            content: content
        };
        
        // Send POST request to Make.com webhook
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        // Check response and show appropriate message
        if (response.ok) {
            alert('Saved!');
        } else {
            alert('Failed to save.');
        }
        
    } catch (error) {
        // Handle network errors or other issues
        console.error('Error saving journal:', error);
        alert('Failed to save.');
    }
}

// Add event listener when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Find or create the save button
    let saveButton = document.querySelector('#save-button');
    
    // If save button doesn't exist in HTML, create it
    if (!saveButton) {
        // Create save button
        saveButton = document.createElement('button');
        saveButton.id = 'save-button';
        saveButton.className = 'nav-button';
        saveButton.textContent = 'Save';
        saveButton.onclick = saveJournal;
        
        // Find the nav group and add the save button
        const rightNavGroup = document.querySelectorAll('.nav-group')[1];
        if (rightNavGroup) {
            // Add separator
            const separator = document.createElement('span');
            separator.className = 'nav-separator';
            separator.textContent = '•';
            
            // Insert before the last separator (before the history button)
            const lastSeparator = rightNavGroup.querySelector('.nav-separator:last-of-type');
            rightNavGroup.insertBefore(separator, lastSeparator);
            rightNavGroup.insertBefore(saveButton, lastSeparator);
        }
    } else {
        // If button exists, just add the click handler
        saveButton.onclick = saveJournal;
    }
});

// Optional: Add keyboard shortcut (Cmd+S or Ctrl+S)
document.addEventListener('keydown', function(event) {
    // Check for Cmd+S (Mac) or Ctrl+S (Windows/Linux)
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault(); // Prevent browser save dialog
        saveJournal();
    }
});
