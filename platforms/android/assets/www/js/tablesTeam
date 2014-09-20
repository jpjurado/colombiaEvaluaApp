$(document).ready(function(){
	console.log("Debug since table");
	$("#table-column-toggle-body .cell")
		.bind("click", playMove);
	console.log(team);
	console.log($("#nameTeam").text())
	$("#nameTeam").text("Mis Monas Faltantes");

	updateLaminasFaltantes();
});

function updateLaminasFaltantes(){
	$("#table-column-toggle-body").empty();
	db.transaction(function(transaction){
		var cmd = "SELECT * FROM laminasPanini WHERE estado = \"S\" OR estado = \"O\";"
		transaction.executeSql(cmd,[],function(transaction,result){
			if(result != null && result.rows != null){
				var contador = 0;
				for(var i = 0; i < result.rows.length; i++){
					var row = result.rows.item(i);
					console.log("Debug: "+row.idLamina+"  "+row.estado);
					if(contador == 0)
					{
						$("#table-column-toggle-body").append("<tr>");
						var cell = $("<th id = \"sheet_"+row.idLamina+"\">"+row.idLamina+"</th>")
							.addClass("cell")
							.appendTo("#table-column-toggle-body")
							.bind("click", playMoveFaltantes);;
						contador++;
					}
					else if(contador == 6)
					{
						var cell = $("<th id = \"sheet_"+row.idLamina+"\">"+row.idLamina+"</th>")
							.addClass("cell")
							.appendTo("#table-column-toggle-body")
							.bind("click", playMoveFaltantes);;
						$("#table-column-toggle-body").append("</tr>");
						contador = 0;
					}
					else
					{
						var cell = $("<th id = \"sheet_"+row.idLamina+"\">"+row.idLamina+"</th>")
							.addClass("cell")
							.appendTo("#table-column-toggle-body")
							.bind("click", playMoveFaltantes);;
						contador++;
					}
				}
			}
		},errorHandler);
	},errorHandler,nullHandler);
}

function playMoveFaltantes(ev)
{
	console.log("Debug since Clicked");

	var cell = $(this);
	console.log(cell.text());
	console.log(cell.attr('id'));
	console.log(cell.attr('id').split("_")[1]);
	var nId = cell.attr('id').split("_")[1];
	var estado = (cell.attr('class').indexOf("cellVelongs") >= 0)?"O":"E";
	console.log("****  "+estado);
	updateLamina(nId,estado);

}

function updateLamina(idLamina,estado){
	db.transaction(function(transaction){
		var cmd = "UPDATE laminasPanini SET estado ='"+estado+"' WHERE idlamina ="+idLamina;
		console.log(cmd);
		transaction.executeSql(cmd,[],function(transaction){
			var cmd1 = "SELECT * FROM laminasPanini WHERE idlamina = "+idLamina;
			transaction.executeSql(cmd1,[],function(transaction,result){
				if(result != null && result.rows != null){
					for(var i = 0; i < result.rows.length; i++){
						var row = result.rows.item(i);
						console.log("Update Lamina: "+row.idLamina+"  "+row.estado);
						if(row.estado == "E")
						{
							$("#sheet_"+row.idLamina).removeClass("cell");
							$("#sheet_"+row.idLamina).addClass("cellVelongs");
						}
						else
						{
							$("#sheet_"+row.idLamina).removeClass("cellVelongs");
							$("#sheet_"+row.idLamina).addClass("cell");
						}
					}
				}
			},errorHandler);
	},errorHandler);
		transaction.executeSql( 'SELECT COUNT(*) AS c FROM laminasPanini WHERE estado = \"E\"',[],darNumeroLaminasFaltantes,errorHandler);
	});

}