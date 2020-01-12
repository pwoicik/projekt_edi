"use strict";

export const Error404 = {
    async render() {
        return $("<h1>PAGE NOT FOUND!</h1><img src='../assets/penguin_404.jpg' class='responsive'></img>");
    },
};
