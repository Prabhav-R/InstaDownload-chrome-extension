"use strict";

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "www.instagram.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

chrome.webNavigation.onHistoryStateUpdated.addListener(
  function (details) {
    chrome.tabs.executeScript(details.tabId, { file: "contentScript.js" });
  },
  {
    url: [{ urlPrefix: "https://www.instagram.com/" }],
  }
);
