let inline = "inline";
let block = "block";
let object = 'object';
let string = 'string';
let root_dir = './../../';
let templates_dir = 'templates/';
let signin_url = './../../templates/signin.html';
let admin_url = 'admin/index.html';
let user_url = 'user/index.html';
const API_URL = 'https://gvotie.herokuapp.com/api/v2';
const LOGIN = API_URL + '/auth/login';
const SIGNUP = API_URL + '/auth/signup';
const RESET = API_URL + '/auth/reset';
const PARTIES = API_URL + '/parties';
const OFFICES = API_URL + '/offices';
const OFFICE = API_URL + '/office/';
const USER_VOTES = API_URL + '/votes/';
const REGISTER = '/register';
const RESULT = '/result';
var office_ids = [];
var office_names = [];
var candid_list = '';
const FWD_SLASH = '/';
const NAME = '/name';


function logToConsole(value) {
  console.log(value);
}

function fetchToken(){
  let token = localStorage.getItem('token');
  if(token)
    return token;
  window.location.replace(signin_url);
  return null
}

function getLSItem(key) {
  return localStorage.getItem(key);
}

function justLoggedIn() {
  return localStorage.getItem('logged_in');
}

function userIsAdmin() {
  let admin =  localStorage.getItem('admin');
  if(admin == 'false') return false;
  if(admin == 'true') return true;
}

function redirectTo(url) {
  return window.location.replace(url);
}

function invalidToken(status){
  if(status === 401){
    localStorage.clear();
    window.location.replace(signin_url);
    return true;
  }
  return false;
}

function toInnerHTML(element, value) {
  element.innerHTML = value;
}

/* get the get url params */
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

function getUrlParam(parameter){
  let urlparameter = '';
  if(window.location.href.indexOf(parameter) > -1){
    urlparameter = getUrlVars()[parameter];
  }
  //console.log(urlparameter);
  return urlparameter;
}
/* get the get url params */


// returns the type of variable
function typeOf(variable) {
  return typeof variable;
}

// redirection
function redirect(url, timeout=5000) {
  setTimeout(redirectTo(url), timeout);
}

//get elements by class, id or tag name
function getById(id) { return document.getElementById(id); }

function getByClass(elem_class) { return document.getElementsByClassName(elem_class); }


/*hide elements functions*/

function hide(element) {
  element.style.display = "none";
}

// This function hides an element by Id
function hideById(element_id) {
  let type = typeOf(element_id);
  if (type == object) {
    for(let i = 0; i < element_id.length; i++) { hide(document.getElementById(element_id[i])); }
  }
  else if(type == string) { hide(document.getElementById(element_id)); }
}

// This function hides an element by class
function hideByClass(class_name) {
  elements = document.getElementsByClassName(class_name);
  for(var i = 0; i < elements.length; i++) {
    hide(elements[i]);
  }
}

/*hide elements functions*/


/*Show elements functions*/

function show(element, type) {
  element.style.display = type;
}

// This function hides an element by Id
function showById(element_id, display_type) {
  var type = typeOf(element_id);
  if (type == object) {
    for(var i = 0; i < element_id.length; i++) { show(document.getElementById(element_id[i]), display_type); }
  }
  else if(type == string) { show(document.getElementById(element_id), display_type); }
}

// This function hides an element by class
function showByClass(class_name, type) {
  elements = document.getElementsByClassName(class_name);
  for(var i = 0; i < elements.length; i++) {
    show(elements[i], type);
  }
}

/*Show elements functions*/


/*Show and close modal*/
function showModal(modalID, closeIndex, onParam) {
  var modal = document.getElementById(modalID);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[closeIndex];

  // show modal on specific get param
  if (getUrlParam(onParam)) {
    modal.style.display = "block";
  }

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
}
/*Show and close modal*/


