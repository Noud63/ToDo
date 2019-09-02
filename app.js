const list = document.getElementById("list");
const input = document.getElementById("text");
const delAll = document.getElementById('delAll')
const delLast = document.getElementById('delLast')
const clear = document.getElementById('clr');
const submit = document.getElementById('btn');

//Classes
const checked = "fa-check-circle";    //check button
const unchecked = "fa-circle-thin";   // uncheck button
const line_through = "lineThrough";

//Variables
let listItems = [];  
let id = 0;

// Get item from localstorage
let data = localStorage.getItem('TODO');

// check if data in localStorage
if(data){
    listItems = JSON.parse(data);
      id = listItems.length             // set the id to last in list
      loadList(listItems)
}else{
    // if localStorage is empty so no data
    listItems = [];
    id = 0;
}

//Load list to UI
function loadList(array){
      array.forEach( el => {
          addToDo(el.name, el.id, el.done, el.trash)
      });
}

// Add item to localstorage ( write this code everywhere our list is updated)
localStorage.setItem('TODO', JSON.stringify(listItems))

//Add todo function

function addToDo(toDo, id, done, trash){

   if(trash){ return;}   //if item is in the trash, prevents the code to run

   const completed = done ? checked : unchecked;  // check if todo is comleted we use check class or uncheck class
   const crossOut = done ? line_through : "";  // if check = completed => add class line-through

//fa-circle-thin is changed by ${DONE} DONE = CHECK : UNCHECK = fa-check-circle or fa-circle-thin

    const html = ` <li class="item">
                   <span class="fa ${completed} co" job="complete" id="${id}"></span>
                   <span class="text ${crossOut}">${toDo}</span>
                   <span class="fa fa-trash-o de" job="delete" id="${id}"></span>
                   </li>
                  `
    
    list.insertAdjacentHTML("beforeend", html);
    
}

// Add an item when udser hit enter key
document.addEventListener('keyup', function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        if(toDo){                                                 // If input isn't empty
        addToDo(toDo, id, false, false)
         
        listItems.push({
               name: toDo,
                id : id,
               done: false,
              trash: false
        })
             localStorage.setItem('TODO', JSON.stringify(listItems))   // Add item to localstorage ( write this code everywhere our list is updated)
             id++;
        }
        input.value = "";                                        //clear input field
    }
})

//Add item to list use submit button
submit.addEventListener('click', function(e) {
    const toDo = input.value
    if(toDo){
        addToDo(toDo, id, false, false);
        listItems.push({
            name: toDo,
             id : id,
            done: false,
           trash: false
     })
        input.value = "";
    }else if(toDo === ""){
        alert("Please enter valid data!");
    }   
    localStorage.setItem('TODO', JSON.stringify(listItems))
})


// Complete to do when user clicks complete button
function completeToDo(element) {
    element.classList.toggle(checked);
    element.classList.toggle(unchecked);
    element.parentNode.querySelector('.text').classList.toggle(line_through);

    // Update LIST array
    console.log(element.id)
    listItems[element.id].done = listItems[element.id].done ? false : true;   
}

// Remove to do
function removeToDo(element){
     element.parentNode.parentNode.removeChild(element.parentNode);

     listItems[element.id].trash = true;   // set trash to true = delete
}

// Target list items 
list.addEventListener('click', function(event){
       const element = event.target;
       const elementJob = element.attributes.job.value;   // get job attribute returns complete or delete

       if( elementJob == "complete"){
           completeToDo(element);
       }else if(elementJob == "delete"){
           removeToDo(element);
       }
       localStorage.setItem('TODO', JSON.stringify(listItems))
})

// Clear list and localStorage
delAll.addEventListener('click', clearList)
function clearList(){

    if(listItems.length == 0){
        alert("No items to be removed!")
        return;
    }
    const c = confirm("Are you sure you want to delete all items?")
    if(c == true){
    localStorage.clear();
    location.reload();
    }
}

//Clear input
function clearInput(){
    input.value = "";
}
clear.addEventListener('click', function(e){
    if(input.value){
        clearInput();
    }
})

// Delete last item

// Date and time
var now = new Date();
var options = { month: "long" , weekday: "long", day: "numeric"}
var newTime = now.toLocaleDateString("en-EN", options)

var showCurrentTime = function () {
  // display the string on the webpage
  var clock = document.getElementById('date');

  var currentTime = new Date();
  var noon = 12;
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  var meridian = "AM";

  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var n = weekday[now.getDay()];

  // Set hours
  if (hours >= noon) {
    meridian = "PM";
  }
  if (hours < noon - 2) {
    hours = "0" + hours;
    meridian = "AM";
  }

  // Set Minutes
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  // Set Seconds
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  // put together the string that displays the time
  var today = newTime; 
  var time = hours + ':' + minutes + ':' + seconds;
  clock.innerText = today + " " + time
};

showCurrentTime();

// Clock is static, make it run visible
var oneSecond = 1000;
setInterval(showCurrentTime, oneSecond);

























