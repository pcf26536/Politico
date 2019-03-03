let ids = [];

function addParty() {
    fetch(
    PARTIES,
    {
    body: JSON.stringify({
      name: getById('name').value,
        hqAddress: getById('address').value +'-'+ getById('code').value +', '+ getById('town').value,
      logoUrl: getById('logo').value
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
        //redirect('offices.html');
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

function delPartyHandler(partyId) {
    fetch(
    PARTIES + FWD_SLASH + partyId,
    {
     mode: 'cors', method: 'delete',
        headers: {
        'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + fetchToken()
    }})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data);
        showAlert('success', makeAlertMessage('', data.data[0].message));
        loadParties();
        //redirect('offices.html');
      }
      else if(invalidToken(data.status)) {
        logToConsole('Token has Expired');
      }
      else {
        showAlert('danger', makeAlertMessage('', data.error));
        logToConsole(data);
      }})
  .catch(function(err) {
    connectionError(err);
  });

}

function editPartyHandler() {
    showLoading('admin');
    fetch(
    PARTIES + FWD_SLASH + getById('party').value + NAME,
    {
        body: JSON.stringify({
            name: getById('new-name').value,
        }),
        mode: 'cors', method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + fetchToken()
    }})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data[0]);
        showAlert('success', makeAlertMessage('', 'Party name updated to ' + data.data[0].name));
        loadParties();
        redirect('parties.html');
      }
      else if(invalidToken(data.status)) {
        logToConsole('Token has Expired');
      }
      else {
        showAlert('danger', makeAlertMessage('', data.error));
        logToConsole(data);
      }})
  .catch(function(err) {
    connectionError(err);
  });
}

function editParty(link) {
    showById('edit_party_form', block);
    hideById(['add_party', 'parties_list', 'delete_party', 'add_party_form']);
    getById('party').value = link.id;
    getById('party-name').innerHTML = link.name;
}

function showAddForm() {
    showById('add_party_form', block);
    hideById(['add_party', 'parties_list', 'delete_party']);
}

hideById('parties-ctrls');

function cancelAdd() {
    hideById('add_party_form');
    showById(['add_party', 'delete_party'], inline);
    showById('parties_list', block);
}

function cancelEdit() {
    cancelAdd();
    hideById('edit_party_form');
}

function cancelDelete() {
    cancelAdd();
    hideById(['cancel_delete', 'delete_selected']);
    hideByClass('action');
    showByClass('edit', inline);
}

getById('cancel_add_party').onclick = cancelAdd;
getById('cancel_edit_party').onclick = cancelEdit;
getById('cancel_delete').onclick = cancelDelete;


getById('delete_party').onclick = function () {
    showByClass('action', inline);
    hideByClass('edit');
    showById(['cancel_delete','delete_selected'], inline);
    hideById(['add_party', 'delete_party']);
};

function showDelete() {
    //document.getElementById('delete').style.display = "block";
    //document.getElementById('add_party').style.display = "none";
}

// get the confirm delete modal
let confirm_delete_modal = getById('confirm_delete');

function closeDeleteListModal() {
    hide(confirm_delete_modal);
}

function deleteParty() {
    let checked = [];
    let count = 0;
    let checks = document.getElementsByName("to_delete");
    for (let i=0; i < checks.length; i++) {
        if(checks[i].checked) {checked.push(checks[i]); count++;}
        //else count--;
    }
    if (count > 0) {
        let list = '<ul>';
        // get the party names from selected checkboxes
        for (let x=0; x < checked.length; x++) {
            list = list + '<li>' + checked[x].parentNode.childNodes[1].innerHTML + '</li>';
            ids.push(checked[x].value);
        }
        list = list + '<ul>';
        getById('delete_list').innerHTML = list; // add the list of parties to the delete confirm list
        show(confirm_delete_modal, block);

    } else {
        let no_party_modal = getById('no_party_selected');
        let no_party_close = getByClass("close")[2];
        show(no_party_modal, block);
        // When the user clicks on <span> (x), close the modal
        no_party_close.onclick = function() {
            hide(no_party_modal);
        };
    }
}

//var confirm_delete_close = getByClass("close")[3];
getByClass("close")[3].onclick = closeDeleteListModal;
getById('delete_no').onclick = closeDeleteListModal;

var delete_success_modal = getById('party_delete_success');
var delete_success_close = getByClass("close")[4];

// close the modal
delete_success_close.onclick = function() {
    hide(delete_success_modal);
};

getById('delete_yes').onclick = function() {
    closeDeleteListModal();
    logToConsole(ids);
    for (let e = 0; e < ids.length; e++)
        delPartyHandler(ids[e]);
    //show(delete_success_modal, block);
    //redirect("admin_parties.html");
};

getById('delete_selected').onclick = deleteParty; 
