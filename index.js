'use strict';
 
var https = require ('https');
const functions = require('firebase-functions');
const DialogFlowApp = require('actions-on-google').DialogFlowApp;

console.log('set firebase-functions');
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Inside Main function');
//  console.log('Request Headers: ' + JSON.stringify(request.headers));
//  console.log('Request Body: ' + JSON.stringify(request.body));
  
  let action = request.body.queryResult.action;
//  const agent = new WebhookClient({ request, response });
  var chat = "here is a sample response: Sample Response";
  console.log('Inside Main function Part 2');
  console.log(action);
  response.setHeader('Content-Type','application/json');

const parameters = request.body.queryResult.parameters;

var foodName = parameters.foods;
  console.log('foodName: ' + foodName);

getFoodInfo (foodName, response);

});

function getFoodInfo (foodName, CloudFnResponse) {

	console.log('In Function GetFoodInfo Nutrionix');
	console.log("food name: " + foodName);


	var pathString = "/v2/natural/nutrients?query=" + foodName + "&timezone=US/Central";

	console.log ('path string: ' + pathString);

	var xAppId = "..."; //actual AppID here
	var xAppKey = "..."; //actual AppKey here
    	var xRemoteUserId = "0";
    	var contentType = "application/json";

  	console.log ('https.get call');
  
	var request = https.get({
		host: "trackapi.nutrionix.com",
		method: "POST",	
      		path: pathString,
		headers: {
            "Content-Type": contentType,
			"x-app-id": xAppId,
            "x-app-key": xAppKey,
            "x-remote-user-id": xRemoteUserId
		}
      
	}, function (response) {
		var json = "";
		response.on('data', function(chunk) {
			console.log("received JSON response: " + chunk);
			json += chunk;

			
		});

		response.on('end', function(){
			var jsonData = JSON.parse(json);
			var chat = jsonData.data[0].value;

			console.log ("Nutrionix Info: " + chat);

			CloudFnResponse.send(buildChatResponse(chat));

		});

});

}

function buildChatResponse(chat) {
	return JSON.stringify({"fulfillmentText": chat});
}
