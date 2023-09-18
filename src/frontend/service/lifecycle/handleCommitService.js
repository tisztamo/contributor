import { postCommit } from '../postCommit';
import postDescriptor from '../postDescriptor';
import { commitMessage } from '../../model/commitMessage';
import { fetchGitStatus } from '../fetchGitStatus';
import clearState from '../clearState';

export default async function handleCommitService() {
  const response = await postCommit(commitMessage());
  console.log(response.message);
    
  await postDescriptor({ requirements: '' });
    
  const status = await fetchGitStatus();
  console.log(status);
  clearState();
}
