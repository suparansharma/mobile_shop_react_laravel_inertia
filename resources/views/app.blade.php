<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobile Shop</title>
    
    <?php if (app()->environment('local')): ?>
        <!-- React Refresh Preamble -->
        <script type="module">
            import RefreshRuntime from 'http://localhost:5173/@react-refresh'
            RefreshRuntime.injectIntoGlobalHook(window)
            window.$RefreshReg$ = () => {}
            window.$RefreshSig$ = () => (type) => type
            window.__vite_plugin_react_preamble_installed__ = true
        </script>
        <!-- Vite Development Server -->
        <script type="module" src="http://localhost:5173/@vite/client"></script>
        <link rel="stylesheet" href="http://localhost:5173/resources/css/app.css">
        <script type="module" src="http://localhost:5173/resources/js/app.jsx"></script>
    <?php else: ?>
        <!-- Production Build -->
        <?php
            $manifestPath = public_path('build/manifest.json');
            if (file_exists($manifestPath)) {
                $manifest = json_decode(file_get_contents($manifestPath), true);
                
                // Load Main CSS (Tailwind)
                if (isset($manifest['resources/css/app.css'])) {
                    echo '<link rel="stylesheet" href="/build/' . $manifest['resources/css/app.css']['file'] . '">';
                }

                // Load JS and Component CSS
                if (isset($manifest['resources/js/app.jsx'])) {
                    echo '<script type="module" src="/build/' . $manifest['resources/js/app.jsx']['file'] . '"></script>';
                    if (isset($manifest['resources/js/app.jsx']['css'])) {
                        foreach ($manifest['resources/js/app.jsx']['css'] as $css) {
                            echo '<link rel="stylesheet" href="/build/' . $css . '">';
                        }
                    }
                }
            }
        ?>
    <?php endif; ?>
</head>
<body>
    <div id="root"></div>
</body>
</html>
