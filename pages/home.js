"use strict";

export const Home = {
    async render() {
        return `
                    <div class="jumbotron bg-transparent text-center">
                      <h1 class="display-4 text-outlined mb-2">Search for your favourite songs:</h1>
                      <form class="card card-sm border-black"
                            action="#"
                            onsubmit="Utils.redirectSearch(); return false;">
                        <div class="card-body row no-gutters align-items-center">
                          <div class="col-auto">
                            <i class="fas fa-search h4 text-body"></i>
                          </div>
                          <div class="col">
                            <input id="query"
                                   class="form-control form-control-lg form-control-borderless"
                                   type="search"
                                   placeholder="Type song name or artist">
                          </div>
                        </div>
                      </form>
                    </div>`;
    },
};
