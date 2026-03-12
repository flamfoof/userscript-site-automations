// ==UserScript==
// @name		Staging Admin Series Store Directory
// @include		https://stvstaging.freecast.com/admin/guide/show/*
// @include		https://stagingstv.freecast.com/admin/guide/show/*
// @include		https://admin-stg.freecast.com/admin/guide/show/*
// @include		https://stvqa.freecast.com/admin/guide/show/*
// @include		https://15.stv.freecast.com/admin/guide/show/*
// @include		https://admin-qa.freecast.com/admin/guide/show/*
// @version  1
// @grant    GM.getValue
// @grant    GM.setValue
// ==/UserScript==

let count = 0;
let maxRetries = 5;
let intervalRef = setInterval(async function () {
	if (count++ > maxRetries) {
		clearInterval(intervalRef);
		return;
	}
	let sourceId = 764;
	let sourceType = "plutotv-plutotv-free";
	let origin = "freecast";

	console.log("Setting up seasons link replacement");
	let x = document.getElementsByClassName("field-get_episode_count_link");
	x.length -= 1;
	const originUrl = window.location.origin;
	let tmdbIdElement = document.getElementById("id_tmdb_id");
	let tmdbId = tmdbIdElement.value;
	let deletePayload = {
		Records: [],
	};
	let seriesId = document.getElementsByName("object-id")[0].value;
	let GM_getVal = GM ? GM.getValue : GM_getValue;
	let GM_setVal = GM ? GM.setValue : GM_setValue;

    let greaseMonkeyStoredSeries = await GM_getVal("storedSeries");
    if(!greaseMonkeyStoredSeries) {
        greaseMonkeyStoredSeries = {};
    }
	console.log("GET GM DATA:");
	console.log(greaseMonkeyStoredSeries);

	//get the size of the stored series data
    let GMDataSize = Object.keys(greaseMonkeyStoredSeries).length;
	console.log("Size of stored series data: " + GMDataSize);

    if(GMDataSize > 69000) {
        greaseMonkeyStoredSeries = {};
    }

	for (let i = 0; i < x.length - 1; i++) {
		//https://stvstaging.freecast.com/admin/guide/seasonepisode/?season__id__exact=<id>
		//     https://stvstaging.freecast.com/admin/guide/season/4030476
		let paramName = "guide/season/";
		let seasonCurrLink = x[i].children[0].children[0].href;
		let seasonNumber = x[i].previousElementSibling.children[0].value;
		let seasonObject = x[i].children[0].children[0];
		let episodecount = parseInt(seasonObject.innerText);

		const cutPoint = seasonCurrLink.indexOf(paramName);
		if (cutPoint != -1) {
			const cutUrl = seasonCurrLink.slice(cutPoint + paramName.length);
			let targetUrl = `${originUrl}/admin/guide/season/${cutUrl}`;
			seasonObject.href = targetUrl;
			console.log(`Season ${seasonNumber}: ${targetUrl}`);
			greaseMonkeyStoredSeries[cutUrl] = seriesId;

			for (let j = 0; j < episodecount + 1; j++) {
				let contentPayloadTemplate = {
					body: {
						object_type: origin + "_episode_sources",
						action: "deactivate",
						content: null,
					},
				};
				let contentBodyTemplate = {
					tv_show_tmdb_id: tmdbId,
					season: seasonNumber,
					episode: j,
					source_id: sourceId,
					source_type: sourceType,
					origin_source: origin,
				};
				contentPayloadTemplate.body.content = contentBodyTemplate;
				deletePayload.Records.push(Object.assign({}, contentPayloadTemplate));
			}
			clearInterval(intervalRef);
		}
	}
	console.log("Grease data:");
	console.log(greaseMonkeyStoredSeries);
	GM_setVal("storedSeries", greaseMonkeyStoredSeries);
    localStorage.setItem('storedSeries', JSON.stringify(greaseMonkeyStoredSeries));
	console.log(deletePayload);
}, 1000);
