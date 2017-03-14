$ = jQuery;
var events;
var d;

function urlify(text) {
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.replace(urlRegex, function(url) {
                        return '<a href="' + url + '">' + url + '</a>';
                            })
                // or alternatively
                // return text.replace(urlRegex, '<a href="$1">$1</a>')
}
function createEvent(e, b) {
        b.append($("<h3></h3>").append(e.summary))
        p = $("<p></p>")
        if (e.location) {
                b.append($("<strong>Where: </strong>")).append(e.location)
        }

        p.append($("<p></p>").append($("<strong>When: </strong>")).append(e.start.dateStr + " - " + e.end.dateStr))
        if (e.description) {
            d = $('<p style="white-space:pre-wrap"></p>').append($("<strong>Description: </strong>")).append(urlify(e.description))
        }
        p.append(d)
        b.append(p)

        /*if ($(d[0]).height() > 3) {
            b.append($("<p></p>").append("...<a href=''>Show More</a>"))
        }*/
        b.append($("<hr></hr>"))
}

function parseDate(date) {
    if (date.dateTime) {
        date.date = moment(date.dateTime)
        date.dateStr = date.date.format("dddd, MMMM Do YYYY, h:mm a")
    } else {
        date.date = moment(date.date)
        date.dateStr = date.date.format("dddd, MMMM Do YYYY")
    }
}

function parseDates(e) {
    parseDate(e.start)
    parseDate(e.end)
    return e
}

function compareDates(a, b) {
        return a.start.date > b.start.date
}

$(document).ready(function() {
        var calendarId = "habitat2030@gmail.com"
        var key = "AIzaSyBsOj2ogy76j7nS_nU47dd7CLWdY4HcGZA"
        var date = new Date()
        $.getJSON('https://www.googleapis.com/calendar/v3/calendars/' + calendarId  + '/events?key=' + key + '&timeMin=' + date.toISOString(), 
                function(data) {
                        events = data.items.map(parseDates).sort(compareDates)
                        for (i = 0; i < events.length; i++) {
                                createEvent(events[i], $('#events'))
                        }
        });

});
