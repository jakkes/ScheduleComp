String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
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
    string = string.replaceAll("\n","");
    console.log(string);
    let events = new Array();
    const regex = /BEGIN:VEVENT.*DTSTART:(.*)DTEND:(.*)UID:(.*)DTSTAMP:(.*)LAST-MODIFIED:(.*)URL:(.*)SUMMARY:(.*)LOCATION:(.*)DESCRIPTION:(.*)END:VEVENT/;
    console.log(regex.exec(string));
}

function checkEventStart(string){
}