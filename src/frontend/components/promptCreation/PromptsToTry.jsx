import { For } from 'solid-js';
import { promptsToTry } from '../../model/promptsToTryModel';
import { setRequirements } from '../../model/requirements';

const PromptsToTry = () => {
  const handleClick = (promptContent) => {
    setRequirements(promptContent);
  };

  return (
    <div class="flex space-x-4 overflow-x-auto py-2">
      <div>Prompts to try:</div>
      <For each={promptsToTry()}>{(prompt) => 
        <a href="#" class="cursor-pointer ml-2 text-blue-500 bg-gray-200 rounded px-4 py-2" onClick={() => handleClick(prompt.name)}>{prompt.name}</a>
      }</For>
    </div>
  );
};

export default PromptsToTry;
