

function upload(){
    const uploader = document.getElementById("fileUploader");
    const files = uploader.files;

    var reader = new FileReader();
    reader.onloadend = function(e){
        console.log(e);
    }
    reader.readAsText(files[0]);

}