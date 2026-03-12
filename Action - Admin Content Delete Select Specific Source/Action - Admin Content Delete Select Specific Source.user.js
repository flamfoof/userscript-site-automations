// ==UserScript==
// @name		Action - Admin Content Delete Select Specific Source
// @include		https://stvstaging.freecast.com/admin/guide/seasonepisode/*
// @include		https://admin-stg.freecast.com/admin/guide/seasonepisode/*
// @include		https://stvstaging.freecast.com/admin/guide/movie/*
// @include		https://admin-stg.freecast.com/admin/guide/movie/*
// @include		https://stvqa.freecast.com/admin/guide/seasonepisode/*
// @include		https://stvqa.freecast.com/admin/guide/movie/*
// @include		https://admin-qa.freecast.com/admin/guide/seasonepisode/*
// @include		https://admin-qa.freecast.com/admin/guide/movie/*
// @version  1
// @grant    none
// ==/UserScript==
let count = 0;
let maxRetries = 5;
let intervalRef = setInterval(function () {
	console.log("Getting the rows")
	var source = ["the cw"];
	var accessMode = ["free"];
	var target = "s" //change this to switch between the two
	var targetIdentifier = target == "access" ? accessMode : source;
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
		var accessElement = row.querySelector(".field-access_mode select");
		var selectedOption = selectElement.options[selectElement.selectedIndex];
		var accessOption = accessElement.options[accessElement.selectedIndex];
		var sourceName = selectedOption.innerText.trim().toLowerCase(); // Convert to lowercase for case-insensitive comparison
		var accessName = accessOption.innerText.trim().toLowerCase(); // Convert to lowercase for case-insensitive comparison
		var targetName = target == "access" ? accessName : sourceName;

		if (targetIdentifier.some((item) => targetName.includes(item))) {
			// 			var checkbox = row.querySelector('.field-active input[type="checkbox"]');
			var checkbox = row.querySelector('.delete input[type="checkbox"]');
			if(sourceName.includes("roku"))
					return;
			if (checkbox) {
				// Do something with the checkbox, e.g.,
				console.log(checkbox);
				// 				checkbox.checked = false; // For active
				checkbox.checked = true; // For delete
				clearInterval(intervalRef);
			}
		}
	});
}, 1500);
