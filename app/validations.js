/**
 * Created by nightshifttushar on 11/7/15.
 */
function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, object.maxLength)
}
function lengthCheck(object) {
    if (object.value.length < object.maxLength) {
        object.value="";
        object.placeholder="Mobile Number";
        $("#Error").text("Enter a valid Mobile Number");
        $("#Error").show();
    }
    else if(parseInt(object.value)<6999999999)
        {
            $("#Error").text("Enter a valid Mobile Number");
            $("#Error").show();
            object.value="";
            object.placeholder="Mobile Number";

        }
    else{
        $("#Error").text("");
        $("#Error").hide();
    }
}
function truckNum(object) {
    if (object.value=="0"||object.value=="")
    {
        object.value="";
        object.placeholder="Number of Trucks";
        $("#Error").text("Number of Trucks should be at least 1");
        $("#Error").show();
    }
    else {$("#Error").hide();
        $("#Error").text("");
    }
}
function ValidateEmail(object){   /*
 /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
*/
    if (/^([_a-zA-Z0-9-+]+)(\.[_a-zA-Z0-9-+]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/.test(object.value))
    {
        console.log("Perfect");
        $("#Error").hide();
        $("#Error").text("");

        return (true)
    }
    console.log("You have entered an invalid email address!");
    object.value="";
    object.placeholder="Email ID";
    $("#Error").text("Enter a valid Email");
    $("#Error").show();
    return (false)
}

function ValidateEmail1(object){   /*
 /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
 */
    if (/^([_a-zA-Z0-9-+]+)(\.[_a-zA-Z0-9-+]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/.test(object.value))
    {
        console.log("Perfect");
        $("#Error").hide();
        $("#Error").text("");

        return (true)
    }
    console.log("You have entered an invalid email address!");
    alert("You have entered an invalid email address!");

    object.value="";
    object.placeholder="Email ID";
    $("#Error").text("Enter a valid Email");
    $("#Error").show();
    return (false)
}

function lengthZip(object) {
    if (object.value.length < object.maxLength) {

        object.value="";
        object.placeholder="Zip Code";
        $("#Error").text("Enter a valid Zip Code");
        $("#Error").show();
    }
    else if(parseInt(object.value)<110000)
        {
            $("#Error").text("Enter a valid Zip Code");
            $("#Error").show();
            object.value="";
            object.placeholder="Zip Code";

        }
        else{
            $("#Error").text("");
            $("#Error").hide();
        }
}
function isNumberKey (evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode (key);
    var regex = /[0-9]|\./;
    if ( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
    else{var rege = /[.]|\./;
        if ( rege.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }}
}

function isNumberTextKey (evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode (key);
    var regex = /[0-9a-zA-Z]|\./;
    if ( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
    else{var rege = /[.]|\./;
        if ( rege.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }}
}
function checkpass(evt){
    if (evt.keyCode == 32) return false;
}
function isText (evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode (key);
    var regex = /[a-z A-Z]|\./;
    if ( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
    else{var rege = /[.]|\./;
        if ( rege.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }}
}
function Address (evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode (key);
    var regex = /[a-zA-Z0-9#,()-]|\./;
    if ( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
    /*else{var rege = /[.]|\./;
        if ( rege.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }}*/
}