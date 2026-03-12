// ==UserScript==
// @name		Admin Web Source Set Platforms
// @include		https://stvstaging.freecast.com/admin/guide/websource/*/change/*
// @include		https://admin-stg.freecast.com/admin/guide/websource/*/change/*
// @include		https://stvqa.freecast.com/admin/guide/websource/*/change/*
// @include		https://admin-qa.freecast.com/admin/guide/websource/*/change/*
// @version  1
// @grant    none
// ==/UserScript==

function main() {
  //basically just run this manually
  let tableRows = document.getElementsByClassName("sticky")[0].nextElementSibling.children
  let deviceIndex = [34, 24, 29, 28, 19, 39, 36]
  let actionIndex = ["replace", "split", "splice", "regex", "complex_regex", "url_param"]
  let actionIndexTarget = 1
  let offset = 0
//   let formula = {
//     "replace":"https",
//     "match_instance":0
//   }
  let formula = {
    "split_delimiter":"/",
    "at":-1
  }
  // Android, iOS, AndroidTV, FireTV, tvOS, LG, Samsung
  // Web = 14
  for(let i = offset; i < tableRows.length - 2; i++) {
    let currRow = tableRows[i].getElementsByTagName("select")
    let tablesText = tableRows[i].getElementsByTagName("textarea")
    currRow[0].value = 14
    currRow[1].value = deviceIndex[i-offset]
    currRow[2].value = actionIndex[1]
    tablesText[0].value = JSON.stringify(formula)
    tablesText[1].value = "${sub_string}"
  }
}
main()
