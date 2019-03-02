hideById('offices-ctrls');

function showAddForm() {
    document.getElementById('add_office_form').style.display = "block";
    document.getElementById('add_office').style.display = "none";
    document.getElementById('officeList').style.display = "none";
}

document.getElementById('cancel_add_office').onclick = function () {
    document.getElementById('add_office_form').style.display = "none";
    showById('add_office', inline);
    document.getElementById('officeList').style.display = "block";
};

function showDelete() {
    document.getElementById('delete').style.display = "block";
    document.getElementById('add_office').style.display = "none";
}
