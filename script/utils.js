"use strict";

const Utils = {
    parseURL() {
        const url = location.hash.slice(1).toLowerCase() || "/";
        const r = url.split("/");
        return {
            resource: r[1],
            arg: r[2],
        };
    },

    parseRequest(request) {
        let parsedRequest = (request.resource ? "/" + request.resource : "/");
        if (request.resource === "search") {
            parsedRequest += "/:query";
        } else if (request.resource === "song") {
            parsedRequest += "/:id";
        }

        return parsedRequest;
    },

    redirectSearch() {
        const query = encodeURI(document.getElementById("query").value);
        location.href = `#/search/${query}`;
    },
};
