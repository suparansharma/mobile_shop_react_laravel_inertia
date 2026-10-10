<?php

$targetFolder = __DIR__ . '/cellx_app/storage/app/public';
$linkFolder = __DIR__ . '/storage';

if (file_exists($linkFolder)) {
    echo "Storage folder or symlink already exists! Please delete 'public_html/storage' first.";
} else {
    if(symlink($targetFolder, $linkFolder)) {
        echo "Symlink created successfully! Your images will now work.";
    } else {
        echo "Failed to create symlink. Make sure symlink() function is enabled in your PHP settings.";
    }
}
