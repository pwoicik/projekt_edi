"use strict";

export const NavBar = {
    render(resource) {
        let charts;
        if (resource === "charts") {
            charts = `
                <li class="nav-item active">
                    <a class="nav-link text-light" href="#/charts">Charts</a>
                </li>`;
        } else {
            charts = `
                <li class="nav-item">
                    <a class="nav-link text-light" href="#/charts">Charts</a>
                </li>`;
        }

        let about;
        if (resource === "about") {
            about = `
                <li class="nav-item active">
                    <a class="nav-link text-light" href="#/about">About</a>
                </li>`;
        } else {
            about = `
                <li class="nav-item">
                    <a class="nav-link text-light" href="#/about">About</a>
                </li>`;
        }

        let searchBar = "";
        if (resource !== "") {
            searchBar = `
                <form class="form-inline my-2 my-lg-0" action="#" onsubmit="Utils.redirectSearch(); return false;">
                    <input id="query" class="form-control mr-sm-2" type="search" placeholder="Search">
                </form>`;
        }

        return `
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            ${charts}
            ${about}
        </ul>
        ${searchBar}`;
    },
};
