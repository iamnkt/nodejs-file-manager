import os from 'os';
import { stdout as output, chdir } from 'node:process';
import getUsername from './utils/usernameHandler.js';
import { App } from './app.js';
import showDirectory from './utils/showDirectoryHandler.js';

const username = getUsername();
output.write(`Welcome to the File Manager, ${username}!\n`);

const homeDir = os.homedir();
chdir(homeDir);
showDirectory(homeDir);

const app = new App(homeDir, username);
app.run();
