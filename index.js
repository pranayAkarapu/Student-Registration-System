const addName = document.querySelector(".nameInput");

const addId = document.querySelector(".idInput");

const addEmail = document.querySelector(".emailInput");

const addNumber = document.querySelector(".mobileNoInput");

const addData = document.querySelector(".data-body");

const addButton = document.querySelector(".addButton")

addButton.addEventListener("click", studentsData);

/*--------------adding-studentsdata-function--------*/

function studentsData(){

    if(addName.value === "" || addId.value === "" || addEmail === "" || addNumber === ""){
        alert("Please fill all the fields");return;
    }
    
    if (!validateInputs()) {
        return;
    }
    

    /*------------tr-tag---------*/
    const tableRow = document.createElement("tr");
    addData.appendChild(tableRow);

    /*-------------td-tag-for-Name-----*/
    const inputNameText = document.createElement("td");
    inputNameText.innerHTML = addName.value;
    tableRow.appendChild(inputNameText);
    
    /*-------------td-tag-for-Id-----*/
    const inputIdText = document.createElement("td");
    inputIdText.innerHTML = addId.value;
    tableRow.appendChild(inputIdText);

    /*-------------td-tag-for-email-----*/
    const inputEmailText = document.createElement("td");
    inputEmailText.innerHTML = addEmail.value;
    tableRow.appendChild(inputEmailText);

    /*-------------td-tag-for-number-----*/
    const inputNumberText = document.createElement("td");
    inputNumberText.innerHTML = addNumber.value;
    tableRow.appendChild(inputNumberText);

    /*-------------td-tag-for-buttons-----*/
    const actionButtons = document.createElement("td");
    tableRow.appendChild(actionButtons);

    /*------------resetButton-for-editing-added-data--------*/
    
    const resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset";
    resetButton.classList.add("reset");
    actionButtons.appendChild(resetButton);

    resetButton.addEventListener("click", function(){
        if(resetButton.innerHTML === "Reset"){
            const cells = tableRow.querySelectorAll("td:not(:last-child)");

            cells.forEach((cell)=>{
                const input = document.createElement("input");
                input.value = cell.innerHTML;
                cell.innerHTML = "";
                cell.appendChild(input);
            });
            resetButton.innerHTML = "Save";
            resetButton.classList.add("save");
        }else if(resetButton.innerHTML === "Save"){
            const cells = tableRow.querySelectorAll("td:not(:last-child)");
            const inputs = tableRow.querySelectorAll("input");


            if (!validateResetInputs(inputs)) {
                return;
            }

            cells.forEach((cell, index) => {
                const input = inputs[index];
                cell.innerHTML = input.value;
                saveToLocalStorage();
            });
            resetButton.innerHTML = "Reset";
            resetButton.classList.remove("save");
        }
        
    });

    /*-----------deleteButton-------------*/

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("delete");
    actionButtons.appendChild(deleteButton);

    tableRow.addEventListener("click", deleteItems);

    function deleteItems(e){
        const deleteItem = e.target;

        if(deleteItem.classList.contains("delete")){
            tableRow.remove();
            saveToLocalStorage();
        }
    }
    saveToLocalStorage();

    addName.value = "";
    addId.value="";
    addEmail.value = "";
    addNumber.value = "";
}

/*------------save-to-local-storage-function--------*/

function saveToLocalStorage(){
    const rows = document.querySelectorAll("tbody tr");
    const students =[];
    rows.forEach((row) => {
        const cells = row.querySelectorAll("td:not(:last-child)");
        const student = {
            name: cells[0].innerHTML,
            id: cells[1].innerHTML,
            email: cells[2].innerHTML,
            number: cells[3].innerHTML
        };
        students.push(student);
    });
    localStorage.setItem("studentsData", JSON.stringify(students));
}

/*-----------------Load-from-local-storage-function-------*/

function loadFromLocalStorage(){
    const students = JSON.parse(localStorage.getItem("studentsData")) || [];
    students.forEach((student) => {
        const tableRow = document.createElement("tr");
        addData.appendChild(tableRow);

        const inputNameText = document.createElement("td");
        inputNameText.innerHTML = student.name;
        tableRow.appendChild(inputNameText);

        const inputIdText = document.createElement("td");
        inputIdText.innerHTML = student.id;
        tableRow.appendChild(inputIdText);

        const inputEmailText = document.createElement("td");
        inputEmailText.innerHTML = student.email;
        tableRow.appendChild(inputEmailText);

        const inputNumberText = document.createElement("td");
        inputNumberText.innerHTML = student.number;
        tableRow.appendChild(inputNumberText);

        const actionButtons = document.createElement("td");
        tableRow.appendChild(actionButtons);

        const resetButton = document.createElement("button");
        resetButton.classList.add("reset");
        resetButton.innerHTML = "Reset";
        actionButtons.appendChild(resetButton);

        resetButton.addEventListener("click",function(){
            if(resetButton.innerHTML === "Reset"){
                const cells = tableRow.querySelectorAll("td:not(:last-child)");
                cells.forEach((cell) => {
                    const input = document.createElement("input");
                    input.value = cell.innerHTML;
                    cell.innerHTML = "";
                    cell.appendChild(input);
                });
                resetButton.innerHTML = "Save";
                resetButton.classList.add("save");
            }else if(resetButton.innerHTML === "Save"){
                const cells = tableRow.querySelectorAll("td:not(:last-child)");
                const inputs = tableRow.querySelectorAll("input")

                if (!validateResetInputs(inputs)) {
                    return;
                }
                
                cells.forEach((cell) => {
                    const input = cell.querySelector("input");
                    cell.innerHTML = input.value;
                    saveToLocalStorage(0);
                });
                resetButton.innerHTML = "Reset";
                resetButton.classList.add("reset");
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.innerHTML = "Delete";
        actionButtons.appendChild(deleteButton);

        deleteButton.addEventListener("click", function(){
            tableRow.remove();
            saveToLocalStorage();
        });
    });
}

document.addEventListener("DOMContentLoaded", loadFromLocalStorage);



/*--------------check for valid inputs of form---------*/

function validateInputs() {
    let isValid = true;
    if (!/^[a-zA-Z ]+$/.test(addName.value)) {
      alert("Student name can only contain characters.");
      isValid = false;
    }
    if (!/^\d+$/.test(addId.value)) {
      alert("Student ID can only contain numbers.");
      isValid = false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(addEmail.value)) {
      alert("Invalid email address.");
      isValid = false;
    }
    if (!/^\d+$/.test(addNumber.value)) {
      alert("Contact number can only contain numbers.");
      isValid = false;
    }
    return isValid;
}    

/*--------------check for valid inputs of reset button---------*/

function validateResetInputs(inputs) {
    let isValid = true;
  
    if (!/^[a-zA-Z ]+$/.test(inputs[0].value)) {
      alert("Student name can only contain characters.");
      isValid = false;
    }
    if (!/^\d+$/.test(inputs[1].value)) {
      alert("Student ID can only contain numbers.");
      isValid = false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs[2].value)) {
        alert("Invalid email address.");
        isValid = false;
      }
      if (!/^\d+$/.test(inputs[3].value)) {
        alert("Number can only contain numbers.");
        isValid = false;
      }
      return isValid;
    }
  