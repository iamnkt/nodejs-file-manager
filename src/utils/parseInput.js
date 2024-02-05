const parseInput = (line) => {
  const input = line.trim();
  const delim = input.indexOf(' ');
  const instruction = delim > 0 ? input.slice(0, delim) : input;
  let args = [];
  
  if (delim > 0) {
    const rawArgs = input.slice(delim + 1).replace(/\\ /g, '\\').split(' ');
    args = rawArgs.map((arg) => arg.replace(/\\/g, ' '));
  };

  if (args && args.length === 0) {
    return { instruction };
  } else {
    return {
      instruction,
      args,
    };
  };
};

export default parseInput;
