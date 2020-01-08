"use strict";

const Utils = {
    parseRequestURL: function () {
        const url = location.hash.slice(1).toLowerCase() || "/";
        const r = url.split("/");
        r.shift();
        return {
            resource: r.shift(),
            args: r,
        };
    },
};
