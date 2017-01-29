//load flag;
window.MUSIC_DATA = {};
var songsLoaded = false;
var playlistsLoaded = false;

var runSongUILogic = function() {
    $(".hidden_liarary_sort_btns").show();
    $(".hidden_library").show();
    $(".hidden_add_playlists").hide();
    $(".hidden_playlists").hide();
    $(".hidden_playlist_display").hide();
    $(".hidden_searchform").hide();
    //$(".hidden_search_result").hide();
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[0].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[0].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[1].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[1].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[2].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[2].style.color = "rgb(140, 140, 140)";
    hit_select_sortby_artist();
}

$(".library").click(function() {
    runSongUILogic();
    history.pushState(null, null, 'library');
})

var runPlaylistUILogic = function() {
    $(".hidden_liarary_sort_btns").hide();
    $(".hidden_library").hide();
    $(".hidden_add_playlists").show();
    $(".hidden_playlists").show();
    $(".hidden_playlist_display").show();
    $(".hidden_searchform").hide();
    //$(".hidden_search_result").hide();
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[0].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[0].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[1].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[1].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[2].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[2].style.color = "rgb(140, 140, 140)";
}
$(".playlists").click(function() {
    runPlaylistUILogic();
    history.pushState(null, null, 'playlists');
})

var runSearchUILogic = function() {
    $(".hidden_liarary_sort_btns").hide();
    $(".hidden_add_playlists").hide();
    $(".hidden_playlist_display").hide();
    $(".hidden_searchform").show();

    $(".hidden_library").show();
    $(".hidden_playlists").show();
    //$(".hidden_search_result").show();
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[0].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[0].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[1].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[1].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[2].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[2].style.color = "rgb(129, 0, 130)";
}
$(".search").click(function() {
    runSearchUILogic();
    history.pushState(null, null, 'search');
})

if (window.location.href.indexOf('/playlists') != -1) {
    runPlaylistUILogic();
}
if (window.location.href.indexOf('/library') != -1) {
    runSongUILogic();
}
if (window.location.href.indexOf('/search') != -1) {
    runSearchUILogic();
}

var songsUl = $(".songs_element").parent();
var songsLi = $(".songs_element");
var playlistsUl = $(".playlists_element").parent();
var playlistsLi = $(".playlists_element");

function display_playlist(Ul, Li, IDs) {
    Ul.empty();
    for (var i = 0; i < IDs.length; i++) {
        var newNode = Li.clone();
        var newNodePlaylistNameEl = newNode.find('.playlists_name')[0];
        newNodePlaylistNameEl.textContent = window.MUSIC_DATA.playlists[IDs[i]].name;
        Ul.append(newNode);
    }
}

function display_songlist(Ul, Li, IDs) {
    Ul.empty();
    for (var i = 0; i < IDs.length; i++) {
        var newNode = Li.clone();
        var newNedeSongNameEl = newNode.find('.song-name')[0];
        newNedeSongNameEl.textContent = window.MUSIC_DATA.songs[IDs[i]].title;
        newNode.find('.artist')[0].textContent = window.MUSIC_DATA.songs[IDs[i]].artist;
        Ul.append(newNode);
    }
}

function hit_select_sortby_artist() {
    $(".sort_by_artist>a").addClass("hit_sort_btn");
    $(".sort_by_title>a").removeClass("hit_sort_btn");
    after_finish_loadsongs(function() {
        console.log("success hit_select_sortby_artist")
    });
}
$(".sort_by_artist").click(function() {
    hit_select_sortby_artist()
})

function hit_select_sortby_title() {
    $(".sort_by_title>a").addClass("hit_sort_btn");
    $(".sort_by_artist>a").removeClass("hit_sort_btn");
    after_finish_loadsongs(function() {
        console.log("success hit_select_sortby_title")
    });
}
$(".sort_by_title").click(function() {
    hit_select_sortby_title()
})

function after_finish_loadsongs(callback) {
    if (songsLoaded === false) {
        var getdataSongs = $.ajax({
            type: "GET",
            url: "/api/songs",
            dataType: "json",
            success: function(response) {
                console.log("success get songs from server");
                window.MUSIC_DATA['songs'] = getdataSongs.responseJSON.songs;
                songsLoaded = true;
                callback();
            }
        });
    } else {
        callback();
    }
}

function after_finish_loadplaylists(callback) {
    if (playlistsLoaded === false) {
        var getdataPlaylists = $.ajax({
            type: "GET",
            url: "/api/playlists",
            dataType: "json",
            success: function(response) {
                console.log("success get playlists from server");
                window.MUSIC_DATA['playlists'] = getdataPlaylists.responseJSON.playlists;
                playlistsLoaded = true;
                callback();
            }
        });
    } else {
        callback();
    }
}