// ==UserScript==
// @name		Action - Admin Content Movie/Episode Auto Save Details
// @include		https://stvstaging.freecast.com/admin/guide/seasonepisode/*
// @include		https://stvstaging.freecast.com/admin/guide/movie/*
// @version  1
// @grant    none
// ==/UserScript==

window.addEventListener(
	"load",
	function () {
		this.setTimeout(function () {
			// Get current query parameters
			const params = new URLSearchParams(window.location.search);

			// Set or update the autoupdate parameter
			params.set("autoupdate", "true");

			// Update the URL in the address bar without reloading
			//check if URL already has the above parameters before making changes

			var x = document.getElementsByName("_continue")[0];
			if (!window.location.href.includes("autoupdate=true")) {
				x.click();
				setTimeout(function () {
					window.location.href = `?${params.toString()}`;
				}, 50);
			}
		}, 3000);
	},
	false
);
