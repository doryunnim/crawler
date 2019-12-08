const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('./config/google.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

function authorize(credentials, callback) {
  const {
    client_secret,
    client_id,
    redirect_uris
  } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });


  function getAccessToken(oAuth2Client, callback) {
    authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }
}

function listEvents(auth) {
  // 토큰 인증이 완료되면 최종적으로 실행되는 함수 입니다.
  // 아래의 예제는 구글 캘린더에 등록된 이벤트 10개의 정보를 출력합니다.
  const calendar = google.calendar({
    version: 'v3',
    auth
  });
  
  calendar.events.list({
    auth: auth,
    calendarId: 'primary', // 이곳에 이벤트를 가져올 캘린더 id를 입력해야 합니다.
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, (err, response) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = response.data.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    }
  });

  // 다음은 구글 캘린더에 'DONGHWAN' 라는 이름의 캘린더가 있는지 확인하여
  // 없다면 만들고 있다면 삭제해보겠습니다.
  calendar.calendarList.list({
    auth: auth
  }, function (err, calendarList) {
    if (err) console.log(err);

    var deleteCalendarId; // 캘린더 삭제를 위한 아이디 변수
    var isCGSCalendar = false; // 'DONGHWAN' 캘린더가 존재하는지 확인하기 위한 변수

    // 'DONGHWAN' 캘린더가 있는지 확인
    for (var i = 0; i < calendar.calendarList.length; i++) {
      if (calendarList.items[i].summary === 'DONGHWAN') {
        isCGSCalendar = true;
        deleteCalendarId = calendarList.items[i].id;
      }
    }

    if (isCGSCalendar) {

      //     // 'DONGHWAN' 캘린더가 있다면 캘린더를 지움
      calendar.calendars.delete({
        auth: auth,
        calendarId: deleteCalendarId
      }, function (err, calendars) {
        if (err) console.log(err);
      });

    } else {

      //     // 'DONGHWAN' 캘린더가 없다면 캘린더를 만듬
      calendar.calendars.insert({
        auth: auth,
        resource: {
          summary: 'DONGHWAN'
        }
      }, function (err, calendars) {
        if (err) console.log(err);
      });   
  }
  });
}

// function listEvents(auth) {
//   // 토큰 인증이 완료되면 최종적으로 실행되는 함수 입니다.
//   // 아래의 예제는 구글 캘린더에 등록된 이벤트 10개의 정보를 출력합니다.
//   const calendar = google.calendar({
//     version: 'v3',
//     auth
//   });

//   calendar.events.list({
//     auth: auth,
//     calendarId: 'primary', // 이곳에 이벤트를 가져올 캘린더 id를 입력해야 합니다.
//     timeMin: (new Date()).toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: 'startTime'
//   }, (err, response) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const events = response.data.items;
//     if (events.length == 0) {
//       console.log('No upcoming events found.');
//     } else {
//       console.log('Upcoming 10 events:');
//       events.map((event, i) => {
//         const start = event.start.dateTime || event.start.date;
//         console.log(`${start} - ${event.summary}`);
//       });
//     }
//   });

//   // 다음은 구글 캘린더에 'DONGHWAN' 라는 이름의 캘린더가 있는지 확인하여
//   // 없다면 만들고 있다면 삭제해보겠습니다.
//   calendar.calendarList.list({
//     auth: auth
//   }, function (err, calendarList) {
//     if (err) console.log(err);

//     var deleteCalendarId; // 캘린더 삭제를 위한 아이디 변수
//     var isCGSCalendar = false; // 'DONGHWAN' 캘린더가 존재하는지 확인하기 위한 변수

//     // 'DONGHWAN' 캘린더가 있는지 확인
//     for (var i = 0; i < calendar.calendarList.length; i++) {
//       if (calendarList.items[i].summary === 'DONGHWAN') {
//         isCGSCalendar = true;
//         deleteCalendarId = calendarList.items[i].id;
//       }
//     }

//     if (isCGSCalendar) {

//       //     // 'DONGHWAN' 캘린더가 있다면 캘린더를 지움
//       calendar.calendars.delete({
//         auth: auth,
//         calendarId: deleteCalendarId
//       }, function (err, calendars) {
//         if (err) console.log(err);
//       });

//     } else {

//       //     // 'DONGHWAN' 캘린더가 없다면 캘린더를 만듬
//       calendar.calendars.insert({
//         auth: auth,
//         resource: {
//           summary: 'DONGHWAN'
//         }
//       }, function (err, calendars) {
//         if (err) console.log(err);
//       });

//     }

//     calendar.events.insert({})
//   });
// }