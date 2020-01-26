"use strict";

import {GENIUS_API_KEY} from "../script/apiKeys.js";

export const Search = {
    async render(query) {
        const queryText = decodeURI(query);

        const hits = await fetch(`https://api.genius.com/search?q=${query}&per_page=12&access_token=${GENIUS_API_KEY}`)
            .then(response => response.json())
            .then(json => json["response"]["hits"]);

        console.log(hits);

        let cardGrid = `<h3 class="display-4 text-outlined mb-4 mt-5">
                          Results for <em class="text-yellow">"${queryText}"</em>:
                        </h3>
                        <div class='card-grid'>`;

        for (let i = 0; i < 3; i++) {
            cardGrid += `<div class='card-column-${i}'>`;

            for (let j = 0; 3 * j + i < hits.length; j++) {
                const song = hits[3 * j + i]["result"];

                cardGrid += createCard(song);
            }

            cardGrid += "</div>"
        }

        return cardGrid;
    },
};

function createHeader(queryText) {
    return `<h3 class="text-outlined mb-4">Results for <a style="font-style: italic">"${queryText}":</a></h3>`;
}

function createDiv(className) {
    return `<div class="${className}">`;
}

function createCard({id, song_art_image_url, title, primary_artist, stats}) {
    const href = `song#/${id}`;

    return `<div class="card card-custom bg-black-transparent" 
                 onclick="location.href = '${href}'">
              <img src="${song_art_image_url}" 
                   class="card-img-top" alt="image">
              <div class="card-body d-flex flex-column">
                <h4 class="card-text " 
                    style="margin-bottom: 2px">${title}</h4>
                <h6 class="card-text text-white"><em>by ${primary_artist["name"]}</em></h6>
                  <a class="float-right text-white text-right mt-3">
                    <i class="fa-eye"></i>${numeral(stats["pageviews"]).format("0.0a")}</a>
              </div>
            </div>`;
}
