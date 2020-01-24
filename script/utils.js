"use strict";

const Utils = {
    parseRequestURL() {
        const url = location.hash.slice(1).toLowerCase() || "/";
        const r = url.split("/");
        r.shift();
        return {
            resource: r.shift(),
            args: r,
        };
    },

    redirectSearch() {
        const query = encodeURI(document.getElementById("query").value);
        location.hash = `#/search/${query}`;
    },
};
