module.exports = function(sequelize, DataType) {
    var Songs_Playlists = sequelize.define('Songs_Playlists', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true
        }
    });
    var Playlist = sequelize.define('Playlist', {
        name: {
            type: DataType.STRING,
            field: 'name'
        }
    }, {
        classMethods: {
            associate: function(models) {
                Playlist.belongsToMany(models.Song, {
                    through: Songs_Playlists
                })
            }
        }
    });
    return Playlist;
};