"use strict"

export function lastfmInfo(lastfm, name)
{
    let extractedinfo = [];
    for(let i= 0; i < 6; i++)
    {
        extractedinfo.push(lastfm[i][name]);
    }
    return extractedinfo;
}