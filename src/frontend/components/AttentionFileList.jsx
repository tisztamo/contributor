import { onCleanup, createEffect } from 'solid-js';
import { fileList, setFileList } from '../model/fileList';
import fetchFileList from '../service/fetchFileList';

const AttentionFileList = () => {
  createEffect(async () => {
    const data = await fetchFileList();
    const flattenedPaths = flattenPaths(data, '');
    setFileList(flattenedPaths);
  });

  const flattenPaths = (node, path) => {
    if (node.type === 'file') {
      return [path + '/' + node.name];
    }
    if (!Array.isArray(node.children)) {
      return [];
    }
    return node.children.reduce((acc, child) => {
      return acc.concat(flattenPaths(child, path + '/' + node.name));
    }, []);
  };

  onCleanup(() => {});

  return (
    <div class="border p-4">
      {fileList().slice(0, 5).map(file => <div>{file}</div>)} {/* GOAL OF THE CHANGE: Limiting displayed fileList to 5 items */}
    </div>
  );
};

export default AttentionFileList;

