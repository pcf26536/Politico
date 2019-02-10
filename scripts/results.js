function listHide() {
    if(getById('officeList').className=='office-list responsive') myFunction('results');
}

var offices = getByClass('office');

for (var x = 0; x < offices.length; x++) {
    offices[x].onclick = function () {
        //hideById('all-results');
        hideById('petition-div');
        showById('all-results', block);
        hideByClass('result-item');
        showById(this.getAttribute('id') + '-results', block);
        listHide();
    };
}

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
    showAlert('info', makeAlertMessage('Success!', "You've successfuly submitted the petition for the " + getUrlParam('office') + " office."));
}