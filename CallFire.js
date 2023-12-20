const CallfireClient = require('callfire-api-client-js');
const client = new CallfireClient('486999e1caf7', '9b6c3b49f5be6be3'); // Replace with your actual login and password

client.ready(() => {
  client.calls.sendCalls({
    defaultVoice: 'MALE1',
    fields: 'items(id,state,toNumber)',
    body: [
      {
        phoneNumber: '+923035871941',
        liveMessage: 'Hello, Alice, this is a message for live answer',
        machineMessage: 'Hello, Alice, this is a message for an answering machine'
      },
    //   {
    //     phoneNumber: '12135551101',
    
    //     liveMessage: 'Hello, Bob, this is a message for live answer',
    //     machineMessage: 'Hello, Bob, this is a message for an answering machine'
    //   }
    ]
  })
  .then((response) => {
    console.log(response.obj);
  })
  .catch((err) => {
    console.log('request error ' + err.data);
  });
},
(clientError) => {
  console.log('client error ' + clientError);
});
