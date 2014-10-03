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
 //var urlServer = "http://reallabs.com.co:3000/examdefault";
//var urlServer = "http://localhost:3000/examdefault";
var urlServer = "http://colevalua.nodejitsu.com/examdefault";

 var real = 1;

var pregunta1 = {number : 1 ,
    tipo : "multiple",
    texto : "En que año se descubrio america?" , 
    opciones : ["1492","1566","1512","1568" , "1333"]};

var pregunta2 = {number : 2 ,
    tipo : "falsoVerdadero",
    texto : "Vamos a ganar el reto?" , 
    opciones : ["Verdader","Falso"]};

var pregunta3 = {number : 3 ,
    tipo : "abierta",
    texto : "Escriba el himno Nacional?" , 
    opciones : []};

var pregunta3 = {number : 3 ,
    tipo : "abierta",
    texto : "Escriba el himno Nacional?" , 
    opciones : []};

var resueltas = [];
var historial = [];

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
    $.mobile.defaultPageTransition = "slide";
    //$("#numPregunta").text("Cambio");
    $("#buttonAnterior")
        .bind("click", anterior);
    $("#buttonSiguiente")
        .bind("click", siguiente);
    $("#buttonAnterior_Par")
        .bind("click", anteriorPar);
    $("#buttonSiguiente_Par")
        .bind("click", siguientePar);
    $("#btnEmpezar")
        .bind("click", loadData);
    $(".buttonFaltantes")
        .bind("click", function(){
            $.mobile.changePage( "#faltantes", { transition: "slide"} );
        });
    $(".buttonIrAPregunta")
        .bind("click", function(){
            $.mobile.changePage( "#irAPregunta", { transition: "slide"} );
        });
    $("#btnIrAPregunta")
        .bind("click", function(){
            var nId = +$("#idIrAPregunta").val();
            currentPage = nId - 1;
            if(currentPage %2 == 1)
            {
                $.mobile.changePage( "#formularioPregunta", { transition: "slide"} );
            }
            else
            {
                $.mobile.changePage( "#formularioPregunta", { transition: "slide"} );
            }
        });


    //$("#prueba").text("Aca");
    //MobileAccessibility.isScreenReaderRunning(isScreenReaderRunningCallback);
    //MobileAccessibility.isTalkBackRunning(isTalkBackRunningCallback);
    //$("#prueba").text("123");
    console.log(pregunta1);
    //$("#prueba").text("456");
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
    $("#camposMultiple").empty();
    $("#camposMultiple_Par").empty();
    $("#grafica").empty();
    $("#graficaPar").empty();
    loadEvaluacion(preguntas[currentPage]);
    console.log("Historial");
    console.log(historial);
    console.log(resueltas);
});

$(document).on("pagebeforeshow","#formularioPreguntaPar",function(){
    console.log("Cargo pagina preguntas Par");
    $("#camposMultiple").empty();
    $("#camposMultiple_Par").empty();
    $("#grafica").empty();
    $("#graficaPar").empty();
    loadEvaluacionPar(preguntas[currentPage]);
    console.log("Historial");
    console.log(historial);
    console.log(resueltas);
});

$(document).on("pagebeforeshow","#faltantes",function(){
    console.log("Cargo pagina preguntas Par");
    var contFaltantes = 0;
    for (var i = 0; i < resueltas.length; i++) 
    {
        if(!resueltas[i])
            contFaltantes++;
    };
    console.log(contFaltantes)
    $("#textFaltantes").text("Te faltan "+contFaltantes+" preguntas");
    $("#content-Faltantes").empty();
    for (var i = 0; i < resueltas.length; i++) 
    {
        if(!resueltas[i])
        {
            $('<li id="faltante-'+i+'"><button>Pregunta '+(i+1)+'</button></li>').appendTo($("#content-Faltantes"))
                                                                                .bind("click",changePageFaltante);   
        }
    };
    $("#asd").trigger('create');
    console.log($("#content-Faltantes"));
});

function isScreenReaderRunningCallback(boolean) {
    if (boolean) {
        console.log("Screen reader: ON");
        // Do something to improve the behavior of the application while a screen reader is active.
    } else {
        console.log("Screen reader: OFF");
    }
}

function isTalkBackRunningCallback(boolean) {
    if (boolean) {
        console.log("Screen reader: ON");
        // Do something to improve the behavior of the application while a screen reader is active.
    } else {
        console.log("Screen reader: OFF");
    }
}


