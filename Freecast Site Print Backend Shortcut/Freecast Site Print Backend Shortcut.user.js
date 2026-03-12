// ==UserScript==
// @name		Freecast Site Print Backend Shortcut
// @include		*://watch.freecast.com/guide/*/info/*
// @include		*://watch.freecast.com/guide/vod/*/*
// @exclude		*://watch.freecast.com/guide/network/info/*
// @version  1
// @grant    none
// ==/UserScript==
let intervalRef = null;
let currRequest = null;
console.log("Script started");
setTimeout(function () {
	intervalRef = setInterval(getContentData, 1000);
}, 1000);

function getContentData() {
	let isVod = false;
	console.log("Getting content data");
	const resources = performance
		.getEntriesByType("resource")
		.filter((resource) => resource.initiatorType === "xmlhttprequest")
		.filter((resource) => !resource.name.includes("/links/"));

	for (let resource of resources) {
		if (
			resource.name.includes("guide/api/v1/watch-freecast-com/web/") ||
			resource.name.includes("guide/api/v2/watch-freecast-com/web/") ||
			resource.name.includes("guide/api/v4/watch-freecast-com/web/vod/")
		) {
			let authToken = JSON.parse(window.localStorage["persist:auth"]).jwt_token.replaceAll('"', "");
			console.log(resource);
			if (!currRequest) {
				currRequest = fetch(resource.name.replace("api/v2/", "api/v2/"), {
					headers: {
						Authorization: `Bearer ${authToken}`,
						Accept: "application/json",
					},
				})
					.then((response) => {
						return response.json();
					})
					.then((content) => {
          	console.log("Getting content")
						console.log(content);
						let urlName = resource.name.split("/");
						let mediaType = urlName[urlName.length - 3];
						let adminDashboardLink = "";
						let contentDescription = document.getElementById("homeContainer")
						console.log(contentDescription);
						var overviewTagDesc = contentDescription.getElementsByTagName("button")[0].parentElement.previousElementSibling;
						if(!overviewTagDesc) {
							overviewTagDesc = contentDescription.getElementsByTagName("button")[0].parentElement.parentElement.previousElementSibling;
						}
						// mediaType == "movies"
						// 	? contentDescription.children[1].children[0].children[0].children[0].children[2]
						// 	: contentDescription.children[1].children[0].children[1].children[1];
						isVod = urlName[urlName.length - 4] == "vod";
						console.log(isVod);
						console.log(`XHR URL: ${resource.name}`);
						if (!isVod) {
							adminDashboardLink = `https://stvstaging.freecast.com/admin/guide/${mediaType == "movies" ? "movie" : "show"}/${
								content.id
							}`;
							console.log(`Admin Dashboard Link: ${adminDashboardLink}`);
						} else {
							adminDashboardLink = `https://stvstaging.freecast.com/admin/guide/${
								mediaType == "movies" ? "vodmovie" : "vodshow"
							}/${content.id}`;
							console.log(`Admin Dashboard Link: ${adminDashboardLink}`);
						}

						let adminLinkBlock = document.createElement("p");
						adminLinkBlock.style.backgroundColor = "#252525";
						adminLinkBlock.style.color = "white";
						adminLinkBlock.style.padding = "10px";
						adminLinkBlock.style.borderRadius = "5px";
						adminLinkBlock.style.borderColor = "white";
						adminLinkBlock.style.borderStyle = "solid";
						adminLinkBlock.style.borderWidth = "1px";
						adminLinkBlock.style.position = "absolute";
						adminLinkBlock.innerHTML = `Admin Dashboard Link: <a target="_blank" href="${adminDashboardLink}">${adminDashboardLink}</a>`;
						overviewTagDesc.appendChild(adminLinkBlock);
            //to auto-launch
//           	window.location=adminDashboardLink
						success = true;
						clearInterval(intervalRef);
					})
					.catch((error) => console.error(`Error fetching XHR content: ${error}`));
				break;
			}
		}
	}
}
