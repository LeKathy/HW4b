/*
FILE NAME: script.js
ASSIGNMENT: Create a dynamic Multiplcation Table using JQuery Plugin with UI
Kathy Le, UMass Lowell Computer Science, Kathy_Le@student.uml.edu, khle@cs.uml.edu
Copyright (c) 2021 by Kathy Le. All rights reserved. May be freely copied or excerpted    
for educational purposes with credit to the author. 
     
PROJECT DESCRIPTION:The goal of this program project assignment is to further
familiarize with HTML, CSS, and be introduced to JavaScript. In using those 
languages, we are to create a dynamic table of multiplication, asking for
ther user's input in four places. From the input, the table will be created
if the requirements are met. This requires the updates version using jQuery.
PROGRAM FILE GOAL: This file will dictate the behavior of the website and how to execute and create a dynamic table
*/
/*This is to load the sliders and have the tab deletion selection function*/
$(document).ready(function() {
    sliders();

    /*to close the tabs, user must click x*/
    const tabs = $("#tabs").tabs();
    tabs.on("click", "span.ui-icon-close", function() {
        let tableID = this.closest("li").querySelector("a").text;
        let checkedTable = document.getElementById(`${tableID}`);
        const child = checkedTable.querySelector(".tabTable");//Choose a table
        this.parentElement.remove();//Remove the table selected
        child.parentElement.remove();//Remove the content of the table
        tabs.tabs("refresh");
    });

    /*This is to the delete function*/
    $("#delete").on("click", function() {
        const checkBox = document.querySelectorAll(".checkBox");
        checkBox.forEach(checkBoxChecked => {
            let tableID = checkBoxChecked.closest("li").querySelector("a").text;
            const checkedTable = document.getElementById(`${tableID}`)
            const child = checkedTable.querySelector(".tabTable")
            if (checkBoxChecked.checked == true) {
                checkBoxChecked.parentElement.remove()
                child.parentElement.remove()
            }
        });
        $("#tabs").tabs("refresh");
    });
});

/*submit button function to make sure it works*/
$("#submit").click(function(event){
    if($("#inputForm").valid()){
        $("#inputForm").submit();

        let minX = $("#minX").val();
        let maxX = $("#maxX").val();
        let minY = $("#minY").val();
        let maxY = $("#maxY").val(); 

        const tableHeader = `[${minX},${maxX}]x[${minY},${maxY}]`;
        $("#tabList").append(createTab(tableHeader));

        const tabTable = $("#tabData");
        const currentTable = document.querySelector("#dynMatrix table").outerHTML;

        tabTable.append(
            `<div id='${tableHeader}'>
                <div class='tabTable'>${currentTable}</div>
            </div>`
        );
    
        $("#tabs").tabs("refresh");

    }
});

/*Let the user's know that there needs to be an input to make the table work and get created in all the variable/input requesting boxes*/
function validate(){
    $.validator.addMethod("greater", function (value, element, par){
        var i = parseInt(value)
        var j = parseInt($(par).val())
        return i >= j
    },
    "Error: Maximum has to be greater than the minimum value");

    $("#inputForm").validate({
        rules:{       
            minX:{
                required: true,
                range: [-50,50]
            },

            maxX:{
                required: true,
                range: [-50,50],
                greater: $("minX")
            },

            minY:{
                required: true,
                range: [-50,50]
            },

            maxY:{
                required: true,
                range: [-50,50],
                greater: $("minY")
            }
        },
        /*error message*/
        messages: {
            minX: {
                required: "Error! Please assign a value within the range of -50 to 50 in the horizontal start to begin!",
                range: "Error! This is not in range."
            },

            maxX: {
                required: "Error! Please assign a value within the range of -50 to 50 in the horizontal start to begin!",
                range: "Error! This is not in range."
            },

            minY: {
                required: "Error! Please assign a value within the range of -50 to 50 in the horizontal start to begin!",
                range: "Error! This is not in range."
            },

            maxY: {
                required: "Error! Please assign a value within the range of -50 to 50 in the horizontal start to begin!",
                range: "Error! This is not in range."
            }
        },

        submitHandler: function() {
            matrix();
            return false;
        },
        
        errorPlacement(error, element) {
            error.insertAfter(element.parent('div'));
        }
    });
}

