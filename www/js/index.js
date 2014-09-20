/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var currentPage = 0;

var pregunta1 = {number : 1 ,
    type : "multiple",
    question : "En que año se descubrio america?" , 
    options : ["1492","1566","1512","1568"]};

var pregunta2 = {number : 2 ,
    type : "sino",
    question : "Vamos a ganar el reto?" , 
    options : ["Verdader","Falso"]};

var pregunta3 = {number : 3 ,
    type : "abierta",
    question : "Escriba el himno Nacional?" , 
    options : []};

var preguntas = [pregunta1,
                pregunta2, 
                pregunta3];

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(document).ready(function(){
    console.log("Iniciado");
    console.log(preguntas);
    console.log(preguntas.length);
    //$("#numPregunta").text("Cambio");
    $("#buttonAnterior")
        .bind("click", anterior);
    $("#buttonSiguiente")
        .bind("click", siguiente);
    $(document).on("swiperight", function(){
        console.log("Swipe");
        $("#numPregunta").text("Cambio");
          //navigate to next image
          //$.mobile.changePage();
    });
    console.log(pregunta1);
    window.setTimeout(function(){
        //console.log("Hola");
        $("#debug").text(cvox);
        cvox.TestMessages["chromevox_input_type_text"] = {message: "cuadro de edición"};
        cvox.TestMessages["chromevox_input_type_radio"] = {message: "botón de opción"};
        cvox.TestMessages["chromevox_selected"] = {message: "seleccionado"};
        cvox.TestMessages["chromevox_unselected"] = {message: "no seleccionado"};
        cvox.TestMessages["chromevox_radio_selected_state"] = {message: "seleccionado"};
        cvox.TestMessages["chromevox_radio_unselected_state"] = {message: "no seleccionado"};
        cvox.TestMessages["chromevox_input_type_submit"] = {message: "botón"};
        cvox.TestMessages["chromevox_input_type_button"] = {message: "botón"};
        cvox.TestMessages["chromevox_tag_button"] = {message: "botón"};
    },3000);
});

$(document).on("pagebeforeshow","#formularioPregunta",function(){
    console.log("Cargo pagina preguntas");
    loadEvaluacion(pregunta1);
});

function loadEvaluacion(evaluacion)
{
    $("#numPregunta").text("Pregunta "+evaluacion.number+" de "+preguntas.length);
    $("#pregunta").text(""+evaluacion.question);
    if(evaluacion.type == "multiple")
    {
        $('<legend>Selecciona una respuesta:</legend>').appendTo($("#camposMultiple"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-1b" value="Opcion-1"><label for="radio-preguntas-1b" id="opcion_1">'+evaluacion.options[0]+'</label>').appendTo($("#camposMultiple"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-2b" value="Opcion-2"><label for="radio-preguntas-2b" id="opcion_2">'+evaluacion.options[1]+'</label>').appendTo($("#camposMultiple"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-3b" value="Opcion-3"><label for="radio-preguntas-3b" id="opcion_3">'+evaluacion.options[2]+'</label>').appendTo($("#camposMultiple"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-4b" value="Opcion-4"><label for="radio-preguntas-4b" id="opcion_4">'+evaluacion.options[3]+'</label>').appendTo($("#camposMultiple"));
        console.log($("#camposMultiple"));
        $("#camposMultiple").trigger('create');
    }
    else if(evaluacion.type == "sino")
    {
        $('<legend>Selecciona una respuesta:</legend>').appendTo($("#camposMultiple"));
        $('<input type="radio" name="radio-sino-'+evaluacion.number+'" id="radio-sino-1b" value="Opcion-1"><label for="radio-sino-1b" id="opcion_1">'+evaluacion.options[0]+'</label>').appendTo($("#camposMultiple"));
        $('<input type="radio" name="radio-sino-'+evaluacion.number+'" id="radio-sino-2b" value="Opcion-2"><label for="radio-sino-2b" id="opcion_2">'+evaluacion.options[1]+'</label>').appendTo($("#camposMultiple"));
        console.log($("#camposMultiple"));
        $("#camposMultiple").trigger('create');
    }
    else if(evaluacion.type == "abierta")
    {
        $('<legend>Escribe tu respuesta:</legend>').appendTo($("#camposMultiple"));
        $('<textarea cols="40" rows="8" name="textarea2" id="textarea2b" placeholder="Escribe tu respuesta aqui"></textarea>').appendTo($("#camposMultiple"));
    }
}

function siguiente()
{
    console.log("Siguiente");
    $("#camposMultiple").empty();
    currentPage++;
    if(currentPage == preguntas.length)
    {
        currentPage = 0;
    }
    loadEvaluacion(preguntas[currentPage]);
}

function anterior()
{
    console.log("Anterior");
    loadEvaluacion(pregunta1);
    currentPage--;
    if(currentPage == -1)
    {
        currentPage = preguntas.length - 1;
    }
    loadEvaluacion(preguntas[currentPage]);
}