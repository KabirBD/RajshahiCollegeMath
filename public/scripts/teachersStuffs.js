
// Funtion to colapse navbar on outer click
$(document).click(function (event) {
    $('#navBar').collapse('hide');
});
// get teachersStuffs.json as object
fetch('./assets/teachersStuffs.json')
    .then((response) => response.json())
    .then((data) => {
        showList(data);
    }
    );

// show teachers and stuffs list
function showList(data) {
    let teachers = data.teachers;
    for (let teacher in teachers) {
        // console.log(teachers[teacher]);
        thisTeacher = teachers[teacher];
        $("#teachersView").append(`<tr><th scope="row" class="align-middle">${thisTeacher.name}</th><td class="align-middle">${thisTeacher.title}</td><td class="align-middle p-0 text-center"><span class="d-block p-0 d-md-none"><a href="tel:+88${thisTeacher.phone}" class="text-decoration-none"><h5><i class="icofont-ui-call"></i></h5></a></span><span class="d-none d-md-inline">${thisTeacher.phone}</span></td></tr>`);
    }
    let stuffs = data.stuffs;
    for (let stuff in stuffs) {
        // console.log(stuffs[stuff]);
        thisstuff = stuffs[stuff];
        $("#stuffsView").append(`<tr><th scope="row">${thisstuff.name}</th><td>${thisstuff.title}</td><td class="align-middle text-center"><span class="d-block p-0  d-md-none"><a href="tel:+88${thisstuff.phone}" class="text-decoration-none"><h5><i class="icofont-ui-call"></i></h5></a></span><span class="d-none d-md-inline">${thisstuff.phone}</span></td></tr>`);
    }
}