$(document).ready(function () {
    $(".loadAuthors").on("click", loadAuthors);
    $(".btnSubmit").on("click", submitNewAuthor);
    $(".author-list").on("click", ".deleteBtn", deleteAuthor);
    $(".author-list").on("click", ".author", updateAuthor);
});

var url = "http://sabioapi2.azurewebsites.net/api/authors";
var header = { "SABIO-AUTH": "U7E2M0SUX" };
activeId = null;

function success(data, status, xhr) {
    console.log(data)
    $(".author-list").empty();
    for (var i = 0; i < data.items.length; i++) {
        addAuthor(data.items[i]);
    }
}

function successChange(data, status, xhr) {
    loadAuthors(success)
}

function successGet(data, status, xhr) {
    updateForm(data.item);
}

function error(xhr, status, errorText) {
    console.log(errorText);
}

function loadAuthors() {
    console.log("loading");
    var settings = {
        headers: header,
        type: "GET",
        success: success,
        error: error,
    }
    $.ajax(url, settings);
}

function submitNewAuthor() {
    var data = readForm();
    if (activeId) {
        data.id = activeId;
        updateAuthorAjax(data, successChange);
        activeId = null;
    }
    else {
    addAuthorAjax(data, successChange, error);
    }
}

function deleteAuthor(e) {
    e.stopPropagation()
    console.log("deleting");
    var author = $(this).closest("div.author");
    console.log(author)
    var id = author.data("authorId");
    console.log(id)
   deleteAuthorAjax(id, successChange);
}

function updateAuthor() {
    var id = $(this).data("authorId");
    getAuthorIdAjax(id, successGet)
}

function loadTemplate() {
    return $($("#template").html());
}

function addAuthor(data) {
    var template = loadTemplate();

    template.find(".header").text(data.firtName + " " + data.lastName);
    template.find(".meta").text(data.age);
    template.find(".description").text(data.salary);
    $(".author-list").prepend(template);
}

function readForm() {
    var formData = {
        firstName: $("#fName").val(),
        lastName: $("#lName").val(),
        age: parseInt($("#age").val()),
        salary: parseInt($("#salary option:selected").val())
    }
    return formData;
}

function updateForm(data) {
    $("#fName").val(data.firtName);
    $("#lName").val(data.lastName);
    $("#age").val(data.age);
    $("#salary").val(data.salary);

    activeId = data.id
}

function addAuthorAjax(data, success, error) {
    var settings = {
        type: "POST",
        headers: header,
        success: success,
        error: error,
        contentType: "application/json",
        data: JSON.stringify(data)
    }
    $.ajax(url, settings)
}
function getAuthorIdAjax(id, success, error) {
    var settings = {
        headers: header,
        type: "GET",
        success: success,
        error: error
    }
    $.ajax(url + "/" + id + settings);
}
function deleteAuthorAjax(id, success, error) {
    var settings = {
        headers: header,
        type: "DELETE",
        success: success,
        error, error
    }
    $.ajax(url + "/" + id, settings);
}
function updateAuthorAjax(data, success, error) {
    var settings = {
        headers: header,
        type: "PUT",
        success: success,
        error: error,
        contentType: "application/json",
        data: JSON.stringify(data)
    }
    $.ajax(url + "/" + data.id, settings);
}




