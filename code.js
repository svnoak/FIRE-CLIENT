let uploadedImages = [];

window.addEventListener("dragover",function(e){
    e = e || event;
    e.preventDefault();
  },false);
  window.addEventListener("drop",function(e){
    e = e || event;
    e.preventDefault();
  },false);

//window.onbeforeunload = function() {return "really leave now?"}

// PREVENTING DEFAULT SUBMISSION FOR FORM
let form = document.getElementById("file-upload");
form.addEventListener("submit", function(event){
    console.log("IT RUNS!");
    event.preventDefault();
});

// ADDING NEW BATCH
document.getElementById("add-batch").addEventListener("click", newBatch);

/* 
const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach( draggable => {
    draggable.addEventListener('dragstart', () => {
        console.log("dragstart");
        draggable.classList.add("dragging");
    } );
});

draggables.forEach( draggable => {
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove("dragging");
    } );
}) */

let renameFilesBtn = document.getElementById("rename-files");
renameFilesBtn.addEventListener("click", renameFiles);

let optionsToggle = document.querySelector("#batch-buttons > .options");
optionsToggle.addEventListener("click", toggleOptions);

function loadFile(event) {
	let list = event.target.parentElement.parentElement.lastElementChild;

    list.classList.add("no-after");

    console.log("LOADING");
    let files = [];
    list.innerHTML = "";
    for( let i = 0; i < event.target.files.length; i++ ){
        files.push(event.target.files[i]);

        let listItem = document.createElement("li");
        listItem.draggable = true;
        listItem.className = "draggable";
        listItem.dataset.batch = list.id;

        /* listItem.addEventListener('dragstart', (event) => {
            event.target.classList.add("dragging");
        })

        listItem.addEventListener('dragend', (event) => {
            event.target.classList.remove("dragging");
        }) */

        let image = document.createElement("img");
        image.src = URL.createObjectURL(event.target.files[i]);
        image.className = "image";
        image.name = event.target.files[i].name;

        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.innerText = "X";
        deleteBtn.className = "delete-file-btn"
        deleteBtn.addEventListener("click", function(event){
            let item = event.target.parentNode.children[0];
            removeFile(item);
            list.removeChild(event.target.parentNode);
            if( hasNoChildren(list) ) list.classList.remove("no-after");
        });
        listItem.append( image, deleteBtn);
        list.append(listItem);
    }
    let batchName = list.id;
    uploadedImages[batchName] = [];
    uploadedImages[batchName].push(files);
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
    list.className = "container";

   //let sortable = Sortable.create(list);

    /* list.addEventListener('dragover', (event) => {
        event.preventDefault();
        //const afterElement = getDragAfterElement(event.target, event.clientX);
        const draggable = document.querySelector('.draggable');
        if( draggable.dataset.batch == list.id ){
            list.appendChild(draggable);
        }
    }) */
    
    let btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";

    let removeBatchBtn = document.createElement("button");
    removeBatchBtn.innerText = "X";
    removeBatchBtn.className = "delete-batch-btn";
    removeBatchBtn.addEventListener("click", removeBatch);

    btnContainer.append(removeBatchBtn);

    batch.append(btnContainer, settings, list);
    form.append(batch);
}

/* function getDragAfterElement(container, x){
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = box.y - box.top - box.height / 2;
        console.log(closest);
        if( offset < 0 && offset > closest.offset){
            return { "offset": offset, "element": child }
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
} */

async function renameFiles(event){
    event.preventDefault;

    console.log("RENAMING");
    let batches = document.querySelectorAll(".batch");

    let formData = new FormData();
    
    for( let i = 0; i < batches.length; i++){
        let batch = batches[i];

        let name = batch.children[1].children[1].value;
        let suffix = batch.children[1].children[2].value;
        let list = batch.children[2];
        let listItems = list.children;

        imageNames = [];

        for(let i = 0; i < listItems.length; i++){
            let img = listItems[i].children[0];
            imageNames.push(img.name);
        }

        formData.append(`${i}-files`, `${name}-${suffix}`);

        let sortedFiles = sortArrayBy(uploadedImages[`files-${i+1}`][0], imageNames);
        console.log(sortedFiles);
        sortedFiles.forEach( file => {
            console.log(file);
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

function toggleOptions(){
    let options = document.getElementById("batch-options");
    options.classList.toggle("visible");
}

function removeBatch(event){
    let batch = event.target.parentElement.parentElement;
    let nodes = batch.children[2].childNodes;
    nodes.forEach( listItem => {
        let file = listItem.children[0];
        removeFile(file);
    })
    batch.remove();
}

function removeFile(file){
    let name = file.name;
    for (let [k, batch] of uploadedImages.entries()){ // NEEDS FIXING!
        let index = -1;
        for (let [i, file] of batch.entries()) {
                if( file.name == name ) index = i;
        }
        if (index > -1) batch.splice(index, 1);
        if ( batch.length == 0 ) uploadedImages.splice(k, 1);
    }
}