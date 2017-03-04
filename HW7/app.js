var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var models = require('./models');

// Create new express server
var app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

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

function byID(ID) {
    return function(o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[ID];
            b = p[ID];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        } else {
            throw ("error");
        }
    }
}

app.get('/api/playlists', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    var combine = {};
    combine['playlists'] = [];
    models.Playlist.findAll({ attributes: ['id', 'name'] })
        .then(function(playlists) {
            playlists.map(function(playlistInstance) {
                var first = playlistInstance.get({ plain: true });
                first['songs'] = [];
                playlistInstance.getSongs().map(function(t) {
                    var tmp = t.get({ plain: true });
                    //console.log(tmp.Songs_Playlists.SongId);
                    first['songs'].push(tmp.Songs_Playlists.SongId);
                }).then(function() {
                    combine['playlists'].push(first);
                    //console.log(combine);
                    if (playlists.length === combine['playlists'].length) {
                        combine.playlists.sort(byID('id'));
                        response.end(JSON.stringify(combine));
                    }
                })
            })
        })
});

app.get('/api/songs', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    models.Song.findAll({ attributes: ['album', 'duration', 'title', 'id', 'artist'] })
        .then(function(songs) {
            var tmp = {};
            tmp['songs'] = songs.map(function(song) {
                return song.get({ plain: true });
            })
            response.end(JSON.stringify(tmp));
        })
});

app.post('/api/playlists/:id', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    var playlistId = request.params.id;
    var songId = [];
    songId.push(request.body.song);
    console.log(songId);
    models.Playlist.findAll({
        where: {
            id: playlistId
        }
    }).then(function(playlist) {
        console.log(playlist);
        playlist.map(function(playlistInstance) {
            console.log(playlistInstance);
            playlistInstance.addSong(songId);
        })
    })
})

app.post('/api/playlists', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json');
    response.setHeader('Cache-Control', 'public,max-age=1800');
    var newPlaylist = request.body;
    models.Playlist.create({
        name: newPlaylist.name,
    }).then(function(playlistInstance) {
        //console.log(playlistInstance.dataValues);
        //console.log(newPlaylist);
        newPlaylist['id'] = playlistInstance.dataValues.id;
        response.end(JSON.stringify(newPlaylist));
    });
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

// Old post function
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
//             response.end('Successfully added to DB!');
//         }
//     }
// });