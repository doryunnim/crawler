// import { GoogleAuth } from "google-auth-library";

// function google_login() {
//     if (this.value === 'Login') {
//         gauth.signIn({
//             scope: 'https://www.googleapis.com/auth/calendar'
//         }).then(function () {
//             console.log('gauth.signIn()');
//             checkLoginStatus();
//         }).then(function () {
//             login();
//         });
//     } else {
//         gauth.signOut().then(function () {
//             console.log('gauth.signOut()');
//             checkLoginStatus();
//         });
//     }
// }

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
        loginBtn.value = 'Login';
        nameTxt.innerHTML = '';
    }
}

function init() {
    console.log('홈페이지들어옴');

    // auth2 라이브러리를 load함
    gapi.load('auth2', function () {
        console.log('auth2');
        window.gauth = gapi.auth2.init({
            client_id: '692379332630-dsnfo5ms4vcsrc0ie92kdqchq1la1bb4.apps.googleusercontent.com',
        })
        gauth.then(function () {
            console.log('googleAuth success');
            checkLoginStatus()
        }, function () {
            console.log('googleAuth fail');
        })
    });
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