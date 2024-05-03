var assetTypes = {
  "Commercial Offices": ["Grade-A Offices"],
  "Community Facilities": ["Clinic", "Facility Management & Civil Defence", "Mosque", "Neighbourhood Centre", "Open space/ Park", "Other assets", "Recreational Services", "Sales/ Visitors/ Experience Center", "Sport Fields", "Squares"],
  "Cultural": ["Academies/ Special Training Schools", "Art work", "Museum/ Library", "Others Cultural", "Period Village", "University"],
  "Education": ["Kindergarten", "Private School"],
  "Hospitality ": ["Luxury", "Midscale", "Serviced apartments", "Ultra Luxury", "Upper Luxury", "Upscale"],
  "Land": ["Land Sale"],
  "Leisure": ["Event Space", "Formula E Leisure", "Sports Club"],
  "Mixed Use": ["Car Park Mixed Use", "Kindergarten Mixed Use", "Offices Mixed Use", "Residential Mixed Use", "Retail Mixed Use"],
  "Parking": ["Car Park"],
  "Residential": ["Apartments", "Branded Residential", "Townhouses", "Villas"],
  "Retail": ["Retail"]
};

function changeAssetType() {
  var assetClassSelect = document.getElementById("assetClass");
  var assetTypeSelect = document.getElementById("assetType");
  var selectedClass = assetClassSelect.options[assetClassSelect.selectedIndex].value;

  // Clear out the asset types
  while (assetTypeSelect.options.length > 0) {                
    assetTypeSelect.remove(0);
  } 

  // Add the asset types for the selected class
  var classTypes = assetTypes[selectedClass];
  if (classTypes) {
    classTypes.forEach(function(assetType) {
      var newOption = document.createElement("option");
      newOption.value = assetType;
      newOption.text = assetType;
      assetTypeSelect.add(newOption);
    });
  }
}

// Call changeAssetType on page load to populate the asset type dropdown
window.onload = changeAssetType;

document.addEventListener("DOMContentLoaded", function() {
  var assetClassSelect = document.getElementById("assetClass");
  assetClassSelect.addEventListener("change", changeAssetType);
});

function injectScript(asclass, astype) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.storage.local.set({
      asclass: asclass,
      astype: astype,
    }, () => {
      chrome.scripting.executeScript({ 
        target: { 
          tabId: tabs[0].id,
        }, 
        files: [ "content_script.js" ] 
      });
    });
  });
};

document.addEventListener("DOMContentLoaded", function() {
  var btnRun = document.getElementById("btn-run");
  
  if (btnRun) {
      btnRun.addEventListener("click", function(e) {
          e.preventDefault();
          let aclass = document.forms["assetForm"]["assetClass"].value;
          let atype = document.forms["assetForm"]["assetType"].value;
          
          // Fetch scenario name after a brief delay to ensure it's loaded
          setTimeout(function() {
              injectScript(aclass, atype);
          }, 1000); // Adjust delay as needed
      });
  }
});







