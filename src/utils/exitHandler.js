import { stdin, exit } from 'node:process';

const exitHandler = (username) => {
  stdin.resume();
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  exit();
};

export default exitHandler;
