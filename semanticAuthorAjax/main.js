$(document).ready(function () {
    $(".loadAuthors").on("click", loadAuthors);
    $(".btnSubmit").on("click", submitNewAuthor);
});

var url = "http://sabioapi2.azurewebsites.net/api/authors";
var header = { "SABIO-AUTH": "U7E2M0SUX" };

function success(data, status, xhr) {
    $(".author-list").empty();
    for (var i = 0; i < data.items.length; i++) {
        addAuthor(data.items[i]);
    }
}

function successChange(data, status, xhr) {
    loadAuthors(success)
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
    console.log(data);
    addAuthorAjax(data, successChange, error);
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
