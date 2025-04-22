
let listid ="";
function addList(listId){
    const listbox = document.getElementById(listId)
    const cards = document.getElementById(listId+"Cards")
    const list = document.getElementById(listId+"list")
    const textarea = document.getElementById(listId+"Input")
    const cardElement = document.createElement('li')
    cardElement.setAttribute("draggable","true");
    textarea.focus();
    const text = textarea.value.trim();
    if(!text){
        textarea.value="";
        textarea.focus();
        return ;
    }
    cardElement.innerText = text;
    textarea.value=""
    list.appendChild(cardElement)
    cardElement.addEventListener('dragstart', dragStart);
    cardElement.addEventListener('dragend',dragEnd);
    hideInput(listId)
}

let draggedCard = null;
function dragStart(){
    this.classList.add("draging")
    draggedCard = this;
}
function dragEnd(){
    this.classList.remove("draging")
    draggedCard = null;
}
function dragover(event){
    event.preventDefault();
    this.appendChild(draggedCard);

}


const columns = document.querySelectorAll(".list ul");
columns.forEach((col)=>{
    col.addEventListener("dragover", dragover);
})

function showInput(listId){
    const textinput = document.getElementById(listId+"InputContainer");
    const addText = document.querySelector(`#${listId} .add-text`);
    textinput.style.display="block";
    addText.style.display="none";
    listid = listId;
    
}

function hideInput(listId) {
    const inputContainer = document.getElementById(listId + "InputContainer");  
    const addText = document.querySelector(`#${listId} .add-text`);
    const textarea = document.getElementById(listId + "Input");
    if (!textarea.value.trim()) { // If empty, hide input and show "Add List"
        inputContainer.style.display = "none";
        addText.style.display = "block";
    }
}

document.body.addEventListener("click",(event)=>{
    if(!event.target.closest(`#${listid}InputContainer`)){
        hideInput(listid)
    }

});