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
        location.hash = `#/search/${query}`;
    },

    parseStringsToDomObjects(elements) {
        const parser = new DOMParser();

        if (!Array.isArray(elements)) {
            return parser.parseFromString(elements, "text/html").body.childNodes;
        }

        const domObjects = [];
        for (const element of elements) {
            if (typeof element === "string") {
                domObjects.push(...parser.parseFromString(element, "text/html").body.childNodes);
            } else {
                domObjects.push(element);
            }
        }

        return domObjects;
    },
};
