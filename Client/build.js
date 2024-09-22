// build.js
const { execSync } = require('child_process');
const os = require('os');

const platform = os.platform();

try {
    if (platform === 'linux') {
        // Linux-specific build commands
        console.log('Running build on Linux');
        execSync('npm install @esbuild/linux-x64', { stdio: 'inherit' });
    } else if (platform === 'win32') {
        // Windows-specific build commands
        console.log('Running build on Windows');
        execSync('npm install @esbuild/windows-x64', { stdio: 'inherit' });
    } else if (platform === 'darwin') {
        // macOS-specific build commands
        console.log('Running build on macOS');
        execSync('npm install @esbuild/darwin-x64', { stdio: 'inherit' });
    } else {
        console.error(`Unsupported platform: ${platform}`);
        process.exit(1);
    }

    // Common build steps go here
    execSync('esbuild src/index.js --bundle --outdir=dist', { stdio: 'inherit' });

} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
