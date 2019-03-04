function checkRegistered() {
  // check for registered candidates and remove them from registration list
  fetch(
    CANDIDATES,
    {
      mode: 'cors', method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + fetchToken()}})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data);
        let candidates = data.data.length;

        if (candidates > 0) {
          let users_select = getById('candidate-name');

          for (let d = 0; d < candidates; d++) {
              let id = data.data[d].id;
              let users = getByName('candidate');

              for (let i = 0; i < users.length; i++) {
                if (users[i].value == id) {
                  users_select.removeChild(users[i]);
                  break; // internal loop

                }
              }
          }
        }
      }
      else {
        showAlert('danger', 'data fetch might be Incomplete');
      }})
  .catch(function(err) {
    connectionError(err);
  });
}

function addCandidate() {
  showLoading('admin');

  fetch(
    OFFICE + getById('office-name').value + REGISTER,
    {
    body: JSON.stringify({
      candidate: getById('candidate-name').value,
      party: getById('party-name').value
    }), mode: 'cors', method: 'post',
        headers: {
        'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + fetchToken()
    }})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 201) {
        console.log(data.data[0]);
        showAlert('success', makeAlertMessage('', 'Candidate registered successfully!'));
        redirect('candidates.html', 10000);
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

function showAddForm() {
    showById('add_candidate_form', block);
    hideById(['add_candidate', 'candidates_list', 'delete_candidate']);
}

function cancelAdd() {
    hideById('add_candidate_form');
    showById(['add_candidate', 'delete_candidate'], inline);
    showById( 'candidates_list', block);
}

getById('cancel_add_candidate').onclick = cancelAdd;