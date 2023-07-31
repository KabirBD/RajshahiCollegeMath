

// Funtion to colapse navbar on outer click
$(document).click(function (event) {
    $('#navBar').collapse('hide');
});

let newFileDom = `
<div class="card">
    <div class="card-body" data-toggle="modal" data-target="#newUpload">
    <div class="text-center">
    <a class="text-primary btn font-weight-bold"
    style="width:100%; cursor:pointer;"><i
      class="icofont-upload-alt"></i> Upload File</a>
    </div>
    </div>
</div>`

firebase.database().ref('fileList/').on('value', function (snapshot) {
    let fileDom = '';
    // console.log(snapshot);
    snapshot.forEach(function (childSnapshot) {
        let file = childSnapshot.val();
        let serial = file.serial;
        let fileDetails = file.fileDetails;
        let url = file.url;
        let date = file.date;
        let type = file.type;
        let adminName = file.adminName;
        fileDom = `
<div class="card">
    <div class="card-body p-2">
        <h5 class="card-title mb-0 font-weight-bold text-success"><i class="icofont-document-folder"></i> File: ${serial}</h5>
        <p class="card-text allow-select mb-1">
            ${fileDetails} | File type <span class="badge badge-pill badge-primary uppercase halvetica halvetica">${type}</span> | <span class="text-danger"> by ${adminName}</span>
        </p>
        <div class="text-right"><a href="${url}" class="btn btn-success btn-sm mb-1" download="fileName"><i class="icofont-download"></i> Download</a>
            <div>
                <p class="card-text"><small class="text-muted">Added On ${date}</small></p>
            </div>
        </div>
    </div>
</div>` + fileDom;
    });
    $('#fileDom').html(newFileDom + fileDom);
});