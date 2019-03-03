function voteHandler(candidate) {
  fetch(
    USER_VOTES,
    {
    body: JSON.stringify({
      candidate: candidate
    }), mode: 'cors', method: 'post',
        headers: {
        'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + fetchToken()
    }})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 201) {
        console.log(data.data[0]);
        showAlert('success', makeAlertMessage('', 'Vote casted successfully!'));
        //redirect('offices.html');
      }
      else if(invalidToken(data.status)) {
        logToConsole('Token has Expired');
      }
      else {
        showAlert('danger', makeAlertMessage('', data.error));
      }})
  .catch(function(err) {
    connectionError(err);
  });
}


function castVote(office) {
  let candidates = document.getElementsByName(office);
  for (let n = 0; n < candidates.length; n++) {
    if (candidates[n].checked) {
        logToConsole(candidates[n] + '----selected');
        showLoading('user');
        voteHandler(candidates[n].value);
      break;
    }
  }
}


function listHide() {
  if(getById('officeList').className=='office-list responsive') myFunction('results');
}

hideById('btn-ctrls');

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