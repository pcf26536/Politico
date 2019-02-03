function showAddForm() {
    document.getElementById('add_office_form').style.display = "block";
    document.getElementById('add_office').style.display = "none";
    document.getElementById('offices_list').style.display = "none";
}

document.getElementById('cancel_add_office').onclick = function () {
    document.getElementById('add_office_form').style.display = "none";
    document.getElementById('add_office').style.display = "block";
    document.getElementById('offices_list').style.display = "block";
};

function showDelete() {
    document.getElementById('delete').style.display = "block";
    document.getElementById('add_office').style.display = "none";
}
