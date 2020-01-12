"use strict";

export const Error404 = {
    async render() {
        return $("<h1 class='display-4 text-white' >PAGE NOT FOUND!</h1><img src='../assets/penguin404.jpg' class='responsive'></img>");
    },
};
