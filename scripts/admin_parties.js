function showAddForm() {
    //document.getElementById('add_party_form').style.display = "block";
    //document.getElementById('add_party').style.display = "none";
    //document.getElementById('party_list').style.display = "none";
    showById('add_party_form', block);
    hideById(['add_party', 'party_list']);
}

document.getElementById('cancel_add_party').onclick = function () {
    document.getElementById('add_party_form').style.display = "none";
    document.getElementById('add_party').style.display = "block";
    document.getElementById('party_list').style.display = "block";
};

function showDelete() {
    /*elems = document.getElementsByClassName('hide');
    alert(elems.length);
    for(var i = 0; i < elems.length; i++) {
        elems[i].style.display = "inline";
    }*/
    document.getElementById('delete').style.display = "block";
    document.getElementById('add_party').style.display = "none";
}
