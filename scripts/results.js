function listHide() {
    if(getById('officeList').className=='office-list responsive') myFunction('results');
}

hideById('btn-ctrls');

getById('create-petition').onclick = function () {
    showById('petition-div', block);
    hideById('all-results');
    listHide();
};

function showAllResults() {
    showById('all-results', block);
    showByClass('result-item', block); 
    hideById('petition-div');
    listHide();
}

getById('cancel-petition').onclick = function () {
    hideById('petition-div');
    showAllResults();
};

getById('show-all').onclick = showAllResults;

getByClass("closebtn")[0].onclick = function(){
    // Get the parent of <span class="closebtn"> (<div class="alert">)
    var div = this.parentElement;

    // Set the opacity of div to 0 (transparent)
    div.style.opacity = "0";
};

if (getUrlParam('petition')) {
    showAlert(
      'info',
      makeAlertMessage(
        'Success!',
        "You've successfuly submitted the petition for the "
        + getUrlParam('office') + " office."));
}