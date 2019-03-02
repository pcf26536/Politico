hideById('offices-ctrls');

function showAddForm() {
    showById('add_office_form', block);
    hideById('add_office');
    hideById('officeList');
}

document.getElementById('cancel_add_office').onclick = function () {
    hideById('add_office_form');
    showById('add_office', inline);
    showById('officeList', block);
};

function showDelete() {
    showById('delete', block);
    hideById('add_office');
}

function addOffice() {
    fetch(
    OFFICES,
    {
    body: JSON.stringify({
      name: getById('name').value,
      type: getById('type').value
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
        showAlert('success', makeAlertMessage(data.data[0].name, 'added successfully!'));
        redirect('offices.html', 10000);
      }
      else {
        showAlert('danger', makeAlertMessage('', data.error));
      }})
  .catch(function(err) {
    connectionError(err);
  });

}