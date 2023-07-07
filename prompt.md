# Working set

```
./
├── .DS_Store
├── .git/...
├── .gitignore
├── .vscode/...
├── README.md
├── babel.config.js
├── change.sh
├── dist/...
├── doc/...
├── node_modules/...
├── package-lock.json
├── package.json
├── prompt/...
├── prompt.md
├── prompt.yaml
├── secret.sh
├── src/...
├── tmp/...

```
src/interactiveSession/startInteractiveSession.js:
```
import { saveAndSendPrompt } from './saveAndSendPrompt.js';
import processPrompt from '../prompt/promptProcessing.js';

const startInteractiveSession = async (last_command_result = "", parent_message_id = null, rl, api) => {
  rl.question('Notes: ', async (task) => {
    let { prompt } = await processPrompt(task, last_command_result);
    console.log("Your prompt: ", prompt);
    rl.question('Do you want to send this prompt? (yes/no): ', async (confirmation) => {
      if (confirmation.toLowerCase() === 'yes') {
        await saveAndSendPrompt(task, last_command_result, api, rl, startInteractiveSession);
      } else {
        startInteractiveSession(last_command_result, parent_message_id, rl, api);
      }
    });
  });
};

export { startInteractiveSession };

```

src/interactiveSession/saveAndSendPrompt.js:
```
import { printNewText } from './printNewText.js';
import { handleApiResponse } from './handleApiResponse.js';

const saveAndSendPrompt = async (task, last_command_result, api, rl, startInteractiveSession) => {
  let lastTextLength = 0;
  const res = await api.sendMessage(task, { onProgress: printNewText(lastTextLength) });
  const parent_message_id = res.id;
  console.log("\x1b[0m");
  const msg = res.text.trim();
  console.log("");
  handleApiResponse(msg, last_command_result, parent_message_id, rl, api);
}

export { saveAndSendPrompt };

```

src/prompt/promptProcessing.js:
```
import { createPrompt } from './createPrompt.js';
import fs from 'fs/promises';

const processPrompt = async (task, last_command_result, saveto = 'prompt.md', parent_message_id = null) => {
  const { prompt, saveto: newSaveto } = await createPrompt(task, last_command_result);
  await fs.writeFile(newSaveto || saveto, prompt);
  return { prompt, parent_message_id };
}

export default processPrompt;

```


# Task

Fix the following issue!

Display the prompt before the confirmation!


# Output Format

./change.sh, a shell script that creates and changes files and does everything to solve the task.
Files should be heredoc.
Assume OSX. npm and jq are installed.
Example:
change.sh:
```sh
#!/bin/sh
# Plan:
# ... plan goes here ...

[Commands solving the task]
```
end of Example