/*Show and close alerts*/
function closeAlert() {
  // Get all elements with class="closebtn"
  var close = getByClass("closebtn")[0];

  close.onclick = function(){
    // Get the parent of <span class="closebtn"> (<div class="alert">)
    var div = this.parentElement;

    // Set the opacity of div to 0 (transparent)
    div.style.opacity = "0";
  };
  getById('alert_div').style.display = "none";
  /*/ Loop through all close buttons
  for (var i = 0; i < close.length; i++) {
      // When someone clicks on a close button
  }*/
}

function showAlert(type, message) {
  getById('alert_div').innerHTML = '<div class="alert '+ type + '">' +
    '<span class="closebtn">&times;</span>' + message + '</div>';
  // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
  showById('alert_div', block);
  setTimeout(closeAlert, 3000);
}

function makeAlertMessage(head, body) {
  return '<strong>' + head + '</strong> ' + body;
}

// shows the menu icon on small width
function myFunction(instance) {
  if (instance == 'menu') {
    var x = getById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  else if (instance == 'results' || instance == 'candidates') {
    var y = getById("officeList");
    var ctrls = getById("btn-ctrls");
    if (y.className === "office-list") {
      y.className += " responsive";
      ctrls.className += " responsive";
      //showAlert('danger', ctrls.className);
    } else {
      y.className = "office-list";
      ctrls.className = "submit-wrap";
    }
  }
}

function connectionError(err) {
    console.log('Fetch Error :-S', err);
    showAlert('warning', 'Please check your connection');
}

function signUp() {
  if (getById('pass1').value === getById('pass2').value) {
        fetch(
          SIGNUP,
          {
            body: JSON.stringify({
              firstname: getById('fname').value,
              lastname: getById('lname').value,
              phoneNumber: getById('phone').value,
              passportUrl: getById('passport').value,
              email: getById('email').value,
              password: getById('pass1').value
            }), mode: 'cors', method: 'post', headers: { 'Content-Type': 'application/json' }
          })
        .then(res => res.json())
        .then((data) => {
          // Examine the text in the response
          if (data.status === 201) {
            console.log(data.data[0]);
            showAlert('success', makeAlertMessage('Howdy ' + data.data[0].fname, 'You\'ve been signed' +
              ' up. Please <a href="signin.html">login</a>'));
            redirect('signin.html', 15000);
          } else {
            showAlert('danger', makeAlertMessage('', data.error));
          }
        })
        .catch(function (err) {
          connectionError(err);
        });
  }
  else {
    showAlert('danger', makeAlertMessage('Password Mismatch', 'Please try again!'));
  }
}

function loginHandler(location) {

  fetch(
    LOGIN,
    {
    body: JSON.stringify({
      email: getById('user_email').value,
      password: getById('user_pass').value
    }), mode: 'cors', method: 'post', headers: {'Content-Type': 'application/json'}})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data[0]);
        let user = data.data[0].user;
        logToConsole(user.admin);
        localStorage.setItem('token', data.data[0].token);
        localStorage.setItem('logged_in', 'true');
        localStorage.setItem('id', user.id);
        localStorage.setItem('fname', user.fname);
        localStorage.setItem('lname', user.lname);
        localStorage.setItem('email', user.email);
        localStorage.setItem('phone', user.phone);
        localStorage.setItem('admin', user.admin);

        if (!location) {
          admin_url = templates_dir + admin_url;
          user_url = templates_dir + user_url;
        }

        if (user.admin)
          window.location.replace(admin_url);
        else
          window.location.replace(user_url);
        logToConsole(user_url);
      }
      else {
        showAlert('danger', makeAlertMessage('', data.error));
      }})
  .catch(function(err) {
    connectionError(err);
  });
}

function logoutHandler(){
    localStorage.clear();
    window.location.replace('./../../index.html')
    //showAlert('warning', 'You\'re now logged out!');
}

