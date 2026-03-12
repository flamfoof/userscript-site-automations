// ==UserScript==
// @name		Freecast Site Carousel Print Backend Shortcut
// @include		*://watch.freecast.com/guide/fp/*
// @version  	1
// @grant		addStyle
// @grant		xmlhttpRequest
// @grant		GM.xmlhttpRequest
// @grant		gm_xmlhttpRequest
// @grant		GM_xmlhttpRequest
// ==/UserScript==
let intervalRef = null;
let currRequest = null;
let resourceCount = 0;
let resourceShows = [];
let resourceMovies = [];
let currentResourceIndex = 0;
let gotValidResponse = false;
let currentMediaTargetClick = "shows";
let mediaArray = ["shows", "movies", "actors", "channels"]
let identifiedMedia = false;
let prevResourceSize = 0;
let changed = false;

console.log("Script started");


let startInterval = setInterval(function () {
	let mediaBoxes = window.document.getElementById("homeContainer").children[0].children[0].children[1];
  console.log(mediaBoxes)
	if(mediaBoxes.innerText.includes("TV Shows") || mediaBoxes.innerText.includes("Movies")) {
  		let mediaSelection = mediaBoxes.innerText.includes("TV Shows") ? "shows" : "movies"
		currentMediaTargetClick = mediaSelection
		startInterval = clearInterval(startInterval);
		intervalRef = setInterval(getContentData, 200);
		for (childrenMedia of mediaBoxes.children) {
			childrenMedia.addEventListener("click", (thisObj) => {
				// console.log(thisObj)
				currentMediaTargetClick = thisObj.target.parentElement.id
			});
		}
	} else {
		console.log("Media boxes not found");

	}
}, 100);

function getContentData() {
	// console.log("Getting content data");
	const resources = performance
	.getEntriesByType("resource")
	.filter((resource) => resource.initiatorType === "xmlhttprequest")
	.filter((resource) => resource.name.includes("/web/search_by_type/"));

	if(!identifiedMedia) {
		let unsafeMediaBoxes = window.document.getElementById("homeContainer").children[0].children[0].children[1];
		let countMedia = 0
		for (childrenMedia of unsafeMediaBoxes.children) {
			childrenMedia.id = mediaArray[countMedia++]
			// console.log(childrenMedia)
		}

		if(unsafeMediaBoxes.children[unsafeMediaBoxes.children.length - 1].id == "channels") {
			identifiedMedia = true;
			console.log("Media identified")
		}
	}

	if(prevResourceSize < resources.length)
	{
		console.log("Media target:" + currentMediaTargetClick);
		changed = true;
		prevResourceSize = resources.length;
		for (let i = currentResourceIndex; i < resources.length; i++) {
			const resource = resources[i];
			let authToken = JSON.parse(window.localStorage["persist:auth"]).jwt_token.replaceAll('"', "");
			// console.log(resource);
			currRequest = fetch(resource.name, {
				headers: {
					Authorization: `Bearer ${authToken}`,
					Accept: "application/json",
				},
			})
				.then((response) => {
					return response.json();
				})
				.then((content) => {
					let contentDataArray = content.results;
					if (resource.name.includes("/web/search_by_type/shows")) {
						resourceShows.push(...contentDataArray);
						currentResourceIndex++;
					} else if (resource.name.includes("/web/search_by_type/movies")) {
						resourceMovies.push(...contentDataArray);
						currentResourceIndex++;
					}
					gotValidResponse = true;
					console.log("Fetched new content res")
					console.log(content)
				})
				.catch((error) => console.error(`Error fetching XHR content: ${error}`));
		}
	}

	if (!gotValidResponse) {
		console.log("No Response");
		return;
	}

	let adminDashboardLink = "";
	let targetResource = null;
	if (currentMediaTargetClick == "movies") {
		targetResource = resourceMovies;
	} else if (currentMediaTargetClick == "shows") {
		targetResource = resourceShows;
	} else {
		return;
	}

	let contentTarget = unsafeWindow
		? unsafeWindow.document.getElementById("homeContainer")
		: window.document.getElementById("homeContainer");
	let contentPanel = contentTarget.children[0].children[0].children[2].children;
	for (let i = 0; i < contentPanel.length; i++) {
		if (!targetResource[i]) {
			continue;
		}
		let contentItem = contentPanel[i];
		let content = contentItem.getElementsByClassName("content-banner-container")[0];
		let textContainer = content.nextElementSibling.children[0];
		let adminLinkBlock = document.createElement("p");
		adminLinkBlock.id = "admin_link";
		let isVod = targetResource[i].type.includes("vod") ? "vod" : "";
		adminDashboardLink = `https://stvstaging.freecast.com/admin/guide/${isVod}${currentMediaTargetClick == "movies" ? "movie" : "show"}/${
			targetResource[i].id
		}`;
		// console.log(`Admin Dashboard Link: ${adminDashboardLink}`);

		adminLinkBlock.style.backgroundColor = "#252525";
		adminLinkBlock.style.color = "white";
		adminLinkBlock.style.padding = "10px";
		adminLinkBlock.style.borderRadius = "5px";
		adminLinkBlock.style.borderColor = "white";
		adminLinkBlock.style.borderStyle = "solid";
		adminLinkBlock.style.borderWidth = "1px";
		adminLinkBlock.innerHTML = `Admin Dashboard Link: <a target="_blank" href="${adminDashboardLink}">${adminDashboardLink}</a>`;
		if (!textContainer.querySelector("#admin_link")) {
			textContainer.prepend(adminLinkBlock);
		}
	}
}

// setTimeout(
// 	(function() {
// 		console.log("Updating XMLhttprequest")
// 		const windowScope =  unsafeWindow ? unsafeWindow :window;
// 		const origOpen = windowScope.XMLHttpRequest.prototype.open;
// 		const origSend = windowScope.XMLHttpRequest.prototype.send;
// 		windowScope.XMLHttpRequest.prototype.open = function(method, url, ...args) {
// 			this._requestUrl = url;
// 			origOpen.apply(this, [method, url, ...args]);
// 		};
// 		windowScope.XMLHttpRequest.prototype.send = function(...args) {
// 			this.addEventListener('load', function() {
// 				console.log('XHR Request:', this._requestUrl, 'Response:', this.responseText);
// 			});
// 			origSend.apply(this, args);
// 		};
// 	}),
// 	1000
// )
