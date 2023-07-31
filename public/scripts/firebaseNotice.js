
$('#oldNoticeButton').hide();

firebase.database().ref('notices/').once('value', function (snapshot) {
    let oldNoticeDom = '';
    let latestNoticeDom = '';
    let noticeArray = [];
    // console.log(snapshot);
    snapshot.forEach(function (childSnapshot) {
        let notice = childSnapshot.val();
        noticeArray.push(notice);
    });

    // making array reverse to get the last notices first
    noticeArray.reverse();

    // if noticeArray length is less than 3
    if (noticeArray.length <= 2) {
        for (let i = 0; i < noticeArray.length; i++) {
            let notice = noticeArray[i];
            latestNoticeDom += `<div class="alert border bg-light my-1 mx-0 p-1 text-success" role="alert"><h5 class="alert-heading font-weight-bold mx-1 mt-1 mb-0"><i class="icofont-info-circle"></i> ${notice.title}</h5><p class="mb-1 mx-1 text-dark allow-select">${notice.body} <span class="text-info"> by ${notice.adminName}</span></p><hr class="m-0"><p class="mb-0 text-right font-weight-light mr-2">Posted on ${notice.date}</p></div>`;
        }
        $('#latestNotices').html(latestNoticeDom);
        $('#oldNoticeButton').hide();
    } else {
        // showing last 3 notices
        for (let i = 0; i <= 2; i++) {
            let notice = noticeArray[i];
            latestNoticeDom += `<div class="alert border bg-light my-1 mx-0 p-1 text-success" role="alert"><h5 class="alert-heading font-weight-bold mx-1 mt-1 mb-0"><i class="icofont-info-circle"></i> ${notice.title}</h5><p class="mb-1 mx-1 text-dark allow-select">${notice.body} <span class="text-info"> by ${notice.adminName}</span></p><hr class="m-0"><p class="mb-0 text-right font-weight-light mr-2">Posted on ${notice.date}</p></div>`;
        }
        $('#latestNotices').html(latestNoticeDom);
        // showing old notices
        if (noticeArray.length >= 4) {
            for (let i = 3; i < noticeArray.length; i++) {
                let notice = noticeArray[i];
                oldNoticeDom += `<div class="alert border my-1 p-1 text-success" role="alert"><h5 class="alert-heading font-weight-bold mx-1 mt-1 mb-0"><i class="icofont-info-circle"></i> ${notice.title}</h5><p class="mb-1 mx-1 text-dark allow-select">${notice.body} <span class="text-info"> by ${notice.adminName}</span></p><hr class="m-0"><p class="mb-0 text-right font-weight-light mr-2">Posted on ${notice.date}</p></div>`;
            }
            $('#oldNoticeButton').show();
            $('#oldNotices').html(oldNoticeDom);
        }else{
            $('#oldNoticeButton').hide();
        }
    }
    $('#oldNoticeButton').show();
});


