function checkLoginStatus() {
    var loginBtn = document.querySelector('#loginBtn');
    var nameTxt = document.querySelector('#name');
    //로그인시 데이터를 가져옴
    if (gauth.isSignedIn.get()) {
        console.log('로그인 상태');
        loginBtn.value = 'Logout';
        var profile = gauth.currentUser.get().getBasicProfile();
        nameTxt.innerHTML = profile.getName();

        console.log('Id: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Email: ' + profile.getEmail());
    } else {
        console.log('로그아웃 상태');
        loginBtn.value = 'Login with Google';
        nameTxt.innerHTML = '';
    }
}

function init() {
    console.log('홈페이지들어옴');

    // auth2 라이브러리를 load함
    gapi.load('auth2', function () {
        console.log(gapi.auth2);
        window.gauth = gapi.auth2.init({
            client_id: '1002155686603-gj9ti6nelce9upu9i4pcdkmdkphi1kqb.apps.googleusercontent.com',
            scope: "https://www.googleapis.com/auth/calendar",
            immediate: true,
        })
        gauth.then(function () {
            console.log('googleAuth success');
            checkLoginStatus();
            // listEvents(gauth);
        }, function () {
            console.log('googleAuth fail');
        })
    });
    // loadCalendarApi()
    
}

function login() {
    var profile = gauth.currentUser.get().getBasicProfile();

    console.log('Id: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail());

    var profileId = profile.getId();
    var profileName = profile.getName();
    var profileEmail = profile.getEmail();

    var arr = [];
    arr.push(profileId);
    arr.push(profileName);
    arr.push(profileEmail);

    window.location.href = `http://localhost:3000/users/register/${arr}`;
    
}