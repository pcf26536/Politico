var referer = getUrlParam('referer','Empty');
//var referer2 = getUrlVars()["referer"];*/


// Get the modal
var modal = document.getElementById('myModal');


// Get the registration success modal
var reg_suc = document.getElementById('signup_succ');

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];

//after sign in show the modal
if (referer == 'signin' || referer == 'reset') {
    modal.style.display = "block";
}
if (referer == 'signup') {
    reg_suc.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modal.style.display = "none";
}

span2.onclick = function() {
    reg_suc.style.display = "none";
  }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    reg_suc.style.display = "none";
  }
} 