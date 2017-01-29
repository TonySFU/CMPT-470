var runSongUILogic = function() {
    $(".hidden_liarary_sort_btns").show();
    $(".hidden_library").show();
    $(".hidden_add_playlists").hide();
    $(".hidden_playlists").hide();
    $(".hidden_playlist_display").hide();
    $(".hidden_searchform").hide();
    $(".hidden_search_result").hide();
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[0].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[0].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[1].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[1].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[2].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[2].style.color = "rgb(140, 140, 140)";
}

var runPlaylistUILogic = function() {
    $(".hidden_liarary_sort_btns").hide();
    $(".hidden_library").hide();
    $(".hidden_add_playlists").show();
    $(".hidden_playlists").show();
    $(".hidden_playlist_display").show();
    $(".hidden_searchform").hide();
    $(".hidden_search_result").hide();
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[0].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[0].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[1].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[1].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[2].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[2].style.color = "rgb(140, 140, 140)";
}

var runSearchUILogic = function() {
    $(".hidden_liarary_sort_btns").hide();
    $(".hidden_library").hide();
    $(".hidden_add_playlists").hide();
    $(".hidden_playlists").hide();
    $(".hidden_playlist_display").hide();
    $(".hidden_searchform").show();
    $(".hidden_search_result").show();
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[0].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[0].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[1].style.color = "rgb(51, 51, 51)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[1].style.color = "rgb(140, 140, 140)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("a")[2].style.color = "rgb(129, 0, 130)";
    document.getElementsByClassName("container-fluid")[0].getElementsByTagName("small")[2].style.color = "rgb(129, 0, 130)";
}

if (window.location.href.indexOf('/playlists') != -1) {
    runPlaylistUILogic();
}
if (window.location.href.indexOf('/library') != -1) {
    runSongUILogic();
}
if (window.location.href.indexOf('/search') != -1) {
    runSearchUILogic();
}