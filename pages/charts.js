"use strict";

import {LASTFM_API_KEY} from "../script/apiKeys.js";

export const Charts = {
    async render() {
        const header = createHeader();

        const input = createInputField();
        const form = createForm(input);
        form.appendChild(input);

        const {names, playcount, chartName} = await getTopArtists();
        const charts = createChart(chartName, names, playcount);

        return [header, form, charts];
    },
};

async function getTopArtists() {
    const topArtists = await fetch("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists" +
        `&limit=10&api_key=${LASTFM_API_KEY}&format=json`)
        .then(response => response.json())
        .then(json => json["artists"]["artist"]);

    return {
        names: extractField(topArtists, "name"),
        playcount: extractField(topArtists, "playcount"),
        chartName: "Top Artists of last week on Last.fm",
    };
}

function createHeader() {
    return "<h1 class='display-4 text-white mb-3'>Custom search</h1>";
}

function createInputField() {
    const input = document.createElement("input");
    input.type = "search";
    input.classList.add("mb-5", "form-control", "form-control-lg", "form-control-borderless");
    input.style.display = "block";
    input.placeholder = "Type tag";

    return input;
}

async function getPlaycounts(names) {
    const playcounts = await names.map((name) =>
        fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}` +
            `&api_key=${LASTFM_API_KEY}&format=json`)
            .then(response => response.json())
            .then(json => {
                const artist = json["artist"];
                return artist ? json["artist"]["stats"]["playcount"] : 0;
            })
    );

    return await Promise.all(playcounts);
}

function extractField(jsons, field) {
    return jsons.map(json => json[field]);
}

function createForm(inputField) {
    const form = document.createElement("form");
    form.action = "#";

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const tag = encodeURI(inputField.value);

        const topTag = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${tag}` +
            `&limit=10&api_key=${LASTFM_API_KEY}&format=json`)
            .then(response => response.json())
            .then(json => json["topartists"]["artist"]);
        if (topTag.length < 10) {
            window.alert("Can't find this tag :(");
            return;
        }

        const names = extractField(topTag, "name");
        const playcounts = await getPlaycounts(names);
        const chartName = `Top artists by tag "${decodeURI(tag)}" on Last.FM`;

        const chart = createChart(chartName, names, playcounts);
        document.getElementById("overlay")
            .appendChild(chart);
        chart.scrollIntoView();
    });

    return form;
}

function createChart(chartName, names, playcount) {
    const chart = document.createElement("canvas");
    chart.id = chartName;
    chart.style.backgroundColor = 'rgb(0, 0, 0, 0.5)';
    chart.classList.add("mb-4");

    new Chart(chart, {
        type: "bar",
        data: {
            labels: [...names],
            datasets: [{
                label: "number of total plays on Last.fm",
                data: [...playcount],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.89)",
                    "rgba(54, 162, 235, 0.89)",
                    "rgba(255, 206, 86, 0.89)",
                    "rgba(75, 192, 192, 0.89)",
                    "rgba(153, 102, 255, 0.89)",
                    "rgba(255, 159, 64, 0.89)",
                    "rgba(255, 99, 132, 0.89)",
                    "rgba(54, 162, 235, 0.89)",
                    "rgba(255, 206, 86, 0.89)",
                    "rgba(75, 192, 192, 0.89)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            }],
        },
        options: {
            tooltips:
                {
                    callbacks: {
                        label: (val) => numeral(val.value).format("0.0a"),
                    },
                },
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 14,
                },
            },
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            responsive: true,
            maintainAspectRatio: true,
            title: {
                display: true,
                text: chartName,
                fontColor: "white",
                fontSize: 14,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        callback: (val) => numeral(val).format("0.0a"),
                        fontColor: "white",
                        fontSize: 14,
                    },
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 14,
                    },
                }],
            },
        },
    });

    return chart;
}
