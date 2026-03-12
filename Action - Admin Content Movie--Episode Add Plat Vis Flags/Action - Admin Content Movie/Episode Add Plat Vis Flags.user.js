// ==UserScript==
// @name		Action - Admin Content Movie/Episode Add Plat Vis Flags
// @include		https://stvstaging.freecast.com/admin/guide/seasonepisode/*
// @include		https://stvstaging.freecast.com/admin/guide/movie/*
// @version  1
// @grant    none
// ==/UserScript==

window.addEventListener(
	"load",
	function () {
		this.setTimeout(function () {
			if (!window.location.href.includes("autoupdate=true")) {
				let visFlagPaid = document.getElementById("id_platform_paid_to");
				let visFlagFree = document.getElementById("id_platform_free_to"); //switch as necessary
				let targetFlagChange = visFlagPaid;
				let optList = [];

				optList.push(addFlagOpts("14", "Web"));
				optList.push(addFlagOpts("24", "iOS"));
				optList.push(addFlagOpts("34", "Android"));
// 				optList.push(addFlagOpts("29", "Android TV"));
// 				optList.push(addFlagOpts("28", "Fire TV"));
// 				optList.push(addFlagOpts("19", "tvOS"));
				// optList.push(addFlagOpts("42", "Roku")); //only when necessary
				console.log(optList);
				console.log(visFlagPaid);

				for (let i = 0; i < optList.length; i++) {
					visFlagPaid.appendChild(optList[i]);
				}
			}
		}, 1500);
	},
	false
);

function addFlagOpts(val, name) {
	const visFlagOpt = document.createElement("option");
	visFlagOpt.value = val;
	visFlagOpt.title = name;
	visFlagOpt.textContent = name;

	return visFlagOpt;
}
