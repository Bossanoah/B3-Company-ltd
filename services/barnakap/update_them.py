import os
import re

def update_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Update logo
    logo_pattern = r'<div class="flex-shrink-0">\s*<a [^>]*>\s*<img [^>]*>\s*</a>\s*</div>'
    new_logo = '''<div class="flex-shrink-0">
                        <a href="../index.html" class="flex items-center">
                            <img src="../Bar-images/image.png" alt="Barnakap City Logo" class="h-12">
                        </a>
                    </div>'''
    
    # If logo not found, add it before the navigation
    if not re.search(logo_pattern, content):
        nav_pattern = r'<div class="hidden md:flex items-center space-x-4">'
        content = re.sub(nav_pattern, new_logo + '\n                ' + nav_pattern, content)
    
    # Update color scheme in Tailwind config
    color_config = '''colors: {
                        'b3-black': '#0a0a0a',
                        'b3-yellow': '#FFD700',
                        'b3-dark-yellow': '#D4AF37',
                        'b3-gray': '#1f2937',
                        'b3-logo': '#E5B80B',
                        'barnakap-red': '#FFD700',
                        'barnakap-gold': '#FFD700',
                        'barnakap-dark': '#111827',
                    }'''
    
    color_pattern = r'colors:\s*\{[^}]*\}'
    content = re.sub(color_pattern, color_config, content, flags=re.DOTALL)
    
    # Update hover colors
    content = content.replace('hover:text-gold', 'hover:text-b3-yellow')
    content = content.replace('text-gold', 'text-b3-yellow')
    content = content.replace('hover:bg-b3-red', 'hover:bg-b3-yellow hover:bg-opacity-20')
    content = content.replace('bg-b3-red', 'bg-b3-yellow')
    content = content.replace('border-b3-red', 'border-b3-yellow')
    content = content.replace('from-b3-red', 'from-b3-yellow')
    content = content.replace('to-b3-red', 'to-b3-yellow')
    
    # Update text colors for active states
    content = content.replace('text-barnakap-red', 'text-b3-yellow')
    content = content.replace('text-barnakap-gold', 'text-b3-yellow')
    
    # Update border colors
    content = content.replace('border-barnakap-red', 'border-b3-yellow')
    content = content.replace('border-barnakap-gold', 'border-b3-yellow')
    
    # Update background gradients
    content = content.replace('from-barnakap-red', 'from-b3-yellow')
    content = content.replace('to-barnakap-red', 'to-b3-yellow')
    
    # Write changes back to file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"Updated: {file_path}")

def main():
    # Get all HTML files in the barnakap directory and subdirectories
    barnakap_dir = os.path.dirname(os.path.abspath(__file__))
    
    for root, _, files in os.walk(barnakap_dir):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                update_file(file_path)

if __name__ == "__main__":
    main()
