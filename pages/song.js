"use strict";

const Song = {
    render: async function (args) {
        return `SONG (${args[0]})`;
    },

    afterRender: async function () {
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
