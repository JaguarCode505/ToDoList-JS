//создаем переменные которые хранят значения отметки
var addButton = document.getElementById('add'); // переменная для кнопки добавить
var inputTask = document.getElementById('new-task'); //переменная для ввода
var unfinishedTasks = document.getElementById('unfinished-tasks');//перменная со списком незавершенных задач
var finishedTasks = document.getElementById('finished-tasks');//переменная со списком завершенных задач

//метод создает элемент списка
function createNewElement(task,finished)
{
    var listItem = document.createElement('li');//создаем список
    var checkbox = document.createElement('button'); //создаем checkbox
    if(finished) //если finished является истинной
    {
        checkbox.className = "material-icons checkbox";// задаем класс чекбокса
        checkbox.innerHTML = "<i class='material-icons'>check_box</i>";//свойство позволит создавать HTMl формат
    }
    else
    {
        checkbox.className = "material-icons checkbox";// задаем класс чекбокса
        checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";//свойство позволит создавать HTMl формат
    }

    var label = document.createElement('label');//создаем label
    label.innerText = task; // передаем параметр задачи
    var input = document.createElement ('input'); //создаем поле ввода
    input.type = "text";//тип ввода

    var deleteButton = document.createElement('button'); //кнопка удаления
    deleteButton.className = "material-icons delete";// задаем класс кнопки удаления
    deleteButton.innerHTML = "<i class='material-icons'>delete</i>";//свойство HTML формата

    var editButton = document.createElement('button'); //кнопка редактирования
    editButton.className = "material-icons edit";// задаем класс кнопки редактирования
    editButton.innerHTML = "<i class='material-icons'>edit</i>";//свойство для HTML формата

    //передаем все элементы в "li"
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    
    return listItem;//вовзратное значение
}
//метод добавляет задачу после нажатия кнопки "добавить"
function addTask()
{
    if(inputTask.value) //если значение получаемое в инпуте не пустое тогда:
    {
       var listItem=createNewElement(inputTask.value, false); //создаем элемент списка и испльзуем метод "createNewElement"
       unfinishedTasks.appendChild(listItem);//с помощью переменной "unfinishedTasks" мы добавляем новый элемент
       bindTaskEvents(listItem, finishTask)//Добавляем к элементу списка обработчики
       inputTask.value = "";//обнуляем значение строки
    }
    save();//вызываем функцию для сохранения данных
}
addButton.onclick=addTask;//Прикрепляем метод "addTask" к кнопке

//функция удаления задачи
function deleteTask()
{
   var listItem = this.parentNode; //нужно получить элемент списка
    console.log(listItem); //получаем элемент списка
    var ul = listItem.parentNode;//получаем элемент "ul"
    ul.removeChild(listItem);//удаляем "li" из "ul"
    save();//вызываем функцию для сохранения данных
}

//функция редактирования задачи
function editTask()
{
   var editButton = this; //обращаемся к элементу
   var listItem =  this.parentNode; //нужно получить элемент списка
   var label = listItem.querySelector('label');//получаем lable
   var input = listItem.querySelector('input[type = text]');//получаем поле ввода
    
   var containsClass = listItem.classList.contains('editMode');//создаем переменную которая позволяет понять есть ли класс editMode на элементе списка
    if (containsClass) //Если conatainsClass со значение true
    {
        label.innerText = input.value; //задаем значение внутри label
        editButton.className = "material-icons edit";// задаем класс кнопки редактирования
        editButton.innerHTML = "<i class='material-icons'>edit</i>";//свойство для HTML формата
        save();//вызываем функцию для сохранения данных
    } else 
    {
        input.value = label.innerText; // в input передаем текст который был написан до этого
        editButton.className = "material-icons save";// задаем класс кнопки сохранения
        editButton.innerHTML = "<i class='material-icons'>save</i>";//свойство для HTML формата
    }
    listItem.classList.toggle('editMode'); //переключение в классе иконок между сохранением и редактировнием
}

//функция завершения задачи
function finishTask()
{
    var listItem =  this.parentNode; //нужно получить элемент списка
    var checkbox = listItem.querySelector('button.checkbox');//получаем checkbox
    checkbox.className = "material-icons checkbox";// задаем класс чекбокса
    checkbox.innerHTML = "<i class='material-icons'>check_box</i>";//свойство позволит создавать HTMl формат

    finishedTasks.appendChild(listItem); //перемещаем  в блок с завершенными задачами
    bindTaskEvents(listItem, unfinishTask); //Добавляем к элементу списка обработчики
    save();//вызываем функцию для сохранения данных
}

//функция незавршенной задачи
function unfinishTask()
{
    var listItem =  this.parentNode; //нужно получить элемент списка
    var checkbox = listItem.querySelector('button.checkbox');//получаем checkbox
    checkbox.className = "material-icons checkbox";// задаем класс чекбокса
    checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";//свойство позволит создавать HTMl формат
     
    unfinishedTasks.appendChild(listItem);//перемещаем  в блок с завершенными задачами
    bindTaskEvents(listItem, finishTask) //Добавляем к элементу списка обработчики
    save();//вызываем функцию для сохранения данных
}

//функция привязывает выше перечисленные методы к новому элементу во время создания
function bindTaskEvents(listItem, checkboxEvent)
{
    var checkbox = listItem.querySelector('button.checkbox');// получаем элемент checkbox внутри ли списка
    var editButton = listItem.querySelector('button.edit');// получаем элемент edit внутри ли списка
    var deleteButton = listItem.querySelector('button.delete');// получаем элемент delete внутри ли списка

    //привязываем обработчики для элементов 
    checkbox.onclick = checkboxEvent;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
}
//Сохраняем прогресс, чтобы выше перечисленное не пропадало
function save()
{
    //используем локальное хранение которое расположено на клиенте в брузере
    var unfinishedTasksArr = []; //создаем массив с незавершенными делами
    var finishedTasksArr = []; //создаем массив с завершенными делами

    for(var i = 0; i<unfinishedTasks.children.length; i++) //цикл проводит через себя элементы
    {
        unfinishedTasksArr.push(unfinishedTasks.children[i].getElementsByTagName('label')[0].innerText); //помещаем элементы в массив
    }

    for(var i = 0; i<finishedTasks.children.length; i++) //цикл проводит через себя элементы
    {
        finishedTasksArr.push(finishedTasks.children[i].getElementsByTagName('label')[0].innerText); //помещаем элементы в массив
    }
    localStorage.removeItem('todo');//удаление данных
    localStorage.setItem('todo', JSON.stringify({unfinishedTasks:unfinishedTasksArr, finishedTasks: finishedTasksArr}));//помещаем в локальную память
}

//c помощью метода загружаем то что сохранили в локальном хранилище
function load()
{
    return JSON.parse(localStorage.getItem('todo')); //превращаем JSON в объект
}
var data = load(); //при загрузки страницы мы получаем данные
for(var i = 0; i<data.unfinishedTasks.length; i++)//обращаемся к массиву который хранит значения
{
    var listItem=createNewElement(data.unfinishedTasks[i], false); //перебираем массив с незавершенными задачами
    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask); //назначаем обработчики
}
for(var i=0; i<data.finishedTasks.length; i++)//обращаемся к массиву который хранит значения
{

    var listItem=createNewElement(data.finishedTasks[i], true); //перебираем массив с завершенными задачами
    
    finishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);//назначаем обработчики
}