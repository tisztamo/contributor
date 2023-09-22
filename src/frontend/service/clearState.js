import { setChange } from '../model/change';
import { setExecutionResult } from '../model/executionResult';
import { setCommitMessage } from '../model/commitMessage';
import { setPrompt } from '../model/prompt';
import { setGitStatus } from '../model/gitStatus';
import { setProof } from '../model/proofModel';

const clearState = () => {
  setChange('');
  setExecutionResult('');
  setCommitMessage('');
  setPrompt('');
  setGitStatus('');
  setProof('');
};

export default clearState;
