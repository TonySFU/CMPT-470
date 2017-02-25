module.exports = function(sequelize, DataType) {
    var Songs_Playlists = sequelize.define('Songs_Playlists', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true
        }
    });
    var Song = sequelize.define('Song', {
        album: {
            type: DataType.STRING,
            field: 'album'
        },
        title: {
            type: DataType.STRING,
            field: 'title'
        },
        artist: {
            type: DataType.STRING,
            field: 'artist'
        },
        duration: {
            type: DataType.INTEGER,
            field: 'duration'
        }
    }, {
        classMethods: {
            associate: function(models) {
                Song.belongsToMany(models.Playlist, {
                    through: Songs_Playlists
                })
            }
        }
    });
    return Song;
};