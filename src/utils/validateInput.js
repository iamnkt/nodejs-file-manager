const validateInput = (instruction, args) => {
  switch(instruction)  {
    case 'up':
      return (!args) ? true : false;
    
    case 'cd': 
      return (args && args.length === 1) ? true : false;

    case 'ls':
      return (!args) ? true : false;

    default: return false;
  }
}

export default validateInput;
