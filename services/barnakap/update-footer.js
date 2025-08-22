const fs = require('fs');
const path = require('path');

// Function to update a single HTML file
function updateFile(filePath) {
    try {
        // Read the file content
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if the file already has the footer script
        if (content.includes('footer.js')) {
            console.log(`Skipping ${filePath} - already has footer`);
            return;
        }
        
        // Insert the footer script before the closing body tag
        const footerScript = '    <!-- Load Footer -->\n    <script src="../js/footer.js"></script>\n';
        
        if (content.includes('</body>')) {
            content = content.replace('</body>', footerScript + '\n</body>');
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated footer in ${filePath}`);
        } else {
            console.log(`Could not find </body> tag in ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Function to process all HTML files in a directory
function processDirectory(directory) {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    
    files.forEach(file => {
        const fullPath = path.join(directory, file.name);
        
        if (file.isDirectory()) {
            // Skip node_modules and other non-essential directories
            if (!['node_modules', '.git', 'css', 'js', 'images', 'shared'].includes(file.name)) {
                processDirectory(fullPath);
            }
        } else if (file.name.endsWith('.html') && file.name !== 'footer.html') {
            updateFile(fullPath);
        }
    });
}

// Start processing from the current directory
const rootDir = path.join(__dirname);
processDirectory(rootDir);

console.log('Footer update complete!');
