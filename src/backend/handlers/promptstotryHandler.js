import readFileList from '../fileutils/readFileList.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

export async function promptstotryHandler(req, res) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    let dirPath = path.join(process.cwd(), 'prompt/totry'); // Corrected directory path
    let files = await readFileList(dirPath);
    
    if (!files.children.length) { // Corrected check for empty result
      dirPath = path.join(__dirname, '../../../prompt/totry');
      files = await readFileList(dirPath);
    }

    const fileContents = await Promise.all(files.children.map(async file => {
      const content = await fs.promises.readFile(path.join(dirPath, file.name), 'utf8');
      return { name: file.name, content };
    }));
    res.json(fileContents);
}
