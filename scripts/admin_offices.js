function showAddForm() {
    document.getElementById('add_office_form').style.display = "block";
    document.getElementById('add_office').style.display = "none";
    document.getElementById('offices_list').style.display = "none";
}

document.getElementById('cancel_add_office').onclick = function () {
    document.getElementById('add_office_form').style.display = "none";
    document.getElementById('add_office').style.display = "block";
    document.getElementById('offices_list').style.display = "block";
}

function showDelete() {
    /*elems = document.getElementsByClassName('hide');
    alert(elems.length);
    for(var i = 0; i < elems.length; i++) {
        elems[i].style.display = "inline";
    }*/
    document.getElementById('delete').style.display = "block";
    document.getElementById('add_office').style.display = "none";
}
