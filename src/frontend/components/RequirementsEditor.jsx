import { createEffect } from 'solid-js';
import postDescriptor from '../service/postDescriptor';
import { promptDescriptor } from '../model/promptDescriptor';

const RequirementsEditor = () => {
  let requirements = promptDescriptor().requirements || '';

  const handleRequirementsChange = async (e) => {
    requirements = e.target.value;
    await postDescriptor({ requirements: requirements });
  };

  createEffect(() => {
    requirements = promptDescriptor().requirements || '';
  });

  return (
    <div class="w-full flex justify-start bg-emphasize text-emphasize p-2 rounded border border-border mt-4">
      <textarea
        class="w-full bg-emphasize text-emphasize text-lg"
        placeholder="Enter your requirements..."
        value={requirements}
        onInput={e => handleRequirementsChange(e)}
      />
    </div>
  );
};

export default RequirementsEditor;
