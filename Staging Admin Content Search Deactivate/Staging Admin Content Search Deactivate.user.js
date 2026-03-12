// ==UserScript==
// @name		Staging Admin Content Search Deactivate
// @include		https://stvstaging.freecast.com/admin/guide/show/*
// @include		https://stagingstv.freecast.com/admin/guide/show/*
// @include		https://admin-stg.freecast.com/admin/guide/show/*
// @include		https://stvqa.freecast.com/admin/guide/show/*
// @include		https://15.stv.freecast.com/admin/guide/show/*
// @include		https://stvstaging.freecast.com/admin/guide/movie/*
// @include		https://stagingstv.freecast.com/admin/guide/movie/*
// @include		https://admin-stg.freecast.com/admin/guide/movie/*
// @include		https://stvstaging.freecast.com/admin/guide/seasonepisode/*
// @include		https://stvqa.freecast.com/admin/guide/movie/*
// @include		https://15.stv.freecast.com/admin/guide/movie/*
// @include		https://admin-qa.freecast.com/admin/guide/movie/*
// @include		https://admin-qa.freecast.com/admin/guide/show/*
// @version  1
// @grant    GM.getValue
// @grant    GM.setValue
// ==/UserScript==


window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  var x = document.getElementsByClassName("field-active")
  for(let i = 0; i < x.length; i++) {
//      x[i].children[0].checked=false
  }
  var files = document.getElementsByClassName("file-upload") 
  for(let i = 0; i < files.length; i++) { 
//   for(let i = 0; i < 5; i++) {
     if(!(files[i].textContent.includes(".jpg") ||
          files[i].textContent.includes(".jpeg") ||
          files[i].textContent.includes(".png")) ||
        	files[i].textContent.includes("function")) {
       files[i].getElementsByTagName("input")[0].click()
     }
  }
});