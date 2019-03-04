let token = fetchToken();
if (!userIsAdmin()) redirectTo(root_dir + templates_dir + user_url);

function loadAllUsers() {
  fetch(
    USERS,
    {
    mode: 'cors', method: 'get',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + fetchToken()
      }})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data);
        let users = '';
        let user_num = data.data.length;

        if (user_num > 0) {

          for (let x = 0; x < user_num; x++) {
            let user = data.data[x];
            users = users + '<li>' +
              '<strong>Name: </strong>' + user.fname + ' ' + user.lname +
              '&emsp;<strong>Phone: </strong>' + user.phone +
              '</li>';
          }
          toInnerHTML(getById('users'), users);

        } else {
          toInnerHTML(
            getById('users'),
            '<div class="h_center"><img src="' + root_dir + 'images/nothing.png"></div>' +
            '<p class="h_center">No Users Available Currently!</p>');

        }
      }
      else if(invalidToken(data.status)) {
        logToConsole('Token has Expired');
      }
      else {
        showAlert('danger', makeAlertMessage('', data.error));
      }})
  .catch(function(err) {
    connectionError(err);
  });
}

function loadPetitions() {
  fetch(
    PETITION,
    {
    mode: 'cors', method: 'get',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + fetchToken()
      }})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data);
        let petitions = '';
        let petition_num = data.data.length;

        if (petition_num > 0) {

          for (let x = 0; x < petition_num; x++) {
            let petition = data.data[x];
            petitions = petitions + '<li>' +
              '<strong>By: </strong>' + petition.fname + ' ' + petition.lname +
              '&emsp;<strong>Office: </strong>' + petition.office +
              '&emsp;<strong>Evidence: </strong>' + petition.evidence +
              '&emsp;<strong>Body: </strong>' + petition.body +
              '&emsp;<strong>Created: </strong>' + petition.date +
              '</li>';
          }
          toInnerHTML(getById('petitions'), petitions);

        } else {
          toInnerHTML(
            getById('petitions'),
            '<div class="h_center"><img src="' + root_dir + 'images/nothing.png"></div>' +
            '<p class="h_center">No Petitions Available Currently!</p>');

        }
      }
      else if(invalidToken(data.status)) {
        logToConsole('Token has Expired');
      }
      else {
        showAlert('danger', makeAlertMessage('', data.error));
      }})
  .catch(function(err) {
    connectionError(err);
  });
}