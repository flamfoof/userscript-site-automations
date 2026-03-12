// ==UserScript==
// @name		Action - Links Episode Admin Season Launch all Links
// @include		https://stvstaging.freecast.com/admin/guide/seasonepisode/*
// @include		https://stvstaging.freecast.com/admin/guide/movie/*
// @include		https://stagingstv.freecast.com/admin/guide/seasonepisode/*
// @include		https://stagingstv.freecast.com/admin/guide/movie/*
// @include		https://admin-stg.freecast.com/admin/guide/seasonepisode/*
// @include		https://admin-stg.freecast.com/admin/guide/movie/*
// @include		https://admin-qa.freecast.com/admin/guide/seasonepisode/*
// @include		https://admin-qa.freecast.com/admin/guide/movie/*
// @version  1
// @grant    none
// ==/UserScript==

let count = 0;
let maxRetries = 5;
let intervalRef = setInterval(function () {
		let x = document.getElementsByClassName("field-details_link");
		var source = ["disney"];

		var rows = document.querySelectorAll('tr:has(.field-source select[name*="SeasonEpisode_links"])');
		if (rows.length == 0) {
			rows = document.querySelectorAll('tr:has(.field-source select[name*="Movie_links"])');
		}
		rows.forEach((row) => {
			var selectElement = row.querySelector(".field-source select");
			var selectedOption = selectElement.options[selectElement.selectedIndex];
			var sourceName = selectedOption.innerText.trim().toLowerCase(); // Convert to lowercase for case-insensitive comparison
      var getRowLink = row.querySelector(".field-details_link");
      var getRowLinkHref = getRowLink.children[0].children[0].href;
      console.log(getRowLinkHref);
      
      
		if (source.some(item => sourceName.includes(item))) {
        var checkbox = row.querySelector('.field-active input[type="checkbox"]');
        if (checkbox) {
          // Do something with the checkbox, e.g.,
          console.log(checkbox);
          window.open(getRowLinkHref, "_blank");
          clearInterval(intervalRef);
        }
      }
    });
}, 1500);
