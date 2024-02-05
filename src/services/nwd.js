import { stat, readdir } from 'node:fs/promises';

export const nwd = {};

const sortDirectoriesAndFiles = (a, b) => {
  if (a.type === b.type) {
      return a.name.localeCompare(b.name);
  }

  return a.type === 'directory' ? -1 : 1;
}

nwd.checkPath = async (path) => {
  try {
    return ((await stat(path)).isDirectory()) ? true : false;
  } catch (err) {
    return false;
  }
};

nwd.ls = async(path) => {
  const methods = ['isDirectory', 'isFile'];

  const folderContents = await readdir(path, { withFileTypes: true });
  
  const sortedContents = folderContents.filter((item) => !item.isSymbolicLink()).map((item) => {
    const currentItem = { name: item.name};

    for (let method of methods) {
      if (item[method]()) {
        currentItem.type = method.slice(2).toLowerCase() 
      }
    }

    return currentItem;
  }).sort(sortDirectoriesAndFiles);

  return sortedContents;
};
