let uploadedImages =  [];

window.onbeforeunload = function() {return "really leave now?"}

// PREVENTING DEFAULT SUBMISSION FOR FORM
let form = document.getElementById("file-upload");
form.addEventListener("submit", function(event){
    console.log("IT RUNS!");
    event.preventDefault();
});

// ADDING NEW BATCH
document.getElementById("add-batch").addEventListener("click", newBatch);

// DRAG THEATER
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

let renameFilesBtn = document.getElementById("rename-files");
renameFilesBtn.addEventListener("click", renameFiles);

function loadFile(event) {
	let list = event.target.parentElement.parentElement.lastElementChild;

    list.className = "no-after";

    console.log("LOADING");
    let files = [];
    list.innerHTML = "";
    for( let i = 0; i < event.target.files.length; i++ ){
        files.push(event.target.files[i]);

        let listItem = document.createElement("li");
        listItem.draggable = true;

        let image = document.createElement("img");
        image.src = URL.createObjectURL(event.target.files[i]);
        image.className = "image";
        image.name = event.target.files[i].name;

        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.innerText = "X";
        deleteBtn.className = "delete-btn"
        deleteBtn.addEventListener("click", function(event){
            let name = event.target.parentNode.children[0].name;
            for (let [k, batch] of uploadedImages.entries()){
                let index = -1;
                for (let [i, file] of batch.entries()) {
                       if( file.name == name ) index = i;
                }
                if (index > -1) batch.splice(index, 1);
                if ( batch.length == 0 ) uploadedImages.splice(k, 1);
            }
            list.removeChild(event.target.parentNode);
            if( hasNoChildren(list) ) list.classList.remove("no-after");
        });
        listItem.append( image, deleteBtn);
        list.append(listItem);
    }
    uploadedImages.push(files);
};

function newBatch(){
    let form = document.getElementById("file-upload");

    let batchName = document.getElementById("batch-name").value;
    let batchSuffix = document.getElementById("batch-suffix").value;
    let csv = document.getElementById("batch-csv").value;

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
    prefix.value = batchName;

    let suffix = document.createElement("input");
    suffix.type = "text";
    suffix.name = "suffix";
    suffix.id = "suffix";
    suffix.placeholder = "Suffix";
    suffix.value = batchSuffix;

    settings.append(fileUpload, prefix, suffix);

    let list = document.createElement("ul");
    listLength = document.querySelectorAll("ul").length + 1;
    list.id = `files-${listLength}`;  

    batch.append(settings, list);
    form.append(batch);
}

var dragging = null;

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

async function renameFiles(event){
    event.preventDefault;

    console.log("RENAMING");
    let batches = document.querySelectorAll(".batch");

    let formData = new FormData();
    
    for( let i = 0; i < batches.length; i++){
        let batch = batches[i];

        let name = batch.children[0].children[1].value;
        let suffix = batch.children[0].children[2].value;
        let list = batch.children[1];
        let listItems = list.children;

        imageNames = [];

        for(let i = 0; i < listItems.length; i++){
            let img = listItems[i].children[0];
            imageNames.push(img.name);
        }

        formData.append(`${i}-files`, `${name}-${suffix}`);

        let sortedFiles = sortArrayBy(uploadedImages[i], imageNames);
        console.log(sortedFiles);
        sortedFiles.forEach( file => {
            formData.append(`${i}-files[]`, file);
        })
    }
    upload(formData);
}

function upload(formData){
    let url = "http://localhost:7000";
    fetch(new Request(url,
        {
            method: 'POST',
            body: formData
        }))
        .then( response => response.json())
        .then(data => setDownloadBtnValue(data))
        .catch(console.log);
    }
function sortArrayBy(sortArr, sourceArr){
    let sortedArr = [];
    sortArr.forEach( item => {
        let index = sourceArr.indexOf( item.name );
        sortedArr.splice(index, 0, item);
    })
    return sortedArr;
}

function setDownloadBtnValue(data){
    let value = data["value"];
    let downloadBtn = document.querySelector("#downloadBtn");
    downloadBtn.value = value;
    downloadBtn.style.display = "block";

    downloadBtn.addEventListener("click", ()=> {
        window.location.href=value;
        let url = "http://localhost:7000";
        fetch(new Request(url,
            {
            method: 'GET'
            }
        ))
        .then( response => response.json())
        .then(console.log)
    })
}

function hasNoChildren(element){
    return element.children.length > 0 ? false : true;
}