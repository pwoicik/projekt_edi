"use strict";

import {GENIUS_API_KEY} from "../script/apiKeys.js";

export const Song = {
    async render(id) {
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

        return [songImage, songTitle, songEmbeddingHtml, albumImage, albumName];
    },
};

async function getSongEmbeddingHtml(id) {
    const embeddingScript = await fetch(`https://genius.com/songs/${id}/embed.js`)
        .then(response => response.text())
        .then(text => text.split("\n"));

    let json = embeddingScript[2].substring(30, embeddingScript[2].length - 5) + '"';
    json = json.replace(/\\\\n/g, "\\n")
        .replace(/\\\\\\"/g, '\\"')
        .replace(/\\'/g, "'");
    json = JSON.parse(json);

    return json;
}
