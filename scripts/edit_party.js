/*var referer = getUrlParam('party','Empty');

document.getElementById('party').innerHTML = referer;*/

//var referer = getUrlParam('referer','Empty');

// Get the registration success modal
var party_suc = document.getElementById('party_edit_success');

var span2 = document.getElementsByClassName("close")[1];

if (getUrlParam('edit_party','Empty')) {
    party_suc.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
    party_suc.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    party_suc.style.display = "none";
  }
};
