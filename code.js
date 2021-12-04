function loadFile(event) {

    console.log("loading file")
	let list = event.target.parentElement.parentElement.lastElementChild;

    list.innerHTML = "";

    for( let i = 0; i < event.target.files.length; i++ ){
        let listItem = document.createElement("li");
        listItem.draggable = true;
        let image = document.createElement("img");
        image.src = URL.createObjectURL(event.target.files[i]);
        image.className = "image";

        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.innerText = "delete";
        deleteBtn.addEventListener("click", function(event){
            list.removeChild(event.target.parentNode);
        });

       /*  let colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.value = "00000000"; */

        listItem.append( image, /* colorPicker, */ deleteBtn);
        list.append(listItem);
    };
};

let form = document.getElementById("file-upload");
form.addEventListener("submit", function(event){
    event.preventDefault();
});

document.getElementById("add-batch").addEventListener("click", newBatch);

function newBatch(){
    let form = document.getElementById("file-upload");

    let batch = document.createElement("div");
    batch.className = "batch";
    
    let settings = document.createElement("div");
    settings.className = "settings";
    
    let fileUpload = document.createElement("input");
    fileUpload.type = "file";
    fileUpload.name = "file[]";
    fileUpload.multiple = true;
    fileUpload.addEventListener("change",loadFile);

    let prefix = document.createElement("input");
    prefix.type = "text";
    prefix.name = "prefix";
    prefix.id = "prefix";
    prefix.placeholder = "New Name";

    let suffix = document.createElement("input");
    suffix.type = "text";
    suffix.name = "suffix";
    suffix.id = "suffix";
    suffix.placeholder = "Suffix";

    settings.append(fileUpload, prefix, suffix);

    let list = document.createElement("ul");
    listLength = document.querySelectorAll("ul").length + 1;
    list.id = `files-${listLength}`;  

    batch.append(settings, list);
    form.append(batch);
}

var dragging = null;

document.addEventListener('dragstart', function(event) {
    var target = getLI( event.target );
    dragging = target;
    event.dataTransfer.setData('text/plain', null);
    event.dataTransfer.setDragImage(self.dragging,0,0);
});

document.addEventListener('dragover', function(event) {
    event.preventDefault();
    var target = getLI( event.target );
    var bounding = target.getBoundingClientRect()
    var offset = bounding.y + (bounding.height/2);
    if ( event.clientY - offset > 0 ) {
       	target.style['border-bottom'] = 'solid 4px blue';
        target.style['border-top'] = '';
    } else {
        target.style['border-top'] = 'solid 4px blue';
        target.style['border-bottom'] = '';
    }
});

document.addEventListener('dragleave', function(event) {
    var target = getLI( event.target );
    target.style['border-bottom'] = '';
    target.style['border-top'] = '';
});

document.addEventListener('drop', function(event) {
    event.preventDefault();
    var target = getLI( event.target );
    if ( target.style['border-bottom'] !== '' ) {
        target.style['border-bottom'] = '';
        target.parentNode.insertBefore(dragging, event.target.nextSibling);
    } else {
        target.style['border-top'] = '';
        target.parentNode.insertBefore(dragging, event.target);
    }
});

function getLI( target ) {
    while ( target.nodeName.toLowerCase() != 'li' && target.nodeName.toLowerCase() != 'body' ) {
        target = target.parentNode;
    }
    if ( target.nodeName.toLowerCase() == 'body' ) {
        return false;
    } else {
        return target;
    }
}

let renameFilesBtn = document.getElementById("rename-files");
renameFilesBtn.addEventListener("click", renameFiles);

function renameFiles(){
    let batches = document.querySelectorAll(".batch");
    
    uploadList = [];

    batches.forEach( batch => {

        let imageBatch = {};

        let name = batch.children[0].children[1].value;
        let suffix = batch.children[0].children[2].value;
        let list = batch.children[1];
        let listItems = list.children;

        imageBatch.name = name;
        imageBatch.suffix = suffix;
        imageBatch.files = [];

        for( let i = 0; i < listItems.length; i++){
            let image = listItems[i].children[0].src;
            imageBatch.files.push(image);
        }
        uploadList.push(imageBatch);
    })
}