function loadEvaluacion(evaluacion)
{
    console.log("EVALUACION");
    console.log(evaluacion);
    //console.log(evaluacion.opciones[0]);
    $("#numPregunta").text("Pregunta "+evaluacion.number+" de "+preguntas.length);
    $("#pregunta").text(""+evaluacion.texto);
    if(evaluacion.tipo == "multiple")
    {
        if(evaluacion.urlImagen != undefined)
        {
            $('<img src="'+evaluacion.urlImagen+'" alt="'+evaluacion.descripcionImagen+'">').appendTo($("#grafica"));
        }
        $('<legend>Seleccion multiple con cinco opciones de respuesta:</legend>').appendTo($("#camposMultiple"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-1b" value="'+evaluacion.number+'-1"><label for="radio-preguntas-1b" id="opcion_1">'+evaluacion.opciones[0]+'</label>').appendTo($("#camposMultiple"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-2b" value="'+evaluacion.number+'-2"><label for="radio-preguntas-2b" id="opcion_2">'+evaluacion.opciones[1]+'</label>').appendTo($("#camposMultiple"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-3b" value="'+evaluacion.number+'-3"><label for="radio-preguntas-3b" id="opcion_3">'+evaluacion.opciones[2]+'</label>').appendTo($("#camposMultiple"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-4b" value="'+evaluacion.number+'-4"><label for="radio-preguntas-4b" id="opcion_4">'+evaluacion.opciones[3]+'</label>').appendTo($("#camposMultiple"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-5b" value="'+evaluacion.number+'-5"><label for="radio-preguntas-5b" id="opcion_5">'+evaluacion.opciones[4]+'</label>').appendTo($("#camposMultiple"));
        console.log($("#camposMultiple"));
        $("#camposMultiple").trigger('create');
    }
    else if(evaluacion.tipo == "falsoVerdadero")
    {
        if(evaluacion.urlImagen != undefined)
        {
            $('<img src="'+evaluacion.urlImagen+'" alt="'+evaluacion.descripcionImagen+'">').appendTo($("#grafica"));
        }
        $('<legend>Selecciona una respuesta:</legend>').appendTo($("#camposMultiple"));
        $('<input type="radio" name="radio-sino-'+evaluacion.number+'" id="radio-sino-1b" value="'+evaluacion.number+'-1"><label for="radio-sino-1b" id="opcion_1">Verdadero</label>').appendTo($("#camposMultiple"));
        $('<input type="radio" name="radio-sino-'+evaluacion.number+'" id="radio-sino-2b" value="'+evaluacion.number+'-2"><label for="radio-sino-2b" id="opcion_2">Falso</label>').appendTo($("#camposMultiple"));
        console.log($("#camposMultiple"));
        $("#camposMultiple").trigger('create');
    }
    else if(evaluacion.tipo == "abierta")
    {
        if(evaluacion.urlImagen != undefined)
        {
            $('<img src="'+evaluacion.urlImagen+'" alt="'+evaluacion.descripcionImagen+'">').appendTo($("#grafica"));
        }
        $('<legend>Escribe tu respuesta:</legend>').appendTo($("#camposMultiple"));
        $('<textarea cols="40" rows="8" name="textarea2" id="textarea2b" placeholder="Escribe tu respuesta aqui"></textarea>').appendTo($("#camposMultiple"));
    }
}

function loadEvaluacionPar(evaluacion)
{
    console.log("EVALUACION");
    console.log(evaluacion);
    //console.log(evaluacion.opciones[0]);
    $("#numPregunta_Par").text("Pregunta "+evaluacion.number+" de "+preguntas.length);
    $("#pregunta_Par").text(""+evaluacion.texto);
    if(evaluacion.tipo == "multiple")
    {
        if(evaluacion.urlImagen != undefined)
        {
            $('<img src="'+evaluacion.urlImagen+'" alt="'+evaluacion.descripcionImagen+'">').appendTo($("#graficaPar"));
        }
        $('<legend>Seleccion multiple con cinco opciones de respuesta:</legend>').appendTo($("#camposMultiple_Par"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-1b" value="'+evaluacion.number+'-1"><label for="radio-preguntas-1b" id="opcion_1">'+evaluacion.opciones[0]+'</label>').appendTo($("#camposMultiple_Par"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-2b" value="'+evaluacion.number+'-2"><label for="radio-preguntas-2b" id="opcion_2">'+evaluacion.opciones[1]+'</label>').appendTo($("#camposMultiple_Par"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-3b" value="'+evaluacion.number+'-3"><label for="radio-preguntas-3b" id="opcion_3">'+evaluacion.opciones[2]+'</label>').appendTo($("#camposMultiple_Par"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-4b" value="'+evaluacion.number+'-4"><label for="radio-preguntas-4b" id="opcion_4">'+evaluacion.opciones[3]+'</label>').appendTo($("#camposMultiple_Par"));
        $('<input type="radio" name="radio-pregunta-'+evaluacion.number+'" id="radio-preguntas-5b" value="'+evaluacion.number+'-5"><label for="radio-preguntas-5b" id="opcion_5">'+evaluacion.opciones[4]+'</label>').appendTo($("#camposMultiple_Par"));
        console.log($("#camposMultiple_Par"));
        $("#camposMultiple_Par").trigger('create');
    }
    else if(evaluacion.tipo == "falsoVerdadero")
    {
        if(evaluacion.urlImagen != undefined)
        {
            $('<img src="'+evaluacion.urlImagen+'" alt="'+evaluacion.descripcionImagen+'">').appendTo($("#graficaPar"));
        }
        $('<legend>Respuesta de falso y verdadero:</legend>').appendTo($("#camposMultiple_Par"));
        $('<input type="radio" name="radio-sino-'+evaluacion.number+'" id="radio-sino-1b" value="'+evaluacion.number+'-1"><label for="radio-sino-1b" id="opcion_1">Verdadero</label>').appendTo($("#camposMultiple_Par"));
        $('<input type="radio" name="radio-sino-'+evaluacion.number+'" id="radio-sino-2b" value="'+evaluacion.number+'-2"><label for="radio-sino-2b" id="opcion_2">Falso</label>').appendTo($("#camposMultiple_Par"));
        console.log($("#camposMultiple_Par"));
        $("#camposMultiple_Par").trigger('create');
    }
    else if(evaluacion.tipo == "abierta")
    {
        if(evaluacion.urlImagen != undefined)
        {
            $('<img src="'+evaluacion.urlImagen+'" alt="'+evaluacion.descripcionImagen+'">').appendTo($("#graficaPar"));
        }
        $('<legend>Pegunta abierta:</legend>').appendTo($("#camposMultiple_Par"));
        $('<textarea cols="40" rows="8" name="textarea2" id="textarea2b" placeholder="Escribe tu respuesta aqui"></textarea>').appendTo($("#camposMultiple"));
    }
}

function siguiente()
{
    verificarEditado();
    console.log("Siguiente");
    currentPage++;
    if(currentPage == preguntas.length)
    {
        currentPage = 0;
    }
    $.mobile.changePage( "#formularioPreguntaPar", { transition: "slide"} );
}

function anterior()
{
    verificarEditado();
    console.log("Anterior");
    currentPage--;
    if(currentPage == -1)
    {
        currentPage = preguntas.length - 1;
    }
    $.mobile.changePage( "#formularioPreguntaPar", { transition: "slide"} );
}

function siguientePar()
{
    verificarEditado();
    console.log("Siguiente");
    currentPage++;
    if(currentPage == preguntas.length)
    {
        currentPage = 0;
    }
    $.mobile.changePage( "#formularioPregunta", { transition: "slide"} );
}

function anteriorPar()
{
    verificarEditado();
    console.log("Anterior");
    currentPage--;
    if(currentPage == -1)
    {
        currentPage = preguntas.length - 1;
    }
    $.mobile.changePage( "#formularioPregunta", { transition: "slide"} );
}

function loadData()
{
    if(real == 1)
    {
        $("#txtCargando").text("Cargando");
        $.ajax({
            type: "GET",
            url: urlServer,
        })
        .done(function(json) {
            $("#txtCargando").text("Termino");
            console.log(json.questions);
            console.log("asd");
            //json = jQuery.parseJSON(json);
            console.log(json);

            preguntas = json.questions;
            console.log("preguntas 1234");
            console.log(preguntas);
            console.log(preguntas.number);
            console.log("Acaa");
            resueltas = new Array(preguntas.length);
            historial = new Array(preguntas.length);
            for (var i = 0; i < resueltas.length; ++i) 
            { 
                resueltas[i] = false; 
                historial[i] = "";
            }
            $.mobile.changePage( "#formularioPregunta", { transition: "slide"} );
            //console.log("Termino de modificar finishMove");
        });
    }
    else
    {
        resueltas = new Array(preguntas.length);
        historial = new Array(preguntas.length);
        for (var i = 0; i < resueltas.length; ++i) 
        { 
            resueltas[i] = false; 
            historial[i] = "";
        }
        $.mobile.changePage( "#formularioPregunta", { transition: "slide"} );
    }
}

function verificarEditado()
{
    if(preguntas[currentPage].tipo == "abierta")
    {
        if($('textarea').val() != "")
        {
            historial[currentPage] = $('textarea').val();
            resueltas[currentPage] = true;
        }
    }
    else
    {
        if($('input:radio:checked').length > 0)
        {
            console.log("Checked");
            console.log($("input:checked").attr("value"));
            var pos = +$("input:checked").attr("value").split("-")[0] - 1;
            console.log(preguntas[pos].tipo);
            
            var nValue = +$("input:checked").attr("value").split("-")[1];
            historial[pos] = nValue;
            resueltas[pos] = true;
            console.log($('input:radio:checked').length );
            console.log("Checked");
        }
        else
        {
            console.log("No Checked");
        }
    }
}

function changePageFaltante(ev)
{
    console.log($(this));
    console.log($(this).attr("id"));
    var nId = $(this).attr("id").split("-")[1];
    currentPage = nId;
    if(currentPage %2 == 1)
    {
        $.mobile.changePage( "#formularioPregunta", { transition: "slide"} );
    }
    else
    {
        $.mobile.changePage( "#formularioPregunta", { transition: "slide"} );
    }
}