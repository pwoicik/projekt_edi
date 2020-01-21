"use strict";

import {LASTFM_API_KEY} from "../script/apiKeys.js";
import {drawChart} from "../script/drawChart.js";
import {lastfmInfo} from "../script/lastfminfo.js";

export const Charts = {
    async render() {
        const topArtists = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${LASTFM_API_KEY}&format=json`)
            .then(response => response.json())
            .then(json => json["artists"]["artist"]);
            let names = lastfmInfo(topArtists,"name");
            let playcount = lastfmInfo(topArtists,"playcount");
            let chartName = "Top Artists of last week on Last.fm";
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
                            let mbid = lastfmInfo(topTag,"mbid");
                            let names = lastfmInfo(topTag,"name");
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
