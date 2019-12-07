const {google} = require('googleapis');

function listEvents(auth) {
    // 토큰 인증이 완료되면 최종적으로 실행되는 함수 입니다.
    // 아래의 예제는 구글 캘린더에 등록된 이벤트 10개의 정보를 출력합니다.
    const calendar = google.calendar({version: 'v3', auth});
   
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
      auth : auth
    }, function(err, calendarList){
      if(err) console.log(err);
   
      var deleteCalendarId; // 캘린더 삭제를 위한 아이디 변수
      var isCGSCalendar = false; // 'DONGHWAN' 캘린더가 존재하는지 확인하기 위한 변수
   
      // 'DONGHWAN' 캘린더가 있는지 확인
        for(var i=0; i<calendar.calendarList.length; i++){
            if(calendarList.items[i].summary === 'DONGHWAN'){
                isCGSCalendar = true;
                deleteCalendarId = calendarList.items[i].id;
            }
        }
   
      if(isCGSCalendar){
   
    //     // 'DONGHWAN' 캘린더가 있다면 캘린더를 지움
        calendar.calendars.delete({
          auth : auth,
          calendarId : deleteCalendarId
        }, function(err, calendars){
          if(err) console.log(err);
        });
   
      }else{
   
    //     // 'DONGHWAN' 캘린더가 없다면 캘린더를 만듬
        calendar.calendars.insert({
          auth : auth,
          resource : {
            summary : 'DONGHWAN'
          }
        }, function(err, calendars){
          if(err) console.log(err);
        });
   
      }
      
        calendar.events.insert({})
    });
}