function loadParties() {
  fetch(
    PARTIES,
    {
    mode: 'cors', method: 'get',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + fetchToken()
      }})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data);
        let parties_list = '';
        let parties_num = data.data.length;
        if (parties_num > 0) {
            for (let x = 0; x < parties_num; x++) {
              if (userIsAdmin()) {
                parties_list = parties_list + '<li id="p-' + data.data[x].id + '">' +
                    '<img src="' + root_dir + 'images/logo' + x + '.png" ' +
                    'alt="'+ data.data[x].logo_url +'" title="'+ data.data[x].logo_url +'"' +
                    '  height="40" width="40">' +
                    '<span>'+ data.data[x].name +' &#183; '+ data.data[x].hq_address +'</span>' +
                    '<a class="edit" name="'+ data.data[x].name +'" id="'+ data.data[x].id +'" onclick="editParty(this)"' +
                  ' href="#"><span>&#9998;' +
                  ' </span></a>' +
                  '<input type="checkbox" name="to_delete" class="action" value="' + data.data[x].id + '"></li>';
              }
              else {
                  parties_list = parties_list + '<li>' +
                    '<img src="' + root_dir + 'images/logo' + x + '.png" ' +
                    'alt="'+ data.data[x].logo_url +'" title="'+ data.data[x].logo_url +'"' +
                    '  height="40" width="40">' +
                    '<span>'+ data.data[x].name +' &#183; '+ data.data[x].hq_address +'</span>' +
                    '</li>';
                }
            }
            toInnerHTML(getById('parties_list'), parties_list);

        } else {
          toInnerHTML(
            getById('parties_list'),
            '<div class="h_center"><img src="' + root_dir +'images/nothing.png"></div>' +
            '<p class="h_center">No' +
            ' Political' +
          ' Parties Available' +
            ' Currently!</p>');
        }
        if (userIsAdmin()) showById('parties-ctrls', block);
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


function loadCandidates() {
  fetch(
    OFFICES,
    {
    mode: 'cors', method: 'get',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + fetchToken()
      }})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data);
        let offices_list = '';
        let offices_num = data.data.length;
        if (offices_num > 0) {
            for (let x = 0; x < offices_num; x++) {
                let id = data.data[x].id;
                let name = data.data[x].name;
                office_ids.push(id);
                office_names.push(name);
                offices_list = offices_list + '<li class="office" id="' + id + '">' + name + '</li>';
            }
            toInnerHTML(getById('officeList'), offices_list);
            getById('all-candidates').innerHTML = '';

            for (let y = 0; y < office_ids.length; y++) {
                fetch( // Nested fetch for candidate names per office
                    OFFICE + office_ids[y] + REGISTER,
                    {
                        mode: 'cors', method: 'get',
                          headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + fetchToken()
                          }})
                      .then(res=> res.json())
                      .then((candid_data) => {
                          // Examine the text in the response
                          if (candid_data.status === 200) {
                            console.log(candid_data.data);

                            let candid_num = candid_data.data.length;
                            candid_list = candid_list + '<div id="' + office_ids[y] + '-candidates"' +
                                  ' class="hide dash candidates-item">' +
                                      '<p class="h_center">' + office_names[y] + ' Candidates</p>' +
                                      '<hr>';
                            if (candid_num > 0) {
                                candid_list = candid_list + '<ul>';
                                for (let x = 0; x < candid_num; x++) {
                                      candid_list  = candid_list + '<li>' +
                                        candid_data.data[x].first_name + ' '
                                        + candid_data.data[x].last_name + ' &#183; '
                                        + candid_data.data[x].party
                                        + '</li>';
                                }
                                candid_list = candid_list + '</ul>';

                            } else {
                                candid_list = candid_list + '<div class="h_center">' +
                                  '<img src="' + root_dir +'images/nothing.png"></div>' +
                                '<p class="h_center">No' +
                              ' Candidate(s) Registered for this Office' +
                                '</p>';
                            }
                            candid_list = candid_list + '</div>';
                            let div = document.createElement('div');
                            div.innerHTML = candid_list;
                            getById('all-candidates').appendChild(div);
                            candid_list = '';
                          }
                          else if(invalidToken(candid_data.status)) {
                            logToConsole(candid_data.error)
                          }
                          else {
                            showAlert('danger', makeAlertMessage('', candid_data.error));
                          }})
                    .catch(function(err) {
                      connectionError(err);
                  });

              }
             let offices = getByClass('office');

              for (let x = 0; x < offices.length; x++) {
                offices[x].onclick = function () {
                    //hideById('all-results');
                    showById('all-candidates', block);
                    hideByClass('candidates-item');
                    showById(this.getAttribute('id') + '-candidates', block);
                    listHide();
                };
              }

              showById('btn-ctrls', block);

        } else {
          toInnerHTML(
            getById('officeList'),
            '<div class="h_center"><img src="' + root_dir +'images/nothing.png"></div>' +
            '<p class="h_center">No' +
            ' Political' +
          ' Offices Available' +
            ' Currently!</p>');
        }
      }
      else if(invalidToken(data.status)) {
        logToConsole(data.error)
      }
      else {
        showAlert('danger', makeAlertMessage('', data.error));
      }})
  .catch(function(err) {
    connectionError(err);
  });
}


