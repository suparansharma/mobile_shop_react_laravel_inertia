const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'backend', 'resources', 'js', 'src', 'app');
const outputFile = path.join(__dirname, 'backend', 'resources', 'js', 'app.jsx');

let imports = `import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';\n\n`;

let routes = [];

function generateRouteName(filePath) {
    let relativePath = path.relative(appDir, filePath);
    let routePath = '/' + relativePath.replace(/\\/g, '/').replace(/\/page\.(tsx|jsx|ts|js)$/, '').replace(/page\.(tsx|jsx|ts|js)$/, '');
    
    // Handle Next.js dynamic routes like [slug] or [id]
    routePath = routePath.replace(/\[([^\]]+)\]/g, ':$1');
    
    if (routePath === '/') routePath = '/';
    if (routePath.endsWith('/') && routePath.length > 1) {
        routePath = routePath.slice(0, -1);
    }
    
    let componentName = 'Page_' + relativePath.replace(/[^a-zA-Z0-9]/g, '_');
    return { routePath, componentName, relativePath: './src/app/' + relativePath.replace(/\\/g, '/') };
}

function traverseDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            traverseDir(fullPath);
        } else if (file === 'page.tsx' || file === 'page.jsx') {
            const { routePath, componentName, relativePath } = generateRouteName(fullPath);
            imports += `import ${componentName} from '${relativePath.replace(/\.(tsx|jsx)$/, '')}';\n`;
            routes.push(`                <Route path="${routePath}" element={<${componentName} />} />`);
        }
    }
}

traverseDir(appDir);

let appContent = `${imports}
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
${routes.join('\n')}
                <Route path="*" element={<div className="flex h-screen items-center justify-center bg-gray-100 text-2xl font-bold text-gray-800">404 - Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
`;

fs.writeFileSync(outputFile, appContent, 'utf8');
console.log('Successfully generated app.jsx with', routes.length, 'routes.');
