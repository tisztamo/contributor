import { saveAndSendPrompt } from './saveAndSendPrompt.js';
import generatePrompt from '../prompt/generatePrompt.js';
import { loadPromptDescriptor } from '../prompt/loadPromptDescriptor.js';
import watchPromptDescriptor from '../prompt/watchPromptDescriptor.js';
import { rl } from '../config.js';

const startInteractiveSession = async () => {
  await loadPromptDescriptor(console.log);
  watchPromptDescriptor(console.log);

  // Using ANSI escape codes for green text
  console.log("\x1b[32mWatching for changes in prompt.yaml. Press Enter to generate prompt\x1b[0m");

  rl.question('', async () => {
    let { prompt } = await generatePrompt('');
    console.log("Your prompt: ", prompt);
    rl.question('Do you want to send this prompt? (y/n): ', async (confirmation) => {
      if (confirmation.toLowerCase() === 'y') {
        await saveAndSendPrompt(prompt, '');
      } else {
        startInteractiveSession();
      }
    });
  });
};

export { startInteractiveSession };
