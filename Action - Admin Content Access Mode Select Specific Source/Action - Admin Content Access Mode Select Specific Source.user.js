// ==UserScript==
// @name		Action - Admin Content Access Mode Select Specific Source
// @include		https://stvstaging.freecast.com/admin/guide/seasonepisode/*
// @include		https://admin-stg.freecast.com/admin/guide/seasonepisode/*
// @include		https://stagingstv.freecast.com/admin/guide/seasonepisode/*
// @include		https://stvstaging.freecast.com/admin/guide/movie/*
// @include		https://admin-stg.freecast.com/admin/guide/movie/*
// @include		https://stagingstv.freecast.com/admin/guide/movie/*
// @include		https://admin-qa.freecast.com/admin/guide/movie/*
// @include		https://admin-qa.freecast.com/admin/guide/seasonepisode/*
// @version  1
// @grant    none
// ==/UserScript==
let count = 0;
let maxRetries = 5;
let intervalRef = setInterval(function () {
	var source = ["roku"];
	var accessModeValue = 3;
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

		if (source.some((item) => sourceName.includes(item))) {
			var accessModeSelector = row.querySelector(".field-access_mode select");
			if (accessModeSelector) {
				accessModeSelector.value = accessModeValue;
				clearInterval(intervalRef);
			}
		}
	});
}, 1500);
