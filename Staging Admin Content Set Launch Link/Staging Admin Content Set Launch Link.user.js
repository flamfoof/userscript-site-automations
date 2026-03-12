// ==UserScript==
// @name		Staging Admin Content Set Launch Link 
// @include		https://stvstaging.freecast.com/admin/guide/show/*
// @include		https://stagingstv.freecast.com/admin/guide/show/*
// @include		https://admin-stg.freecast.com/admin/guide/show/*
// @include		https://stvstaging.freecast.com/admin/guide/movie/*
// @include		https://stagingstv.freecast.com/admin/guide/movie/*
// @include		https://admin-stg.freecast.com/admin/guide/movie/*
// @include		https://stvstaging.freecast.com/admin/guide/seasonepisode/*
// @include		https://stagingstv.freecast.com/admin/guide/seasonepisode/*
// @include		https://admin-stg.freecast.com/admin/guide/seasonepisode/*
// @version  1
// @grant    GM.getValue
// @grant    GM.setValue
// ==/UserScript==


window.addEventListener('load', async function() {
    let slugId = document.getElementById("id_slug")
    let searchList = document.getElementById("result_list")
    let originLink = window.location.origin
    let mediaType = window.location.href.split("/")[5]
    let contentLink = null

    //if link doesn't match current page
    if(slugId) {
        let contentSlugElement = this.document.getElementsByClassName("form-row field-name field-slug")[0]
        const contentTitle = contentSlugElement.innerHTML
        contentLink = `https://watch.freecast.com/guide/${mediaType}/info/${slugId.value}/`
        contentSlugElement.innerHTML += `<a href="${contentLink}">[Launch]</a>`
    } else if (mediaType == "seasonepisode") {
        let nameIdList = document.getElementsByClassName("field-name")
        let showNameList = document.getElementsByClassName("field-get_show")
        for(let i = 0; i < nameIdList.length; i++) {
            contentLink = `${originLink}/admin/guide/show/?name=${showNameList[i].textContent}`
            nameIdList[i].innerHTML += `<a href="${contentLink}">[Search Show]</a>`
        }
    } else if(searchList) {
        let slugIdList = document.getElementsByClassName("field-slug")
        let nameIdList = document.getElementsByClassName("field-name")
        for(let i = 0; i < slugIdList.length; i++) {
            contentLink = `https://watch.freecast.com/guide/${mediaType}/info/${slugIdList[i].textContent}/`
            nameIdList[i].innerHTML += `<a href="${contentLink}">[Launch]</a>`
        }
    } 
}, false);