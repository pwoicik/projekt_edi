"use strict";

export const About = {
    async render() {
        return new DOMParser().parseFromString("<h1>ABOUT</h1>", "text/html").body.childNodes;
    },
};
