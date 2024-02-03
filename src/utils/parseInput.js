const parseInput = (input) => {
  const [instruction, ...args] = input.split(' ');

  if (args.length === 0) {
    return { instruction };
  } else {
    return {
      instruction,
      args,
    };
  }
};

export default parseInput;
