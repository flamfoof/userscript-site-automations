// ==UserScript==
// @name         Jira Field Update Automation
// @version      0.1
// @description  Automates field updates on Jira
// @author       Flamfoof
// @match        https://company.atlassian.net/browse/<PROJECTID>*
// @grant        none
// ==/UserScript==

(function () {
	"use strict";

	console.log("Monkey: Starting ");

	var cookies = {};
	var jiraProps = {};

	function getCookies() {
		var pageCookies = document.cookie.split(";");
		console.log("Monkey: Cookies grabbing");
		console.log("Monkey: pageCookies", pageCookies);
		for (var i = 0; i < pageCookies.length; i++) {
			var cookie = pageCookies[i].split("=");
			cookies[cookie[0].trim()] = cookie[1];
		}
	}

	async function getJiraProps() {
		console.log("Monkey: Getting Jira Props");
		//if window.jira is undefined, then loop wait
		while (unsafeWindow.JIRA == undefined) {
			console.log("Monkey: window.JIRA is undefined, waiting...");
			console.log(unsafeWindow.JIRA);
			await sleep(2000);
		}

		let propFields =
			unsafeWindow.JIRA.Issue.getStalker().context.activeElement[
				Object.keys(unsafeWindow.JIRA.Issue.getStalker().context.activeElement)[1]
			].children._owner.stateNode.props.issueViewRelayFragment;
		console.log("Monkey: outputting propsFields");
		console.log("Monkey: propFields", propFields);
		jiraProps.issueId = propFields.issueId;
		console.log("Monkey: issueId", jiraProps);
	}

	async function waitForElement(selector) {
		return new Promise((resolve) => {
			if (document.querySelector(selector)) {
				return resolve(document.querySelector(selector));
			}

			const observer = new MutationObserver((mutations) => {
				if (document.querySelector(selector)) {
					observer.disconnect();
					resolve(document.querySelector(selector));
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});
		});
	}

	async function updateField(fieldSelector, defaultValue, settingValue, action) {
		// Wait for the field to be present
		const field = await waitForElement(fieldSelector);

		// Get the second child element
		const secondChild = field.children[1];
		console.log("Monkey: secondChild", secondChild);
		if (secondChild && secondChild.innerText === defaultValue) {
            console.log("Monkey: Fields are default, updating");
			if (action == "ajax") {
				let response = await fetch(
					"https://company.atlassian.net/secure/AjaxIssueAction.jspa?decorator=none",
					{
						credentials: "include",
						headers: {
							"User-Agent":
								"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0",
							Accept: "*/*",
							"Accept-Language": "en-US,en;q=0.5",
							"Content-Type": "application/x-www-form-urlencoded",
							"X-Atlassian-Capability": "ISSUE_VIEW--other",
							"Sec-Fetch-Dest": "empty",
							"Sec-Fetch-Mode": "cors",
							"Sec-Fetch-Site": "same-origin",
							Priority: "u=0",
						},
						referrer: "https://company.atlassian.net/browse/STVI-6044",
						body: `atl_token=${cookies["atlassian.xsrf.token"]}&fieldsToForcePresent=timetracking&issueId=${jiraProps.issueId}&singleFieldEdit=true&skipScreenCheck=true&timetracking_originalestimate=${settingValue}`,
						method: "POST",
						mode: "cors",
					}
				);
                console.log("Monkey: response", response);
				const data = await response.json();
				console.log("Monkey: data", data);
				if (data) {
					console.log("Monkey: data", data);
				}
			} else if (action == "custom") {

            }
		}
	}

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	// Main execution function
	async function main() {
		console.log("Monkey: GETTING COOKIES");
		getCookies();
		console.log("Monkey: Done Cookies");

		await getJiraProps();
		console.log("Monkey: Timer done, starting");
		// Process first field
		await updateField(
			'[data-testid="issue.views.issue-base.context.number.customfield_10053"]',
			"0m",
			"30m",
			"ajax"
		);

		// Process second field
		await updateField(
			'[data-testid="issue-view.issue-base.context.original-estimate.timeoriginalestimate',
			"None",
			30,
			"custom"
		);
		console.log("Monkey: Completed auto ");
	}

	// Start execution when page is loaded
	if (document.readyState === "complete") {
		main();
	} else {
		window.addEventListener("load", main);
	}
})();
