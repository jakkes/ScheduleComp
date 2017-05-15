String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const parseFunctions = {
                            BEGIN: eventStart,
                            END: eventEnd,
                            DTSTART: dateStart
                        };

function upload(){
    const uploader = document.getElementById("fileUploader");
    const files = uploader.files;

    var reader = new FileReader();
    reader.onloadend = function(e){
        parseToEvents(e.currentTarget.result);
    }
    for(let i = 0; i < files.length; i++)
        reader.readAsText(files[0]);

}

function parseToEvents(string){
    const lines = string.split("\n ");
    console.log(string);
    let events = new Array();
    let event = null;
    for(var i = 0; i < lines.length; i++){
        const line = lines[i];
        parseFunctions[line.split(':')[0]](event,line)
    }
}

function eventStart(event, string, events){
    if(/BEGIN:VEVENT/.exec(string) !== null)
        return { event: "event" };
}
function eventEnd(event, string, events){
    if(/END:VEVENT/.exec(string) !== null){
        events.push(event);
        return null;
    }
    return event;
}
function dateStart(event, string, events){
    const match = /DTSTART:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/.exec(string);
    if(match !== null){
        event.dateStart = new Date(match[1],match[2],match[3],match[4],match[5],match[6]);
        return event;
    }
    return event;
}
function dateEnd(event, string, events){
    const match = /DTEND:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/.exec(string);
    if(match !== null){
        event.dateEnd = new Date(match[1],match[2],match[3],match[4],match[5],match[6]);
        return event;
    }
    return event;
}