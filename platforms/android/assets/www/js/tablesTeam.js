$(document).ready(function(){
	console.log("Debug since table");
	console.log(team);
	console.log($("#nameTeam").text())
	$("#nameTeam").text(team);

	updateLaminasTeam();
});

function updateLaminasTeam(){
	$("#table-column-toggle-body").empty();
	db.transaction(function(transaction){
		var limiteInferior = 32+(idTeam*19);
		var limiteSuperior = limiteInferior + 19;
		var cmd = "SELECT * FROM laminasPanini WHERE idLamina >= "+limiteInferior+" AND idLamina < "+limiteSuperior;
		transaction.executeSql(cmd,[],function(transaction,result){
			if(result != null && result.rows != null){
				var contador = 0;
				for(var i = 0; i < result.rows.length; i++){
					var row = result.rows.item(i);
					console.log("Debug: "+i+"   "+row.idLamina+"  "+row.estado);
					if(i == 0)
					{
						$("#txtShield").text(row.idLamina);
						var cell = $("<h4 name=\"txtShieldtxtShield\" id = \"sheet_"+row.idLamina+"\">"+row.idLamina+"</h4>")
							.appendTo("#divShield")
							.bind("click", playMoveTeam);
						if(row.estado == "E")
						{
							cell.text("X ");
							cell.addClass("cellVelongs");
						}
						else
						{
							cell.addClass("cell");
						}

					}
					else if(i == 1)
					{
						$("#txtShield").text(row.idLamina);
						var cell = $("<h4 name=\"txtShieldtxtShield\" id = \"sheet_"+row.idLamina+"\">"+row.idLamina+"</h4>")
							.appendTo("#divTeam")
							.bind("click", playMoveTeam);
						if(row.estado == "E")
						{
							cell.addClass("cellVelongs");
						}
						else
						{
							cell.addClass("cell");
						}
					}
					else
					{
						if(contador == 0)
						{
							$("#table-column-toggle-body").append("<tr>");
							var cell = $("<th id = \"sheet_"+row.idLamina+"\">"+row.idLamina+"</th>")
								.addClass("cell")
								.appendTo("#table-column-toggle-body")
								.bind("click", playMoveTeam);;
							contador++;
						}
						else if(contador == 4)
						{
							var cell = $("<th id = \"sheet_"+row.idLamina+"\">"+row.idLamina+"</th>")
								.addClass("cell")
								.appendTo("#table-column-toggle-body")
								.bind("click", playMoveTeam);;
							$("#table-column-toggle-body").append("</tr>");
							contador = 0;
						}
						else
						{
							var cell = $("<th id = \"sheet_"+row.idLamina+"\">"+row.idLamina+"</th>")
								.addClass("cell")
								.appendTo("#table-column-toggle-body")
								.bind("click", playMoveTeam);;
							contador++;
						}
					}
				}
			}
		},errorHandler);
	},errorHandler,nullHandler);
}

function playMoveTeam(ev)
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
							$("#sheet_"+row.idLamina).text(" X");
							$("#sheet_"+row.idLamina).removeClass("cell");
							$("#sheet_"+row.idLamina).addClass("cellVelongs");
						}
						else
						{
							$("#sheet_"+row.idLamina).text(row.idLamina);
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