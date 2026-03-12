// ==UserScript==
// @name		QA Admin Content Select Form for editing without lagging Specific Source
// @include		https://stvqa.freecast.com/admin/guide/movie/*
// @include		https://admin-qa.freecast.com/admin/guide/movie/*
// @version  1
// @grant    none
// @description This helps to prevent the lag spike when selecting the links on the page after it loads
// ==/UserScript==
let count = 0;
let maxRetries = 5;
let intervalRef = setInterval(function () {
  let descElement = document.getElementById("id_description")
  console.log("Checking desc")
  if (descElement) {
    descElement.click();
    descElement.select();
    if(document.activeElement == descElement)
      console.log("Stopping timer")
    	clearInterval(intervalRef);
  }
}, 500);
