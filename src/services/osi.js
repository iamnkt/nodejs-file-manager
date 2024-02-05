import os from 'node:os';

export const osi = {};

osi.os = async (arg) => {
  let fn;

  const args = {
    '--EOL': () => console.log(JSON.stringify(os.EOL)),
    '--cpus': () => {
        const cpusInfo = os.cpus();
        const cpus = cpusInfo.map((cpu) => {
          return {
            model: cpu.model,
            'clock rate': `${cpu.speed / 1000} GHz`,
          }
        })
        console.log(`Overall amount of CPUS: ${cpus.length}`);
        console.table(cpus);
      },
    '--homedir': () => console.log(os.homedir()),
    '--username': () => console.log(os.userInfo().username),
    '--architecture': () => console.log(os.arch()),
    'default': () => console.log('\nInvalid input'),
  }

  if (args[arg]) {
    fn = args[arg]
  } else {
    fn = args['default'];
  }

  return fn();
};
