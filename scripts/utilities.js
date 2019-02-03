var inline = "inline";
var block = "block";

/*hide elements functions*/
function hide(element) {
    element.style.display = "none";
}

// This function hides an element by Id
function hideById(element_id) {
    hide(document.getElementById(element_id));
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
function showById(element_id, type) {
    hide(document.getElementById(element_id, type));
}

// This function hides an element by class
function showByClass(class_name, type) {
    elements = document.getElementsByClassName(class_name);
    for(var i = 0; i < elements.length; i++) {
        hide(elements[i], type);
    }
}
/*Show elements functions*/