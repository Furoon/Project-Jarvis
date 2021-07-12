// const log = require('./modules/log/log')("EVENTS")
// 
// 
// process.on('beforeExit', (code) => {
//     log.debug('Process beforeExit event with code: ', code);
//   });
//   
//   process.on('exit', (code) => {
//     log.debug('Process exit event with code: ', code);
//   });
// 
//   // Begin reading from stdin so the process does not exit.
// process.stdin.resume();
// 
// process.on('SIGINT', () => {
//     log.debug('Received SIGINT. Press Control-D to exit.');
// });
// 
// // Using a single function to handle multiple signals
// function handle(signal) {
//     log.debug(`Received ${signal}`);
// }
// 
// process.on('SIGINT', handle);
// process.on('SIGTERM', handle);
// 
// 
// 
// 
// 
// process.abort('SIGINT', () => {
//     log.debug('Received SIGINT. Press Control-D to exit.');
// });