const home = "https://joshcanton6.github.io/spotify-features-mix"
const client_id = "7cf492aacf9b49daa0367620797dc1fb";
const redirect_uri = home + "/redirect";
const genres = {
    "acoustic": "Acoustic",
    "afrobeat": "Afrobeat",
    "alt-rock": "Alt-Rock",
    "alternative": "Alternative",
    "ambient": "Ambient",
    "anime": "Anime",
    "black-metal": "Black Metal",
    "bluegrass": "Bluegrass",
    "blues": "Blues",
    "bossanova": "Bossanova",
    "brazil": "Brazil",
    "breakbeat": "Breakbeat",
    "british": "British",
    "cantopop": "Cantopop",
    "chicago-house": "Chicago House",
    "children": "Children",
    "chill": "Chill",
    "classical": "Classical",
    "club": "Club",
    "comedy": "Comedy",
    "country": "Country",
    "dance": "Dance",
    "dancehall": "Dancehall",
    "death-metal": "Death Metal",
    "deep-house": "Deep House",
    "detroit-techno": "Detroit Techno",
    "disco": "Disco",
    "disney": "Disney",
    "drum-and-bass": "Drum and Bass",
    "dub": "Dub",
    "dubstep": "Dubstep",
    "edm": "EDM",
    "electro": "Electro",
    "electronic": "Electronic",
    "emo": "Emo",
    "folk": "Folk",
    "forro": "Forro",
    "french": "French",
    "funk": "Funk",
    "garage": "Garage",
    "german": "German",
    "gospel": "Gospel",
    "goth": "Goth",
    "grindcore": "Grindcore",
    "groove": "Groove",
    "grunge": "Grunge",
    "guitar": "Guitar",
    "happy": "Happy",
    "hard-rock": "Hard Rock",
    "hardcore": "Hardcore",
    "hardstyle": "Hardstyle",
    "heavy-metal": "Heavy Metal",
    "hip-hop": "Hip-Hop",
    "holidays": "Holidays",
    "honky-tonk": "Honky-Tonk",
    "house": "House",
    "idm": "IDM",
    "indian": "Indian",
    "indie": "Indie",
    "indie-pop": "Indie-Pop",
    "industrial": "Industrial",
    "iranian": "Iranian",
    "j-dance": "J-Dance",
    "j-idol": "J-Idol",
    "j-pop": "J-Pop",
    "j-rock": "J-Rock",
    "jazz": "Jazz",
    "k-pop": "K-Pop",
    "kids": "Kids",
    "latin": "Latin",
    "latino": "Latino",
    "malay": "Malay",
    "mandopop": "Mandopop",
    "metal": "Metal",
    "metal-misc": "Metal-Misc",
    "metalcore": "Metalcore",
    "minimal-techno": "Minimal Techno",
    "movies": "Movies",
    "mpb": "MPB",
    "new-age": "New Age",
    "new-release": "New Release",
    "opera": "Opera",
    "pagode": "Pagode",
    "party": "Party",
    "philippines-opm": "Philippines OPM",
    "piano": "Piano",
    "pop": "Pop",
    "pop-film": "Pop Film",
    "post-dubstep": "Post-Dubstep",
    "power-pop": "Power Pop",
    "progressive-house": "Progressive House",
    "psych-rock": "Psych-Rock",
    "punk": "Punk",
    "punk-rock": "Punk Rock",
    "r-n-b": "R&B",
    "rainy-day": "Rainy Day",
    "reggae": "Reggae",
    "reggaeton": "Reggaeton",
    "road-trip": "Road Trip",
    "rock": "Rock",
    "rock-n-roll": "Rock & Roll",
    "rockabilly": "Rockabilly",
    "romance": "Romance",
    "sad": "Sad",
    "salsa": "Salsa",
    "samba": "Samba",
    "sertanejo": "Sertanejo",
    "show-tunes": "Show Tunes",
    "singer-songwriter": "Singer-Songwriter",
    "ska": "Ska",
    "sleep": "Sleep",
    "songwriter": "Songwriter",
    "soul": "Soul",
    "soundtracks": "Soundtracks",
    "spanish": "Spanish",
    "study": "Study",
    "summer": "Summer",
    "swedish": "Swedish",
    "synth-pop": "Synth-Pop",
    "tango": "Tango",
    "techno": "Techno",
    "trance": "Trance",
    "trip-hop": "Trip-Hop",
    "turkish": "Turkish",
    "work-out": "Workout",
    "world-music": "World Music"
}

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

function insertTopTracks() {
    alert("top tracks");
}

function insertGenres() {
    alert("genres");

    const genreTable = document.getElementById("genre-table");
    var n = 0;
    for (var seed in genres) {
        if (n % 4 == 0) {
            if (n != 0) {
                genreTable.innerHTML += "</tr>";
            }
            genreTable.innerHTML += "<tr>"
        }
        genreTable.innerHTML += '<td class="four-columns"><input type="checkbox" name="seed_genres" class="genre" id="' + seed + '" value="seed"><label for="' + seed + '">' + genres[seed] + '</label></td>'
    }
    genreTable.innerHTML += "</tr>"
}

function generatePlaylist() {
    alert("generate playlist");
}