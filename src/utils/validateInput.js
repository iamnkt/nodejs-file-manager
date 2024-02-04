const validateInput = (instruction, args) => {
  switch(instruction)  {
    case 'up':
      return (!args) ? true : false;
    
    case 'cd': 
      return (args && args.length === 1) ? true : false;

    case 'ls':
      return (!args) ? true : false;
    
    case 'cat':
      return (args && args.length === 1) ? true : false;

    case 'add':
      return (args && args.length === 1) ? true : false;

    case 'rn':
      return (args && args.length === 2) ? true : false;

    case 'cp':
      return (args && args.length === 2) ? true : false;

    case 'rm':
      return (args && args.length === 1) ? true : false;

    case 'mv':
      return (args && args.length === 2) ? true : false;

    case 'os':
      return (args && args.length === 1) ? true : false;
    
    case 'hash':
      return (args && args.length === 1) ? true : false;

    default: return false;
  }
}

export default validateInput;
