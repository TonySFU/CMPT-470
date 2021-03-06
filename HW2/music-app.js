//Defult in playlists
// document.getElementsByClassName("hidden_liarary_sort_btns")[0].style.display = "none";
// document.getElementsByClassName("hidden_library")[0].style.display = "none";
// document.getElementsByClassName("hidden_searchform")[0].style.display = "none";
// document.getElementsByClassName("hidden_playlist_display")[0].style.display = "none";
var init_display = function() {
    document.getElementsByClassName("hidden_liarary_sort_btns")[0].style.display = "none";
    document.getElementsByClassName("hidden_library")[0].style.display = "none";
    document.getElementsByClassName("hidden_add_playlists")[0].style.display = "";
    document.getElementsByClassName("hidden_playlists")[0].style.display = "";
    document.getElementsByClassName("hidden_searchform")[0].style.display = "none";
    document.getElementsByClassName("hidden_playlist_display")[0].style.display = "none";
    document.getElementsByClassName("hidden_search_result")[0].style.display = "none";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[0].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[0].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[1].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[1].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[2].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[2].style.color = "rgb(140, 140, 140)";
}
init_display();

var seletLibrary = document.getElementsByClassName("library col-xs-4");
seletLibrary[0].addEventListener('click', function(event) {
    hit_selet_sortby_artist();
    document.getElementsByClassName("hidden_add_playlists")[0].style.display = "none";
    document.getElementsByClassName("hidden_playlists")[0].style.display = "none";
    document.getElementsByClassName("hidden_liarary_sort_btns")[0].style.display = "";
    document.getElementsByClassName("hidden_library")[0].style.display = "";
    document.getElementsByClassName("hidden_searchform")[0].style.display = "none";
    document.getElementsByClassName("hidden_playlist_display")[0].style.display = "none";
    document.getElementsByClassName("hidden_search_result")[0].style.display = "none";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[0].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[0].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[1].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[1].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[2].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[2].style.color = "rgb(140, 140, 140)";
}, false);

var seletPlaylists = document.getElementsByClassName("playlists col-xs-4");
seletPlaylists[0].addEventListener('click', function(event) {
    init_display();
}, false);

