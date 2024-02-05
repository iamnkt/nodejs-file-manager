const validateInput = (instruction, args) => {
  switch(instruction)  {
    case 'up':
    case 'ls':
      return (!args) ? true : false;
    
    case 'cd':
    case 'cat':
    case 'add':
    case 'rm':
    case 'os':
    case 'hash':
      return (args && args.length === 1) ? true : false;

    case 'rn':
    case 'cp':
    case 'mv':
    case 'compress':
    case 'decompress':
      return (args && args.length === 2) ? true : false;

    default: return false;
  }
}

export default validateInput;
