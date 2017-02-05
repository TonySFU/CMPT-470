// Import the http library
var http = require('http');
var fs = require('fs');

var getHttp = function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    fs.readFile(__dirname + '/playlists.html', function(err, data) {
        response.end(data);
    });
};

// example
// var postHttp = function(request, response) {
//     response.statusCode = 200;
//     var body = '';
//     request.on('data', function(chunk) {
//         body += chunk;
//     });
//     request.on('end', function() {
//         console.log(body);
//         response.end('Successfully added to DB!');
//     });
// };


var getStylesheet = function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/css');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    fs.readFile(__dirname + '/playlist.css', function(err, data) {
        response.end(data);
    });
};

var getJavascript = function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/x-javascript');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    fs.readFile(__dirname + '/music-app.js', function(err, data) {
        response.end(data);
    });
};

//Remove
var getJavascriptData = function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/x-javascript');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    fs.readFile(__dirname + '/music-data.js', function(err, data) {
        response.end(data);
    });
};


var getRedirect = function(request, response) {
    response.statusCode = 301;
    response.setHeader('Content-Type', 'text/css');
    response.setHeader('Location', '/playlists');
    response.end('redirecting to playlists');
};

var getSongs_jpg = function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'image/jpeg');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    fs.readFile(__dirname + '/songs.jpg', function(err, data) {
        response.end(data);
    });
};

var getSongs_png = function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'image/png');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    fs.readFile(__dirname + '/example.png', function(err, data) {
        response.end(data);
    });
};

var getSongsJson = function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    fs.readFile(__dirname + '/songs.json', function(err, data) {
        response.end(data);
    });
}

var getplaylistsJson = function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    fs.readFile(__dirname + '/playlists.json', function(err, data) {
        response.end(data);
    });
}

var postFromplaylists = function(request, response) {
    var body = '';
    response.statusCode = 200;
    filePath = __dirname + '/playlists.json';
    request.on('data', function(data, err) {
        body += data;
    });
    request.on('end', function() {
        try {
            JSON.parse(body);
        } catch (err) {
            console.log("not JSON");
            response.statusCode = 400;
        } finally {
            console.log(response.statusCode);
            if (response.statusCode === 200) {
                fs.writeFile(filePath, body, function() {
                    response.end('Successfully added to DB!');
                });
            }
        }
    });
}


var getElse = function(request, response) {
    getRedirect(request, response);
};

// Create a server and provide it a callback to be executed for every HTTP request
// coming into localhost:3000.
var server = http.createServer(function(request, response) {
    console.log(request.url);
    if (request.url === '/playlists' && request.method === 'GET') {
        getHttp(request, response);
    } else if (request.url === '/library' && request.method === 'GET') {
        getHttp(request, response);
    } else if (request.url === '/search' && request.method === 'GET') {
        getHttp(request, response);
    } else if (request.url === '/playlist.css' && request.method === 'GET') {
        getStylesheet(request, response);
    } else if (request.url === '/music-app.js' && request.method === 'GET') {
        getJavascript(request, response);
    } else if (request.url === '/songs.jpg' && request.method === 'GET') {
        getSongs_jpg(request, response);
    } else if (request.url === '/example.png' && request.method === 'GET') {
        getSongs_png(request, response);
    } else if (request.url === '/api/songs' && request.method === 'GET') {
        getSongsJson(request, response);
    } else if (request.url === '/api/playlists' && request.method === 'GET') {
        getplaylistsJson(request, response);
    } else if (request.url === '/api/playlists' && request.method === 'POST') {
        postFromplaylists(request, response);
    } else if (request.url === '/') {
        getRedirect(request, response);
    } else {
        getElse(request, response);
    }
});

// Start the server on port 3000
server.listen(3000, function() {
    console.log('Amazing music app server listening on port 3000!')
});