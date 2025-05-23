
let globalid =null;

function addList(listId){
    const taskBox = document.getElementById(listId)  //todo, doing or done
    const cards = document.getElementById(listId+"cards") // div in which list are placed
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
    console.log(listId)
    // store to localstorage
   storeLocal(listId, text);


    hideInput(listId)
}

let draggedCard = null;

function dragStart(){
    console.log("Inside dragStart")
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

function showInput(listId, event){
    event.stopPropagation();
    if(globalid && globalid!==listId){
        hideInput(globalid)
    }
    const textinput = document.getElementById(listId+"InputContainer");
    const addText = document.querySelector(`#${listId} .add-text`);

    textinput.style.display="flex";
    addText.style.display="none";
    globalid = listId;
    
    
}

function hideInput(listId) {
    const inputContainer = document.getElementById(listId + "InputContainer");  
    const addText = document.querySelector(`#${listId} .add-text`);
    const textarea = document.getElementById(listId + "Input");
    if (!textarea.value.trim()) { // If empty, hide input and show "Add List"
        inputContainer.style.display = "none";
        addText.style.display = "flex";
    }
}

document.body.addEventListener("click",(event)=>{
    if (globalid && !event.target.closest("#container") && !event.target.closest(`#${globalid}InputContainer`)){
        hideInput(globalid);
        globalid = null; // Reset after hiding
}
});



// store data in local storage
function storeLocal(listId, text){
    const listData = JSON.parse(localStorage.getItem(listId)) || [];
    listData.push(text);
    localStorage.setItem(listId, JSON.stringify(listData));
}

window.onload = function() {
    const listNames=JSON.parse(localStorage.getItem("listNames"))
    if(listNames==null){
        const addboard = document.getElementById('addBoard')
        addboard.innerHTML = '<span>+</span> add a list'
        
    }
    
    const lists = [...listNames,"todo", "doing", "done"]; // your list IDs
    listNames.forEach((el)=>{
        addAnotherList("manual", el)
    })
    lists.forEach(listId => {
        const listData = JSON.parse(localStorage.getItem(listId)) || [];
        const ul = document.getElementById(`${listId}list`);
        listData.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            li.setAttribute("draggable","true");
            li.addEventListener('dragstart', dragStart);
            li.addEventListener('dragend',dragEnd);
            ul.appendChild(li);


            const newUL = document.getElementById(`${listId}list`);
            newUL.addEventListener("dragover",dragover);
        });
    });
};

function addAnotherList(listid, titletxt = null){
    
    const container = document.querySelector(".container")
    const title = document.getElementById(listid+"Input")
    let rawTitleTxt=titletxt || title.value.toLowerCase().trim() 
    const noSpaceTitleTxt = rawTitleTxt.replace(/\s+/g, "");
    if(!rawTitleTxt){
        if(title){
            title.value=""
            title.focus();
        }
        return;
    }

    const listDiv = document.createElement("div")
    //List container
    listDiv.className=`${noSpaceTitleTxt} list`
    listDiv.id = noSpaceTitleTxt;

    //creating heading div
    const heading = document.createElement("div")
    heading.className = "heading"
    const h3 =document.createElement("h3")
    h3.innerText = titletxt || title.value.trim();
    heading.appendChild(h3);
    listDiv.appendChild(heading)


    //ccrd section
    const cards = document.createElement("div")
    cards.className="cards";
    cards.id = `${noSpaceTitleTxt}cards`

    const ul = document.createElement("ul")
    ul.className = "card"
    ul.id = `${noSpaceTitleTxt}list`

    cards.appendChild(ul)
    listDiv.appendChild(cards)

    // createing footer div
    const footer = document.createElement("div")
    footer.className = "footer"

    const addtxt = document.createElement("div");
    addtxt.className= "add-text"
    const p = document.createElement("p")
    p.innerHTML = "<span>+ </span> Add a card"
    p.setAttribute("onclick",`showInput("${noSpaceTitleTxt}",event)`)
    addtxt.appendChild(p)
    footer.appendChild(addtxt)

    //creating input container
    const inputContainer = document.createElement('div')
    inputContainer.className= "inputContainer";
    inputContainer.id = `${noSpaceTitleTxt}InputContainer`

    const textarea = document.createElement("textarea")
    textarea.setAttribute("name","input");
    textarea.setAttribute("dir","auto")
    textarea.setAttribute("placeholder","Enter a title")
    textarea.id=`${noSpaceTitleTxt}Input`

    const addlistbtn = document.createElement("button")
    addlistbtn.setAttribute("onclick",`addList("${noSpaceTitleTxt}")`)
    addlistbtn.innerText="Add Card"
    inputContainer.appendChild(textarea);
    inputContainer.appendChild(addlistbtn)
    footer.appendChild(inputContainer)

    listDiv.appendChild(footer)
    container.appendChild(listDiv)
    
    if(title) title.value = ""
    if(listid!=="manual") hideInput(listid);


    const newUl = document.getElementById(`${noSpaceTitleTxt}list`);
    newUl.addEventListener("dragover", dragover);

    //store list in local storage
    listLocalStorage(noSpaceTitleTxt)

    textarea.addEventListener('keydown',(e)=>{
        if(e.key==='Enter'){
            addList(noSpaceTitleTxt)
            showInput(noSpaceTitleTxt, event)
        }
    })

}

function listLocalStorage(listid){
    const list = JSON.parse(localStorage.getItem("listNames")) || [];
    if(!list.includes(listid)){
        list.push(listid)
        localStorage.setItem('listNames', JSON.stringify(list))
    } 
}

function clearLocalStoreage(){
    localStorage.clear();
    window.location.reload();
}


//Making the Board Name editable
const leftNavbar = document.getElementById('leftNavbar')
const heading = document.getElementById('boardName')
heading.addEventListener('click',()=>{
    const input = document.createElement('input')
    input.value = heading.innerText;
    input.style.position = 'absolute';
    input.style.top = heading.offsetTop + "px"
    input.style.left = heading.offsetLeft + "px"
    input.style.width = heading.offsetWidth + "px";
    input.style.height = heading.offsetHeight + "px";
    input.style.fontSize = "1.5em";  // match your h2 font
    input.style.border = "none";
    input.style.padding = "0";
    input.style.margin = "0";
    input.style.boxSizing = "border-box";
    heading.style.visibility = 'hidden'
    leftNavbar.appendChild(input)
    input.focus();
    input.select();
    heading.style.visibility = 'hidden'


    input.addEventListener('blur',()=>{
        heading.innerText = input.value;
        heading.style.visibility = 'visible'
        input.remove();
    })

    input.addEventListener('keydown',(e)=>{
        if(e.key === "Enter"){
            input.blur();
        }
    })
})