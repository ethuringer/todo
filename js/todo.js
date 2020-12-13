'use strict';

(function () {

    let todos = [];
    let taskItem = todos.length;
    const inputItem = document.querySelector('.input__item');
    const inputButton = document.querySelector('.add__item');
    const pendingContent = document.querySelector('.pending__content');
    const notodosContent = document.querySelector('.notodos__content');

    // Localstorage handler object
    const localDB = {
        //localDB.setItem('todos', todos)
        setItem(key, value) {
            value = JSON.stringify(value);
            localStorage.setItem(key, value);
        },
        // localDB.getItem('todos')
        getItem(key) {
            const value = localStorage.getItem(key);
            if (!value) {
                return null;
            }

            return JSON.parse(value);
        },
        // localDB.removeItem('todos');
        removeItem(key) {
            localStorage.removeItem(key);
        }
    };

    // Initialize application
    const init = () => {
        realDate();
        setNewTodoListeners();
        loadExistingTodos();
        taskCounter(taskItem);
        deleteTodoItem();
    };

    // Load exisiting todos
    const loadExistingTodos = () => {
        const savedTodos = localDB.getItem('todos');

        if (savedTodos) {
            todos = savedTodos;
        }

        if (todos && Array.isArray(todos)) {
            todos.forEach(todoItem => showTodoItem(todoItem));
        }

        if (todos) {
            taskItem = todos.length;
        }


    };

    // Date
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


    // Add todos to the local storage and memory
    function addNewTodoItem() {

        const value = inputItem.value;

        let taskItem = todos.length + 1;

        const todoItem = {
            text: value,
            done: false,
            index: 0
        }

        if (value.length < 1) {
            return
        };


        todos.push(todoItem);
        todoItem.index=todos.indexOf(todoItem);

        localDB.setItem('todos', todos);
        taskCounter(taskItem);
        showTodoItem(todoItem);
        inputItem.value = '';

    }

    const setNewTodoListeners = () => inputButton.addEventListener('click', addNewTodoItem);

    // Display todo items
    function showTodoItem(todoItem) {

        pendingContent.insertAdjacentHTML("afterbegin",
            `<div class="pending__item">
            <input class="pending__check" type="checkbox">
            <span class="index">${todoItem.index}</span>
                        <label class="pending__text">-${todoItem.text}</label>
                        <button class="delete__item"><i class="fa fa-trash"></i></button>
                    </div >`);
    }

    // Display counter of pending items
    const taskCounter = (taskItem) => {
        document.querySelector('.counter').textContent = taskItem;
    }

    // Delete task
    function deleteTodoItem() {
        
        
        
        // const todoItem = {
        //     text: value,
        //     done: false,
        //     index: 0
        // }
        
        const pendingItem = document.querySelectorAll('.pending__item');
        const deleteButton = document.querySelectorAll('.delete__item');
        // todoItem.text = pendingItem.querySelector('.pending__text').textContent;
        // todoItem.index = pendingItem.querySelector('.index').textContent;
        let todos = localDB.getItem('todos');
        

        // pendingContent.insertAdjacentHTML("afterbegin",
        // `<div class="pending__item">
        // <input class="pending__check" type="checkbox">
        // <span class="index">${todoItem.index}</span>
        //             <label class="pending__text">-${todoItem.text}</label>
        //             <button class="delete__item"><i class="fa fa-trash"></i></button>
        //         </div >`);
// }

        // Display counter of pending items
//        const taskCounter = (taskItem) => {
//             document.querySelector('.counter').textContent = taskItem;
// /        }



        
        //console.log(todos);

        // let index = todos.indexOf();

        //let taskItem = todos.length - 1;

        // const todoItem = {
        //     text: value,
        //     done: false
        // }

        for (let i = 0; i < deleteButton.length; i += 1) {
        
        deleteButton[i].addEventListener('click', (ev) => {
        ev.currentTarget.parentElement.style.display = 'none';
                console.log(parseInt(ev.currentTarget.parentElement.querySelector('.index').textContent));
                //todos.splice(parseInt(ev.currentTarget.parentElement.querySelector('.index').textContent), 1);
                
                //todos.splice(parseInt(ev.currentTarget.parentElement.querySelector('.index').textContent),1);
                
                //todos.splice(3,1);
                //console.log(Object.values(todos[1])[0]);

                console.log(Object.values(todos));
                console.log(todos.indexOf(todos[1].index));
                localStorage.setItem('todos', JSON.stringify(todos));
                })
            
        }
    }


    function checkIndex(ev){
        console.log( todos.indexOf(ev.currentTarget) );
      }
      

    init();
})();

