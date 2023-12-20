const accountSid ="ACf104eb6a20482959b9997a413d7c5da7";
const authToken ="859e5df4dfcaf25692b54bb278dab26d" ;
const client = require('twilio')(accountSid, authToken);

async function abc(){
    try{
        client.calls
        .create({
          url: 'https://handler.twilio.com/twiml/EH80774b858b483694c95e6dc80ff1b6c9',
           to:'+923035871941',
           from:'+18447862162',
      
         })
        .then(call => console.log(call.sid));
    }catch(er)
    {
        console.log(er);
    }
}
abc()