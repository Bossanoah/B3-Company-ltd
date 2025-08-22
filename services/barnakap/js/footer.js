// Function to load footer into all pages
document.addEventListener('DOMContentLoaded', function() {
    // Create a container for the footer
    const footerContainer = document.createElement('div');
    footerContainer.id = 'footer-container';
    
    // Add the footer container just before the closing body tag
    document.body.appendChild(footerContainer);
    
    // Fetch and insert the footer HTML
    fetch('../shared/footer.html')
        .then(response => response.text())
        .then(html => {
            footerContainer.innerHTML = html;
            // Initialize any footer-specific JavaScript
            if (typeof initFooter === 'function') {
                initFooter();
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});
