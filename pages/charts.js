"use strict";

import {LASTFM_API_KEY} from "../script/apiKeys.js";
import {drawChart} from "../script/drawChart.js";

export const Charts = {
    async render() {
        const topArtists = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${LASTFM_API_KEY}&format=json`)
            .then(response => response.json())
            .then(json => json["artists"]["artist"]);
            let names = [topArtists[0]["name"], topArtists[1]["name"], topArtists[2]["name"], topArtists[3]["name"], topArtists[4]["name"], topArtists[5]["name"]];
            let playcount = [topArtists[0]["playcount"], topArtists[1]["playcount"], topArtists[2]["playcount"], topArtists[3]["playcount"], topArtists[4]["playcount"], topArtists[5]["playcount"]];
            let chartName = "TopArtists";
            drawChart(chartName,names,playcount);
            $("#overlay").append(" <h1 class='display-4 text-white' >Podaj Nazwę Tagu <input type='test', id = 'TagInput'></h1>");
            $("#TagInput").on('keyup', function (e) {
                if (e.keyCode === 13) {
                    async function TagChart()
                    {
                        let Tag = $("#TagInput").val();
                        const topTag = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${Tag}&api_key=${LASTFM_API_KEY}&format=json`)
                            .then(response => response.json())
                            .then(json => json["topartists"]["artist"]);
                            let mbid = [topTag[0]["mbid"], topTag[1]["mbid"], topTag[2]["mbid"], topTag[3]["mbid"], topTag[4]["mbid"], topTag[5]["mbid"]];
                            let names = [topTag[0]["name"], topTag[1]["name"], topTag[2]["name"], topTag[3]["name"], topTag[4]["name"], topTag[5]["name"]];
                        let plays = [];
                        console.log(plays);
                        for(let i = 0 ; i < 6; i++)
                        {
                            const ArtistInfo = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${names[i]}&api_key=${LASTFM_API_KEY}&format=json`)
                                .then(response => response.json())
                                .then(json => json["artist"]);
                            plays.push(ArtistInfo["stats"]["playcount"])
                        }
                        let chartName = "Top artitsts by tag " + Tag + " on Last.FM"
                        console.log(chartName);
                        drawChart(chartName,names,plays);
                    }
                    let info = TagChart();
                    console.log(info);
                }
            });

    }
};
