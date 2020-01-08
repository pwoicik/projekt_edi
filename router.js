"use strict";

const routes = {
    "/": Home,
    "/about": About,
    "/charts/:category": Chart,
    "/graphs": Graphs,
    "/search/:query": Search,
    "/song/:id": Song,
};

const router = async function () {
    const $navBar = $("#navBar");
    const $content = $("#content");

    const request = Utils.parseRequestURL();
    console.log(request);

    let parsedUrl = (request.resource ? "/" + request.resource : "/");
    if (request.resource === "charts") {
        parsedUrl += "/:category";
    } else if (request.resource === "search") {
        parsedUrl += "/:query";
    } else if (request.resource === "song") {
        parsedUrl += "/:id";
    }

    $navBar.empty();
    $navBar.append(await NavBar.render(request.resource));

    let page = routes[parsedUrl] ? routes[parsedUrl] : Error404;
    $content.empty();
    $content.append(await page.render(request.args));
    await page.afterRender();
};

const LASTFM_API_KEY = "3304c4acb8acdc4e5b97eb12653b0024";
const GENIUS_API_KEY = "xnRq3l0P2GQojPgTW6G40UqfPiDIhWpwPhZqDSfA4o8KeE6ylg_oN2L6nN2-0JrF";

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
