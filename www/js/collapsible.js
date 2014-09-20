// global variables
var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 200000;

var team = "France";
var idTeam = 0;
var page = 2;


$(document).ready(function(){
	console.log("Collapsible");

	db = openDatabase(shortName, version, displayName,maxSize);

	db.transaction(function(tx){

	// you can uncomment this next line if you want the User table to be empty each time the application runs
	// tx.executeSql( 'DROP TABLE User',nullHandler,nullHandler);

	// this line actually creates the table User if it does not exist and sets up the three columns and their types
	// note the UserId column is an auto incrementing column which is useful if you want to pull back distinct rows
	// easily from the table.
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS User(UserId INTEGER NOT NULL PRIMARY KEY, FirstName TEXT NOT NULL, LastName TEXT NOT NULL)', [],nullHandler,errorHandler);
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS laminasPanini(idLamina INTEGER NOT NULL PRIMARY KEY, estado TEXT NOT NULL)', [],nullHandler,errorHandler);
	tx.executeSql( 'SELECT * FROM laminasPanini', [], querySuccess, errorHandler);
	tx.executeSql( 'SELECT COUNT(*) AS c FROM laminasPanini WHERE estado = \"E\"',[],darNumeroLaminasFaltantes,errorHandler);
	},errorHandler,successCallBack);
	$("#btnMisLaminas").bind("click", btnMisLaminas);
	$("#btnAgregarLamina").bind("click", btnAgregarLamina);
	$("#btnLaminasFaltantes").bind("click", btnLaminasFaltantes);
	$("#groups .team")
		.bind("click", playMove);
});

function btnMisLaminas(ev)
{
	console.log("Mis Laminas");
	page = 0;
	$.mobile.changePage( "tables.html", { transition: "slideup"} );
	console.log(team);
}

function btnLaminasFaltantes(ev)
{
	console.log("Mis Laminas Faltantes");
	page = 0;
	$.mobile.changePage( "tablesFaltantes.html", { transition: "slideup"} );
	console.log(team);
}

function btnAgregarLamina(ev)
{
	console.log("Btn Agregar Lamina");
	page = 0;
	console.log($("#txtAgregarLamina").val());
	addLamina($("#txtAgregarLamina").val());
}


function playMove(ev)
{
	console.log("Debug since Clicked");
	var cell = $(this);
	console.log(cell.text());
	console.log(cell.attr('name'));
	team = cell.text();
	idTeam = cell.attr('name');
	$.mobile.changePage( "tablesTeam.html", { transition: "slideup"} );
	console.log(team);
}

// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   console.log('Error: ' + error.message + ' code: ' + error.code);
}

// this is called when a successful transaction happens
function successCallBack() {
   console.log("DEBUGGING: success");
}

function nullHandler(){
	console.log("********************");
};

function querySuccess(tx, result) {
	console.log("+++++++++++++++++++++")
    console.log("Insert ID = " + result.rows.length);
    if(result.rows.length == 0)
    {
    	console.log("Iniciando Laminas");
    	for (var i = 0; i < 639; i++) {
    		tx.executeSql( 'INSERT INTO laminasPanini(estado) VALUES (\'S\')',[],nullHandler,errorHandler);
    	};
    }
}

function darNumeroLaminasFaltantes(tx,result){
	console.log("result = "+result.rows);
	console.log("result = "+result.rows.length);
	console.log("result = "+result.rows.item(0).c/639);
	var porcentaje = Math.round((result.rows.item(0).c/639)*100);
	var faltantes = 639-result.rows.item(0).c;
	$("#txtCompletado").text(porcentaje+"% completado.");
	$("#txtFaltantes").text("Me faltan: "+faltantes+".");
}

function addLamina(idLamina){
	db.transaction(function(transaction){
		var cmd = "UPDATE laminasPanini SET estado ='E' WHERE idlamina ="+idLamina;
		console.log(cmd);
		transaction.executeSql(cmd,[],function(){
		      $("#popupBasic").popup();
		      $("#popupBasic").text("Lamina "+idLamina+" Agregada");
		      $("#popupBasic").popup("open");
		    setTimeout(function(){
		      $("#popupBasic").popup("close");
		      $("#txtAgregarLamina").val("");
		    }, 1000);
		},errorHandler);
		transaction.executeSql( 'SELECT COUNT(*) AS c FROM laminasPanini WHERE estado = \"E\"',[],darNumeroLaminasFaltantes,errorHandler);
	},errorHandler);
}