function loadVotePage() {
  fetch(
    OFFICES,
    {
    mode: 'cors', method: 'get',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + fetchToken()
      }})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data);
        let offices_list = '';
        let offices_num = data.data.length;
        if (offices_num > 0) {
            for (let x = 0; x < offices_num; x++) {
                let id = data.data[x].id;
                let name = data.data[x].name;
                office_ids.push(id);
                office_names.push(name);
                offices_list = offices_list + '<li class="office" id="' + id + '">' + name + '</li>';
            }
            toInnerHTML(getById('officeList'), offices_list);
            getById('all-candidates').innerHTML = '';

            for (let y = 0; y < office_ids.length; y++) {
                fetch( // Nested fetch for candidate names per office
                    OFFICE + office_ids[y] + REGISTER,
                    {
                        mode: 'cors', method: 'get',
                          headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + fetchToken()
                          }})
                      .then(res=> res.json())
                      .then((candid_data) => {
                          // Examine the text in the response
                          if (candid_data.status === 200) {
                            console.log(candid_data.data);

                            let candid_num = candid_data.data.length;
                            candid_list = candid_list + '<div id="' + office_ids[y] + '-candidates"' +
                                  ' class="hide dash candidates-item">' +
                                      '<p class="h_center">Vote for ' + office_names[y] + ' Seat</p>' +
                                      '<hr>';
                            if (candid_num > 0) {
                                //let shit = false;
                                let shit = hasVoted(getLSItem('id'), office_ids[y]).then(function(stat) {});

                                if ( shit ) {
                                  candid_list = candid_list + '<div class="h_center">' +
                                      '<img src="' + root_dir +'images/ok.png"></div>' +
                                    '<p class="h_center">You have already voted for this office!' +
                                    '</p>';

                                } else {
                                    candid_list = candid_list + '<form action="castVote(); return false;">' +
                                      '<div class="col-6 col-s-6"><ul>';

                                    for (let x = 0; x < candid_num; x++) {
                                      candid_list = candid_list + '<li><label><input' +
                                        ' type="radio" name="' + office_ids[y] + '" value="' + candid_data.data[x].id + '" required>' +
                                        candid_data.data[x].first_name + ' '
                                        + candid_data.data[x].last_name + ' &#183; '
                                        + candid_data.data[x].party
                                        + '</label></li>';
                                    }
                                    candid_list = candid_list + '</ul></div>' +
                                      '<div class="col-2 col-s-2 submit-div">' +
                                      '<input type="submit" name="' + office_ids[y] + '-vote" value="Vote">' +
                                      '</div>' +
                                      '</form>';
                                }

                            } else {
                                candid_list = candid_list + '<div class="h_center">' +
                                  '<img src="' + root_dir +'images/nothing.png"></div>' +
                                '<p class="h_center">No' +
                              ' Candidate(s) Registered for this Office' +
                                '</p>';
                            }
                            candid_list = candid_list + '</div>';
                            let div = document.createElement('div');
                            div.innerHTML = candid_list;
                            getById('all-candidates').appendChild(div);
                            candid_list = '';
                          }
                          else if(invalidToken(candid_data.status)) {
                            logToConsole(candid_data.error)
                          }
                          else {
                            showAlert('danger', makeAlertMessage('', candid_data.error));
                          }})
                    .catch(function(err) {
                      connectionError(err);
                  });

              }
             let offices = getByClass('office');

              for (let x = 0; x < offices.length; x++) {
                offices[x].onclick = function () {
                    //hideById('all-results');
                    showById('all-candidates', block);
                    hideByClass('candidates-item');
                    showById(this.getAttribute('id') + '-candidates', block);
                    listHide();
                };
              }

              showById('btn-ctrls', block);

        } else {
          toInnerHTML(
            getById('officeList'),
            '<div class="h_center"><img src="' + root_dir +'images/nothing.png"></div>' +
            '<p class="h_center">No' +
            ' Political' +
          ' Offices Available' +
            ' Currently!</p>');
        }
      }
      else if(invalidToken(data.status)) {
        logToConsole(data.error)
      }
      else {
        showAlert('danger', makeAlertMessage('', data.error));
      }})
  .catch(function(err) {
    connectionError(err);
  });
}

