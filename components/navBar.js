"use strict";

export const NavBar = {
    render(resource) {
        const navItems = `<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item">
                              <a class="nav-link text-light" href="#/charts">Charts</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link text-light" href="#/about">About</a>
                            </li>
                          </ul>`;

        const searchBar = `
                <form class="form-inline my-2 my-lg-0" 
                      action="#" 
                      onsubmit="Utils.redirectSearch(); return false;">
                  <input id="query" class="form-control mr-sm-2" type="search" placeholder="Type song or artist">
                </form>`;

        return `${navItems}
                ${resource !== "" ? searchBar : ""}`;
    },
};
