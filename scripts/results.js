function createPetition() {
  showLoading('admin');

  fetch(
    PETITION,
    {
    body: JSON.stringify({
        office: getById('petition-offices').value,
        body: getById('body').value,
        evidence: getById('evidence').value
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
        showAlert('success', makeAlertMessage('', 'Petition created successfully!'));
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


function listHide() {
    if(getById('officeList').className=='office-list responsive') myFunction('results');
}

hideById('btn-ctrls');

if (!userIsAdmin()) {
    getById('create-petition').onclick = function () {
        showById('petition-div', block);
        hideById('all-results');
        listHide();
    };
}

function showAllResults() {
    showById('all-results', block);
    showByClass('result-item', block); 
    if (!userIsAdmin()) hideById('petition-div');
    listHide();
}

if (!userIsAdmin()) {
    getById('cancel-petition').onclick = function () {
        hideById('petition-div');
        showAllResults();
    };
}
getById('show-all').onclick = showAllResults;

getByClass("closebtn")[0].onclick = function(){
    // Get the parent of <span class="closebtn"> (<div class="alert">)
    var div = this.parentElement;

    // Set the opacity of div to 0 (transparent)
    div.style.opacity = "0";
};