/*this is to create the Tabs*/
function createTab(tableHeader) {
    /*This is to creat all parts required to be in the tab*/
    const li = document.createElement("li");
    const link = document.createElement("a");
    const span = document.createElement("span");
    const input = document.createElement("input");
    const br = document.createElement("br");
    
    /*This is to set-up the tabs*/
    link.href = `#${tableHeader}`;
    link.textContent = tableHeader;
    span.className += "ui-icon-close";
    span.textContent = "x";
    input.type = "checkbox";
    input.className += "checkBox";
    
    /*This is to update the tabs*/
    li.append(link);
    li.append(span);
    li.append(br);
    li.append(input);
    return li;
}

/*This function is to create and make the sliders*/
function sliders() {
    //Minimum X value slider
    $("#minX_slider").slider({
        min: -50,
        max: 50,
        //Value and form updates when slider is moved
        slide: function(event, ui) {
            $("#minX").val(ui.value);
            validate();
            if($("#inputForm").valid()){
                $("#inputForm").submit();
            }
        }
    });

    /*Validates the hard user input*/
    $("#minX").on("keyup", function() {
        $("#minX_slider").slider("value", this.value);
        validate();
        if($("#inputForm").valid()){
            $("#inputForm").submit();
        }
    });

    /*Max X value*/
    $("#maxX_slider").slider({
        min: -50,
        max: 50,
        //Value and form updates when slider is moved
        slide: function(event, ui) {
            $("#maxX").val(ui.value);
            validate();
            if($("#inputForm").valid()){
                $("#inputForm").submit();
            }
        }
    });

    /*Validate for this input*/
    $("#maxX").on("keyup", function() {
        $("#maxX_slider").slider("value", this.value);
        validate();
        if($("#inputForm").valid()){
            $("#inputForm").submit();
        }
    });

    /*Min Y value*/
    $("#minY_slider").slider({
        min: -50,
        max: 50,
        //Value and form updates when slider is moved
        slide: function(event, ui) {
            $("#minY").val(ui.value);
            validate();
            if($("#inputForm").valid()){
                $("#inputForm").submit();
            }
        }
    });

    /*Validate*/
    $("#minY").on("keyup", function() {
        $("#minY_slider").slider("value", this.value);
        validate();
        if($("#inputForm").valid()){
            $("#inputForm").submit();
        }
    });

    /*Max Y value*/
    $("#maxY_slider").slider({
        min: -50,
        max: 50,
        //Value and form updates when slider is moved
        slide: function(event, ui) {
            $("#maxY").val(ui.value);
            validate();
            if($("#inputForm").valid()){
                $("#inputForm").submit();
            }
        }
    });

    /*Validate*/
    $("#maxY").on("keyup", function() {
        $("#maxY_slider").slider("value", this.value);
        validate();
        if($("#inputForm").valid()){
            $("#inputForm").submit();
        }
    });
}

/*******************************Assignment 3*********************** */

function matrix(){

    /*This is to get the user's input and assign to the variables for later use*/
    var minY = Number(document.getElementById("minY").value);
    var maxY = Number(document.getElementById("maxY").value);
    var minX = Number(document.getElementById("minX").value);
    var maxX = Number(document.getElementById("maxX").value);

    /*variable assigning starts here*/
    var curX = minY;
    var curY = minX;
    var x;

    /*Making a table*/
    var table = document.createElement('table');
    table.classList.add('newTable');

    for (let i = 0; i <= (Math.abs(maxX - minX) + 1); i++){
        var row = document.createElement('tr');
        curX = minY;

        for(let j = 0; j <= (Math.abs(maxY - minY) + 1); j++){
            var col;

            if (i==0) {
                col = document.createElement('th');
            }
            else {
                col = document.createElement('td');
            }

            if ((i == 0) && (j == 0)){
                val = '';
                col.classList.add('firstCell');
            }
            else if(i == 0){
                val = curX;
                curX++;
                col.classList.add('firstRow');
            }
            else if(j == 0){
                val = curY;
                col.classList.add('firstCol');
            }
            else{
                val = curX * curY;
                curX++;
            }
            col.innerHTML = val;
            row.appendChild(col);
        }
        if(i != 0){
            curY++;
        }
        table.appendChild(row);
    }
    document.getElementById('dynMatrix').innerHTML = '';
    document.getElementById('dynMatrix').appendChild(table);
}