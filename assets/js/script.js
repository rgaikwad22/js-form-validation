const submitBtn = document.querySelector(".submit");
const table = document.querySelector(".table");

const firstName = document.querySelector(".first-name");
const middleName = document.querySelector(".middle-name");
const lastName = document.querySelector(".last-name");
const email = document.querySelector(".email");
const password = document.querySelector(".pass");
const confirmPass = document.querySelector(".confirm-pass");
const city = document.querySelector(".city");
const state = document.querySelector(".state");
const country = document.querySelector(".country");
const zipcode = document.querySelector(".zipcode");
const contact = document.querySelector(".contact");
const gender = document.querySelectorAll('.gender');
const radio = document.querySelector(".radio");
const comment = document.querySelector(".comment");

let editHtml = "";
let deleteHtml = "";
let checkedGender = "";
let tableRow;
let tablObj = {};
let editFlag = 0, editKey;
const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

firstName.addEventListener("focusout", () => checkName(firstName));
middleName.addEventListener("focusout", () => checkName(middleName));
lastName.addEventListener("focusout", () => checkName(lastName));
email.addEventListener("focusout", () => checkEmail());
password.addEventListener("focusout", () => checkPass(password));
confirmPass.addEventListener("focusout", () => checkPass(confirmPass));
city.addEventListener("focusout", () => checAddress(city));
state.addEventListener("focusout", () => checAddress(state));
country.addEventListener("focusout", () => checAddress(country));
zipcode.addEventListener("focusout", () => checAddress(zipcode));
contact.addEventListener("focusout", () => checkContact());
gender.forEach((e => {
    e.addEventListener("focusout", () => {
        checkGender(checkedGender);
    });
}));

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let id;
    if (editFlag == 1) {
        id = editKey;
        removeElement(editKey);
    } else {
        id = randomId();
    }


    editHtml = `<input type="button" class="edit-btn" onclick="editBtn('${id}')" value="edit">`;
    deleteHtml = `<input type="button" class="delete-btn" onclick="dleteBtn('${id}')" value="delete">`;

    if (validateFields()) {
        const tableData = {
            "firstName": firstName.value.trim(),
            "middleName": middleName.value.trim(),
            "lastName": lastName.value.trim(),
            "email": email.value.trim(),
            "pass": password.value.trim(),
            "confirmPassword": confirmPass.value.trim(),
            "city": city.value.trim(),
            "state": state.value.trim(),
            "country": country.value.trim(),
            "zipcode": zipcode.value.trim(),
            "contact": contact.value.trim(),
            "genderData": checkedGender,
            "comment": comment.value.trim(),
            "editHtml": editHtml,
            "deleteHtml": deleteHtml
        }

        localStorage.setItem(id, JSON.stringify(tableData));
        alert("All Fields filled successfully!")
        emptyFormFields();
        createTable(id);
    }

});

function validateFields() {
    gender.forEach(sub => {
        if (sub.checked)
            checkedGender = sub.value;
    });

    let isValidFirstName = checkName(firstName);
    let isValidMiddleName = checkName(middleName);
    let isValidLastName = checkName(lastName);
    let isValidEmail = checkEmail();
    let isValidPassword = checkPass(password);
    let isValidConfirmPass = checkPass(confirmPass);
    let isValidCity = checAddress(city);
    let isValidState = checAddress(state);
    let isValidCountry = checAddress(country);
    let isValidZipcode = checAddress(zipcode);
    let isValidContact = checkContact();
    let isValidGender = checkGender(checkedGender);

    // check all form fields are valid or not
    if (!isValidFirstName || !isValidMiddleName || !isValidLastName || !isValidEmail
        || !isValidPassword || !isValidConfirmPass || !isValidCity
        || !isValidState || !isValidCountry || !isValidZipcode
        || !isValidContact || !isValidGender) {
        return false;
    } else {
        return true;
    }
}

function emptyFormFields() {
    firstName.value = "";
    middleName.value = ""
    lastName.value = "";
    email.value = "";
    password.value = "";
    confirmPass.value = "";
    city.value = "";
    state.value = "";
    country.value = "";
    zipcode.value = "";
    contact.value = "";
    gender.value = "";
    comment.value = "";

    gender.forEach(radio => {
        radio.checked = false;
    });
}

function checkName(fieldName) {
    const firstNameValue = fieldName.value.trim();
    if (firstNameValue === "") {
        const errorText = "*this field is required!";
        const errorParent = fieldName.parentElement;

        showError(errorText, errorParent);
        return false;
    } else if (firstNameValue.length < 3) {
        const errorText = "*this field should be greater than 3 characters!";
        const errorParent = fieldName.parentElement;

        showError(errorText, errorParent);
        return false;

    } else if (!isNaN(firstNameValue)) {
        const errorText = "*this field should not have numbers!";
        const errorParent = fieldName.parentElement;

        showError(errorText, errorParent);
        return false;
    }
    else {
        showSuccess(fieldName);
        return true;
    }
}

