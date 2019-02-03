function showAddForm() {
    showById('add_party_form', block);
    hideById(['add_party', 'party_list', 'delete_party']);
}

getById('cancel_add_party').onclick = function () {
    hideById('add_party_form');
    showById(['add_party', 'delete_party'], inline);
    showById('party_list', block);
};

getById('delete_party').onclick = function () {
    showByClass();
    hideByClass('edit');
};

function showDelete() {
    document.getElementById('delete').style.display = "block";
    document.getElementById('add_party').style.display = "none";
}
