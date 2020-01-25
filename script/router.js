"use strict";

import {Home} from "../pages/home.js";
import {About} from "../pages/about.js";
import {Charts} from "../pages/charts.js";
import {Search} from "../pages/search.js";
import {NavBar} from "../components/navBar.js";
import {Error404} from "../pages/error404.js";


const routes = {
    "/": Home,
    "/about": About,
    "/charts": Charts,
    "/search/:query": Search,
};

export const router = async () => {
    const navbarCollapse = document.getElementById("navbarCollapse");
    const overlay = document.getElementById("overlay");
    const request = Utils.parseURL();

    const parsedRequest = Utils.parseRequest(request);

    navbarCollapse.innerHTML = "";
    const navbar = Utils.parseStringsToDomObjects(NavBar.render(request.resource));
    navbarCollapse.append(...navbar);

    const page = routes[parsedRequest] ? routes[parsedRequest] : Error404;

    overlay.innerHTML = "";
    const newElements = Utils.parseStringsToDomObjects(await page.render(request.arg));
    overlay.append(...newElements);
};
