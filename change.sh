#!/bin/sh
set -e
goal="Initialize a new git repository for Junior"
echo "Plan:"
echo "1. Create a new command junior-init in src/init.js"
echo "2. Initialize a new git repository"
echo "3. Create/Append .gitignore"
echo "4. Commit the changes"
echo "5. Create prompt.yaml"
echo "6. Display a success message"

# Step 1
cat <<'EOF' > src/init.js
#!/usr/bin/env node
import { execSync } from 'child_process';
import { appendFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

function juniorInit() {
  execSync('git init', { stdio: 'inherit' });
  
  const gitignorePath = join(process.cwd(), '.gitignore');
  const ignoreContent = ['prompt.yaml', 'prompt.md', 'change.sh'].join('\n');

  if (existsSync(gitignorePath)) {
    appendFileSync(gitignorePath, `\n${ignoreContent}`);
  } else {
    writeFileSync(gitignorePath, ignoreContent);
  }

  execSync('git add .gitignore', { stdio: 'inherit' });
  execSync('git commit -m "Junior init"', { stdio: 'inherit' });

  const yamlContent = `task: prompt/task/feature/implement.md
attention:
  - ./
requirements: Create a Hello World in Node.js`;

  writeFileSync('prompt.yaml', yamlContent);

  console.log('\x1b[32mRepo initialized for Junior development\x1b[0m');
}

juniorInit();
EOF

# Make the file executable
chmod +x src/init.js

# Include junior-init in package.json bin section
jq '.bin["junior-init"] = "src/init.js"' package.json > temp.json && mv temp.json package.json

echo "\033[32mDone: $goal\033[0m\n"
