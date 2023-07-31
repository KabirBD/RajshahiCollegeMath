
let file, fileDetails, lastFileSerial, fileSerial, token, extention;
// get the file from user input
document.getElementById('inputFile').addEventListener('change', (e) => {
  file = e.target.files[0];
  $('#fileName').html(file.name);
  // get file type
  extention = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length)  || filename;
  console.log(extention)
})

// hide progressbar until clicking upload button
$('#progressDiv').hide();
// get last uploaded file serial
const serialRef = firebase.database().ref('lastFileSerial/')
serialRef.on('value', (snapshot) => {
  lastFileSerial = snapshot.val();
});

// function to uload file
function uploadFile() {
  fileDetails = $('#fileDetails').val();
  adminToken = $('#adminToken2').val();
  // check if file selected details added
  if (fileDetails.length > 3 && file && adminToken) {
    let tokenRef = firebase.database().ref("admins/" + adminToken);
    tokenRef.get().then((snapshot) => {
      if (snapshot.exists()) {
        token = snapshot.val();
        console.log('ready to upload')
        // show progressbar
        $('#progressDiv').show();
        // ready to upload file
        uploadToList();
      } else {
        console.log("No data available");
        window.alert("No Token found");
      }
    }).catch((error) => {
      console.log("Don't have permision")
      window.alert("Token doesn't match!")
      console.error(error);
    });

  } else {
    // if can not upload file
    console.log('cant upload');
    window.alert("Can't upload. Must select a file, write details of it and enter your admin token. If you don't have a token, please collect one to add files")
  }
}

// get firebase ref where file should be uploaded
function uploadToList() {
  const storageRef = firebase.storage().ref('rcUploads/' + file.name);
  let uploadTask = storageRef.put(file);

  // when uploading
  uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      // show upload progress in a progress bar
      document.getElementById('uploadProgress').style = `width: ${progress}%`;
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      window.alert("Couldn't upload file")
      $('#newUpload').modal('hide');
    },
    () => {
      // Handle successful uploads on complete
      $('#newUpload').modal('hide');
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        // after uploading file adding it to firebase list
        fileSerial = lastFileSerial + 1;
        serialRef.set(fileSerial);
        firebase.database().ref('fileList/').push().set({
          serial: fileSerial,
          fileDetails: fileDetails,
          type: extention,
          url: downloadURL,
          date: formatedDate,
          adminName: token.name
        }, function (error) {
          if (error) {
            console.log('error');
            window.alert('Can not add it to file list');
          }
          else {
            console.log('Succeed');
            window.alert('You Successfully Added A File');
            $("#fileDetails").val('');
            // hide progressbar after successful uplod
            $('#progressDiv').hide();
            document.getElementById('uploadProgress').style = `width: o`;
            $('#fileName').html('Choose a file');
            $('#newNoticeModal').modal('hide');
          }
        });
      });
    }
  );
}


