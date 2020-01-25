"use strict";

import {GENIUS_API_KEY} from "../script/apiKeys.js";

import {initializeParticles} from "../script/initializeParticles.js";

window.addEventListener("DOMContentLoaded", async function () {
    initializeParticles();

    const id = location.hash.slice(1);

    const song = await fetch(`https://api.genius.com/songs/${id}?access_token=${GENIUS_API_KEY}`)
        .then(response => response.json())
        .then(json => json["response"]["song"]);

    const songEmbeddingHtml = await getSongEmbeddingHtml(song["id"]);

    const songImage = `<img class="img-fluid float-right" src="${song["song_art_image_thumbnail_url"]}">`;

    const songTitle = `<span class="artistName">${song["primary_artist"]["name"]}</span>
                           <span class="songTitle">${song["title"]}</span>`;

    const albumImage = `<img class="img-fluid float-right albumImage" src="${song["album"]["cover_art_url"]}">`;

    const albumName = `<span class="albumCSS">Album </span>
                           <span class="albumName">${song["album"]["name"]}</span>`;

    $("#overlay").append([songImage, songTitle, songEmbeddingHtml, albumImage, albumName]);
});


async function getSongEmbeddingHtml(id, url, title, artist) {
    const div = `<div id='rg_embed_link_${id}' class='rg_embed_link' data-song-id='${id}'>Read <a href='${url}'>“​${title}” by ​${artist}</a> on Genius</div>`;

    const embeddingScript = await fetch(`https://genius.com/songs/${id}/embed.js`)
        .then(response => response.text())
        .then(text => text.split("\n"));

    let json = embeddingScript[2].substring(30, embeddingScript[2].length - 5) + '"';
    json = json.replace(/\\\\n/g, "\\n")
        .replace(/\\\\\\"/g, '\\"')
        .replace(/\\'/g, "'");
    json = JSON.parse(json);

    const script = embeddingScript[3].substring(18, embeddingScript[3].length - 2);

    return [div, $(json), $(script)];
}
