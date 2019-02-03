var inline = "inline";
var block = "block";
var object = 'object';
var string = 'string';

// returns the type of variable
function typeOf(variable) {
    return typeof variable;
}

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
function showById(element_id, type) {
    show(document.getElementById(element_id), type);
}

// This function hides an element by class
function showByClass(class_name, type) {
    elements = document.getElementsByClassName(class_name);
    for(var i = 0; i < elements.length; i++) {
        show(elements[i], type);
    }
}
                /*Show elements functions*/