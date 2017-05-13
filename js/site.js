

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
    let events = new Array();
    
}