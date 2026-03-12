// ==UserScript==
// @name		Action - Admin Content Deactivate Select Specific Source
// @include		https://stvstaging.freecast.com/admin/guide/seasonepisode/*
// @include		https://stagingstv.freecast.com/admin/guide/seasonepisode/*
// @include		https://admin-stg.freecast.com/admin/guide/seasonepisode/*
// @include		https://stvstaging.freecast.com/admin/guide/movie/*
// @include		https://stagingstv.freecast.com/admin/guide/movie/*
// @include		https://admin-stg.freecast.com/admin/guide/movie/*
// @include		https://admin-qa.freecast.com/admin/guide/movie/*
// @include		https://admin-qa.freecast.com/admin/guide/seasonepisode/*
// @version  1
// @grant    none
// ==/UserScript==
let count = 0;
let maxRetries = 5;
let intervalRef = setInterval(function () {
	var source = ["pluto"];
	if (count++ > maxRetries) {
		clearInterval(intervalRef);
		return;
	}
	var rows = document.querySelectorAll('tr:has(.field-source select[name*="SeasonEpisode_links"])');
	if (rows.length == 0) {
		rows = document.querySelectorAll('tr:has(.field-source select[name*="Movie_links"])');
	}
	rows.forEach((row) => {
		var selectElement = row.querySelector(".field-source select");
		var selectedOption = selectElement.options[selectElement.selectedIndex];
		var sourceName = selectedOption.innerText.trim().toLowerCase(); // Convert to lowercase for case-insensitive comparison
		var accessMode = row.querySelector(".field-access_mode select");
// 		if(accessMode.value != 2) {return;}
		if (source.some(item => sourceName.includes(item))) {
			var checkbox = row.querySelector('.field-active input[type="checkbox"]');
//       var checkbox = row.querySelector('.delete input[type="checkbox"]');
			if (checkbox) {
				// Do something with the checkbox, e.g.,
				console.log(checkbox);
// 				checkbox.checked = true; // For active
        checkbox.checked = false; // For deactivate
				clearInterval(intervalRef);
			}
		}
	});
}, 1500);
