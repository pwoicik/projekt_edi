"use strict";

const Chart = {
    render: async function (category) {
        return $(`<h1>CHART ${category.toUpperCase()}</h1>`);
    },
};
