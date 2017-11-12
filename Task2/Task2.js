

window.onload = function(){
	//if session sotrage is empty, initiate empty json object of record objects
	//also initiate index for storage
	if (window.sessionStorage.getItem("Records") == null){
		var recordStorage = {};
		window.sessionStorage.setItem("Records", JSON.stringify(recordStorage));

		//initiate index
		window.sessionStorage.setItem("Index",1);
	}
	//else get json object to use in validateForm
	else{
		//prevent error on empty json object 
		if (JSON.parse(window.sessionStorage.getItem("Records")) == null){
			recordStorage = {};
		}
		else{
			var recordStorage = JSON.parse(window.sessionStorage.getItem("Records"));
		}
	}
	var form = document.getElementById("personalInfo");
	form.addEventListener("submit", function(event){
    event.preventDefault();
    validateForm(recordStorage);
    //clear fields for next entry
    form.reset();
});
}

function validateForm(recordStorage){
	//store formobjects and regex for valdiation
	var name = document.forms["personalInfo"]["name"].value;
	var color = document.forms["personalInfo"]["color"].value;
	var pet = document.forms["personalInfo"]["pet"].value;
	var dob = document.forms["personalInfo"]["dob"].value;
	var dateRegex = /^\d{4}-\d{2}-\d{2}$/
	var email = document.forms["personalInfo"]["email"].value;
	var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var phone = document.forms["personalInfo"]["phone"].value;
	var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (name == "") {
        alert("Name must be filled out");
        return false;
    }
    else if(!emailRegex.test(email)){
    	alert("invalid email");
    	return false;
    }
    else if (!phoneRegex.test(phone)){
    	alert("invalid phone number");
    	return false;
    }
    else if (!dateRegex.test(dob)){
    	alert("invalid date")
    	return false;
    }
    //if passed validation, update sessionStorage and draw records
    else{
    	//strip special characters from pure text inputs
    	var name = name.replace(/[^\w\s]/gi, '');
    	var color = color.replace(/[^\w\s]/gi, '');
    	var pet = pet.replace(/[^\w\s]/gi, '');
    	//build new json object and write to window.sessionStorage
    	recordStorage=JSON.parse(window.sessionStorage.getItem("Records"));
    	var recordObj = {
    		"name": name,
    		"color": color,
    		"pet": pet,
    		"dob": dob,
    		"email": email,
    		"phone": phone,
    	};
    	//get index and increment
    	var nextIndex = parseInt(window.sessionStorage.getItem("Index"),10);
    	nextIndex+=1;
    	recordStorage[nextIndex.toString()]=recordObj;
    	//update session storage object and index
    	window.sessionStorage.setItem("Records",JSON.stringify(recordStorage));
    	window.sessionStorage.setItem("Index",nextIndex);
    	var display="";
    	for (var key in recordStorage){
    		display+=JSON.stringify(recordStorage[key]);
    	}
    	

    	//draw new table row
		var table = document.getElementById("recordsTable");
		var row = table.insertRow(table.rows.length);
		var nameCell = row.insertCell(0);
		var colorCell = row.insertCell(1);
		var petCell = row.insertCell(2);
		var dobCell = row.insertCell(3);
		var emailCell = row.insertCell(4);
		var phoneCell = row.insertCell(5);
		nameCell.innerHTML = name;
		colorCell.innerHTML = color;
		petCell.innerHTML = pet;
		dobCell.innerHTML = dob;
		emailCell.innerHTML = email;
		phoneCell.innerHTML = phone;

		//pass form
		return true;
    }
}
