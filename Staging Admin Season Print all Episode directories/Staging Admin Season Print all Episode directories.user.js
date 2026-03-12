
// ==UserScript==
// @name		Staging Admin Season Print all Episode directories
// @include		https://stvstaging.freecast.com/admin/guide/season/*
// @include		https://stagingstv.freecast.com/admin/guide/season/*
// @include		https://admin-stg.freecast.com/admin/guide/season/*
// @include		https://stvqa.freecast.com/admin/guide/season/*
// @include		https://admin-qa.freecast.com/admin/guide/season/*
// @version  1
// @grant    none
// ==/UserScript==



window.addEventListener('load', async function() {
    let x = document.getElementsByClassName("field-details_link")
    let seasonId = document.getElementsByName("episodes-__prefix__-season")[0].value

	let greaseMonkeyStoredSeries = JSON.parse(this.localStorage.getItem('storedSeries'));
	console.log("GET GM DATA:");
	console.log(greaseMonkeyStoredSeries);
    if(!greaseMonkeyStoredSeries) {
        greaseMonkeyStoredSeries = {};
    }
    let prevSeriesLink = greaseMonkeyStoredSeries[seasonId];
    let originLink = window.location.origin

    
    let seriesTitleElement = this.document.getElementsByClassName("readonly")[0]
    const seriesTitle = seriesTitleElement.innerHTML
    //if link doesn't match current page
    if(prevSeriesLink) {
        seriesTitleElement.innerHTML += `<br><a href="${originLink}/admin/guide/show/${prevSeriesLink}">[Link]</a>`
    } else {
        seriesTitleElement.innerHTML += `<br>[To display Series link, make sure you access the Series page first]`
        seriesTitleElement.innerHTML += `<br><a href="${originLink}/admin/guide/show/?q=${seriesTitle}">[Search Link]</a>`
    }
    x.length -= 1;
    for(let i = 0; i < x.length - 1; i++) {
        //https://stvstaging.freecast.com/admin/guide/seasonepisode/<id>/change/
        let seasonCurrLink = x[i].children[0].children[0].href
        let episodeNumber = x[i].previousElementSibling.previousElementSibling.children[0].value
        console.log(`Episode ${episodeNumber}: ${seasonCurrLink}`);
//       	window.open(seasonCurrLink, '_blank');
    } 
}, false);
