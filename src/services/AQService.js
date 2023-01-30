import { useState } from 'react';
const AQService = (city1, city2) => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const url = `https://api.openaq.org/v2/locations?limit=100&page=1&offset=0&city=${city1}&city=${city2}&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false`;
    return fetch(url, options)
        .then((res) => res.json())
        .then((results) => {
            return results
        })
        .catch((error) => {
            console.log("error", error)
        });;
}

export default AQService;
