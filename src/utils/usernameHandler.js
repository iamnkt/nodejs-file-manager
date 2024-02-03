import process from 'node:process';
import os from 'node:os';

const getUsername = () => {
  let username;

  try {
    username = process.argv.slice(2).find((arg) => arg.startsWith('--username=')).slice(11);
  } catch {
    username = os.userInfo().username;
  }
  return username;
}

export default getUsername;
