const fs = require('fs');
const path = require('path');

// Configuration
const pagesDir = path.join(__dirname, 'pages');
const outputDir = path.join(__dirname, 'pages');
const navigationPath = path.join('..', 'shared', 'navigation.html');
const footerPath = path.join('..', 'shared', 'footer.html');

// Common head content with Tailwind and styles
const commonHead = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barnakap City</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'b3-black': '#0a0a0a',
                        'b3-red': '#dc2626',
                        'b3-dark-red': '#991b1b',
                        'b3-gray': '#1f2937',
                        'gold': '#ffd700',
                        'barnakap-red': '#DC2626',
                        'barnakap-gold': '#F59E0B',
                        'barnakap-dark': '#111827',
                    }
                }
            }
        }
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.5/css/flag-icons.min.css" />
    <link rel="stylesheet" href="../css/styles.css">
`;

// Navigation and footer placeholders
const navigationPlaceholder = `
    <!-- Navigation -->
    <div id="navigation">
        <!-- Navigation will be loaded here -->
    </div>
`;

const footerPlaceholder = `
    <!-- Footer -->
    <div id="footer">
        <!-- Footer will be loaded here -->
    </div>
`;

// Scripts to load navigation and footer
const loadScripts = `
    <!-- Main JavaScript -->
    <script src="../js/main.js"></script>
    
    <!-- Load Navigation and Footer -->
    <script>
        // Load navigation
        fetch('${navigationPath}')
            .then(response => response.text())
            .then(data => {
                const nav = document.getElementById('navigation');
                if (nav) nav.innerHTML = data;
                if (typeof initNavigation === 'function') {
                    initNavigation();
                }
            })
            .catch(error => console.error('Error loading navigation:', error));

        // Load footer
        fetch('${footerPath}')
            .then(response => response.text())
            .then(data => {
                const footer = document.getElementById('footer');
                if (footer) footer.innerHTML = data;
                if (typeof initFooter === 'function') {
                    initFooter();
                }
            })
            .catch(error => console.error('Error loading footer:', error));
    </script>
`;

// Process each HTML file in the pages directory
function processPages() {
    const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(pagesDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if already processed
        if (content.includes('id="navigation"') && content.includes('id="footer"')) {
            console.log(`Skipping ${file} - already has navigation and footer`);
            return;
        }
        
        // Update head section
        content = content.replace(/<head>([\s\S]*?)<\/head>/, `<head>${commonHead}</head>`);
        
        // Add navigation after body tag
        if (!content.includes('id="navigation"')) {
            content = content.replace(/<body[^>]*>/, match => {
                return `${match}\n${navigationPlaceholder}`;
            });
        }
        
        // Add footer before closing body tag
        if (!content.includes('id="footer"')) {
            // Remove any existing footer comments
            content = content.replace(/<!--\s*Footer[\s\S]*?-->/g, '');
            content = content.replace(/<script[^>]*src=["'].*?main\.js["'][^>]*>\s*<\/script>/i, '');
            
            // Add our footer and scripts
            content = content.replace(/<\/body>/, `\n${footerPlaceholder}\n${loadScripts}\n</body>`);
        }
        
        // Save the updated file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    });
    
    console.log('All pages have been updated!');
}

// Run the script
processPages();
