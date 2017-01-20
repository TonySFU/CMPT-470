//Defult in playlists
document.getElementsByClassName("hidden_liarary_sort_btns")[0].style.display = "none";
document.getElementsByClassName("hidden_library")[0].style.display = "none";
document.getElementsByClassName("hidden_searchform")[0].style.display = "none";

var seletLibrary = document.getElementsByClassName("library col-xs-4");
seletLibrary[0].addEventListener('click', function(event) {
    document.getElementsByClassName("hidden_add_playlists")[0].style.display = "none";
    document.getElementsByClassName("hidden_playlists")[0].style.display = "none";
    document.getElementsByClassName("hidden_liarary_sort_btns")[0].style.display = "";
    document.getElementsByClassName("hidden_library")[0].style.display = "";
    document.getElementsByClassName("hidden_searchform")[0].style.display = "none";
}, false);

var seletPlaylists = document.getElementsByClassName("playlists col-xs-4");
seletPlaylists[0].addEventListener('click', function(event) {
    document.getElementsByClassName("hidden_liarary_sort_btns")[0].style.display = "none";
    document.getElementsByClassName("hidden_library")[0].style.display = "none";
    document.getElementsByClassName("hidden_add_playlists")[0].style.display = "";
    document.getElementsByClassName("hidden_playlists")[0].style.display = "";
    document.getElementsByClassName("hidden_searchform")[0].style.display = "none";
}, false);

var seletSearch = document.getElementsByClassName("search col-xs-4");
seletSearch[0].addEventListener('click', function(event) {
    document.getElementsByClassName("hidden_liarary_sort_btns")[0].style.display = "none";
    document.getElementsByClassName("hidden_library")[0].style.display = "none";
    document.getElementsByClassName("hidden_add_playlists")[0].style.display = "none";
    document.getElementsByClassName("hidden_playlists")[0].style.display = "none";
    document.getElementsByClassName("hidden_searchform")[0].style.display = "";
}, false);

var deleteThe = function(name) {
    if (name.startsWith('The ')) {
        return name.substring(4, name.length)
    } else
        return name;
}

var by = function(name) {
    return function(o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            a = deleteThe(a);
            b = deleteThe(b);
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

window.MUSIC_DATA.songs.sort(by('artist'));

//load library
var songListEl = document.getElementsByClassName('hidden_library')[0];
var firstListEl = songListEl.getElementsByTagName('li')[0];
var songNameEl = firstListEl.getElementsByClassName('song-name')[0];
var artistNameEl = songNameEl.getElementsByClassName('artist')[0];
var firstListElParent = firstListEl.parentNode;

for (var i = 0; i < window.MUSIC_DATA.songs.length; i++) {
    var newNode = firstListEl.cloneNode(true);
    var newNedeSongNameEl = newNode.getElementsByClassName('song-name')[0];
    newNedeSongNameEl.textContent = window.MUSIC_DATA.songs[i].title;
    newNode.getElementsByClassName('artist')[0].textContent = window.MUSIC_DATA.songs[i].artist;
    firstListElParent.appendChild(newNode);
}

for (var i = 0; i <= 0; i++) {
    firstListEl = songListEl.getElementsByTagName('li')[0];
    firstListElParent.removeChild(firstListEl);
}

var removeLibrary = function() {
    for (var i = 1; i < window.MUSIC_DATA.songs.length; i++) {
        firstListEl = songListEl.getElementsByTagName('li')[0];
        firstListElParent.removeChild(firstListEl);
    }
}

var selet_sortby_artist = document.getElementsByClassName("sort_by_artist");
selet_sortby_artist[0].addEventListener('click', function(event) {
    removeLibrary();
    window.MUSIC_DATA.songs.sort(by('artist'));
    for (var i = 0; i < window.MUSIC_DATA.songs.length; i++) {
        var newNode = firstListEl.cloneNode(true);
        var newNedeSongNameEl = newNode.getElementsByClassName('song-name')[0];
        newNedeSongNameEl.textContent = window.MUSIC_DATA.songs[i].title;
        newNode.getElementsByClassName('artist')[0].textContent = window.MUSIC_DATA.songs[i].artist;
        firstListElParent.appendChild(newNode);
    }
    for (var i = 0; i <= 0; i++) {
        firstListEl = songListEl.getElementsByTagName('li')[0];
        firstListElParent.removeChild(firstListEl);
    }
}, false);

var selet_sortby_title = document.getElementsByClassName("sort_by_title");
selet_sortby_title[0].addEventListener('click', function(event) {
    removeLibrary();
    window.MUSIC_DATA.songs.sort(by('title'));
    for (var i = 0; i < window.MUSIC_DATA.songs.length; i++) {
        var newNode = firstListEl.cloneNode(true);
        var newNedeSongNameEl = newNode.getElementsByClassName('song-name')[0];
        newNedeSongNameEl.textContent = window.MUSIC_DATA.songs[i].title;
        newNode.getElementsByClassName('artist')[0].textContent = window.MUSIC_DATA.songs[i].artist;
        firstListElParent.appendChild(newNode);
    }
    for (var i = 0; i <= 0; i++) {
        firstListEl = songListEl.getElementsByTagName('li')[0];
        firstListElParent.removeChild(firstListEl);
    }
}, false);