function controlForms(eventsList) {
    this.tableItemColor;
    var me = this;
    this.showForm = function(event) {
        var coordinates = event.target.getBoundingClientRect();

        var substrate = document.createElement("div");
        substrate.className = "substrate_div";
        substrate.addEventListener("click", me.closeForm, false);
        document.body.appendChild(substrate);

        if (event.target.className == "head_button") {
            event.target.style.background = "rgb(46, 69, 164)";
            document.querySelector(".fast_creating_event_form").style.left = coordinates.left + "px";
            document.querySelector(".fast_creating_event_form").style.top = (coordinates.bottom + 5) + "px";

            document.querySelector(".fast_creating_event_form").style.display = "block";
        } else {
            if (event.target.className == "table_item") {
                event.target.id = "isActive";

                me.tableItemColor = event.target.style.background;
                event.target.style.background = "rgb(131, 189, 255)";
            } else {
                event.target.parentNode.id = "isActive";

                me.tableItemColor = event.target.parentNode.style.background;
                event.target.parentNode.style.background = "rgb(131, 189, 255)";
            }

            if (coordinates.top > document.body.offsetHeight/2) {
                document.querySelector(".creating_event_form").style.top = (coordinates.top - 250) + "px";
            } else {
                document.querySelector(".creating_event_form").style.top = coordinates.top + "px";
            }
            if (coordinates.left > document.body.offsetWidth/2) {
                document.querySelector(".creating_event_form").style.left = (coordinates.left - document.body.offsetWidth*0.25) + "px";
            } else {
                document.querySelector(".creating_event_form").style.left = coordinates.right + "px";
            }
            document.querySelector(".creating_event_form").style.display = "block";
        }
    }

    this.showExistEventForm = function(event) {
        var coordinates = event.target.getBoundingClientRect();

        var substrate = document.createElement("div");
        substrate.className = "substrate_div";
        substrate.addEventListener("click", me.closeExistEventForm, false);
        document.body.appendChild(substrate);

        if (event.target.className == "table_item") {
            event.target.id = "isActive";

            me.tableItemColor = event.target.style.background;
            event.target.style.background = "rgb(131, 189, 255)";

            var id = event.target.lastChild.textContent;
            document.querySelector(".exist_event_form").children[1].textContent = eventsList.events[id].eventName;
            document.querySelector(".exist_event_form").children[2].textContent = eventsList.events[id].eventMember;
            document.querySelector(".exist_event_form").children[3].textContent = eventsList.events[id].eventDescription;

        } else {
            event.target.parentNode.id = "isActive";

            me.tableItemColor = event.target.parentNode.style.background;
            event.target.parentNode.style.background = "rgb(131, 189, 255)";

            var id = event.target.parentNode.lastChild.textContent;
            document.querySelector(".exist_event_form").children[1].textContent = eventsList.events[id].eventName;
            document.querySelector(".exist_event_form").children[2].textContent = eventsList.events[id].eventMember;
            document.querySelector(".exist_event_form").children[3].textContent = eventsList.events[id].eventDescription;
        }

        if (coordinates.top > document.body.offsetHeight/2) {
            document.querySelector(".exist_event_form").style.top = (coordinates.top - 250) + "px";
        } else {
            document.querySelector(".exist_event_form").style.top = coordinates.top + "px";
        }
        if (coordinates.left > document.body.offsetWidth/2) {
            document.querySelector(".exist_event_form").style.left = (coordinates.left - document.body.offsetWidth*0.25) + "px";
        } else {
            document.querySelector(".exist_event_form").style.left = coordinates.right + "px";
        }
        document.querySelector(".exist_event_form").style.display = "block";
    }

    this.closeForm = function(event) {
        if ( document.getElementById("isActive")){
            document.getElementById("isActive").id = "";
        }
        if (event !== undefined) {
            event.preventDefault();
        }
        if (document.querySelector(".fast_creating_event_form").style.display == "block") {
            document.querySelector(".head_button").style.background = "rgb(62, 88, 223)";
            document.querySelector(".fast_creating_event_form").reset();
            document.querySelector(".fast_creating_event_form").style.display = "none";
        } else {
            var collection = document.getElementsByClassName("table_item");
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].style.background == "rgb(131, 189, 255)") {
                    collection[i].style.background = me.tableItemColor;
                    break;
                }
            }

            document.querySelector(".creating_event_form").reset();
            document.querySelector(".creating_event_form").style.display = "none";
        }

        document.querySelector(".substrate_div").remove();
    }

    this.closeExistEventForm = function(event) {
        if ( document.getElementById("isActive")){
            document.getElementById("isActive").id = "";
        }
        if (event !== undefined) {
            event.preventDefault();
        }
        if (document.querySelector(".fast_creating_event_form").style.display == "block") {
            document.querySelector(".head_button").style.background = "rgb(62, 88, 223)";
            document.querySelector(".fast_creating_event_form").reset();
            document.querySelector(".fast_creating_event_form").style.display = "none";
        } else {
            var collection = document.getElementsByClassName("table_item");
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].style.background == "rgb(131, 189, 255)") {
                    collection[i].style.background = me.tableItemColor;
                    break;
                }
            }

            document.querySelector(".exist_event_form").reset();
            document.querySelector(".exist_event_form").style.display = "none";
        }

        document.querySelector(".substrate_div").remove();
    }
}

