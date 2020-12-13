'use strict';

const inputItem = document.querySelector('.input__item');
const inputButton = document.querySelector('.add__item');
const pendingContent = document.querySelector('.pending__content');
const completedContent = document.querySelector('.completed__content');
const counterContent = document.querySelector('.counter')
const notodosContent = document.querySelector('.notodos__content');
const showHideButton = document.querySelector('.show__button');
const clearButton = document.querySelector('.clear__button');

let storageId = 1;
let counter = 0;


// Show date
function realDate() {
    const now = new Date();
    const displayedDay = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long'
    }).format(now);
    const displayedDate = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }).format(now);

    document.querySelector('.date').textContent = `${displayedDay} \n ${displayedDate}`;
}
realDate();

const counterReset = () => {
    counter = 0;
    counterContent.textContent = counter;
}

const counterUpdate = (direction) => {
    if (direction) counter += 1;
    else counter -= 1;
    counterContent.textContent = counter;
}

// Delete items from html and local storage
function deleteStorage(id) {
    document.querySelector(`[data-id="${id}"]`).parentElement.remove();
    localStorage.removeItem(id);
    counterUpdate(false);
}

const addDeleteTodoEventListener = (id) => document.querySelector(`[data-id="${id}"]`).addEventListener('click', () => deleteStorage(id));


// Completed todos
function todoCompleted(id) {
    let valueString = localStorage.getItem(id);
    valueString = valueString.replace('"state":1', '"state":2');
    localStorage.setItem(id, valueString);
    const checkBox = document.querySelector(`[data-setid="${id}"]`);
    const checkTodo = checkBox.parentElement;
    checkTodo.remove();
    checkBox.disabled = true;
    completedContent.insertBefore(checkTodo, completedContent.firstChild);
    counterUpdate(false);
}

const addCompletedTodoEventListener = (id) => document.querySelector(`[data-setid="${id}"]`).addEventListener('click', () => todoCompleted(id));

// Create todo list
function createTodoItem(text, id, state) {
    let isChecked = '';
    let parentContainer = pendingContent;
    const pendingItem = document.createElement('div');
    pendingItem.classList.add('pending__item');
    if (parseInt(state) === 2) {
        parentContainer = completedContent;
        isChecked = 'checked disabled';
    } else {
        counterUpdate(true);
    }
    pendingItem.innerHTML = `<input class="pending__check" type="checkbox" ${isChecked} name="pending__check" data-setid="${id}"><label class="pending__text">${text}</label><button class="delete__item" data-id="${id}"><i class="fa fa-trash"></i></button>`;
    parentContainer.insertBefore(pendingItem, parentContainer.firstChild);
}


// Add todos to the local storage and memory
function addTodoItem() {

    if (inputItem.value.length < 1) {
        return
    };

    // notodosContent.style.display = 'none';
    createTodoItem(inputItem.value, storageId, 1);
    localStorage.setItem(storageId.toString(), JSON.stringify(
        {
            todo: inputItem.value,
            state: 1,
        }
    ));
    addDeleteTodoEventListener(storageId);
    addCompletedTodoEventListener(storageId);
    inputItem.value = '';
    storageId += 1;
}


// Get todos from local storage and display
Object.keys(localStorage).forEach((key) => {
    const obj = JSON.parse(localStorage.getItem(key));
    createTodoItem(obj.todo, key, obj.state);
    addDeleteTodoEventListener(key);
    addCompletedTodoEventListener(key);
    if (parseInt(key) >= storageId) storageId = parseInt(key) + 1;
});

function setShowHide() {
    const btnContent = showHideButton.textContent;
    if (btnContent == 'Show Complete') {
        completedContent.classList.remove('hide');
        showHideButton.textContent = 'Hide Complete';
    } else {
        completedContent.classList.add('hide');
        showHideButton.textContent = 'Show Complete';
    }
}

function clearAll() {
    Object.keys(localStorage).forEach((key) => {
        const obj = JSON.parse(localStorage.getItem(key));
        if (parseInt(obj.state) === 1) {
            localStorage.removeItem(key);
            document.querySelector(`[data-setid="${key}"]`).parentElement.remove();
            counterReset();
        }
    });
}

const newTodoEventListener = () => inputButton.addEventListener('click', addTodoItem);

const addShowHideEventListener = () => showHideButton.addEventListener('click', setShowHide);

const clearAllEventListener = () => clearButton.addEventListener('click', clearAll);

newTodoEventListener();
addShowHideEventListener();
clearAllEventListener();
