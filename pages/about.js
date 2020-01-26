"use strict";

export const About = {
    async render() {
        return `<div class="about">
                  <h3 class="about-h display-2 text-outlined">CREATORS</h3>
                  <img class="av" src="assets/avatar_pink.png" alt="AVATAR" onclick="window.open('https://github.com/pwoicik')">
                  <p class="name text-yellow text-outlined">Patryk Wójcik</p>
                  <img class="av" src="assets/avatar_green.png" alt="AVATAR" onclick="window.open('https://github.com/krucan-a')">
                  <p class="name text-yellow text-outlined">Andrzej Krucan</p>                  
                  <img class="av" src="assets/avatar_blue.png" alt="AVATAR" onclick="window.open('https://github.com/KKrzych09')">
                  <p class="name text-yellow text-outlined">Kamil Krzych</p>
                </div>`;
    },
};
