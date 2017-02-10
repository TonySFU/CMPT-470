var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('music.db')
var fs = require('fs');

db.serialize(function() {
    db.run('CREATE TABLE songs ("id" INTEGER PRIMARY KEY, "album" VARCHAR(255), "title" VARCHAR(255), "artist" VARCHAR(255), "duration" INTEGER)')
        // db.run('CREATE INDEX title_index ON songs (title);')
    fs.readFile(__dirname + '/songs.json', function(err, data) {
        var music_data = JSON.parse(data);
        var songs = music_data['songs'];
        for (var i = 0; i < songs.length; i++) {
            var song = songs[i];
            var query = `INSERT INTO songs (id, album, title, artist, duration) VALUES (${song.id}, "${song.album}", "${song.title}", "${song.artist}", "${song.duration}")`;
            //    console.log(query);
            db.run(query);
        }
        // db.each('SELECT * FROM songs', function(err, row) {
        //     console.log(row)
        // })
    });
});

db.serialize(function() {
    db.run('CREATE TABLE playlists ("id" INTEGER PRIMARY KEY, "name" VARCHAR(255))')
    fs.readFile(__dirname + '/playlists.json', function(err, data) {
        var music_data = JSON.parse(data);
        var playlists = music_data['playlists'];
        for (var i = 0; i < playlists.length; i++) {
            // console.log(i);
            var playlist = playlists[i];
            var query = `INSERT INTO playlists (id, name) VALUES (${playlist.id}, "${playlist.name}")`;
            console.log(query);
            db.run(query);
        }
        db.each('SELECT * FROM playlists', function(err, row) {
            console.log(row)
        })
    });
});

db.serialize(function() {
    db.run('CREATE TABLE songs_playlists ("id" INTEGER PRIMARY KEY, "playlist_id" INTEGER, "song_id" INTEGER, FOREIGN KEY(playlist_id) REFERENCES playlists(id), FOREIGN KEY(song_id) REFERENCES songs(id))');
    fs.readFile(__dirname + '/playlists.json', function(err, data) {
        var music_data = JSON.parse(data);
        var playlists = music_data['playlists'];
        var tot = 0;
        for (var i = 0; i < playlists.length; i++) {
            var playlist = playlists[i];
            for (var j = 0; j < playlist.songs.length; j++) {
                var query = `INSERT INTO songs_playlists (id, playlist_id, song_id) VALUES (${tot}, "${playlist.id}", "${playlist.songs[j]}")`;
                console.log(query);
                db.run(query);
                tot++;
            }
        }
        db.each('SELECT * FROM songs_playlists', function(err, row) {
            console.log(row)
        })
    });
});