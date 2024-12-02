// ==UserScript==
// @name		Staging Admin Shows Delete Select Specific Source
// @include		https://env.company.com/admin/guide/seasonepisode/*
// @version  1
// @grant    none
// ==/UserScript==



window.addEventListener('load', function() {
    var source = "tubi";
  var rows = document.querySelectorAll('tr:has(.field-source select[name*="SeasonEpisode_links-"])');
  rows.forEach(row => {
    var selectElement = row.querySelector('.field-source select');
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var sourceName = selectedOption.innerText.trim().toLowerCase(); // Convert to lowercase for case-insensitive comparison

    if (sourceName.includes(source)) {
      var checkbox = row.querySelector('.delete input[type="checkbox"]');
      if (checkbox) {
        // Do something with the checkbox, e.g.,
        console.log(checkbox);
        checkbox.checked = true; // Check the checkbox
      }
    }
  });
}, false);
