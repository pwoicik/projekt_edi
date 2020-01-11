"use strict";

import {Home} from "./pages/home.js";
import {About} from "./pages/about.js";
import {Charts} from "./pages/charts.js";
import {Search} from "./pages/search.js";
import {Song} from "./pages/song.js";
import {NavBar} from "./components/navBar.js";
import {Error404} from "./pages/error404.js";

const routes = {
    "/": Home,
    "/about": About,
    "/charts": Charts,
    "/search/:query": Search,
    "/song/:id": Song,
};

const router = async function () {
    const $navbarCollapse = $("#navbarCollapse");
    const $overlay = $("#overlay");

    const request = Utils.parseRequestURL();
    console.log(request);

    let parsedUrl = (request.resource ? "/" + request.resource : "/");
    if (request.resource === "search") {
        parsedUrl += "/:query";
    } else if (request.resource === "song") {
        parsedUrl += "/:id";
    }

    $navbarCollapse.empty();
    $navbarCollapse.append(NavBar.render(request.resource));

    let page = routes[parsedUrl] ? routes[parsedUrl] : Error404;
    $overlay.empty();
    $overlay.append(await page.render(request.args));
};

export const LASTFM_API_KEY = "3304c4acb8acdc4e5b97eb12653b0024";
export const GENIUS_API_KEY = "xnRq3l0P2GQojPgTW6G40UqfPiDIhWpwPhZqDSfA4o8KeE6ylg_oN2L6nN2-0JrF";

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
