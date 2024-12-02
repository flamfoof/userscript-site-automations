// ==UserScript==
// @name         Jira Field Update Automation
// @version      0.1
// @description  Automates field updates on Jira
// @author       Flamfoof
// @match        https://company.atlassian.net/browse/STVI*
// @grant        none
// ==/UserScript==

var jiraCookies = {};
var jiraProps = {};

(function () {
	"use strict";

	console.log("Monkey: Starting ");

	function getCookies() {
		var pageCookies = document.cookie.split(";");
		console.log("Monkey: Cookies grabbing");
		console.log("Monkey: pageCookies", pageCookies);
		for (var i = 0; i < pageCookies.length; i++) {
			var cookie = pageCookies[i].split("=");
			jiraCookies[cookie[0].trim()] = cookie[1];
		}

		console.log("Monkey: jiraCookies[atlassian.xsrf.token]", jiraCookies["atlassian.xsrf.token"]);
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

	async function updateField(fieldSelector, targetProp, defaultValue, settingValue, action) {
		// Wait for the field to be present
		const field = await waitForElement(fieldSelector);

		// Get the second child element
		const secondChild = field.children[1];
		console.log("Monkey: secondChild", secondChild);
		console.log("Monkey: secondChild.innerText", secondChild.innerText);
		console.log("Monkey: defaultValue", defaultValue);
		console.log("Monkey: settingValue", settingValue);
		console.log("Monkey: action", action);
		if (secondChild && secondChild.innerText === defaultValue) {
			console.log("Monkey: Fields are default, updating");
            console.log("Monkey: jiraCookies", jiraCookies);
            console.log("Monkey: jiraProps", jiraProps);

			if (action == "ajax") {
				let bodyMessage = `atl_token=${jiraCookies["atlassian.xsrf.token"]}&fieldsToForcePresent=timetracking&issueId=${jiraProps.issueId}&singleFieldEdit=true&skipScreenCheck=true&${targetProp}=${settingValue}`;
				console.log("Monkey: body", bodyMessage);
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
						referrer: "https://company.atlassian.net/browse/STVI-6069",
						body: bodyMessage,
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
				console.log("Monkey: Custom Action");
				return;
			}
		} else {
			console.log("Monkey: Fields are not default");
			return;
		}
		return;
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

		// Process first field
		await updateField(
			'[data-testid="issue.views.issue-base.context.number.customfield_10053"]',
			"customfield_10053",
			"None",
			30,
			"custom"
		);

		// Process second field
		await updateField(
			'[data-testid="issue-view.issue-base.context.original-estimate.timeoriginalestimate',
			"timeoriginalestimate",
			"0m",
			"30m",
			"ajax"
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