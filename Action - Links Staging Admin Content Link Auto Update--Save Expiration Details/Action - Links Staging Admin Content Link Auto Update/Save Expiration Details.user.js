// ==UserScript==
// @name		Action - Links Staging Admin Content Link Auto Update/Save Expiration Details
// @include		https://stvstaging.freecast.com/admin/guide/weblink/*
// @version  1
// @grant    none
// ==/UserScript==

window.addEventListener(
	"load",
	function () {
		this.setTimeout(function () {
      let expiration = document.getElementById("id_expiration")
      expiration.value = "";
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
				}, 20);
			}
		}, 3000);
	},
	false
);
