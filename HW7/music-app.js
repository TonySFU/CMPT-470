//load flag;
window.MUSIC_DATA = {};
var songsLoaded = false;
var playlistsLoaded = false;

let songsUl = $(".songs_element").parent();
let songsLi = $(".songs_element");
let playlistsUl = $(".playlists_element").parent();
let playlistsLi = $(".playlists_element");

var runSongUILogic = function() {
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[0].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[0].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[1].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[1].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[2].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[2].style.color = "rgb(140, 140, 140)";
    hit_select_sortby_artist(function() {
        $(".hidden_liarary_sort_btns").show();
        $(".hidden_library").show();
        $(".hidden_add_playlists").hide();
        $(".hidden_playlists").hide();
        $(".hidden_playlist_display").hide();
        $(".hidden_searchform").hide();
        //$(".hidden_search_result").hide();
    });
}

$(".library").click(function() {
    runSongUILogic();
    history.pushState(null, null, 'library');
})

var runPlaylistUILogic = function() {
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[0].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[0].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[1].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[1].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[2].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[2].style.color = "rgb(140, 140, 140)";
    after_finish_loadplaylists(function() {
        display_playlist(playlistsUl, playlistsLi, getcurrentplaylistsIDs());
        $(".hidden_liarary_sort_btns").hide();
        $(".hidden_library").hide();
        $(".hidden_add_playlists").show();
        $(".hidden_playlists").show();
        $(".hidden_playlist_display").hide();
        $(".hidden_searchform").hide();
        //$(".hidden_search_result").hide();
        after_finish_loadsongs(function() {});
        $(".playlists_element").click(function() {
            var Index = $(".playlists_element").index(this);
            console.log(Index);
            $(".playlists_name_left_text")[0].textContent = $(".playlists_name")[Index].textContent;
            console.log($(".playlists_name")[Index].textContent);
            display_songlist(songsUl, songsLi, MUSIC_DATA.playlists[Index].songs);
            $(".hidden_liarary_sort_btns").hide();
            $(".hidden_library").show();
            $(".hidden_add_playlists").hide();
            $(".hidden_playlists").hide();
            $(".hidden_playlist_display").show();
            $(".hidden_searchform").hide();

        })
    });
}
$(".playlists").click(function() {
    runPlaylistUILogic();
    history.pushState(null, null, 'playlists');
})

var runSearchUILogic = function() {
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[0].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[0].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[1].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[1].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[2].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[2].style.color = "rgb(129, 0, 130)";
    songsUl.empty();
    playlistsUl.empty();
    $(".hidden_liarary_sort_btns").hide();
    $(".hidden_add_playlists").hide();
    $(".hidden_playlist_display").hide();
    $(".hidden_searchform").show();
    $(".hidden_library").show();
    $(".hidden_playlists").show();
    //$(".hidden_search_result").show();
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

function deleteThe(name) {
    if (name.startsWith('The ')) {
        return name.substring(4, name.length)
    } else
        return name;
};

function by(name) {
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

function getcurrentsongsIDs() {
    var IDs = [];
    for (var i = 0; i < window.MUSIC_DATA.songs.length; i++) {
        IDs.push(window.MUSIC_DATA.songs[i].id);
    }
    return IDs;
}

function getcurrentplaylistsIDs() {
    var IDs = [];
    for (var i = 0; i < window.MUSIC_DATA.playlists.length; i++) {
        IDs.push(window.MUSIC_DATA.playlists[i].id);
    }
    return IDs;
}

function hit_select_sortby_artist(callback) {
    $(".sort_by_artist>a").addClass("hit_sort_btn");
    $(".sort_by_title>a").removeClass("hit_sort_btn");
    after_finish_loadsongs(function() {
        console.log("success hit_select_sortby_artist");
        window.MUSIC_DATA.songs.sort(byID('id'));
        window.MUSIC_DATA.songs.sort(by('artist'));
        var IDs = getcurrentsongsIDs();
        window.MUSIC_DATA.songs.sort(byID('id'));
        display_songlist(songsUl, songsLi, IDs);
        callback();
    });
}
$(".sort_by_artist").click(function() {
    hit_select_sortby_artist(function() {});
})

function hit_select_sortby_title() {
    $(".sort_by_title>a").addClass("hit_sort_btn");
    $(".sort_by_artist>a").removeClass("hit_sort_btn");
    after_finish_loadsongs(function() {
        console.log("success hit_select_sortby_title");
        window.MUSIC_DATA.songs.sort(byID('id'));
        window.MUSIC_DATA.songs.sort(by('title'));
        var IDs = getcurrentsongsIDs();
        window.MUSIC_DATA.songs.sort(byID('id'));
        display_songlist(songsUl, songsLi, IDs);
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
                //Sort API Result
                window.MUSIC_DATA.playlists.sort(byID('id'));
                callback();
            }
        });
    } else {
        callback();
    }
}

// function hit_add_playlist_btn() {
//     //console.log("inside hit_add_playlist_btn()")
// }

//!!!! be careful! Do not put this inside the top function!!!
$("#playlistsform").keypress(function(e) {
    if (e.keyCode === 13) {
        create_new_playlists_to_server($("#playlistsform").val());
        $("#playlistsform").val("");
        $(".bs-example-modal-lg").click();
    }
});

// $(".hidden_add_playlists").click(function() {
//     after_finish_loadplaylists(function() {
//         hit_add_playlist_btn();
//     });
// })

function addNewplaylist(NewPlaylist) {
    //console.log(NewPlaylist);
    size = window.MUSIC_DATA["playlists"].length;
    tmp = jQuery.extend(true, {}, window.MUSIC_DATA["playlists"][size - 1]);
    tmp.id = NewPlaylist.id;
    tmp.name = NewPlaylist.name;
    tmp.songs = [];
    window.MUSIC_DATA["playlists"].push(tmp);
    runPlaylistUILogic();
}

function create_new_playlists_to_server(newPlaylistName) {
    $.post("/api/playlists", { name: newPlaylistName },
        function(responseText) {
            addNewplaylist(responseText);
        }
    );
}