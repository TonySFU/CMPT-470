var express = require('express')
var fs = require('fs');
var bodyParser = require('body-parser')
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('music.db')
var mu = require('mu2');

// Create new express server
var app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
mu.root = __dirname

app.get('/playlists', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    fs.readFile(__dirname + '/playlists.html', function(err, data) {
        response.end(data);
    });
});

app.get('/library', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    fs.readFile(__dirname + '/playlists.html', function(err, data) {
        response.end(data);
    });
});

app.get('/search', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    fs.readFile(__dirname + '/playlists.html', function(err, data) {
        response.end(data);
    });
});

app.get('/playlist.css', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/css');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    fs.readFile(__dirname + '/playlist.css', function(err, data) {
        response.end(data);
    });
});

app.get('/music-app.js', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/x-javascript');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    fs.readFile(__dirname + '/music-app.js', function(err, data) {
        response.end(data);
    });
});

app.get('/songs.jpg', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'image/jpeg');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    fs.readFile(__dirname + '/songs.jpg', function(err, data) {
        response.end(data);
    });
});

app.get('/example.png', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'image/png');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    fs.readFile(__dirname + '/example.png', function(err, data) {
        response.end(data);
    });
});


app.get('/api/playlists', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    var query = "SELECT * FROM playlists";
    console.log(query);
    db.all(query, function(err, rows) {
        var tmp = {}
        tmp['playlists'] = rows;
        console.log(tmp);
        var q = "SELECT playlist_id, song_id FROM songs_playlists"
        db.all(q, function(err, rows) {
            console.log(rows);
            for (var i = 0; i < rows.length; i++) {
                var index = rows[i].playlist_id;
                if (tmp.playlists[index]['songs']) {
                    tmp.playlists[index]['songs'].push(rows[i].song_id);
                } else {
                    tmp.playlists[index]['songs'] = [];
                    tmp.playlists[index]['songs'].push(rows[i].song_id);
                }
            }
            console.log(tmp);
            response.send(JSON.stringify(tmp));
        });
    });
});

app.get('/api/songs', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    var query = "SELECT * FROM songs";
    console.log(query);
    db.all(query, function(err, rows) {
        var tmp = {}
        tmp['songs'] = rows;
        console.log(rows);
        response.send(JSON.stringify(tmp))
    });
});

// var getSongsJson = function(request, response) {
//     response.statusCode = 200;
//     response.setHeader('Content-Type', 'application/json');
//     fs.readFile(__dirname + '/songs.json', function(err, data) {
//         response.end(data);
//     });
// }

// var getplaylistsJson = function(request, response) {
//     response.statusCode = 200;
//     response.setHeader('Content-Type', 'application/json');
//     fs.readFile(__dirname + '/playlists.json', function(err, data) {
//         response.end(data);
//     });
// }

app.post('/api/playlists', function(request, response) {
    // var body = '';
    // response.statusCode = 200;
    // filePath = __dirname + '/playlists.json';
    // request.on('data', function(data, err) {
    //     body += data;
    //     console.log(data);
    // });
    // request.on('end', function() {
    //     try {
    //         JSON.parse(body);
    //     } catch (err) {
    //         console.log("not JSON");
    //         response.statusCode = 400;
    //     } finally {
    //         console.log(response.statusCode);
    //         if (response.statusCode === 200) {
    //             fs.writeFile(filePath, body, function() {
    //                 response.end('Successfully added to DB!');
    //             });
    //         }
    //     }
    // });
    console.log("API post not work yet!");
});

app.get('/', function(request, response) {
    response.statusCode = 301;
    response.setHeader('Content-Type', 'text/css');
    response.setHeader('Location', '/playlists');
    response.end('redirecting to playlists');
});

// Start the server on port 3000
app.listen(3000, function() {
    console.log('Amazing music app server listening on port 3000!')
});