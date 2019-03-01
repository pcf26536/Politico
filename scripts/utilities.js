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
const REGISTER = '/register';
var office_ids = [];
var office_names = [];
var candid_list = '';


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

function justLoggedIn() {
  return localStorage.getItem('logged_in');
}

function userIsAdmin() {
  let admin =  localStorage.getItem('admin');
  if(admin == 'false') return false;
  if(admin == 'true') return true;
}

function redirectTo(url) {
  window.location.replace(url);
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
  var urlparameter = '';
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
function redirect(url) {
  setTimeout(
    window.location.href = url, 5000);
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
  var type = typeOf(element_id);
  if (type == object) {
    for(var i = 0; i < element_id.length; i++) { hide(document.getElementById(element_id[i])); }
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
                parties_list = parties_list + '<li>' +
                  '<img src="' + root_dir + 'images/logo' + x + '.png" ' +
                  'alt="'+ data.data[x].logo_url +'" title="'+ data.data[x].logo_url +'"' +
                  '  height="40" width="40">' +
                  '<span>'+ data.data[x].name +' &#183; '+ data.data[x].hq_address +'</span>' +
                  '</li>';
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
                            //getById('all-candidates')
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

              showById('show-all', inline);

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