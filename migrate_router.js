const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'resources', 'js', 'src');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    if (content.includes('next/navigation') || content.includes('next/router')) {
        // Replace next/navigation imports with useNavigate
        content = content.replace(/import\s*\{([^}]*)\}\s*from\s*['"]next\/(?:navigation|router)['"];?/g, (match, imports) => {
            return `import { useNavigate, useLocation } from 'react-router-dom';`;
        });
        
        // Replace useRouter() with useNavigate()
        content = content.replace(/const\s+(\w+)\s*=\s*useRouter\(\)/g, "const $1 = useNavigate()");
        
        // Replace router.push('/xyz') with router('/xyz') 
        // since we rename it to router = useNavigate(), router.push becomes router('/xyz')
        content = content.replace(/(\w+)\.push\((.*?)\)/g, "$1($2)");

        // Replace usePathname with useLocation
        content = content.replace(/const\s+(\w+)\s*=\s*usePathname\(\)/g, "const $1 = useLocation().pathname");

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

console.log("Fixing Next.js Navigation...");
traverseDir(srcPath);
console.log("Done!");
