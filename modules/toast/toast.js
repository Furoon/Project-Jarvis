const notifier = require('node-notifier');


// String
// notifier.notify('Message');
// 
// Object
// notifier.notify({
//   title: 'My notification',
//   message: 'Hello, there!'
// });

async function sendToast(title, msg) {
    notifier.notify({
        title: title,
        message: msg
      });
}



module.exports = { sendToast };