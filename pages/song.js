"use strict";

import {GENIUS_API_KEY} from "../router.js";

export const Song = {
    async render(args) {
        const id = args[0];

        if (args[1] === "reload") {
            location.hash = `#/song/${id}`;
            location.reload(true);
            return;
        }

        const song = await fetch(`https://api.genius.com/songs/${id}?access_token=${GENIUS_API_KEY}`)
            .then(response => response.json())
            .then(json => json["response"]["song"]);
        console.log(song);

        const $songEmbeddingHtml = await getSongEmbeddingHtml(
            song["id"],
            song["url"],
            song["title"],
            song["primary_artist"]["name"]
        );

        return $songEmbeddingHtml;
    },
};

async function getSongEmbeddingHtml(id, url, title, artist) {
    const $div = $(`<div id='rg_embed_link_${id}' class='rg_embed_link' data-song-id='${id}'>Read <a href='${url}'>“​${title}” by ​${artist}</a> on Genius</div>`);

    const embeddingScript = await fetch(`https://genius.com/songs/${id}/embed.js`)
        .then(response => response.text())
        .then(text => text.split("\n"));

    let json = embeddingScript[2].substring(30, embeddingScript[2].length - 5) + '"';
    json = json.replace(/\\\\n/g, "\\n")
        .replace(/\\\\\\"/g, '\\"')
        .replace(/\\'/g, "'");
    json = JSON.parse(json);

    const script = embeddingScript[3].substring(18, embeddingScript[3].length - 2);

    return [$div, json, script];
}
