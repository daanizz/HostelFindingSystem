let aboutTab = document.getElementById("aboutTab");
let aboutButton = document.getElementById("aboutButton");

let timeToVisitTab = document.getElementById("timeToVisitTab");
let timeToVisitButton = document.getElementById("timeToVisitButton");

let attractionsTab = document.getElementById("attractionsTab");
let attractionsButton = document.getElementById("attractionsButton");

timeToVisitTab.classList.add("d-none");
attractionsTab.classList.add("d-none");

function about() {
    timeToVisitTab.classList.add("d-none");
    attractionsTab.classList.add("d-none");
    aboutTab.classList.remove("d-none");
    aboutButton.classList.add("selected-button");
    timeToVisitButton.classList.remove("selected-button");
    attractionsButton.classList.remove("selected-button");
    console.log("about is working");

}

function timeToVisit() {
    timeToVisitTab.classList.remove("d-none");
    aboutTab.classList.add("d-none");
    attractionsTab.classList.add("d-none");

    aboutButton.classList.add("button");
    aboutButton.classList.remove("selected-button");
    timeToVisitButton.classList.add("selected-button");
    attractionsButton.classList.add("button");
    attractionsButton.classList.remove("selected-button");
}

function attractions() {
    attractionsTab.classList.remove("d-none");
    aboutTab.classList.add("d-none");
    timeToVisitTab.classList.add("d-none");

    aboutButton.classList.add("button");
    aboutButton.classList.remove("selected-button");
    timeToVisitButton.classList.add("button");
    timeToVisitButton.classList.remove("selected-button");
    attractionsButton.classList.add("selected-button");


}
let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");

let todoList = [
  {
    text: "Best Hostel ever",
    uniqueNo: 1
  },
  {
    text: "Unlimited wifi 24X7",
    uniqueNo: 2
  },
  {
    text: "Toilets used be better",
    uniqueNo: 3
  }
];

let todosCount = todoList.length;


addTodoButton.onclick=function(){
    let userInputElement = document.getElementById("todoUserInput");
  let userInputValue = userInputElement.value;

  if(userInputValue === ""){
    alert("Enter Valid Text");
    return;
  }

  todosCount = todosCount + 1;

  let newTodo = {
    text: userInputValue,
    uniqueNo: todosCount
  };

  console.log(userInputValue);
  


  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = 'todo' + newTodo.uniqueNo;
  todoItemsContainer.appendChild(todoElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
   /*labelElement.setAttribute("for", checkboxId);*/
  /*labelElement.id = labelId;*/
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = userInputValue;
  labelContainer.appendChild(labelElement);

  userInputElement.value = "";
}