function hasVoted(user, office) {
  return fetch(
    USER_VOTES + user,
    {
      mode: 'cors', method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + fetchToken()}})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        //console.log(data.data.length);
        let votes = data.data.length;
        if (votes > 0) {
          for (let d = 0; d < votes; d++) {
            if ( (parseInt(data.data[0].createdby) == parseInt(user)) && (parseInt(data.data[0].office) == parseInt(office)) ) {
                console.log('Matched!');
                return true;
            }
          }
          return false;
        }else {
          return false;
        }
      }
      else {
        showAlert('danger', makeAlertMessage(data.status, data.error));
      }})
  .catch(function(err) {
    connectionError(err);
  });
}

function loadVotes() {
  fetch(
    OFFICES,
    {
    mode: 'cors', method: 'get',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + fetchToken()
      }})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data);
        let offices_list = '';
        let petition_offices = '<option name="office" value="">-----</option>';
        let offices_num = data.data.length;
        if (offices_num > 0) {
            for (let x = 0; x < offices_num; x++) {
                let id = data.data[x].id;
                let name = data.data[x].name;
                office_ids.push(id);
                office_names.push(name);
                offices_list = offices_list + '<li class="office" id="' + id + '">' + name + '</li>';
                petition_offices = petition_offices + '<option name="office"  value="' + id + '">' + name + '</option>';
            }
            toInnerHTML(getById('officeList'), offices_list);
            toInnerHTML(getById('petition-offices'), petition_offices);
            getById('all-results').innerHTML = '';

            for (let y = 0; y < office_ids.length; y++) {
                fetch( // Nested fetch for candidate names per office
                    OFFICE + office_ids[y] + RESULT,
                    {
                        mode: 'cors', method: 'get',
                          headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + fetchToken()
                          }})
                      .then(res=> res.json())
                      .then((candid_data) => {
                          // Examine the text in the response
                        candid_list = candid_list + '<div id="' + office_ids[y] + '-results"' +
                                  ' class="hide dash result-item">' +
                                      '<p class="h_center">' + office_names[y] + ' Results</p>' +
                                      '<hr>';

                          if (candid_data.status === 200) {
                            console.log(candid_data.data);

                            let candid_num = candid_data.data.length;

                            if (candid_num > 0) {
                                candid_list = candid_list + '<ol>';
                                for (let x = 0; x < candid_num; x++) {
                                      candid_list  = candid_list + '<li><span class="candidate">' +
                                        candid_data.data[x].first_name + ' '
                                        + candid_data.data[x].last_name
                                        + '</span><span class="votes">'+
                                          candid_data.data[x].votes
                                        +' Vote(s)</span></li>';
                                }
                                candid_list = candid_list + '</ol>';

                            }
                          }
                          else if (candid_data.status === 404) {
                            candid_list = candid_list + '<div class="h_center">' +
                                  '<img src="' + root_dir +'images/nothing.png"></div>' +
                                '<p class="h_center">No' +
                              ' Voting done for this Office' +
                                '</p>';
                          }
                          else if(invalidToken(candid_data.status)) {
                            logToConsole(candid_data.error)
                          }

                          else {
                            showAlert('danger', makeAlertMessage('', candid_data.error));
                          }
                          candid_list = candid_list + '</div>';
                            let div = document.createElement('div');
                            div.innerHTML = candid_list;
                            getById('all-results').appendChild(div);
                            candid_list = '';

                      })
                    .catch(function(err) {
                      connectionError(err);
                  });

              }
              let offices = getByClass('office');

              for (let x = 0; x < offices.length; x++) {
                  offices[x].onclick = function () {
                      //hideById('all-results');
                      hideById('petition-div');
                      showById('all-results', block);
                      hideByClass('result-item');
                      showById(this.getAttribute('id') + '-results', block);
                      listHide();
                  };
              }

              showById('btn-ctrls', block);

        } else {
          toInnerHTML(
            getById('officeList'),
            '<div class="h_center"><img src="' + root_dir +'images/nothing.png"></div>' +
            '<p class="h_center">No' +
            ' Political' +
          ' Offices Available' +
            ' Currently!</p>');
        }
      }
      else if(invalidToken(data.status)) {
        logToConsole(data.error)
      }
      else {
        showAlert('danger', makeAlertMessage('', data.error));
      }})
  .catch(function(err) {
    connectionError(err);
  });
}


