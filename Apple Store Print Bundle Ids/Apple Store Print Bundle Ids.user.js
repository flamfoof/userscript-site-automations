// ==UserScript==
// @name		Apple Store Print Bundle Ids
// @include		https://apps.apple.com/us/*
// @include		https://apps.apple.com/in/*
// @version  1
// @grant    none
// ==/UserScript==

var JSONTarget = document.getElementById("shoebox-media-api-cache-apps")

let targetParsed = JSON.parse(JSONTarget.innerText)
let targetKeys = Object.keys(targetParsed)
let bundleData = null;

bundleData = JSON.parse(targetParsed[targetKeys[0]])
let bundleDataAttr = bundleData.d[0]
let bundlePlatforms = Object.keys(bundleDataAttr.attributes.platformAttributes)

for(let i = 0; i < bundlePlatforms.length; i++) {
    let bundlePlatform = bundlePlatforms[i]
    let bundlePlatformValue = bundleDataAttr.attributes.platformAttributes[bundlePlatform]
    let bundleDataOut = {
        "url": bundleDataAttr.attributes.url,
        "bundleId": bundlePlatformValue.bundleId,
        "storeId": `id${bundleDataAttr.id}`
    }
    console.log(`${bundlePlatform}: ${JSON.stringify(bundleDataOut)}`)
}
console.log(bundleDataAttr)