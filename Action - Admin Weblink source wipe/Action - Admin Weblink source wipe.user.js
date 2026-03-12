// ==UserScript==
// @name		Action - Admin Weblink source wipe
// @include		https://stvstaging.freecast.com/admin/guide/*source__id__exact=22*
// @include		https://stagingstv.freecast.com/admin/guide/*source__id__exact=22*
// @include		https://admin-stg.freecast.com/admin/guide/*source__id__exact=22*
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
			if (window.location.href.includes("o=rigit")) {
				params.set("o", "boom");
        
				var count = 0;
				var container = document.getElementById("changelist-form");
				var x = document.getElementsByName("action")[0];
				x.value = "delete_selected";
				var y = container.getElementsByClassName("action-select");
				var goButton = container.getElementsByClassName("button")[0];
				for (var i = 0; i < y.length; i++) {
					var button = y[i];
					button.click();
					count++;
					console.log("CLICKLY");
				}

				if (count > 0) {
					console.log("Go click");
					goButton.click();
					setTimeout(function () {
						window.location.href = `?${params.toString()}`;
					}, 300);
				}
			} else if (window.location.href.includes("o=boom")) {
				var deleteButton = document.querySelector('[type="submit"][value="Yes, I\'m sure"]');
				window.location.href = `?${params.toString()}`;
				setTimeout(function () {
					params.set("o", "rigit");
					deleteButton.click();
				}, 1000);
				setTimeout(function () {}, 50);
			}
		}, 3000);
	},
	false
);
