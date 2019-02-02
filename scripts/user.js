var referer = getUrlParam('referer','Empty');

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close")[0];

//after sign in show the modal
if (referer == 'signin' || referer == 'reset' || referer == 'add_party' || referer == 'add_office') {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}; 