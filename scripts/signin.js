var referer = getUrlParam('referer','Empty');

// Get the registration success modal
var reg_suc = document.getElementById('signup_succ');

var span2 = document.getElementsByClassName("close")[1];

if (referer == 'signup') {
    reg_suc.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
    reg_suc.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    reg_suc.style.display = "none";
  }
};
