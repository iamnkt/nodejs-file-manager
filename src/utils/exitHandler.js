import process from 'node:process';

const exitHandler = (username) => {
  process.stdin.resume();
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
};

export default exitHandler;
