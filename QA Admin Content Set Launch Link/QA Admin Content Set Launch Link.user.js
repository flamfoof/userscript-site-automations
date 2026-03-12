// ==UserScript==
// @name		QA Admin Content Set Launch Link 
// @include		https://stvqa.freecast.com/admin/guide/show/*
// @include		https://qastv.freecast.com/admin/guide/show/*
// @include		https://admin-qa.freecast.com/admin/guide/show/*
// @include		https://stvqa.freecast.com/admin/guide/movie/*
// @include		https://qastv.freecast.com/admin/guide/movie/*
// @include		https://admin-qa.freecast.com/admin/guide/movie/*
// @version  1
// ==/UserScript==



window.addEventListener('load', async function() {
    let slugId = document.getElementById("id_slug")
    let originLink = window.location.origin
    let mediaType = window.location.href.split("/")[5]
    let contentLink = null

    //if link doesn't match current page
    if(slugId) {
        let contentSlugElement = this.document.getElementsByClassName("form-row field-name field-slug")[0]
        const contentTitle = contentSlugElement.innerHTML
        contentLink = `https://watchqa.freecast.com/guide/${mediaType}/info/${slugId.value}/`
        contentSlugElement.innerHTML += `<a href="${contentLink}">[Launch]</a>`
    } else {
        let slugIdList = document.getElementsByClassName("field-slug")
        let nameIdList = document.getElementsByClassName("field-name")
        for(let i = 0; i < slugIdList.length; i++) {
            contentLink = `https://watchqa.freecast.com/guide/${mediaType}/info/${slugIdList[i].textContent}/`
            nameIdList[i].innerHTML += `<a href="${contentLink}">[Launch]</a>`
        }
    }
}, false);