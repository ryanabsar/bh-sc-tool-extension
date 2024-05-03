// Flag variable to track whether the alert has been shown
var alertShown = false;

// Function to overwrite asset class
function overwriteAssetClass(aClass) {
    // Specify the value you want to select
    var valueToSelectAssetClass = aClass;

    // Get all select elements in the table column for asset_class_id
    var selectElementsAssetClass = document.querySelectorAll("td[data-col-key='asset_class_id'] > select");

    if (!selectElementsAssetClass || selectElementsAssetClass.length === 0) {
        // Alert the user if selectElementsAssetClass is null or empty and the alert hasn't been shown yet
        if (!alertShown) {
            alert("You're not on the right page. Please go to Edit Scenario.");
            alertShown = true; // Set the flag to true to indicate that the alert has been shown
        }
        return; // Exit the function
    }

    // Loop through all select elements for asset_class_id
    for (let i = 0; i < selectElementsAssetClass.length; i++) {
        // Get all option elements for the select element
        var optionElementsAssetClass = selectElementsAssetClass[i].querySelectorAll("option");

        // Loop through all option elements
        for (let j = 0; j < optionElementsAssetClass.length; j++) {
            // Check if the option value is the one you want to select
            if (optionElementsAssetClass[j].innerText === valueToSelectAssetClass) {
                // Set the value
                selectElementsAssetClass[i].value = optionElementsAssetClass[j].value;

                // Create a new 'change' event
                var eventAssetClass = new Event('change');

                // Dispatch the 'change' event
                selectElementsAssetClass[i].dispatchEvent(eventAssetClass);

                // Break the loop as the value has been found and selected
                break;
            }
        }
    }
}

// Function to overwrite asset type with delay after all POST requests
function overwriteAssetType(aClass, aType) {
    // Specify the value you want to select
    var valueToSelectAssetType = aType;

    // Get all select elements in the table column for asset_Type_id
    var selectElementsAssetType = document.querySelectorAll("td[data-col-key='asset_type_id'] > span > select");

    if (!selectElementsAssetType || selectElementsAssetType.length === 0) {
        // Alert the user if selectElementsAssetType is null or empty and the alert hasn't been shown yet
        if (!alertShown) {
            alert("You're not on the right page. Please go to Edit Scenario.");
            alertShown = true; // Set the flag to true to indicate that the alert has been shown
        }
        return; // Exit the function
    }

    var scenarioNameElement = document.querySelector('th[data-col-key="scenario"] .n-data-table-th__title');
    var scenarioName = scenarioNameElement ? scenarioNameElement.innerText.trim() : "Unknown";
    console.log("Scenario Name:", scenarioName);

    // Loop through all select elements for asset_Type_id
    for (let i = 0; i < selectElementsAssetType.length; i++) {
        // Get all option elements for the select element
        var optionElementsAssetType = selectElementsAssetType[i].querySelectorAll("option");

        // Loop through all option elements
        for (let j = 0; j < optionElementsAssetType.length; j++) {
            // Check if the option value is the one you want to select
            if (optionElementsAssetType[j].innerText === valueToSelectAssetType) {
                // Set the value
                selectElementsAssetType[i].value = optionElementsAssetType[j].value;

                // Create a new 'change' event
                var eventAssetType = new Event('change');

                // Dispatch the 'change' event
                selectElementsAssetType[i].dispatchEvent(eventAssetType);

                // Break the loop as the value has been found and selected
                break;
            }
        }
    }
    alert("Asset Class changed to [" + aClass + "] and Asset type changed to [" + aType + "] for scenario [" + scenarioName + "]");
}

// Use chrome.storage.local.get to retrieve values and trigger functions accordingly
chrome.storage.local.get(["asclass", "astype"], function(items) {
    overwriteAssetClass(items.asclass);
    // Add a delay of 2000ms before running overwriteAssetType
    setTimeout(function() {
        overwriteAssetType(items.asclass, items.astype);
    }, 2000);
    chrome.storage.local.remove("asclass");
    chrome.storage.local.remove("astype");
});
