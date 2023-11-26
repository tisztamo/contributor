import fs from 'fs';
import path from 'path';
import getIgnoreList from './getIgnoreList.js';

async function readFileList(dir, relativePath = "") {
  try {
    const items = await fs.promises.readdir(dir);
    const { nameIgnore, pathIgnore } = getIgnoreList();
    const itemDetails = await Promise.all(
      items.map(async item => {
        if (nameIgnore.includes(item)) return;
        const fullPath = path.join(dir, item);
        if (pathIgnore.includes(fullPath.replace(/^.\//, ''))) return;
        const stats = await fs.promises.stat(fullPath);
        if (stats.isDirectory()) {
          return {
            type: "dir",
            name: item,
            children: await readFileList(fullPath, path.join(relativePath, item))
          };
        } else {
          let filePath = path.join(relativePath, item);
          if (filePath.startsWith('./')) {
            filePath = filePath.substring(2);
          }
          return {
            type: "file",
            name: item,
            path: filePath
          };
        }
      })
    );

    if (!relativePath) {
      return {
        type: "dir",
        name: ".",
        children: itemDetails.filter(Boolean)
      };
    } else {
      return itemDetails.filter(Boolean);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export default readFileList;
