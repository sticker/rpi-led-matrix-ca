const { exec } = require('child_process');

// 実行したいコマンド
const command = 'sudo npm run work -- works/ca1.ts';

// コマンドを実行するディレクトリ
const directoryPath = './';

// コマンドを実行
exec(command, { cwd: directoryPath }, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stdout) {
    console.log(`stdout: ${stdout}`);
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
});
