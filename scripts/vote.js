function listHide() {
  if(getById('officeList').className=='office-list responsive') myFunction('results');
}

var offices = getByClass('office');

for (var x = 0; x < offices.length; x++) {
  offices[x].onclick = function () {
      //hideById('all-results');
      showById('all-candidates', block);
      hideByClass('candidates-item');
      showById(this.getAttribute('id') + '-candidates', block);
      listHide();
  };
}

function showAllCandidates() {
  showById('all-candidates', block);
  showByClass('candidates-item', block); 
  listHide();
}

getById('show-all').onclick = showAllCandidates;

getByClass("closebtn")[0].onclick = function(){
  // Get the parent of <span class="closebtn"> (<div class="alert">)
  var div = this.parentElement;

  // Set the opacity of div to 0 (transparent)
  div.style.opacity = "0";
};


/*/ Get the modal
var modal = document.getElementById('vote_message');

// Get the button that opens the modal
var btn = document.getElementById("vote1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
*/