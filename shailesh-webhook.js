
var express = require('express');
var app = express();
//var intentHandler = require('./intent-handler.js');
app.use(express.static('public'));

process.on('uncaughtException', function (err) {
	console.error(err);
	console.log("Node NOT Exiting...");
});

app.post('/webhook', function (req, res) {

// let assistant = new ActionsSdkAssistant({request: req, response: res});
    //console.log('Current intent: ' + assistant.getIntent());
	console.log("Webhook: ");

	var body = "";
	req.on('data', function (chunk) {
		body += chunk;
	});
	req.on('end', function () {
		var obj = JSON.parse(body);
		console.log(body);
        var intent = obj.inputs[0].intent;
        if (intent == "actions.intent.MAIN")
        {
            
            var newData = {
                
                
                    "conversationToken": "",
                    "expectUserResponse": true,
                    "expectedInputs": [
                        {
                            "inputPrompt": {
                                "richInitialPrompt": {
                                    "items": [
                                        {
                                            "simpleResponse": {
                                                "textToSpeech": "Howdy! I can tell you fun facts about almost any number, like 42. What do you have in mind?",
                                                "displayText": "Howdy! I can tell you fun facts about almost any number. What do you have in mind?"
                                            }
                                        }
                                    ],
                                    "suggestions": []
                                }
                            },
                            "possibleIntents": [
                                {
                                    "intent": "actions.intent.TEXT"
                                }
                            ]
                        }
                    ]
                
                
                   
            };
            
            //return newData;
            res.send(newData);
        }
        
		//var source = obj.originalDetectIntentRequest.source;
		//console.log("hi"+source);
		console.log(intent);
		/*if (intent == "Default Fallback Intent" ) {
			intent = "show-expenses";
		}
		var entities = obj.queryResult.parameters;
		//entities["sender-id"] = obj.originalDetectIntentRequest.payload.data.sender.id;
		console.log(intent);
		console.log(JSON.stringify(entities));
		intentHandler.source = source;
		console.log(intentHandler.source);
		intentHandler.handleIntent(intent, entities, function(data) {
			//console.log(JSON.stringify(data));
			res.setHeader('Content-Type', 'application/json');
			res.write(JSON.stringify(data));
			res.end();
		});*/
	});
});

var server = app.listen(5000, function () { });