function loadVoteProfile() {
  fetch(
    USER_VOTES + getLSItem('id'),
    {
    mode: 'cors', method: 'get',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + fetchToken()
      }})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data);
        let votes = data.data.length;
        let profile = '';
        if (votes > 0) {
          profile = '<div class="vote-list-title">' +
            '<span class="dash">Candidate Voted' +
            '<span class="office-title-title">Office Title</span>' +
            '</span>' +
            '</div>';

          for (let d = 0; d < votes; d++) {
              profile = profile + '<div class="vote-item">' +
                '<span class="dash"><span class="office-title">' + data.data[d].office + '</span>' +
                '<span class="candidate-name">' +
                data.data[d].first_name + ' ' + data.data[d].last_name +
                '</span></span>' +
                '</div>';
          }

        }else { // not vote yet
          profile = '<div class="h_center">' +
                    '<img src="' + root_dir +'images/nothing.png"></div>' +
                    '<p class="h_center">You haven\'t casted any vote yet! ' +
                    'Vote <a href="vote.html">here</a></p>';
        }
          toInnerHTML(getById('vote-profile'), profile);
      }
      else if(invalidToken(data.status)) {
        logToConsole(data.error)
      }

      else {
        showAlert('danger', makeAlertMessage('', data.error));
      }

       })
        .catch(function(err) {
          connectionError(err);
      });

}

function loadOffices() {
  fetch(
    OFFICES,
    {
    mode: 'cors', method: 'get',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + fetchToken()
      }})
  .then(res=> res.json())
  .then((data) => {
      // Examine the text in the response
      if (data.status === 200) {
        console.log(data.data);
        let offices_list = '';
        let offices_num = data.data.length;

        if (offices_num > 0) {
            for (let x = 0; x < offices_num; x++) {
                let id = data.data[x].id;
                let name = data.data[x].name;
                let type = data.data[x].type;
                office_ids.push(id);
                office_names.push(name);
                offices_list = offices_list + '<li class="office" id="' + id + '">' + name +
                  ' &#183; ' + type + '</li>';
            }
            toInnerHTML(getById('officeList'), offices_list);

        } else {
          toInnerHTML(
            getById('officeList'),
            '<div class="h_center"><img src="' + root_dir +'images/nothing.png"></div>' +
            '<p class="h_center">No' +
            ' Political Offices Available Currently!</p>');
        }
        if (userIsAdmin()) showById('offices-ctrls', block);

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