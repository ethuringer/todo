'use strict';



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

function todoInput() {
    const inputItem = document.querySelector('.input__item');
    const inputButton = document.querySelector('.add__item');
    const pendingContent = document.querySelector('.pending__content');
    const notodosContent = document.querySelector('.notodos__content');
    let taskItem = 0;

    inputButton.addEventListener('click', () => {
        notodosContent.style.display = 'none',
        pendingContent.classList.add('pending__content--visible'),
        pendingItem(),
        inputItem.value = '',
        taskItem++,
        taskCounter(taskItem)
    });
}
todoInput();

function pendingItem() {
    const counterContent = document.querySelector('.counter__content');
    const inputItem = document.querySelector('.input__item');

    counterContent.insertAdjacentHTML("afterend",
        `<div class="pending__item">
        <input class="pending__check" type="checkbox" id="pending1" name = "something" value = "something" >
                    <label class="pending__text" for="pending1">${inputItem.value}</label>
                    <button class="delete__item"><i class="fa fa-trash"></i></button>
                </div >`);
};

const taskCounter = (taskItem) => {
    document.querySelector('.counter').textContent = taskItem;
}