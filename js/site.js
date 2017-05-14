String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const parseFunctions = {BEGIN: eventStart};

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
    const lines = string.split("\n");
    console.log(string);
    let events = new Array();
    let event = null;
    for(var i = 0; i < lines.length; i++){
        const line = lines[i];
        if(event === null && eventStart === true)
            event = {type: "event"};
        else{

        }    
    }
}

function eventStart(string){
    return /BEGIN:VEVENT/.exec(string) !== null;
}