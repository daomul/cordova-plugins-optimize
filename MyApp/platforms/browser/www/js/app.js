

var scanResultsDiv;

document.addEventListener("deviceready", init, false);
function init() {

	function onSuccess(imageData) {
		console.log('success');
		var image = document.getElementById('myImage');
		image.src = imageData;
		console.log(imageData);
	}

	function onFail(message) {
		alert('Failed because: ' + message);
	}	

	//Use from Camera
	document.querySelector("#takePicture").addEventListener("touchend", function() {
		navigator.camera.getPicture(onSuccess, onFail, { 
			quality: 50,
			sourceType: Camera.PictureSourceType.CAMERA,
			destinationType: Camera.DestinationType.FILE_URI
		});

	});

	//Use from Library
	document.querySelector("#usePicture").addEventListener("touchend", function() {
		navigator.camera.getPicture(onSuccess, onFail, { 
			quality: 50,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			destinationType: Camera.DestinationType.FILE_URI
		});

	});
    
    //联系人
    document.querySelector("#pickContact").addEventListener("touchend", doContactPicker, false);
    
    //二维码扫描
    document.querySelector("#startScan").addEventListener("touchend", startScan, false);
    scanResultsDiv = document.querySelector("#scanResults");
}

/*
 *  获取联系人
 */
function doContactPicker() {
    navigator.contacts.pickContact(function(contact){
       console.log('The following contact has been selected:' + JSON.stringify(contact));
       //Build a simple string to display the Contact - would be better in Handlebars
       var s = "";
       s += "<h2>"+getName(contact)+"</h2>";
       
       if(contact.emails && contact.emails.length) {
           s+= "Email: "+contact.emails[0].value+"<br/>";
       }
       
       if(contact.phoneNumbers && contact.phoneNumbers.length) {
           s+= "Phone: "+contact.phoneNumbers[0].value+"<br/>";
       }
       
       if(contact.photos && contact.photos.length) {
           s+= "<p><img src='"+contact.photos[0].value+"'></p>";
       }
       
       document.querySelector("#selectedContact").innerHTML=s;
       },function(err){
           console.log('Error: ' + err);
    });
}
/*
 *  二维码扫描
 */
function startScan() {
    
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var s = "Result: " + result.text + "<br/>" +
            "Format: " + result.format + "<br/>" +
            "Cancelled: " + result.cancelled;
            scanResultsDiv.innerHTML = s;
        }, 
        function (error) {
          alert("Scanning failed: " + error);
        }
    );
    
}
