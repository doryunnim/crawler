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
        loadCalendarApi();
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
        'orderBy': 'startTime'
    });
    request.execute(function (resp) {
        var events = resp.items;
        if (events.length > 0) {
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
            }
        } else {
        }
    });

}

function testAdd() {
    var profile = gauth.currentUser.get().getBasicProfile();
    if (profile) {
        var profileEmail = profile.getEmail();
        var xhr = new XMLHttpRequest();
        var data = {
            'user_email': profileEmail,
        };
        data = JSON.stringify(data);
        var url = "/calendar/add/"

        xhr.onload = function () {
            if (xhr.status === 200 || xhr.status === 201) {
                var addCheck = JSON.parse(xhr.responseText);
                addCheck.map((add) => {
                    var brand_name = add.brand_name;
                    var brand_title = add.title;
                    var summary = brand_name +" "+ brand_title;
                    var brand_date = add.date;
                    var date = brand_date.split('~')
                    date[0] = date[0].replace('.', '-');
                    date[0] = date[0].replace('.', '-').trim(date[0]);
                    date[1] = date[1].replace('.', '-');
                    date[1] = date[1].replace('.', '-').trim(date[1]);

                        var event = {
                            "summary": summary,
                            "end": {
                                "dateTime": date[1] + "T17:00:00-07:00"
                            },
                            "start": {
                                "dateTime": date[0] + "T09:00:00-07:00"
                            },
                        };
                        var request_insert = gapi.client.calendar.events.insert({
                            calendarId: 'primary',
                            resource: event,
                        }, function (err, event) {
                            if (err) {
                                console.log('There was an error contacting the Calendar service: ' + err);
                                return;
                            }
                            console.log('Event created: %s', event.htmlLink);
                        });

                        request_insert.execute((resp) => {})
                    });
                }
            }
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type', "application/json");
            xhr.send(data);
        }
        alert('구글 캘린더에 등록했습니다.')
}
/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */

