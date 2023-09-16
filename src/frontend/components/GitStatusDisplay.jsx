import { onMount, createEffect, createSignal } from 'solid-js';
import GitStatusRow from './GitStatusRow';
import { gitStatus } from '../model/gitStatus';
import { fetchGitStatus } from '../service/fetchGitStatus';

const GitStatusDisplay = () => {
  let [statusMessage, setStatusMessage] = createSignal("");
  let [fileList, setFileList] = createSignal([]);

  onMount(async () => {
    try {
      await fetchGitStatus();
      const gitStatusValue = gitStatus();
      if (gitStatusValue.error) {
        setStatusMessage(`${gitStatusValue.message}\n${gitStatusValue.error.stderr}`);
      } else if (gitStatusValue.data && gitStatusValue.data.files) {
        setFileList(gitStatusValue.data.files);
      }
    } catch (error) {
      setStatusMessage("Error fetching git status.");
    }
  });

  return (
    <pre class="rounded overflow-auto max-w-full">
      {statusMessage()}
      {fileList().map(entry => <GitStatusRow key={entry.path} entry={entry} />)}
    </pre>
  );
};

export default GitStatusDisplay;