var seletSearch = document.getElementsByClassName("search col-xs-4");
seletSearch[0].addEventListener('click', function(event) {
    document.getElementsByClassName("hidden_liarary_sort_btns")[0].style.display = "none";
    document.getElementsByClassName("hidden_library")[0].style.display = "none";
    document.getElementsByClassName("hidden_add_playlists")[0].style.display = "none";
    document.getElementsByClassName("hidden_playlists")[0].style.display = "none";
    document.getElementsByClassName("hidden_searchform")[0].style.display = "";
    document.getElementsByClassName("hidden_playlist_display")[0].style.display = "none";
    document.getElementsByClassName("hidden_search_result")[0].style.display = "";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[0].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[0].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[1].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[1].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[2].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[2].style.color = "rgb(129, 0, 130)";
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

var byID = function(ID) {
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

//init
document.getElementsByClassName("sort_by_artist")[0].getElementsByTagName('a')[0].style.boxShadow = '2px 2px 2px black';
window.MUSIC_DATA.songs.sort(byID('id'));
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
    var songListEl = document.getElementsByClassName('hidden_library')[0];
    var firstListEl = songListEl.getElementsByTagName('li')[0];
    var firstListElParent = firstListEl.parentNode;
    //console.log(firstListElParent.childNodes.length);
    var end = firstListElParent.childNodes.length - 2;
    for (var i = 0; i < end; i++) {
        firstListEl = songListEl.getElementsByTagName('li')[0];
        firstListElParent.removeChild(firstListEl);
        //    console.log(i);
    }
    //console.log(firstListElParent.childNodes.length);
}

var hit_selet_sortby_artist = function() {
    document.getElementsByClassName("sort_by_title")[0].getElementsByTagName('a')[0].style.boxShadow = '';
    document.getElementsByClassName("sort_by_artist")[0].getElementsByTagName('a')[0].style.boxShadow = '2px 2px 2px black';
    removeLibrary();
    window.MUSIC_DATA.songs.sort(byID('id'));
    window.MUSIC_DATA.songs.sort(by('artist'));
    for (var i = 0; i < window.MUSIC_DATA.songs.length; i++) {
        var newNode = firstListEl.cloneNode(true);
        var newNedeSongNameEl = newNode.getElementsByClassName('song-name')[0];
        newNedeSongNameEl.textContent = window.MUSIC_DATA.songs[i].title;
        newNode.getElementsByClassName('artist')[0].textContent = window.MUSIC_DATA.songs[i].artist;
        firstListElParent.appendChild(newNode);
    }
    hit_plus_btn();
    // for (var i = 0; i <= 0; i++) {
    //     firstListEl = songListEl.getElementsByTagName('li')[0];
    //     firstListElParent.removeChild(firstListEl);
    // }
}

var search_exactly_same_songname_ID = function(name) {
    console.log(name);
    var ID = -1;
    for (var i = 0; i < window.MUSIC_DATA.songs.length; i++) {
        if (window.MUSIC_DATA.songs[i].title === name) {
            ID = window.MUSIC_DATA.songs[i].id;
            break;
        }
    }
    return ID;
}

var search_SongnameOrArtist_IDs = function(name) {
    var IDs = [];
    if (name === "") return IDs
    var re = new RegExp(name, "i");
    for (var i = 0; i < window.MUSIC_DATA.songs.length; i++) {
        if (re.test(window.MUSIC_DATA.songs[i].title) || re.test(window.MUSIC_DATA.songs[i].artist)) {
            IDs.push(window.MUSIC_DATA.songs[i].id);
        }
    }
    return IDs;
}

var search_playlist_IDs = function(name) {
    var IDs = [];
    if (name === "") return IDs
    var re = new RegExp(name, "i");
    for (var i = 0; i < window.MUSIC_DATA.playlists.length; i++) {
        if (re.test(window.MUSIC_DATA.playlists[i].name)) {
            IDs.push(window.MUSIC_DATA.playlists[i].id);
        }
    }
    return IDs;
}

var hit_plus_btn = function() {
    var click_plus_sign = document.getElementsByClassName("glyphicon-plus-sign");
    for (var i = 0; i < click_plus_sign.length; i++) {
        click_plus_sign[i].onclick = (function(index) {
            return function() {
                var fatherNode = click_plus_sign[index].parentNode;
                var click_song_name = fatherNode.getElementsByClassName("song-name")[0].textContent;
                //console.log(click_song_name);
                e1 = document.getElementsByClassName('modal-overlay')[0];
                e1.style.visibility = "visible";
                hit_close_playlist();
                choose_playlist(search_exactly_same_songname_ID(click_song_name));
            }
        })(i)
    }
}

var selet_sortby_artist = document.getElementsByClassName("sort_by_artist");
selet_sortby_artist[0].addEventListener('click', function(event) {
    hit_selet_sortby_artist();
}, false);

var selet_sortby_title = document.getElementsByClassName("sort_by_title");
selet_sortby_title[0].addEventListener('click', function(event) {
    document.getElementsByClassName("sort_by_artist")[0].getElementsByTagName('a')[0].style.boxShadow = '';
    document.getElementsByClassName("sort_by_title")[0].getElementsByTagName('a')[0].style.boxShadow = '2px 2px 2px black';
    removeLibrary();
    window.MUSIC_DATA.songs.sort(byID('id'));
    window.MUSIC_DATA.songs.sort(by('title'));
    for (var i = 0; i < window.MUSIC_DATA.songs.length; i++) {
        var newNode = firstListEl.cloneNode(true);
        var newNedeSongNameEl = newNode.getElementsByClassName('song-name')[0];
        newNedeSongNameEl.textContent = window.MUSIC_DATA.songs[i].title;
        newNode.getElementsByClassName('artist')[0].textContent = window.MUSIC_DATA.songs[i].artist;
        firstListElParent.appendChild(newNode);
    }
    hit_plus_btn();
    // for (var i = 0; i <= 0; i++) {
    //     firstListEl = songListEl.getElementsByTagName('li')[0];
    //     firstListElParent.removeChild(firstListEl);
    // }
}, false);

//load playlists
var playlistEl = document.getElementsByClassName('hidden_playlists')[0];
var firstPlaylistEl = playlistEl.getElementsByTagName('li')[0];

for (var i = 0; i < window.MUSIC_DATA.playlists.length; i++) {
    var newNode = firstPlaylistEl.cloneNode(true);
    var newNodePlaylistNameEl = newNode.getElementsByClassName('playlists_name')[0];
    newNodePlaylistNameEl.textContent = window.MUSIC_DATA.playlists[i].name;
    firstPlaylistEl.parentNode.appendChild(newNode);
}

for (var i = 0; i <= 0; i++) {
    firstPlaylistEl = playlistEl.getElementsByTagName('li')[0];
    firstPlaylistEl.parentNode.removeChild(firstPlaylistEl);
}

//load Choose playlists
var playlistEl = document.getElementsByClassName('modal-data')[0];
var firstPlaylistEl = playlistEl.getElementsByTagName('li')[0];

for (var i = 0; i < window.MUSIC_DATA.playlists.length; i++) {
    var newNode = firstPlaylistEl.cloneNode(true);
    var newNodePlaylistNameEl = newNode.getElementsByClassName('playlists_name')[0];
    newNodePlaylistNameEl.textContent = window.MUSIC_DATA.playlists[i].name;
    firstPlaylistEl.parentNode.appendChild(newNode);
}

for (var i = 0; i <= 0; i++) {
    firstPlaylistEl = playlistEl.getElementsByTagName('li')[0];
    firstPlaylistEl.parentNode.removeChild(firstPlaylistEl);
}

//Close choose playlists
var hit_close_playlist = function() {
    var selet_close_choose_playlist = document.getElementsByClassName("glyphicon glyphicon-remove col-xs-2");
    selet_close_choose_playlist[0].addEventListener('click', function(event) {
        var e1 = document.getElementsByClassName('modal-overlay')[0];
        e1.style.visibility = "hidden";
    }, false);
}
hit_close_playlist();

//Click playlists and list song
var click_playlist = document.getElementsByClassName("hidden_playlists")[0];
var click_playlist_content = click_playlist.getElementsByTagName("li");
for (var i = 0; i < click_playlist_content.length; i++) {
    //console.log(i);
    click_playlist_content[i].onclick = (function(index) {
        return function() {
            click_playlist_name = click_playlist_content[index].getElementsByClassName("playlists_name")[0].textContent;
            document.getElementsByClassName("playlists_name_left_text")[0].textContent = click_playlist_name;
            //console.log(click_playlist_name);
            document.getElementsByClassName("hidden_add_playlists")[0].style.display = "none";
            document.getElementsByClassName("hidden_playlists")[0].style.display = "none";
            document.getElementsByClassName("hidden_playlist_display")[0].style.display = "";
            document.getElementsByClassName("hidden_library")[0].style.display = "";
            //show playlists after click
            var songListEl = document.getElementsByClassName('hidden_library')[0];
            var firstListEl = songListEl.getElementsByTagName('li')[0];
            var firstListElParent = firstListEl.parentNode;
            var removePlaylistLibrary = function() {
                var end = firstListElParent.childNodes.length - 2;
                //console.log(end);
                for (var i = 0; i < end; i++) {
                    firstListEl = songListEl.getElementsByTagName('li')[0];
                    firstListElParent.removeChild(firstListEl);
                }
            }
            removePlaylistLibrary();
            window.MUSIC_DATA.songs.sort(byID('id'));
            for (var i = 0; i < window.MUSIC_DATA.playlists[index].songs.length; i++) {
                //console.log(i);
                var newNode = firstListEl.cloneNode(true);
                var newNedeSongNameEl = newNode.getElementsByClassName('song-name')[0];
                var songId = window.MUSIC_DATA.playlists[index].songs[i]
                newNedeSongNameEl.textContent = window.MUSIC_DATA.songs[songId].title;
                newNode.getElementsByClassName('artist')[0].textContent = window.MUSIC_DATA.songs[songId].artist;
                firstListElParent.appendChild(newNode);
                //console.log(songId);
            }
            hit_plus_btn();
        }
    })(i)
}

//After click plus sign, hit playlists in Choose playlists
var choose_playlist = function(ID) {
    var modal = document.getElementsByClassName("modal-overlay")[0];
    var modal_playlistname_li = modal.getElementsByClassName("modal_playlists");
    for (var i = 0; i < modal_playlistname_li.length; i++) {
        modal_playlistname_li[i].onclick = (function(index) {
            return function() {
                var name = modal_playlistname_li[index].getElementsByClassName("playlists_name")[0].textContent;
                for (var i = 0; i < window.MUSIC_DATA.playlists.length; i++) {
                    if (window.MUSIC_DATA.playlists[i].name === name) {
                        console.log(ID);
                        window.MUSIC_DATA.playlists[i].songs.push(ID);
                        e1 = document.getElementsByClassName('modal-overlay')[0];
                        e1.style.visibility = "hidden";
                    }
                }
            }
        })(i)
    }
}

//init display_search_result
var playlistLi = document.getElementsByClassName("search_playlists_element")[0];
var playlistUl = playlistLi.parentNode;
playlistUl.removeChild(playlistLi);
var songlistLi = document.getElementsByClassName("search_songs_element")[0];
var songlistUl = songlistLi.parentNode;
songlistUl.removeChild(songlistLi);

var display_playlist = function(Ul, Li, IDs) {
    while (Ul.firstChild) { Ul.removeChild(Ul.firstChild); }
    for (var i = 0; i < IDs.length; i++) {
        var newNode = Li.cloneNode(true);
        var newNodePlaylistNameEl = newNode.getElementsByClassName('playlists_name')[0];
        newNodePlaylistNameEl.textContent = window.MUSIC_DATA.playlists[IDs[i]].name;
        Ul.appendChild(newNode);
    }
}
var display_songlist = function(Ul, Li, IDs) {
    while (Ul.firstChild) { Ul.removeChild(Ul.firstChild); }
    for (var i = 0; i < IDs.length; i++) {
        var newNode = Li.cloneNode(true);
        var newNedeSongNameEl = newNode.getElementsByClassName('song-name')[0];
        newNedeSongNameEl.textContent = window.MUSIC_DATA.songs[IDs[i]].title;
        newNode.getElementsByClassName('artist')[0].textContent = window.MUSIC_DATA.songs[IDs[i]].artist;
        Ul.appendChild(newNode);
    }
}

var hit_playlist_in_search = function() {
    for (var i = 0; i < playlistUl.children.length; i++) {
        playlistUl.childNodes[i].onclick = (function(index) {
            return function() {
                init_display();
                var name = playlistUl.childNodes[index].getElementsByClassName("playlists_name")[0].textContent;
                var ID = search_playlist_IDs(name)[0];
                document.getElementsByClassName("playlists_element")[ID].click();
            }
        })(i)
    }
}
var display_search_result = function(playlistIDs, songIDs) {
    window.MUSIC_DATA.songs.sort(byID('id'));
    display_playlist(playlistUl, playlistLi, playlistIDs);
    display_songlist(songlistUl, songlistLi, songIDs);
    hit_playlist_in_search();
    hit_plus_btn();
}

var searchform = document.getElementById("searchform");
searchform.addEventListener("input", function(event) {
    var input_value = searchform.value;
    display_search_result(search_playlist_IDs(input_value), search_SongnameOrArtist_IDs(input_value));
}, false);