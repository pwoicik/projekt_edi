"use strict";

export const About = {
    async render() {
        return `<h1 class='display-1 text-white mb-3' 
                    style="text-align:center;
                           text-shadow: 2px 2px 0 #000;">
                  AUTORZY:</h1>
                <h1 class='display-4 text-white' 
                    style="text-align:center;
                           line-height: 1.5;">
                  <a style="color: red">Patryk Wójcik</a><br>
                  <a style="color: green">Kamil Krzych</a><br>
                  <a style="color: blue">Andrzej Krucan</a>
                </h1>`;
    },
};
