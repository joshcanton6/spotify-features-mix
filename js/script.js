const home = "https://joshcanton6.github.io/spotify-features-mix"
const client_id = "7cf492aacf9b49daa0367620797dc1fb";
const redirect_uri = home + "/redirect";

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

async function redirect() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("error")) {
        document.getElementById("redirect_message").innerHTML = "Error: " + urlParams.get("error");
    }

    if (urlParams.has("code")) {
        document.getElementById("redirect_message").innerHTML = "Login successful, redirecting...";

        var token = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: "grant_type=authorization_code" +
                "&code=" + urlParams.get("code") +
                "&redirect_uri=" + encodeURIComponent(redirect_uri),
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(client_id + ":51ec60463d874c4c906640ee91c4146d")
            }
        }).then(
            (response) => response.json()
        ).then(
            (json) => JSON.parse(JSON.stringify(json))
        );

        sessionStorage.setItem("access_token", token["access_token"]);
        sessionStorage.setItem("refresh_token", token["refresh_token"]);
        sessionStorage.setItem("expires_at", Math.floor(Date.now() / 1000) + token["expires_in"]);

        window.location.href = home + "/form";
    }
}

async function getTopTracks() {
    var topTracks = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=" + (sessionStorage.getItem("time_range") ? sessionStorage.getItem("time_range") : "long_term"), {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("access_token")
        }
    }).then(
        (response) => response.json()
    ).then(
        (json) => JSON.parse(JSON.stringify(json))
    );

    return topTracks;
}

async function insertTopTracks() {
    var topTracks = await getTopTracks();
    var innerHTML = "";

    for (let t = 0; t < topTracks["items"].length; t++) {
        var track = topTracks["items"][t];
        var imageURL = track["album"]["images"][0]["url"];
        var albumName = track["album"]["name"];
        var artists = [];
        for (let a = 0; a < track["artists"].length; a++) {
            var artist = track["artists"][a];
            artists.push(artist["name"]);
        }

        innerHTML += `
            <tr>
                <td><img src="${imageURL}" alt="${albumName}" height="100px"></td>
                <td>
                    <table>
                        <tr><p><b>&emsp;${track["name"]}</b></p></tr>
                        <tr><p><i>&emsp;${artists.join(", ")}</i></p></tr>
                    </table>
                </td>
            </tr>
        `
    }

    document.getElementById("top-tracks").innerHTML = innerHTML;
}

async function insertGenres() {
    const genres = await fetch(home + "/api/genres.json").then(
        (response) => response.json()
    ).then(
        (json) => JSON.parse(JSON.stringify(json))
    );

    var innerHTML = "";
    var n = 0;

    for (var seed in genres) {
        if (n % 4 == 0) {
            if (n != 0) {
                innerHTML += "</tr>";
            }
            innerHTML += "<tr>"
        }
        innerHTML += '<td class="four-columns"><input type="checkbox" name="seed_genres" class="genre" id="' + seed + '" value="seed"><label for="' + seed + '">' + genres[seed] + '</label></td>'
        n++;
    }
    innerHTML += "</tr>"

    document.getElementById("genre-table").innerHTML = innerHTML;
}

function generatePlaylist() {
    alert("Sorry, still working on it");
}