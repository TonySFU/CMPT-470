# Requirements Checklist
1. General
    * You should be using the data loaded from `music-data.json`, and throughout the application, the data rendered in the page should be a representation of the data stored in `window.MUSIC_DATA`.
    * Clicking the tab should switch to the various screens and change the colours of the tabs just as it looks in the mocks (this should all happen in one HTML file - you will lose marks if you have separate HTML for each tab).
    * Layout should look correct on simulated screen sizes iPhone 6, iPhone 6 Plus, and Nexus 5X, like in the first assignment.
    * Text should not overlap any other text/buttons if too long. It should truncate with "...". Hint: look for "text-overflow: ellipsis".
    * Scripts must be loaded from external files, not as inline scripts or inline handlers in the HTML directly.
    * No other libraries may be used in the page, including jQuery. The goal of this assignment is to get very familiar with JavaScript, and using jQuery and/or other libraries makes that hard. Don't worry, you'll be able to use it in future assignments, just not this one :). Failing to meet this particular requirement will result in a -2 from your total grade.
2. Library Tab
    * This page should list all of the songs in `window.MUSIC_DATA['songs']`.
    * Clicking the "Sort by artist" should sort by artist, and clicking "Sort by title", should sort by title.
    * When a sort button is clicked, the button should clearly looked selected. The mocks uses inner shadows to achieve this. (hint: see `box-shadow: inset`).
    * The default sort should be "Sort by artist" when heading to the "Library" tab.
    * For both sorts, "The " should not be taken into account, so "The All-American Rejects" should be considered starting with "A".
    * Clicking the "+" button should bring up a modal allowing you to select which playlist to add the song to. If the user selects a playlist or dismisses the dialog by pressing x, it should go back to showing the Library list.
    * If a song was adding to a playlist, it should be in the playlist when navigating to that playlist, and the `id` for that song should be added to the array for that array in `window.MUSIC_DATA`.
3. Playlist Tab
    * This page should list all of the playlists in `window.MUSIC_DATA['playlists']`.
    * Clicking on a playlist should show you a list of the songs in that playlist, according to the list of songs in `window.MUSIC_DATA`.
    * Clicking + when you're viewing a playlist should have the same functionality it does on the Library tab (but it should not move you to that tab).
    * The playlist title should appear when viewing a playlist.
4. Search Tab
    * Search should show all songs and playlist where the inputted text matches the song title, song artist, or playlist title (does not need to match song album).
    * This search should happen for *every* character typed into the search bar. It should not happen on enter or anything like that.
    * Clicking the plus on the song should bring up the same "Add to Playlist" modal you get when clicking a song in the Library tab.
    * Clicking a playlist should navigate you to that Playlist, and you should no longer be on the Search tab (the Playlist tab should be selected in the UI).
# Summary
I did all the requirements on the above.

Here is my website on server:

[HW2][hw2]

[hw2]: 