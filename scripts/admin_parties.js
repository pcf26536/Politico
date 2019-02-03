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
    document.getElementById('delete').style.display = "block";
    document.getElementById('add_party').style.display = "none";
}


function deleteParty() {
    var checked = [];
    var count = 0;
    var checks = document.getElementsByName("to_delete");
    for (var i=0; i < checks.length; i++) {
        if(checks[i].checked) {checked.push(checks[i]); count++;}
        else count--;
    }
    if (count > 0) {

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

getById('delete_selected').onclick = deleteParty;
