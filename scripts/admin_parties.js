function showAddForm() {
    showById('add_party_form', block);
    hideById(['add_party', 'party_list', 'delete_party']);
}

function cancelAdd() {
    hideById('add_party_form');
    showById(['add_party', 'delete_party'], inline);
    showById('party_list', block);
}

function cancelDelete() {
    cancelAdd();
    hideById(['cancel_delete', 'delete_selected']);
    hideByClass('action');
    showByClass('edit', inline);
}

getById('cancel_add_party').onclick = cancelAdd;
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
var confirm_delete_modal = getById('confirm_delete');

function closeDeleteListModal() {
    hide(confirm_delete_modal);
}

function deleteParty() {
    var checked = [];
    var count = 0;
    var checks = document.getElementsByName("to_delete");
    for (var i=0; i < checks.length; i++) {
        if(checks[i].checked) {checked.push(checks[i]); count++;}
        //else count--;
    }
    if (count > 0) {
        var list = '<ul>';
        // get the party names from selected checkboxes
        for (var x=0; x < checked.length; x++) {
            list = list + '<li>' + checked[x].parentNode.childNodes[2].innerHTML + '</li>';
        }
        list = list + '<ul>';
        getById('delete_list').innerHTML = list; // add the list of parties to the delete confirm list
        show(confirm_delete_modal, block);
    } else {
        var no_party_modal = getById('no_party_selected');
        var no_party_close = getByClass("close")[2];
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
    show(delete_success_modal, block);
    redirect("admin_parties.html");
    closeDeleteListModal();
};

getById('delete_selected').onclick = deleteParty; 
