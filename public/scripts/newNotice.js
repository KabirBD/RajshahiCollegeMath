

function postNotice() {
    let noticeTitle = $("#noticeTitle").val();
    let noticeBody = $("#noticeBody").val();
    let adminToken = $("#adminToken").val();
    let noticeRef = firebase.database().ref('notices/');
    let tokenRef = firebase.database().ref("admins/" + adminToken);

    if (noticeTitle && noticeBody.length > 5 && adminToken) {
        tokenRef.get().then((snapshot) => {
            if (snapshot.exists()) {
                let token = snapshot.val();
                console.log(token);
                noticeRef.push().set({
                    title: noticeTitle,
                    body: noticeBody,
                    date: formatedDate,
                    adminName: token.name
                }, (error) => {
                    if (error) {
                        console.log('error');
                        window.alert('Can not post it');
                    }
                    else {
                        console.log('Succeed');
                        window.alert('You Added Notice Successfully');
                        location.reload();
                        $("#noticeTitle").val('');
                        $("#noticeBody").val('');
                        $('#newNoticeModal').modal('hide')
                    }
                });

            } else {
                console.log("No data available");
                window.alert("No Token found");
            }
        }).catch((error) => {
            console.log("Don't have permision")
            window.alert("Token doesn't match!")
            console.error(error);
        });
    }
    else {
        window.alert("Please give a title, write details and enter your admin token. If you don't have a token, please collect one to add notice")
    }


}



