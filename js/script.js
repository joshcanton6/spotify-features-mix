client_id = "7cf492aacf9b49daa0367620797dc1fb";
redirect_uri = "https://joshcanton6.github.io/spotify-features-mix/redirect";

function login() {
    const scope = "user-read-private" +
        " user-read-email" +
        " user-top-read" +
        " playlist-read-private" +
        " playlist-read-collaborative" +
        " playlist-modify-public" +
        " playlist-modify-private" +
        " ugc-image-upload";

    window.location.href = "https://accounts.spotify.com/authorize" +
        "?client_id=" + client_id +
        "&response_type=code" +
        "&redirect_uri=" + encodeURIComponent(redirect_uri) +
        "&scope=" + encodeURIComponent(scope) +
        "&show_dialog=true";
}