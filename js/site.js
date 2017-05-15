String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const eventParseFunctions = {
                            DTSTART: dateStart,
                            DTEND: dateEnd,
                            UID: uid,
                            URL: url,
                            "LAST-MODIFIED": lastModified,
                            SUMMARY: summary,
                            LOCATION: loc,
                            DESCRIPTION: description
                        };

const calParseFunctions = {
                            VERSION: version,
                            METHOD: method,
                            "X-WR-CALNAME": calName
                        }

const commandCheckUp = {
    DTSTART: "dateStart",
    DTEND: "dateEnd",
    UID: "uid",
    URL: "url",
    "LAST-MODIFIED": "lastModified",
    SUMMARY: "summary",
    LOCATION: "location",
    DESCRIPTION: "description",
    VERSION: "version"
}

function upload(){
    const uploader = document.getElementById("fileUploader");
    const files = uploader.files;

    var reader = new FileReader();
    reader.onloadend = function(e){
        const events = parseToCalendars(e.currentTarget.result);
        console.log(events);
    }
    for(let i = 0; i < files.length; i++)
        reader.readAsText(files[0]);
}
function parseToCalendars(string){
    const lines = string.split("\r\n");
    let cals = new Array();
    let cal = null;
    let event = null;
    let prevCmd = null;
    for(var i = 0; i < lines.length; i++){
        const line = lines[i];
        if(cal === null && calStart(line) === true){
            cal = { events: new Array() };
        } else if(calEnd(line) === true){
            cals.push(cal);
            cal = null;
        } else if (false){

        } else if(cal !== null && cal.events !== null) {
            if(event === null && eventStart(line) === true)
                event = { event: "event" };
            else if(eventEnd(line) === true){
                cal.events.push(event);
                event = null;
            } else if(event !== null){
                const cmd = getCmd(line);
                if(cmd !== null){
                    if(cmd in eventParseFunctions){
                        eventParseFunctions[cmd](event,line);
                        prevCmd = cmd;
                    } else prevCmd = null;
                }
                else if(cmd === null && prevCmd !== null){
                    event[commandCheckUp[prevCmd]] += line.slice(1);
                }
            }
        }
    }
    return cals;
}
function getCmd(line){
    const match = /^([A-Z\-]+):/.exec(line);
    if(match !== null)
        return match[1];
    else return null;
}
function calStart(line){
    return /BEGIN:VCALENDAR/.exec(line) !== null;
}
function calEnd(line){
    return /END:VCALENDAR/.exec(line) !== null;
}
function version(cal, line){
    const match = /VERSION:([\d\.]+)/.exec(line);
    if(match !== null)
        cal.version = match[1];
}
function method(cal,line){
    const match = /METHOD:(.*)/.exec(line);
    if(match !== null)
        cal.method = match[1];
}
function calName(cal,line){

}
function eventStart(string){
    return /BEGIN:VEVENT/.exec(string) !== null;
}
function eventEnd(string){
    return /END:VEVENT/.exec(string) !== null;
}
function dateStart(event, string){
    const match = /DTSTART:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/.exec(string);
    if(match !== null){
        event.dateStart = new Date(match[1],match[2]-1,match[3],match[4],match[5],match[6]);
    }
}
function dateEnd(event, string){
    const match = /DTEND:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/.exec(string);
    if(match !== null){
        event.dateEnd = new Date(match[1],match[2]-1,match[3],match[4],match[5],match[6]);
    }
}
function uid(event,string,events){
    const match = /UID:(.*)/.exec(string);
    if(match !== null){
        event.uid = match[1];
    }
}
function dateStamp(event, string){
    const match = /DTSTAMP:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/.exec(string);
    if(match !== null){
        event.dateStamp = new Date(match[1],match[2]-1,match[3],match[4],match[5],match[6]);
    }
}
function lastModified(event,string){
    const match = /LAST-MODIFIED:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/.exec(string);
    if(match !== null){
        event.lastModified = new Date(match[1],match[2]-1,match[3],match[4],match[5],match[6]);
    }
}
function url(event,string){
    const match = /URL:(.*)/.exec(string);
    if(match !== null){
        event.url = match[1];
    }
}
function summary(event,string){
    const match = /SUMMARY:(.*)/.exec(string);
    if(match !== null)
        event.summary = match[1];
}
function loc(event,string){
    const match = /LOCATIOM:(.*)/.exec(string);
    if(match !== null)
        event.location = match[1];
}
function description(event,string){
    const match = /DESCRIPTION:(.*)/.exec(string);
    if(match !== null)
        event.description = match[1];
}