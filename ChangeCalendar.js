var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

var date = new Date();
var eventsList = new EventsList();
if (JSON.parse(localStorage.getItem("list")) != null) {
    eventsList.events = JSON.parse(localStorage.getItem("list")).events;
}

var formController = new controlForms(eventsList);
var collection = document.getElementsByClassName("table_item");

var today = date.getDate();
var currentRealMonth = date.getMonth();
var currentRealYear = date.getFullYear();

var currentCalendarMonth = date.getMonth();
var currentCalendarYear = date.getFullYear();

var currentCalendarArr = [[, , , ,], [, , , ,], [, , , ,], [, , , ,], [, , , ,]];

function fillCalendarArr(year, month) {
    var daysInPreviousMonth = daysInMonth(year, month - 1);
    var daysInCurrentMonth = daysInMonth(year, month);

    var firstDayInCurrentMonth = new Date(year, month, 1).getDay();
    var mark = "previous";

    if (firstDayInCurrentMonth == 0) {
        firstDayInCurrentMonth = 7;
    }

    if (firstDayInCurrentMonth != 1) {
        var number = daysInPreviousMonth - firstDayInCurrentMonth + 2;
    } else {
        var number = 1;
        mark = "current";
    }

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 7; j++) {
            if (i == 0 && number == daysInPreviousMonth + 1) {
                number = 1;
                mark = "current";
            }
            if (i != 0 && number == daysInCurrentMonth + 1) {
                number = 1;
                mark = "next";
            }
            currentCalendarArr[i][j] = new currentCalendarArrItem(number, mark);
            number++;
        }
    }

    if (eventsList.events.length > 0) {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 7; j++) {
                if (currentCalendarArr[i][j].markMonth == "current") {
                    if ((currentCalendarArr[i][j].eventId = eventsList.findEvent(currentCalendarYear, currentCalendarMonth, currentCalendarArr[i][j].number)) != "no event") {
                        currentCalendarArr[i][j].haveEvent = true;
                    }
                }
            }
        }
    }

    renderCalendar();
}
function daysInMonth(year, month) {
    return 32 - new Date(year, month, 32).getDate();
}
function returnMonthNumber(monthName) {
    for (var i = 0; i < 12; i++) {
        if (monthName === months[i]) {
            return i;
        }
    }
}
function returnMonthName(monthNumber) {
    return months[monthNumber];
}
function previousMonth() {
    if (currentCalendarMonth == 0) {
        currentCalendarMonth = 11;
        currentCalendarYear--;
    } else {
        currentCalendarMonth--;
    }
    renderMonthAndYear();
    fillCalendarArr(currentCalendarYear, currentCalendarMonth);
}
function nextMonth() {
    if (currentCalendarMonth == 11) {
        currentCalendarMonth = 0;
        currentCalendarYear++;
    } else {
        currentCalendarMonth++;
    }
    renderMonthAndYear();
    fillCalendarArr(currentCalendarYear, currentCalendarMonth);
}
function realMonth() {
    currentCalendarMonth = currentRealMonth;
    currentCalendarYear = currentRealYear;
    renderMonthAndYear();
    fillCalendarArr(currentCalendarYear, currentCalendarMonth);
    renderCalendar();
}
function renderMonthAndYear() {
    document.querySelector(".current_month_div").innerHTML = returnMonthName(currentCalendarMonth);
    document.querySelector(".current_year_div").innerHTML = String(currentCalendarYear);
}
function renderCalendar() {
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 7; j++) {
            if (i == 0) {
                switch (j) {
                    case 0: {
                        document.querySelector(".table").childNodes[i].childNodes[j].firstChild.textContent = "Понедельник," ;
                        break;
                    }
                    case 1: {
                        document.querySelector(".table").childNodes[i].childNodes[j].firstChild.textContent = "Вторник," ;
                        break;
                    }
                    case 2: {
                        document.querySelector(".table").childNodes[i].childNodes[j].firstChild.textContent = "Среда,";
                        break;
                    }
                    case 3: {
                        document.querySelector(".table").childNodes[i].childNodes[j].firstChild.textContent = "Четверг,";
                        break;
                    }
                    case 4: {
                        document.querySelector(".table").childNodes[i].childNodes[j].firstChild.textContent = "Пятница,";
                        break;
                    }
                    case 5: {
                        document.querySelector(".table").childNodes[i].childNodes[j].firstChild.textContent = "Суббота,";
                        break;
                    }
                    case 6: {
                        document.querySelector(".table").childNodes[i].childNodes[j].firstChild.textContent = "Воскресенье,";
                        break;
                    }
                }
            }
            document.querySelector(".table").childNodes[i].childNodes[j].childNodes[1].textContent = currentCalendarArr[i][j].number;
            document.querySelector(".table").childNodes[i].childNodes[j].lastChild.textContent = currentCalendarArr[i][j].eventId;

            if (currentCalendarArr[i][j].haveEvent) {
                document.querySelector("table").childNodes[i].childNodes[j].childNodes[2].textContent = eventsList.events[currentCalendarArr[i][j].eventId].eventName;
                document.querySelector("table").childNodes[i].childNodes[j].childNodes[3].textContent = eventsList.events[currentCalendarArr[i][j].eventId].eventMember;
                document.querySelector("table").childNodes[i].childNodes[j].removeEventListener("click", formController.showForm, false);
                document.querySelector("table").childNodes[i].childNodes[j].addEventListener("click", formController.showExistEventForm, false);
            } else {
                document.querySelector("table").childNodes[i].childNodes[j].removeEventListener("click", formController.showExistEventForm, false);
                document.querySelector("table").childNodes[i].childNodes[j].addEventListener("click", formController.showForm, false);
                document.querySelector("table").childNodes[i].childNodes[j].childNodes[2].textContent = "";
                document.querySelector("table").childNodes[i].childNodes[j].childNodes[3].textContent = "";
            }
        }
    }
}

