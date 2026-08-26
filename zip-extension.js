import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure dist folder exists
const distPath = path.resolve(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
    console.error('Error: dist folder not found. Run "npm run build" first.');
    process.exit(1);
}

// Create output file stream
const output = fs.createWriteStream(path.join(__dirname, 'Final_Corrected_Extension.zip'));
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

// Listen for all archive data to be written
output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('Extensions compressed successfully into extension.zip');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
        // log warning
        console.warn(err);
    } else {
        // throw error
        throw err;
    }
});

// good practice to catch this error explicitly
archive.on('error', function (err) {
    throw err;
});

// pipe archive data to the file
archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory(distPath, false);

// finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();
