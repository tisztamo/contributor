import simpleGit from 'simple-git';

const git = simpleGit();

export default async function clearBranches(exceptions = []) {
  try {
    const currentBranch = await git.revparse(['--abbrev-ref', 'HEAD']);
    const allBranches = await git.branchLocal();

    const branchesToDelete = allBranches.all.filter(branch => {
      return branch !== currentBranch && !exceptions.includes(branch);
    });

    for (const branch of branchesToDelete) {
      try {
        const isMerged = await git.raw(['branch', '--merged', branch]);
        if (isMerged.includes(branch)) {
          await git.branch(['-d', branch]);
        } else {
          console.log(`Branch ${branch} is not merged, skipping...`);
        }
      } catch (err) {
        console.log(`Failed to delete branch ${branch}: ${err.message}. Skipping...`);
      }
    }
  } catch (err) {
    console.error(`An error occurred: ${err}`);
  }
}
