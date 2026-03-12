
// ==UserScript==
// @name		Action - Admin Season Launch all Episode directories
// @include		https://stvstaging.freecast.com/admin/guide/season/*
// @include		https://stagingstv.freecast.com/admin/guide/season/*
// @include		https://admin-stg.freecast.com/admin/guide/season/*
// @include		https://stvqa.freecast.com/admin/guide/season/*
// @include		https://admin-qa.freecast.com/admin/guide/season/*
// @version  1
// @grant    none
// ==/UserScript==



window.addEventListener('load', function() {
    let x = document.getElementsByClassName("field-details_link")
    
    x.length -= 1;
    for(let i = 0; i < x.length - 1; i++) {
        //https://stvstaging.freecast.com/admin/guide/seasonepisode/<id>/change/
        let seasonCurrLink = x[i].children[0].children[0].href
        let episodeNumber = x[i].previousElementSibling.previousElementSibling.children[0].value
        console.log(`Episode ${episodeNumber}: ${seasonCurrLink}`);
      	window.open(seasonCurrLink, '_blank');
    } 
}, false);
