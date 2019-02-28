
if (getUrlParam('signin')) {
    showAlert('success', makeAlertMessage('Success!', "You're now logged in."));
}

else if (getUrlParam('reset')) { // needs fixig
  //showAlert('success', makeAlertMessage('Success!', "Password reset successful, directing to <a href='signin.html'>login</a> page"));
  showAlert('success', makeAlertMessage('Success!', "Password reset successful"));
  //redirect("signin.html");
  //setTimeout(redirect("signin.html"), 5000);
}

else if (getUrlParam('add_party')) {
  showAlert('success', makeAlertMessage('Success!', "Political party has been added"));
}

else if (getUrlParam('add_office')) {
  showAlert('success', makeAlertMessage('Success!', "Political party has been added"));
}

