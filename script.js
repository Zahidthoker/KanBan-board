
let listid ="";
function addList(listId){
    const taskBox = document.getElementById(listId)  //todo, doing or done
    const cards = document.getElementById(listId+"Cards") // div in which list are placed
    const list = document.getElementById(listId+"list")// ul in which lists are placed
    const textarea = document.getElementById(listId+"Input")// text are where we write list names
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

    textinput.style.display="flex";
    addText.style.display="none";

    
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