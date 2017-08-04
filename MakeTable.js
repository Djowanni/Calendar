
function makeTable() {
    var table = document.createElement("table");
    table.className = "table";

    for (var i = 0; i < 5; i++) {
        var tableLine = document.createElement("tr");
        for (var j = 0; j < 7; j++) {
            var label = document.createElement("span");
            label.className = "span_for_date";

            var tableItem = document.createElement("td");
            tableItem.className = "table_item";

            var spanForDate = document.createElement("span");
            spanForDate.className = "span_for_date";

            var divData = document.createElement("div");
            divData.className = "table_item_data_div";

            var divData1 = document.createElement("div");
            divData1.className = "table_item_data_div";

            var hiddenDiv = document.createElement("div");
            hiddenDiv.style.display = "none";

            tableItem.appendChild(label);
            tableItem.appendChild(spanForDate);
            tableItem.appendChild(divData);
            tableItem.appendChild(divData1);
            tableItem.appendChild(hiddenDiv);
            tableLine.appendChild(tableItem);
        }
        table.appendChild(tableLine);
    }

    document.querySelector(".table_div").appendChild(table);
}
makeTable();
