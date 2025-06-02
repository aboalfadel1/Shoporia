import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to client assets
const sourcePath = path.resolve(__dirname, '../../client/src/assets/img');
// Path to public folder where we want to copy images
const targetPath = path.resolve(__dirname, '../../client/public/images');

const copyImagesToPublic = async () => {
  try {
    // Create the directory if it doesn't exist
    await fs.ensureDir(targetPath);
    
    // Copy all images from assets to public folder
    await fs.copy(sourcePath, targetPath);
    
    console.log('Images successfully copied to public folder');
  } catch (error) {
    console.error('Error copying images:', error);
  }
};

// Execute the function
copyImagesToPublic();
