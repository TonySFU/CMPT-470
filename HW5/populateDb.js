var fs = require('fs');
var models = require('./models');

models.sequelize.sync({ force: true }).then(function() {
    fs.readFile('./songs.json', function(err, data) {
        var music_data = JSON.parse(data);
        var songs = music_data['songs'];
        songs.forEach(function(song) {
            //console.log(song);
            models.Song.create({
                //Just for start id from 0
                id: song.id.toString(),
                title: song.title,
                album: song.album,
                artist: song.artist,
                duration: song.duration,
            });
        });

    });

    fs.readFile('./playlists.json', function(err, data) {
        var music_data = JSON.parse(data);
        var playlists = music_data['playlists'];
        playlists.forEach(function(playlist) {
            models.Playlist.create({
                //Just for start id from 0
                id: playlist.id.toString(),
                name: playlist.name,
            }).then(function(playlistInstance) {
                //console.log("Insede_then", playlist);
                playlistInstance.addSongs(playlist.songs);
            });
        });
    });
});