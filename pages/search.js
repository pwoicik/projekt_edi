"use strict";

import {GENIUS_API_KEY} from "../router.js";

export const Search = {
    async render(query) {
        const queryText = decodeURI(query);

        const hits = await fetch(`https://api.genius.com/search?q=${query}&per_page=12&access_token=${GENIUS_API_KEY}`)
            .then(response => response.json())
            .then(json => json["response"]["hits"]);

        const $rows = [$(`<h3 class="mb-4 text-outlined">Results for <a style="font-style: italic">"${queryText}":</a></h3>`)];

        columnLoop:
            for (let i = 0; i < 4; i++) {
                const $row = $('<div class="row">');

                for (let j = 0; j < 3; j++) {
                    const songIndex = i * 3 + j;
                    if (songIndex > hits.length - 1){
                        for (let i = 0; i < hits.length - songIndex + 1; i++){
                            $row.append('<div class="col-sm">');
                        }
                        $rows.push($row);
                        break columnLoop;
                    }

                    const result = hits[songIndex]["result"];
                    const hash = `#/song/${result["id"]}/reload`;

                    $row.append(
                        `<div class="col-sm">
                        <div class="card border-dark mb-3" onclick="location.hash = '${hash}'">
                            <img src="${result["song_art_image_url"]}" class="card-img-top" alt="image">
                            <div class="card-body d-flex flex-column">
                                <h4 class="card-text" style="margin-bottom: 2px">${result["title"]}</h4>
                                <h6 class="card-text text-muted" style="font-style: italic">by ${result["primary_artist"]["name"]}</h6>
                                <a class="float-right text-right text-muted mt-3">views: ${result["stats"]["pageviews"]}</a>
                            </div>
                        </div>
                    </div>`);
                }

                $rows.push($row);
            }

        return $rows;
    },
};