function checkEmail() {
    const emailValue = email.value.trim();

    if (emailValue === "") {
        const errorText = "*this field is required!";
        const errorParent = email.parentElement;
        showError(errorText, errorParent);
        return false;
    } else if (emailValue.match(emailPattern) == null) {
        const errorText = "*valid email is required!";
        const errorParent = email.parentElement;

        showError(errorText, errorParent);
        return false;
    }
    else {
        showSuccess(email);
        return true;
    }
}

function checkPass(passField) {
    const passvalue = passField.value.trim();

    if (passvalue === "") {
        const errorText = "*this field is required!";
        const errorParent = passField.parentElement;
        showError(errorText, errorParent);
        return false;
    } else if (passvalue.match(passwordPattern) == null) {
        const errorText = "*valid password is required!";
        const errorParent = passField.parentElement;

        showError(errorText, errorParent);
        return false;
    }
    else {
        showSuccess(passField);
        return true;
    }
}

function checAddress(addressFields) {
    const cityValue = addressFields.value.trim();

    if (cityValue === "") {
        const errorText = "*this field is required!";
        const errorParent = addressFields.parentElement;

        showError(errorText, errorParent);
        return false;
    } else if (cityValue.length < 3) {
        const errorText = "*this field should be greater than 3 characters!";
        const errorParent = addressFields.parentElement;

        showError(errorText, errorParent);
        return false;
    }
    else {
        showSuccess(addressFields);
        return true;
    }
}

function checkContact() {
    const contactValue = password.value.trim();

    if (contactValue === "") {
        const errorText = "*this field is required!";
        const errorParent = contact.parentElement;

        showError(errorText, errorParent);
        return false;
    } else if (contactValue.length < 3) {
        const errorText = "*number length  should not be more than 10"
        const errorParent = contact.parentElement;

        showError(errorText, errorParent);
        return false;
    }
    else {
        showSuccess(contact);
        return true;
    }
}

function checkGender(checkedGender) {
    if (checkedGender === "") {
        const errorText = "*this field is required!";
        const errorParent = radio.parentElement;

        showError(errorText, errorParent);
        return false;
    } else {
        showSuccess(radio);
        return true;
    }
}


function showError(errorText, errorParent) {
    const showError = errorParent.querySelector(".error-text");
    if (showError && !null) {
        showError.remove();
    }

    const p = document.createElement("p");
    p.innerText = errorText;
    errorParent.appendChild(p);
    p.classList.add("error-text")

    errorParent.classList.add("error");
    errorParent.classList.remove("success");

}

function showSuccess(element) {
    const successParent = element.parentElement;
    const showError = successParent.querySelector(".error-text");
    if (showError) {
        showError.remove();
    }
    successParent.classList.add("success");
    successParent.classList.remove("error");
}

function createTable(key) {
    let { firstName, genderData, email, contact, deleteHtml, editHtml } = JSON.parse(localStorage.getItem(key));

    tableRow = document.createElement("li");
    const tableCol = document.createElement("ul");
    const firstNameList = document.createElement("li");
    const emailList = document.createElement("li");
    const contactList = document.createElement("li");
    const genderList = document.createElement("li");
    const editList = document.createElement("li");
    const deleteList = document.createElement("li");

    firstNameList.classList.add("edit");
    emailList.classList.add("edit");
    contactList.classList.add("edit");
    genderList.classList.add("edit");

    firstNameList.innerText = firstName;
    emailList.innerText = email;
    contactList.innerText = contact;
    genderList.innerText = genderData;

    editList.innerHTML = editHtml;
    deleteList.innerHTML = deleteHtml;

    tableCol.append(firstNameList, emailList, contactList, genderList, editList, deleteList);
    tableCol.classList.add("table-col");
    tableRow.append(tableCol);
    tableRow.classList.add("table-row");

    table.append(tableRow);
    table.style.display = "flex";
}

function randomId() {
    let num = Math.random() * 100;
    return num;
}

function editBtn(key) {
    const { firstName, middleName, lastName, genderData, email, pass, confirmPassword, city, state, country, zipcode, contact, comment } = JSON.parse(localStorage.getItem(key));
    editKey = key;
    editFlag = 1;

    this.firstName.value = firstName;
    this.middleName.value = middleName;
    this.lastName.value = lastName;
    this.email.value = email;
    password.value = pass;
    confirmPass.value = confirmPassword;  
    this.city.value = city;
    this.state.value = state;
    this.country.value = country;
    this.zipcode.value = zipcode;
    this.contact.value = contact;
    gender.forEach(radio => {
        if (genderData == radio.value) {
            radio.checked = true;
        }
    });
    this.comment.value = comment;

    this.firstName.focus();

}

function dleteBtn(key) {
   removeElement(key)
    localStorage.removeItem(key);
}

function removeElement(el) {
    const lists = Array.from(document.querySelectorAll(".table-row"));
    const { firstName } = JSON.parse(localStorage.getItem(el));
    const matchElement = lists.find(el => el.textContent.includes(firstName));
    matchElement.remove();
}

function initiateTable() {
    for (let i = 0; i < localStorage.length; i++) {
        createTable(localStorage.key(i));
    }
}

window.addEventListener("load", () => localStorage.length != null ? initiateTable() : null);