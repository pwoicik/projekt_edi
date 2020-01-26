"use strict";

import {GENIUS_API_KEY} from "../script/apiKeys.js";
import {initializeParticles} from "../script/initializeParticles.js";

window.addEventListener("DOMContentLoaded", async () => {
    initializeParticles();
    await populatePage();
});

async function populatePage() {
    const $overlay = $("#overlay");

    const id = location.hash.slice(2);
    const song = await fetch(`https://api.genius.com/songs/${id}?access_token=${GENIUS_API_KEY}`)
        .then(response => response.json())
        .then(json => json["response"]["song"]);

    const songDiv = `<div class="song">
                        ${createSongImage(song)}
                        ${createSongTitle(song)}
                     </div>`;

    const songEmbeddingHtml = await createSongEmbeddingHtml(song);

    const customPerformancesHtml = createCustomPerformances(song);

    const songVideoHtml = createSongVideo(song);

    const moreSongsHtml = await createMoreSongsDiv(song);

    $overlay.append(
        songDiv,
        songEmbeddingHtml,
        customPerformancesHtml,
        songVideoHtml,
        moreSongsHtml
    );
}

function createSongImage({song_art_image_url}) {
    return `<div class="cover-wrapper">
                <img class="img-fluid img-cover" 
                     src="${song_art_image_url}"
                     alt="BŁĄD">
            </div>`;
}

function createSongTitle({primary_artist, title}) {
    return `<div class="song-info">
                <span class="artist-name">${primary_artist["name"]}</span>
                <span class="song-title display-4">${title}</span>
            </div>`;
}

async function createSongEmbeddingHtml({id, title, primary_artist}) {
    const div = `<div id='rg_embed_link_${id}' 
                      class='rg_embed_link' 
                      data-song-id='${id}'>
                    Read “​${title}” by ​${primary_artist["name"]} on Genius</div>`;

    const embeddingScript = await fetch(`https://genius.com/songs/${id}/embed.js`)
        .then(response => response.text())
        .then(text => text.split("\n"));

    let json = embeddingScript[2].substring(30, embeddingScript[2].length - 5) + '"';
    json = json.replace(/\\\\n/g, "\\n")
        .replace(/\\\\\\"/g, '\\"')
        .replace(/\\'/g, "'");
    json = JSON.parse(json);

    const script = embeddingScript[3].substring(18, embeddingScript[3].length - 2);

    return `<div class="lyrics">
                ${div}
                ${json}
                ${script}
            </div>`;
}

function createCustomPerformances({writer_artists, custom_performances}) {
    const writers = writer_artists.map(artist => artist["name"]).join(", ");
    const customPerformances = custom_performances.map(performer => {
        return {
            label: performer["label"],
            names: performer["artists"].map(artist => artist["name"]).join(", "),
        }
    });

    if (writers.length === 0 && customPerformances.length === 0) return "";

    let customPerformancesHtml = `<div class="performances">
                                      <p class="performance">Written By:&nbsp;&nbsp;
                                          <em class="text-yellow">${writers}</em>
                                      </p>`;
    for (const performance of customPerformances) {
        customPerformancesHtml += `<p class="performance">${performance.label}:&nbsp;&nbsp;
                                       <em class="text-yellow">${performance.names}</em>
                                   </p>`;
    }
    customPerformancesHtml += "</div>";

    return customPerformancesHtml;
}

function createSongVideo({media}) {
    const youtubeMedia = media.filter(media => media["provider"] === "youtube");
    if (youtubeMedia.length === 0) return "";

    const youtubeUrl = getYoutubeEmbedUrl(youtubeMedia[0]["url"]);
    return `<div class="embed-responsive embed-responsive-16by9 video">
                <iframe class="embed-responsive-item" src="${youtubeUrl}"></iframe>
            </div>`;
}

function getYoutubeEmbedUrl(url) {
    const videoId = url.split("=")[1];
    return `https://www.youtube.com/embed/${videoId}?rel=0`;
}

async function createMoreSongsDiv({primary_artist}) {
    const songs = await fetch(`https://api.genius.com/artists/${primary_artist.id}/songs?access_token=${GENIUS_API_KEY}`)
        .then(response => response.json())
        .then(json => json["response"]["songs"]);

    let songsDiv = `<div class="more-songs">
                        <p class="more-songs-header">More song with <em>"${primary_artist["name"]}"<em>:</p>`;
    for (const song of songs) {
        songsDiv += `<p class="another-song"><a href="#" onclick="location.hash = '/${song["id"]}'; location.reload();">${song["full_title"]}</a></p>`;
    }
    songsDiv += "</div>";

    return songsDiv;
}
