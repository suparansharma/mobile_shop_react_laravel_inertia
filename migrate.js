const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'backend', 'resources', 'js', 'src');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Replace next/link
    if (content.includes("from 'next/link'") || content.includes('from "next/link"')) {
        content = content.replace(/import\s+Link\s+from\s+['"]next\/link['"]/g, "import { Link } from 'react-router-dom'");
        content = content.replace(/<Link([^>]*)href=/g, "<Link$1to=");
        hasChanges = true;
    }

    // Replace next/image
    if (content.includes("from 'next/image'") || content.includes('from "next/image"')) {
        content = content.replace(/import\s+Image\s+from\s+['"]next\/image['"]/g, "");
        content = content.replace(/<Image/g, "<img");
        hasChanges = true;
    }

    if (hasChanges) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated:', filePath);
    }
}

function traverseDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            traverseDir(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.js')) {
            processFile(fullPath);
        }
    }
}

console.log("Starting Next.js to React SPA conversion...");
traverseDir(srcPath);
console.log("Done!");
