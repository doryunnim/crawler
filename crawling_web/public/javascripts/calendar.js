function checkAuth() {
    gapi.auth.authorize({
        'client_id': '1002155686603-gj9ti6nelce9upu9i4pcdkmdkphi1kqb.apps.googleusercontent.com',
        'scope': "https://www.googleapis.com/auth/calendar",
        'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        loadCalendarApi();
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
}
/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
    gapi.auth.authorize({
            client_id: '1002155686603-gj9ti6nelce9upu9i4pcdkmdkphi1kqb.apps.googleusercontent.com',
            scope: "https://www.googleapis.com/auth/calendar",
            immediate: false
        },
        handleAuthResult);
    return false;
}
/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

function listCalendars() {
    var request = gapi.client.calendar.calendarList.list();
    request.execute(function (resp) {
        var cals = resp.items;
        appendPre('Your calendars:');
        if (cals.length > 0) {
            for (i = 0; i < cals.length; i++) {
                var calendar = cals[i];

                appendPre(calendar.summary + ' (' + calendar.id + ')')
            }
        } else {
            appendPre('No calendars found.');
        }
    });
}
/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    var request = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        /* Can be 'primary' or a given calendarid */
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    });
    request.execute(function (resp) {
        var events = resp.items;
        appendPre('Upcoming events:');
        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                appendPre(event.summary + ' (' + when + ')')
            }
        } else {
            appendPre('No upcoming events found.');
        }

        // gapi.client.calendar.calendarList.list({
        //     auth: gapi.auth
        // }, function (err, calendarList) {
        //     if (err) console.log(err);

            // var deleteCalendarId; // 캘린더 삭제를 위한 아이디 변수
            // var isCGSCalendar = false; // 'DONGHWAN' 캘린더가 존재하는지 확인하기 위한 변수

            // // 'DONGHWAN' 캘린더가 있는지 확인
            // for (var i = 0; i < gapi.client.calendar.calendarList.length; i++) {
            //     if (gapi.client.calendarList.items[i].summary === 'DONGHWAN') {
            //         isCGSCalendar = true;
            //         deleteCalendarId = gapi.client.calendarList.items[i].id;
            //     }
            // }

            // if (isCGSCalendar) {
            //     //     // 'DONGHWAN' 캘린더가 있다면 캘린더를 지움
            //     gapi.client.calendar.calendars.delete({
            //         auth: gapi.auth,
            //         calendarId: deleteCalendarId
            //     }, function (err, calendars) {
            //         if (err) console.log(err);
            //     });

            // } else {
            //     //     // 'DONGHWAN' 캘린더가 없다면 캘린더를 만듬
            //     gapi.client.calendar.calendars.insert({
            //         auth: gapi.auth,
            //         resource: {
            //             summary: 'DONGHWAN'
            //         }
            //     }, function (err, calendars) {
            //         if (err) console.log(err);
            //     });
            // }
        });
    // });
}
/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}