function resetRequest() {
  showLoading('templates');

  fetch(
    RESET,
    {
    body: JSON.stringify({
        email: getById('email').value,
    }), mode: 'cors', method: 'post',
        headers: {
        'Content-Type': 'application/json',
    }})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data[0]);
        setLSItem('email', data.data[0].email);
        setLSItem('token', data.data[0].token);
        showAlert('success', makeAlertMessage('Success', 'Reset link sent!'));
        hideById(['email_form', 'password_form']);
        let message = '<p class="dash h_center">Hey <a href="mailto:' + data.data[0].email + '" target="_top">' + data.data[0].email + '</a>, ' +
        data.data[0].message + '</p>';
        getById('success_msg_div').innerHTML = message;
        showById('success_msg_div', block);
      }
      else {
        showAlert('danger', makeAlertMessage('', data.error));
      }})
  .catch(function(err) {
    connectionError(err);
  });
}


function resetPassword() {

}