function currentCalendarArrItem(number, markMonth) {
    this.number = number;
    this.markMonth = markMonth;
    this.haveEvent = false;
    this.eventId = "";
}

function saveEvent(event) {
    event.preventDefault();
    if (event.target.parentNode.className == "fast_creating_event_form") {

        for (var i = 0; i < eventsList.events.length; i++) {
            if (eventsList.events[i].eventYear == currentRealYear && eventsList.events[i].eventMonth == currentRealMonth && eventsList.events[i].eventDay == parseInt(today)) {
                alert("Событие на сегодня уже существует!");
                formController.closeForm();
                return 1;
            }
        }

        if (event.target.parentNode.children[1].value != "") {
            eventsList.addEvent(currentRealYear, currentRealMonth, today, event.target.parentNode.children[1].value, "", "");
            //saveToLocalStorage();
            fillCalendarArr(currentCalendarYear, currentCalendarMonth);

            formController.closeForm();
        }
    }
    if (event.target.parentNode.className == "creating_event_form") {
        if (event.target.parentNode.children[1].value != ""){
            eventsList.addEvent(currentCalendarYear, currentCalendarMonth, document.getElementById("isActive").childNodes[1].textContent, event.target.parentNode.children[1].value, event.target.parentNode.children[2].value, event.target.parentNode.children[3].value);
            fillCalendarArr(currentCalendarYear, currentCalendarMonth);

            formController.closeForm();
        }
    }
}
function refreshEvent(event) {
    event.preventDefault();
    eventsList.events[document.getElementById("isActive").lastChild.textContent].eventDescription = event.target.parentNode.children[3].value;
    fillCalendarArr(currentCalendarYear, currentCalendarMonth);

    formController.closeExistEventForm();
}
function deleteExistEvent (event) {
    event.preventDefault();
    eventsList.events.splice(parseInt(document.getElementById("isActive").lastElementChild.textContent), 1);
    formController.closeExistEventForm();
    fillCalendarArr(currentCalendarYear, currentCalendarMonth);
}

function saveToLocalStorage() {
    var serialEventList = JSON.stringify(eventsList);

    try {
        localStorage.setItem("list", serialEventList);
    }
    catch(exception) {
        if (exception == QUOTA_EXCEEDED_ERR) {
            alert('Превышен лимит');
        }
    }
    }
function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("list"));
}

// Конструктор объекта хранящего массив данных
function EventsList() {
    this.events = [];
}

EventsList.prototype.addEvent = function (eventYear, eventMonth, eventDay, eventName, eventMember, eventDescription) {
    var tmpEvent = new DayEvents(eventYear, eventMonth, eventDay, eventName, eventMember, eventDescription);
    this.events.push(tmpEvent);

    function DayEvents(eventYear, eventMonth, eventDay, eventName, eventMember, eventDescription){
        this.eventYear = eventYear;
        this.eventMonth = eventMonth;
        this.eventDay = eventDay;
        this.eventName = eventName;
        this.eventMember = eventMember;
        this.eventDescription = eventDescription;
    }
}

EventsList.prototype.findEvent = function (eventYear, eventMonth, eventDay) {
    for (var i = 0; i < this.events.length; i++) {
        if (eventYear == this.events[i].eventYear && eventMonth == this.events[i].eventMonth && eventDay == this.events[i].eventDay) {
            return i;
        }
    }
    return "no event";
}

// Базовая инициализация календаря
fillCalendarArr(date.getFullYear(), date.getMonth());

// Обработчики событий для изменения месяца
document.querySelector(".date_bar").children[0].addEventListener("click", previousMonth, false);
document.querySelector(".date_bar").children[3].addEventListener("click", nextMonth, false);
document.querySelector(".date_bar").children[4].addEventListener("click", realMonth, false);

document.querySelector(".for_buttons").children[0].addEventListener("click", formController.showForm, false);
document.querySelector(".fast_creating_event_form").children[0].addEventListener("click", formController.closeForm, false);
document.querySelector(".fast_creating_event_form").children[2].addEventListener("click", saveEvent, false);
for (var i = 0; i < collection.length; i++) {
    collection[i].addEventListener("click", formController.showForm, false);
}
document.querySelector(".creating_event_form").children[0].addEventListener("click", formController.closeForm, false);
document.querySelector(".creating_event_form").children[4].addEventListener("click", saveEvent, false);

document.querySelector(".exist_event_form").children[0].addEventListener("click", formController.closeExistEventForm, false);
document.querySelector(".exist_event_form").children[4].addEventListener("click", refreshEvent, false);
document.querySelector(".exist_event_form").children[5].addEventListener("click", deleteExistEvent, false);
