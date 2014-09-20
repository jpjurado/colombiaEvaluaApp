$(document).ready(function(){
	console.log("Debug since table");
	$("#table-column-toggle-body .cell")
		.bind("click", playMove);
	console.log(team);
	console.log($("#nameTeam").text())
	$("#nameTeam").text("Mis Monas");

	$("#equipo").on( "swipeleft", function(event){
		console.log("SwipeLeft");
		if(page < 6)
		{
			page++;
			initTablaLaminas();
			updateLaminas();
		}
	});

	$("#equipo").on( "swiperight", function(event){
		console.log("Swiperight");
		if(page >0)
		{
			page--;
			initTablaLaminas();
			updateLaminas();
		}
	});

	$("#btnSiguiente").bind("click", function(event){
		console.log("SwipeLeft");
		if(page < 6)
		{
			page++;
			initTablaLaminas();
			updateLaminas();
		}
	});
	$("#btnAnterior").bind("click", function(event){
		console.log("Swiperight");
		if(page >0)
		{
			page--;
			initTablaLaminas();
			updateLaminas();
		}
	});

	initTablaLaminas();
	updateLaminas();
});

function initTablaLaminas()
{
	$("#table-column-toggle-body").empty();
	if(page != 6)
	{
		for (var i = 0; i < 20; i++) {
			$("#table-column-toggle-body").append("<tr>");
			for (var j = 0; j < 5; j++) {
				var beg = page*100;
				if(j == 0)
					beg = page*100;
				var cell = $("<th id = \"sheet_"+(page*100+5*i+j)+"\">"+(beg+5*i+j)+"</th>")
					.addClass("cell")
					.appendTo("#table-column-toggle-body");
				console.log((10*i+j));
			};	
			$("#table-column-toggle-body").append("</tr>");
		};
	}
	else
	{
		for (var i = 0; i < 8; i++) {
			$("#table-column-toggle-body").append("<tr>");
			for (var j = 0; j < 5; j++) {
				var beg = page*100;
				if(j == 0)
					beg = page*100;
				var cell = $("<th id = \"sheet_"+(page*100+5*i+j)+"\">"+(beg+5*i+j)+"</th>")
					.addClass("cell")
					.appendTo("#table-column-toggle-body");
				console.log((10*i+j));
			};	
			$("#table-column-toggle-body").append("</tr>");
		};
	}
	$("#table-column-toggle-body .cell")
		.bind("click", playMove);
}

function updateLaminas(){
	console.log("Page: "+page);
	db.transaction(function(transaction){
		var cmd = "SELECT * FROM laminasPanini WHERE idLamina < "+((page+1)*100)+" AND idLamina >= "+(page*100)+";"
		transaction.executeSql(cmd,[],function(transaction,result){
			if(result != null && result.rows != null){
				for(var i = 0; i < result.rows.length; i++){
					var row = result.rows.item(i);
					console.log("Debug: "+row.idLamina+"  "+row.estado);
					if(row.estado == "E")
					{
						$("#sheet_"+row.idLamina).text(" X ");
						$("#sheet_"+row.idLamina).removeClass("cell");
						$("#sheet_"+row.idLamina).addClass("cellVelongs");
					}
				}
			}
		},errorHandler);
	},errorHandler,nullHandler);
}

function playMove(ev)
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
							$("#sheet_"+row.idLamina).text(" X ");
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