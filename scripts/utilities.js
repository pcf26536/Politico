var inline = "inline";
var block = "block";
var object = 'object';
var string = 'string';

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
      console.log(urlparameter);
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
    else if (instance == 'results') {
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
