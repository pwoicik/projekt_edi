"use strict";

import {LASTFM_API_KEY} from "../script/apiKeys.js";

export const Charts = {
    async render() {
        const {names, playcount, chartName} = await this.getTopArtists();
        const charts = [this.createChart(chartName, names, playcount)];
        const header = this.createHeader();

        const input = this.createInputField();
        const form = this.createForm(input);
        form.appendChild(input);

        return [header, form, ...charts];
    },

    getTopArtists: async () => {
        const topArtists = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${LASTFM_API_KEY}&format=json`)
            .then(response => response.json())
            .then(json => json["artists"]["artist"]);

        return {
            names: Charts.extractField(topArtists, "name"),
            playcount: Charts.extractField(topArtists, "playcount"),
            chartName: "Top Artists of last week on Last.fm",
        };
    },

    createHeader: () => {
        const header = document.createElement("h1");
        header.classList.add("display-4", "text-white", "mb-3");
        header.innerText = "Custom Search";

        return header;
    },

    createInputField: () => {
        const input = document.createElement("input");
        input.type = "search";
        input.classList.add("mb-5", "form-control", "form-control-lg", "form-control-borderless");
        input.style.display = "block";
        input.placeholder = "provide tag";
        return input;
    },

    getPlaycounts: async function (names) {
        const playcounts = [];
        for (let i = 0; i < 6; i++) {
            const ArtistInfo = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${names[i]}&api_key=${LASTFM_API_KEY}&format=json`)
                .then(response => response.json())
                .then(json => json["artist"]);
            playcounts.push(ArtistInfo["stats"]["playcount"])
        }
        return playcounts;
    },

    extractField: (json, field) => {
        let extractedInfo = [];
        for (let i = 0; i < 6; i++) {
            extractedInfo.push(json[i][field]);
        }
        return extractedInfo;
    },

    createForm: function (inputField) {
        const form = document.createElement("form");
        form.action = "#";

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const tag = encodeURI(inputField.value);
            console.log(tag);

            const topTag = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${tag}&api_key=${LASTFM_API_KEY}&format=json`)
                .then(response => response.json())
                .then(json => json["topartists"]["artist"]);
            if (topTag.length < 6) {
                window.alert("Can't find this tag :(");
                return;
            }

            const names = this.extractField(topTag, "name").map((val) => decodeURI(val));
            const playcounts = await this.getPlaycounts(names);
            const chartName = `Top artists by tag "${decodeURI(tag)}" on Last.FM`;
            
            const chart = this.createChart(chartName, names, playcounts);
            document.getElementById("overlay")
                .appendChild(chart);
            chart.scrollIntoView();
        });

        return form;
    },

    createChart: (chartName, names, playcount) => {
        const chart = document.createElement("canvas");
        chart.id = chartName;
        chart.style.backgroundColor = 'rgb(0, 0, 0, 0.3)';
        chart.classList.add("mb-4");

        new Chart(chart, {
            type: 'bar',
            data: {
                labels: [names[0], names[1], names[2], names[3], names[4], names[5]],
                datasets: [{
                    label: '# of total plays on Last.fm',
                    data: [playcount[0], playcount[1], playcount[2], playcount[3], playcount[4], playcount[5]],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.89)',
                        'rgba(54, 162, 235, 0.89)',
                        'rgba(255, 206, 86, 0.89)',
                        'rgba(75, 192, 192, 0.89)',
                        'rgba(153, 102, 255, 0.89)',
                        'rgba(255, 159, 64, 0.89)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                tooltips:
                {
                    callbacks:{
                        label: (val) => {
                            return numeral(val.value).format("0.0a");;
                        }, 
                    },
                },
                legend: {
                    labels: {
                        fontColor: "white",
                        fontSize: 14,
                    },
                },
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
                            callback: (val) => {
                                return numeral(val).format("0.0a");
                            },
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
    },
};
