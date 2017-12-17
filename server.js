// adapted from http://nodejs.org/api/synopsis.html

http  = require("http")
cfenv = require("cfenv")

//step 1) require the modules we need
var
path = require('path'),//helps with file paths
fs = require('fs');//helps with file system tasks


// get environmental information for this app
appEnv   = cfenv.getAppEnv()
instance = appEnv.app.instance_index || 0

// create a server with a simple request handler
//server = http.createServer(onRequest)
server = http.createServer(requestHandler)

// start the server on the calculated port and host
server.listen(appEnv.port, function() {
    console.log("server starting on " + appEnv.url)
})

//step 2) create the server
http.createServer(requestHandler)
 
//step 3) listen for an HTTP request on port 3000
.listen(3000);

//----------------
 
//a helper function to handle HTTP requests
function requestHandler(req, res) {
	var
	content = '',
	fileName = path.basename(req.url),//the file that was requested
	localFolder = __dirname + '/public/';//where our public files are located
 
	//NOTE: __dirname returns the root folder that
	//this javascript file is in.
	console.log("requested site: " + fileName + " in folder " + localFolder);

 
	//if(fileName === 'index.html'){//if index.html was requested...
		if(fileName !== null){
		content = localFolder + fileName;//setup the file name to be returned
 
		//reads the file referenced by 'content'
		//and then calls the anonymous function we pass in
		fs.readFile(content,function(err,contents){
			//if the fileRead was successful...
			if(!err){
				//send the contents of index.html
				//and then close the request
				res.end(contents);
			} else {
				//otherwise, let us inspect the eror
				//in the console
				console.dir(err);
			};
		});
	} else {
		//if the file was not found, set a 404 header...
		res.writeHead(404, {'Content-Type': 'text/html'});
		//send a custom 'file not found' message
		//and then close the request
		res.end('<h1>Sorry, you are wrong here ... try ... /index.html</h1>');
	};
};
 


//-----------------------------------------------
//function onRequest(request, response) {
  //response.writeHead(200, {"Content-Type": "text/plain"})

  //response.end("Hello World [" + instance + "]\n")
//}
