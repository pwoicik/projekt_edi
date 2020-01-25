"use strict";

import {GENIUS_API_KEY} from "../script/apiKeys.js";

export const Song = {
    async render(id) {
        const song = await fetch(`https://api.genius.com/songs/${id}?access_token=${GENIUS_API_KEY}`)
            .then(response => response.json())
            .then(json => json["response"]["song"]);

        const songEmbeddingHtml = await getSongEmbeddingHtml(song["id"]);

        return [songEmbeddingHtml];
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
