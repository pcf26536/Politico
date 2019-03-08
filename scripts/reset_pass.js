let url_token = getUrlParam('token');
let local_token = getLSItem('token');

if (url_token) {
  showById('password_form', block);
  hideById(['success_msg_div', 'email_form']);
  getById('msg').innerHTML = 'Hi ' + getLSItem('email') + ', Input Your New Password'
}

function resetRequest() {
  showLoading('templates');

  fetch(
    RESET,
    {
    body: JSON.stringify({
        email: getById('email').value,
    }), mode: 'cors', method: 'post',
        headers: {
        'Content-Type': 'application/json'
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
  showLoading('templates');

  let len1 = getById('pass1').value.length > 6;
  let len2 = getById('pass2').value.length > 6;

  if (getById('pass1').value !== getById('pass2').value) {
    showAlert('danger', makeAlertMessage('Error', 'Password Mismatch!'));
    return;
  }
  if (len1 && len2) {

    fetch(
      RESET + LINK + local_token,
      {
        body: JSON.stringify({
          password1: getById('pass1').value,
          password2: getById('pass2').value
        }), mode: 'cors', method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + local_token
        }
      })
    .then(res => res.json())
    .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data[0]);
        showAlert('success', makeAlertMessage('Success', 'Password has been reset!'));
        hideById(['email_form', 'password_form']);
        let message = '<p class="dash h_center">' + data.data[0].message + '<a' +
          ' href="signin.html">here</a></p>';
        getById('success_msg_div').innerHTML = message;
        showById('success_msg_div', block);

      } else if(data.status === 401) {
        showAlert('warning', makeAlertMessage('', 'Your token has expired, try resetting again!'));
      }
      else {
        showAlert('danger', makeAlertMessage('', data.error));
      }
    })
    .catch(function (err) {
      connectionError(err);
    });

  } else {
      showAlert('danger', makeAlertMessage('Error', 'Password too short!'));
  }

}