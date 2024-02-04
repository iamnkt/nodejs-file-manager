import os from 'node:os';

export const osi = {};

osi.os = async (arg) => {
  switch (arg) {
    case '--EOL': 
      console.log(JSON.stringify(os.EOL));
      break;
  
    case '--cpus': 
      const cpusInfo = os.cpus();
      const cpus = cpusInfo.map((cpu) => {
        return {
          model: cpu.model,
          'clock rate': `${cpu.speed / 1000} GHz`,
        }
      })
      console.log(`Overall amount of CPUS: ${cpus.length}`);
      console.table(cpus);
      break;
    
    case '--homedir': 
      console.log(os.homedir());
      break;
    

    case '--username':
      console.log(os.userInfo().username);
      break;

    case '--architecture': 
      console.log(os.arch());
      break;

    default: console.log('\nInvalid input');
  }
};
