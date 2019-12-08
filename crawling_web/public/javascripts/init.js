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

    // listEvents(gauth);
    window.location.href = `http://localhost:3000/users/register/${arr}`;
    
}

// function loadCalendarApi() {
//     gapi.load('calendar', 'v3', listUpcomingEvents);
//     console.log(gapi.calendar);
//     listCalendars();
// }

// function listCalendars() {
//     var request = gapi.calendar.calendarList.list();
//     alert('22222222222222222222222222222222222222222222');
//     request.execute(function(resp) {
//         var cals = resp.items;
//         appendPre('Your calendars:');
//         if (cals.length > 0) {
//             alert('3333333333333333333333333333333333');
//             for (i = 0; i < cals.length; i++) {
//                 var calendar = cals[i];
                
//                 appendPre(calendar.summary + ' (' + calendar.id + ')')
//             }
//         } else {
//             appendPre('No calendars found.');
//         }
//     });
// }

// function listUpcomingEvents() {
//     alert('444444444444444444444444444444444')
//     var request = gapi.calendar.events.list({
//       'calendarId': 'primary', /* Can be 'primary' or a given calendarid */
//       'timeMin': (new Date()).toISOString(),
//       'showDeleted': false,
//       'singleEvents': true,
//       'maxResults': 10,
//       'orderBy': 'startTime'
//     });
    
//     request.execute(function(resp) {
//       var events = resp.items;
//       appendPre('Upcoming events:');
//       if (events.length > 0) {
//         for (i = 0; i < events.length; i++) {
//           var event = events[i];
//           var when = event.start.dateTime;
//           if (!when) {
//             when = event.start.date;
//           }
//           appendPre(event.summary + ' (' + when + ')')
//         }
//       } else {
//         appendPre('No upcoming events found.');
//       }
//     });
//   }

//   function appendPre(message) {
//     var pre = document.getElementById('output');
//     var textContent = document.createTextNode(message + '\n');
//     pre.appendChild(textContent);
//   }


// function listEvents(auth) {
//     // 토큰 인증이 완료되면 최종적으로 실행되는 함수 입니다.
//     // 아래의 예제는 구글 캘린더에 등록된 이벤트 10개의 정보를 출력합니다.
//     const calendar = gapi.calendar({
//       version: 'v3',
//       auth
//     });
    
//     calendar.events.list({
//       auth: auth,
//       calendarId: 'primary', // 이곳에 이벤트를 가져올 캘린더 id를 입력해야 합니다.
//       timeMin: (new Date()).toISOString(),
//       maxResults: 10,
//       singleEvents: true,
//       orderBy: 'startTime'
//     }, (err, response) => {
//       if (err) return console.log('The API returned an error: ' + err);
//       const events = response.data.items;
//       if (events.length == 0) {
//         console.log('No upcoming events found.');
//       } else {
//         console.log('Upcoming 10 events:');
//         events.map((event, i) => {
//           const start = event.start.dateTime || event.start.date;
//           console.log(`${start} - ${event.summary}`);
//         });
//       }
//     });
  
//     // 다음은 구글 캘린더에 'DONGHWAN' 라는 이름의 캘린더가 있는지 확인하여
//     // 없다면 만들고 있다면 삭제해보겠습니다.
//     calendar.calendarList.list({
//       auth: auth
//     }, function (err, calendarList) {
//       if (err) console.log(err);
  
//       var deleteCalendarId; // 캘린더 삭제를 위한 아이디 변수
//       var isCGSCalendar = false; // 'DONGHWAN' 캘린더가 존재하는지 확인하기 위한 변수
  
//       // 'DONGHWAN' 캘린더가 있는지 확인
//       for (var i = 0; i < calendar.calendarList.length; i++) {
//         if (calendarList.items[i].summary === 'DONGHWAN') {
//           isCGSCalendar = true;
//           deleteCalendarId = calendarList.items[i].id;
//         }
//       }
  
//       if (isCGSCalendar) {
  
//         //     // 'DONGHWAN' 캘린더가 있다면 캘린더를 지움
//         calendar.calendars.delete({
//           auth: auth,
//           calendarId: deleteCalendarId
//         }, function (err, calendars) {
//           if (err) console.log(err);
//         });
  
//       } else {
  
//         //     // 'DONGHWAN' 캘린더가 없다면 캘린더를 만듬
//         calendar.calendars.insert({
//           auth: auth,
//           resource: {
//             summary: 'DONGHWAN'
//           }
//         }, function (err, calendars) {
//           if (err) console.log(err);
//         });   
//     }
//     });
// }

