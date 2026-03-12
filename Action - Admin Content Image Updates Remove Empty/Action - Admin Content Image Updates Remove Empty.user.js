// ==UserScript==
// @name		Action - Admin Content Image Updates Remove Empty
// @include		https://stvstaging.freecast.com/admin/guide/*_endswith=*
// @include		https://stagingstv.freecast.com/admin/guide/*_endswith=AAABCD1418*
// @include		https://admin-stg.freecast.com/admin/guide/*_endswith=AAABCD1418*
// @version  1
// @grant    none
// ==/UserScript==

window.addEventListener(
	"load",
	function () {
		console.log("Started Admin Content Image Updates Remove Empty");
		console.log(window.location.href);
		this.setTimeout(function () {
			console.log("Saving/Restarting");
			var count = 0;
			var x = document.getElementById("result_list");
			var y = x?.children[1]?.children;
			if (y) {
				for (var i = 0; i < y.length; i++) {
					//           if(!y[i].textContent.includes(".jpg")) {
					count++;
					//               var yContext = y[i].children
					//               for(let j = 0; j < yContext.length; j++) {
					//                   if(yContext[j].textContent.includes("AAABCD1418.jpg")) {
					//                       yContext[j].getElementsByTagName("input")[0].click()
					//                   }
					//               }
				}
				var x = document.getElementsByName("_save")[0];
				if (count > 0 && x) {
					console.log("Saving");
					x.click();
				}
			} else {
				console.log("Restarting");
				window.location.replace(window.location.href);
			}
		}, 3000);
	},
	false
);
