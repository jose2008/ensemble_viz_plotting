Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

function VizHistorialTable(parent, divId, params, name , tbody)
{
	this.m_divId = divId;
	this.m_body = tbody;
	this.m_parent = parent;
}


VizHistorialTable.prototype.draw = function( params ) 
{
	console.log("ver weight_historial...................");
	console.log(APPLICATION_DATA['weight_historial']);
	var nameEnsemble = $("#idSelect").val();
	params = [{"ensemble": "E" + (APPLICATION_DATA['historial'].length+1),"nameMethod":nameEnsemble ,   "name":APPLICATION_DATA_copy['modelContainers'].length,
	"value":APPLICATION_DATA['metric_historial'][0][0]
	,"dos":APPLICATION_DATA['metric_historial'][0][1], "d":APPLICATION_DATA['metric_historial'][0][2]}];
	APPLICATION_DATA['historial'].push( {"container":APPLICATION_DATA_copy['modelContainers'], "metric":APPLICATION_DATA['metric_historial'], "position":APPLICATION_DATA['positions_historial'].pop() ,
	 'label':APPLICATION_DATA['label_historial'].pop(), 'weight': APPLICATION_DATA['weight_historial'].pop()}  );

	var self = this;
	console.log("from save1");
	params.forEach(function(el) {
	        var tr = document.createElement("tr");
	        //var td1 = document.createElement("td");
	        //tr.appendChild(td1);
	        var checkbox = document.createElement("INPUT");
			checkbox.type = "checkbox";
			checkbox.id = "check" + APPLICATION_DATA['historial'].length;
			tr.appendChild(checkbox);
	        for (var o in el) {
	        	console.log("from save2");  
	            var td = document.createElement("td");
	            td.appendChild(document.createTextNode(el[o]));
	            tr.appendChild(td);
	        }
	        console.log("from save3");
	        self.m_body.appendChild(tr);  
    	});

	var metric_of_method = [];
	var numberOfSides = APPLICATION_DATA_copy['modelContainers'].length;

	//APPLICATION_DATA['Comparation']["methods"].push("E" + (APPLICATION_DATA['historial'].length));
	//APPLICATION_DATA['Comparation']["color"].push("#FFFF00");
	APPLICATION_DATA['Comparation']["methods"].insert(APPLICATION_DATA['Comparation']["color"].length -3, "E" + (APPLICATION_DATA['historial'].length));
	APPLICATION_DATA['Comparation']["color"].insert( APPLICATION_DATA['Comparation']["color"].length-3, "#ffcc00");

	for(var k = 0; k < numberOfSides; k++){
			metric_of_method = metric_of_method.concat(APPLICATION_DATA_copy['modelContainers'][k].getCurrentMetrics());
		}
		console.log("before sendinggggg");
		//console.log(metric_of_method);
		console.log(APPLICATION_DATA['Comparation']['metric']);
		console.log(APPLICATION_DATA['metric_historial'][0]);
		//metric_of_method = metric_of_method.concat(APPLICATION_DATA['metric_historial'][0]);
		APPLICATION_DATA['Comparation']['metric'] = APPLICATION_DATA['Comparation']['metric'].concat( APPLICATION_DATA['metric_historial'][0]  );
		//metric_of_method = metric_of_method.concat(APPLICATION_DATA['metric_historial'][0]);
		//metric_of_method = metric_of_method.concat(APPLICATION_DATA['metric_historial'][2]);
		console.log(APPLICATION_DATA['Comparation']['metric']);
		console.log(metric_of_method);
	$.ajax({
        		headers: {
    			'X-HTTP-Method-Override': 'PATCH'
   				},
        		type:"POST",
        		async: false,
			    url: '/views/dimensionalReduction' ,
			    data: {
	          	"list_metrics": APPLICATION_DATA['Comparation']['metric'],
	          	csrfmiddlewaretoken:"{{ csrf_token }}",
	        	},
			    success: function(data) {
			    	console.log("after successfull ");
			    	console.log(APPLICATION_DATA['Comparation']['valor'])
			    	data = JSON.parse(data);
			        APPLICATION_DATA["Comparation"]["valor"] = data['list_metrics'];
			        console.log("ajax from table");
			        console.log(data['list_metrics']);
			        var id = "bodyIDModal";//.concat(self.m_name);
					if(document.getElementById("IDcomparationMethod")) document.getElementById("IDcomparationMethod").innerHTML = "";
			        self.m_parent.getVizComparationMethods().draw( {"listWeight":[1,1,1]} );//, ['best', 'average','worst']
			        
			    },
			    failure: function(data) { 	
			    }
			}); 






	console.log("from save4");
	var table;

	
}


