/*showModal('myModal', 0, 'signin');
showAlert();*/

if (getUrlParam('signin')) {
    showAlert('success', makeAlertMessage('Success!', "You're now logged in."));
}

else if (getUrlParam('reset')) {
  showAlert('success', makeAlertMessage('Success!', "Password reset successful, directing to <a href='signin.html'>login</a> page"));
  //redirect("signin.html");
  setTimeout(
    redirect("signin.html"), 5000);
}

elseif (getUrlParam('add_party')) {
  showAlert('success', makeAlertMessage('Success!', "Political party has been added"));
}

if (getUrlParam('add_office')) {
  showAlert('success', makeAlertMessage('Success!', "Political party has been added"));
}

/*//var referer = getUrlParam('signin','Empty');
//alert(referer);
// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close")[0];

//after sign in show the modal
if (getUrlParam('signin') || getUrlParam('reset') || getUrlParam('add_party') || getUrlParam('add_office')) {
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
}; */

