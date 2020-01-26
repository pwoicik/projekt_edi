"use strict";

import {GENIUS_API_KEY} from "../script/apiKeys.js";

export const Search = {
    async render(query) {
        const queryText = decodeURI(query);

        const hits = await fetch(`https://api.genius.com/search?q=${query}&per_page=12&access_token=${GENIUS_API_KEY}`)
            .then(response => response.json())
            .then(json => json["response"]["hits"]);

        const rows = [createHeader(queryText)];

        columnLoop:
            for (let i = 0; i < 4; i++) {
                const row = createDiv("row");

                for (let j = 0; j < 3; j++) {
                    const songIndex = i * 3 + j;
                    if (songIndex > hits.length - 1) {
                        for (let i = 0; i < hits.length - songIndex + 1; i++) {
                            row.appendChild(createDiv("col-sm"));
                        }
                        rows.push(row);
                        break columnLoop;
                    }

                    row.appendChild(createCard(hits[songIndex]["result"]));
                }

                rows.push(row);
            }

        return rows;
    },
};

function createHeader(queryText) {
    const header = document.createElement("h3");
    header.classList.add("mb-4", "text-outlined");
    header.innerHTML = `Results for <a style="font-style: italic">"${queryText}":</a>`;

    return header;
}

function createDiv(className) {
    const div = document.createElement("div");
    div.classList.add(className);

    return div;
}

function createCard(song) {
    const href = `song#/${song["id"]}`;

    return new DOMParser().parseFromString(`
                <div class="col-sm">
                    <div class="card border-dark mb-3 bg-black-transparent text-grey" 
                         onclick="location.href = '${href}'">
                        <img src="${song["song_art_image_url"]}" 
                             class="card-img-top" alt="image">
                        <div class="card-body d-flex flex-column">
                            <h4 class="card-text text-white" 
                                style="margin-bottom: 2px">${song["title"]}</h4>
                            <h6 class="card-text"
                                style="font-style: italic">by ${song["primary_artist"]["name"]}</h6>
                            <a class="float-right text-right mt-3">
                              <i class="fa-eye"></i>${numeral(song["stats"]["pageviews"]).format("0.0a")}</a>
                        </div>
                    </div>
                </div>
             `, "text/html").body.firstChild;
}
