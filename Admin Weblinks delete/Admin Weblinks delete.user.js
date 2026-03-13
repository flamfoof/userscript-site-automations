// ==UserScript==
// @name		Admin Weblinks delete
// @include		https://stvstaging.freecast.com/admin/guide/weblink/?*
// @version  1
// @grant    none
// @grant    unsafeWindow
// ==/UserScript==
console.log("hi");
let siteStatus = document.body.textContent.includes("502 Bad Gateway");
if (siteStatus) {
	setTimeout(function () {
		window.location.reload();
	}, 3000);
}

window.addEventListener(
	"load",
	async function () {
		//     x.children[1].children
		var resListArray = document.getElementById("result_list");
		let doIt = false;
		doIt = true;
		let resList = resListArray.children[1].children;
		let idList = [];
		for (let i = 0; i < resList.length; i++) {
			idList.push(resList[i].children[1].textContent);
		}
		console.log(idList);
		console.log("started");
        let fetchUrl = "https://stvstaging.freecast.com/admin/guide/weblink/?o=17&source__id__exact=764&updated_at__lte=2025-11-30#"
		let docCookieSessionToken = `sessionId=73vsuh52bemtif98hyvqjo2mjeawinfz;`;

		let formInitialFetcher = null;
		let formGetFetcher = null;
		let formSendFetcher = null;

		console.log("fetched");
		if (idList.length > 0 && doIt) {
			const parser = new DOMParser();
			let newSessionId = null;
			let formInitCookie = `${docCookieSessionToken}${document.cookie}`;
			console.log(formInitCookie);
// 			formInitialFetcher = await fetch(
// 				fetchUrl,
// 				{
// 					headers: {
// 						"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0",
// 						Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
// 						"Accept-Language": "en-US,en;q=0.5",
// 						"Upgrade-Insecure-Requests": "1",
// 						"Sec-Fetch-Dest": "document",
// 						"Sec-Fetch-Mode": "navigate",
// 						"Sec-Fetch-Site": "none",
// 						"Sec-Fetch-User": "?1",
// 						Priority: "u=0, i",
// 						cookie: formInitCookie,
// 					},
// 					referrer: window.location.href, // Top-level property
// 					referrerPolicy: "no-referrer-when-downgrade", // Top-level property
// 					method: "GET",
// 					mode: "cors",
// 				},
// 			).then((response) => {
// 				return response.text();
// 			});
			console.log("init fetching");
// 			let initialBody = formInitialFetcher;
// 			const initDoc = parser.parseFromString(initialBody, "text/html");
// 			console.log(initDoc);
			let csrfFormToken = document.getElementById("changelist-form").children[0].value;
			let initFormRequestStart = "csrfmiddlewaretoken=" + csrfFormToken + "&action=delete_selected&select_across=0&index=0";
// 			let initFormRequestMiddle = "";
// 			idList.forEach((id) => {
// 				initFormRequestMiddle += `&_selected_action=${id}`;
// 			});
// 			let bodyInitFormRequest = initFormRequestStart + initFormRequestMiddle;
// 			console.log(bodyInitFormRequest);
// 			let formGetFetcherCookie = `${docCookieSessionToken}${this.document.cookie}`;
// 			console.log(formGetFetcherCookie);

			// formGetFetcher = await fetch(
			// 	fetchUrl,
			// 	{
			// 		headers: {
			// 			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0",
			// 			Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			// 			"Accept-Language": "en-US,en;q=0.5",
			// 			"Content-Type": "application/x-www-form-urlencoded",
			// 			"Upgrade-Insecure-Requests": "1",
			// 			"Sec-Fetch-Dest": "document",
			// 			"Sec-Fetch-Mode": "navigate",
			// 			"Sec-Fetch-User": "?1",
			// 			Priority: "u=0, i",
			// 			cookie: formGetFetcherCookie,
			// 		},
			// 		body: bodyInitFormRequest,
			// 		method: "POST",
			// 		mode: "cors",
			// 		referrer: window.location.href, // Top-level property
			// 		referrerPolicy: "no-referrer-when-downgrade", // Top-level property
			// 	},
			// );
			console.log("formget fetching");
			// let getFetcherBody = await formGetFetcher.text();
			// const getFetcherDoc = parser.parseFromString(initialBody, "text/html");
			// console.log(getFetcherDoc);
			let getFetcherCsrf = csrfFormToken

			let formSendRequestStart = "csrfmiddlewaretoken=" + csrfFormToken;
			let formSendRequestMiddle = "";
			idList.forEach((id) => {
				formSendRequestMiddle += `&_selected_action=${id}`;
			});
			let formSendRequestEnd = "&action=delete_selected&post=yes";
			let bodyFormSendRequest = formSendRequestStart + formSendRequestMiddle + formSendRequestEnd;
			console.log(bodyFormSendRequest);
			let formSendFetcherCookie = formInitCookie;
			console.log(formSendFetcherCookie);

			formSendFetcher = await fetch(
				fetchUrl,
				{
					headers: {
						"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0",
						Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
						"Accept-Language": "en-US,en;q=0.5",
						"Content-Type": "application/x-www-form-urlencoded",
						"Upgrade-Insecure-Requests": "1",
						"Sec-Fetch-Dest": "document",
						"Sec-Fetch-Mode": "navigate",
						"Sec-Fetch-User": "?1",
						Priority: "u=0, i",
						cookie: formSendFetcherCookie,
					},
					body: bodyFormSendRequest,
					method: "POST",
					mode: "cors",
					referrer: window.location.href, // Top-level property
					referrerPolicy: "no-referrer-when-downgrade", // Top-level property
				},
			);
			console.log("final fetching");
			console.log(formSendFetcher);
			setTimeout(function () {
				window.location.reload();
			}, 5000);
		}
	},
	false,
);
