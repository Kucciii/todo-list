let addBtn = document.getElementById("addBtn")
let inputSrc = document.getElementById("inputSrc")
let tasksContainer = document.getElementById("tasks")
let emptyBtn = document.getElementById("emptyBtn")
let isListEmpty = true;

const listChangeEvent = new Event("listChange")

let tasks = []

let existingTasks = JSON.parse(localStorage.getItem("tasks"))

function loadFromStorage() {
  if (!JSON.parse(localStorage.getItem("tasks"))) 
  {
    tasksContainer.innerHTML = `<h2 class="text-gray-400">You currently have no tasks.</h2>`
  }
  else {
    tasks = existingTasks
    printTasks() 
  }
  document.dispatchEvent(listChangeEvent)
}

function printTasks() {
    tasksContainer.innerHTML = ""
    tasks.forEach(task => {
        tasksContainer.innerHTML += `<div class="flex items-center">
        <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 bg-gray-900 my-2">
          <input id="bordered-checkbox-${tasks.indexOf(task)+1}" type="checkbox" value="" name="bordered-checkbox"
            class="checkTask w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
          <label for="bordered-checkbox-${tasks.indexOf(task)+1}"
            class="w-full py-4 pr-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${task.taskMsg}</label>
        </div>
      </div>`
    })
    document.dispatchEvent(listChangeEvent)
}

function addTask() {
  if (!inputSrc.value) alert ("Please enter a task first!")
  else {
    let newTask = {
        taskMsg: inputSrc.value,
        taskStatus: false
    }
    tasks.push(newTask)
    printTasks()
    localStorage.setItem("tasks", JSON.stringify(tasks))
    inputSrc.value = null
    addBtn.setAttribute("disabled", "")
  }
}

function emptyTasks() {
  tasks = []
  localStorage.removeItem("tasks")
  loadFromStorage()
}

addBtn.addEventListener('click', addTask)

emptyBtn.addEventListener('click', emptyTasks)

window.addEventListener('load', loadFromStorage)

inputSrc.oninput = () => {
  if(inputSrc.value) addBtn.removeAttribute("disabled")
  else addBtn.setAttribute("disabled", "")
}

document.addEventListener('listChange', () => {
  if(tasks.length == 0) emptyBtn.setAttribute("disabled", "")
  else emptyBtn.removeAttribute("disabled")
})