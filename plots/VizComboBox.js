function VizComboBox(parent, divId, params, name )
{
	this.m_divId = divId;
	this.m_parent = parent;
	this.m_name = name;
	
	span_select = document.createElement('span');
	span_select.className = "custom-dropdown";
	select = document.createElement( 'select' );
	select.id = "idSelect";

	option0 = document.createElement( 'option' );
	option0.id = "ceroId";
	option0.text = "Ensemble";

	option1 = document.createElement( 'option' );
	option1.id = "unoId";
	option1.text = "Voting";

	option2 = document.createElement( 'option' );
	option2.id = "dosId";
	option2.text = "CSPA";

	option3 = document.createElement( 'option' )
	option3.id = "tresId";
	option3.text = "Agglomerative"

	select.appendChild(option0);
	select.appendChild(option1);
	select.appendChild(option2);
	select.appendChild(option3);


	span_select.appendChild(select);

	this.m_divId.appendChild( span_select );
	output = document.createElement('p');
	output.id = "result"+String(params['modelType']);
	this.m_divId.appendChild( output );

	this.key = "idSelect";
	this.view = params['modelType'];
}


VizComboBox.prototype.draw = function( params ) 
{
	var self = this;
	$("#" + self.key).change(function () {
		var nameEnsemble = $("#idSelect").val(); 
		method = "";
		if(nameEnsemble.localeCompare("Voting") == 0){
			method = '/views/majority_vote_test';
			method2 = '/views/majority_vote_initial';
		}
		if(nameEnsemble.localeCompare("CSPA") == 0){
			method = '/views/ensamble_model_test';
			method2 = '/views/ensamble_model_initial';
		}
		if(nameEnsemble.localeCompare("Agglomerative") == 0){
			method = '/views/ensamble_Agglomerative_initial';
			method2 = '/views/ensamble_Agglomerative_initial';
		}

		listToDraw = [];
		var N=4;
		var N2 = 3;
		var size = 60;
		var listPoints = [];
		var numberOfSides = APPLICATION_DATA_copy['modelContainers'].length;
    	var Xcenter = (document.getElementById('tcanvas').clientWidth)/4;
   		var Ycenter = (document.getElementById('tcanvas').clientHeight)/2;   


   		for (var i = 1; i <= numberOfSides; i += 1) {
			vx = Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides);
			vy = Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides);
			listPoints.push(vx);
			listPoints.push(vy);
			APPLICATION_DATA['vertex'].push(vx);
			APPLICATION_DATA['vertex'].push(vy);
			listToDraw.push( [vx, vy ] );
		}

		var list_large2 = [];
		N3 = 1;
		for(var k=1; k<=6; k++){
			var listPoints2 = [];
   			for(var i=1; i<=numberOfSides; i+=1){
   				console.log(i);
   				var vx = Xcenter + size* (k/6) * Math.cos(i * 2 * Math.PI / numberOfSides);
				var vy = Ycenter + size* (k/6)* Math.sin(i * 2 * Math.PI / numberOfSides);
				console.log(vx);
				console.log(vy);
				listPoints2.push(vx);
				listPoints2.push(vy);
				listToDraw.push( [vx, vy ] );
				APPLICATION_DATA['points'].push([vx,vy]);
			      		APPLICATION_DATA_copy['points'].push([vx,vy]);
				list_large2.push(vx);
			      list_large2.push(vy);
   			}

   			if(k==1) continue;

   			
			for(var i=0; i<listPoints.length ; i=i+2  ){
				for(var j=1; j<=N3; j++){
					if(i == listPoints.length-2){
						mx = ( listPoints2[i]+ (j/(N3 +1-j))*listPoints2[0] ) /( 1+(j/(N3+1-j)) ) ;
						my = ( listPoints2[i+1]+ (j/(N3+1-j))*listPoints2[1] ) /( 1+(j/(N3+1-j)) ) ;
						listToDraw.push( [ mx, my  ]  );
						list_large2.push(mx);
			      		list_large2.push(my);
						APPLICATION_DATA['points'].push([mx,my]);
			      		APPLICATION_DATA_copy['points'].push([mx,my]);
					}
					else{
						mx = ( listPoints2[i]+ (j/(N3+1-j))*listPoints2[i+2] ) /( 1+(j/(N3+1-j)) ) ;
						my = ( listPoints2[i+1]+ (j/(N3+1-j))*listPoints2[i+3] ) /( 1+(j/(N3+1-j)) ) ;
						listToDraw.push( [mx, my] );
						list_large2.push(mx);
			      		list_large2.push(my);
			      		APPLICATION_DATA['points'].push([mx,my]);
			      		APPLICATION_DATA_copy['points'].push([mx,my]);
					}	
				}
			}
			N3 = N3+1
   		}
   		console.log(list_large2);

		/*

		for(var i=0; i<listPoints.length ; i=i+2  ){
			for(var j=1; j<=N; j++){
				if(i == listPoints.length-2){
					mx = ( listPoints[i]+ (j/(N +1-j))*listPoints[0] ) /( 1+(j/(N+1-j)) ) ;
					my = ( listPoints[i+1]+ (j/(N+1-j))*listPoints[1] ) /( 1+(j/(N+1-j)) ) ;
					listToDraw.push( [ mx, my  ]  );
				}
				else{
					mx = ( listPoints[i]+ (j/(N+1-j))*listPoints[i+2] ) /( 1+(j/(N+1-j)) ) ;
					my = ( listPoints[i+1]+ (j/(N+1-j))*listPoints[i+3] ) /( 1+(j/(N+1-j)) ) ;
					listToDraw.push( [mx, my] );
				}	
			}
		}

		

		var list_large = [];
		for(var i=1; i<=(numberOfSides)*N +numberOfSides; i++){
			if(listToDraw[i-1][0] && listToDraw[i-1][1]){
				for(var t=1; t<=N2+1; t++){
			      	if(t!=N2+1){
			      		t1 = Math.round((Xcenter + (t/(N2+1-t))*listToDraw[i-1][0])/(1 + (t/(N2+1-t))));
			      		t2 = Math.round((Ycenter +  (t/(N2+1-t))*listToDraw[i-1][1])/ (1 +(t/(N2+1-t)) ));
			      		APPLICATION_DATA['points'].push([t1,t2]);
			      		APPLICATION_DATA_copy['points'].push([t1,t2]);
			      		list_large.push(t1);
			      		list_large.push(t2);
			      	}else{
			      		t1 = Math.round(listToDraw[i-1][0]);
			      		t2 = Math.round(listToDraw[i-1][1]);
			      		APPLICATION_DATA['points'].push([t1,t2]);
			      		APPLICATION_DATA_copy['points'].push([t1,t2]);
			      		list_large.push(t1);
			      		list_large.push(t2);
			      	}
				}
		    }
		}
		var t0 = performance.now();
		console.log("poligonnnnnnnn");
		console.log(list_large2);
		console.log(listToDraw);
		*/

		var myListOfArrays = [];
		for ( var i = 0; i < numberOfSides; i++ ){
					l  = APPLICATION_DATA_copy['modelContainers'][i].getCurrentLabels();
					myListOfArrays = myListOfArrays.concat(l);
		}


		//$('#loading').html('<img src="loading.gif"> loading...');
		$.ajax({
			type:"POST",
			async: false,
			url: method,
			data: {
				"username": myListOfArrays,
			    "vertex": listPoints,
			    "points": list_large2,
			    "numbers_model" : numberOfSides,
			    csrfmiddlewaretoken:"{{ csrf_token }}",
			},
			success: function(data) {
				data = JSON.parse(data);
				APPLICATION_DATA['metrics'] = data['list_of_metrics']; //.push( [data['val3'], data['val4'], data['val5']  ]  );
				APPLICATION_DATA_copy['metrics'] = data['list_of_metrics']
				//$('#loading').html(d);
			},
			failure: function(data) { 	
				window.alert('Got an error dude');
			}
		});

		var t1 = performance.now();

		var metric_of_method = [];
		var dict = {}; 
		var tmp = [];
		for(var k = 0; k < numberOfSides; k++){
			metric_of_method = metric_of_method.concat(APPLICATION_DATA_copy['modelContainers'][k].getCurrentMetrics());
			tmp.push(1/numberOfSides);
		}
		dict['listWeight'] = tmp;
		
  		var Values = $( "#" + self.key).val();
  		var selectedcolor = $( "#" + self.key ).val();

		var l2 = [1,2,3,4];

			APPLICATION_DATA['Comparation']["methods"].push("Best");
			APPLICATION_DATA['Comparation']["methods"].push("Average");
			APPLICATION_DATA['Comparation']["methods"].push("Worst");
			APPLICATION_DATA['Comparation']["color"].push("#B40404");
			APPLICATION_DATA['Comparation']["color"].push("#B40404");
			APPLICATION_DATA['Comparation']["color"].push("#B40404");
        	$.ajax({
        		headers: {
    			'X-HTTP-Method-Override': 'PATCH'
   				},
        		type:"POST",
        		async: false,
			    url: method2 ,
			    data: {
	          	"username": myListOfArrays,
	          	"metrics": [1,2],
	          	"list_metrics": metric_of_method,
	          	"numbers_model" : numberOfSides,
	          	csrfmiddlewaretoken:"{{ csrf_token }}",
	        	},
			    success: function(data) {
			    	data = JSON.parse(data);
			    	APPLICATION_DATA['metric'] = [data['val3'], data['val4'], data['val5']];
			        self.m_parent.getVizScatter().draw( data["val1"] );
			        self.m_parent.getVizBarChart().draw( [{"metrica":"silhouette","valor":data['val3']},
  														{"metrica":"SSE","valor":data['val4']},
  														{"metrica":"SSB","valor":data['val5']}] ,1 );
			        var params = {'number_polygon':1};
			        APPLICATION_DATA['metric_historial']  = [];
			        APPLICATION_DATA['metric_historial'].push([data['val3'], data['val4'], data['val5']]);
			        APPLICATION_DATA['label_historial']  = [];
			        APPLICATION_DATA['label_historial'].push(data['val1']);
			        APPLICATION_DATA['weight_historial'].push(dict);
			        self.m_parent.getVizPolygon().draw( params);
			        self.m_parent.getVizPolygon().draw_initial();
			        if(document.getElementById("IDDivStream")) document.getElementById("IDDivStream").outerHTML = "";
			        self.m_parent.setCurrentLabels(data["list_labels"]);
			        APPLICATION_DATA["Comparation"]["valor"] = data['list_metrics'];
			        console.log("valor of comparation from VizComboBox--------------------------");
			        console.log(APPLICATION_DATA["Comparation"]["valor"]);
			        if(document.getElementById("IDcomparationMethod")) document.getElementById("IDcomparationMethod").innerHTML = "";
			        self.m_parent.getVizComparationMethods().draw( {"listWeight":[1,1,1]} );//, ['best', 'average','worst']
			        self.m_parent.getVizBar().draw( dict , APPLICATION_DATA_copy['modelContainers']);
			        
			    },
			    failure: function(data) { 	
			    }
			}); 
		});

};

VizComboBox.prototype.draw_initial = function(){
	var self = this;
	var nameEnsemble = $("#idSelect").val(); 
		method = "Voting";
		if(nameEnsemble.localeCompare("Voting") == 0){
			method = '/views/majority_vote_test';
		}
		if(nameEnsemble.localeCompare("CSPA") == 0){
			method = '/views/ensamble_model_test';
		}
		if(nameEnsemble.localeCompare("Agglomerative") == 0){
			method = '/views/ensamble_Agglomerative_initial';
		}

		listToDraw = [];
		var N=4;
		var N2 = 3;
		var listPoints = [];
		var numberOfSides = APPLICATION_DATA_copy['modelContainers'].length;
    	var Xcenter = (document.getElementById('tcanvas').clientWidth)/4;
   		var Ycenter = (document.getElementById('tcanvas').clientHeight)/2;
    	var size = 60;

    	for (var i = 1; i <= numberOfSides; i += 1) {
			vx = Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides);
			vy = Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides);
			listPoints.push(vx);
			listPoints.push(vy);
			APPLICATION_DATA['vertex'].push(vx);
			APPLICATION_DATA['vertex'].push(vy);
			listToDraw.push( [vx, vy ] );
		}

		var list_large2 = [];
		N3 = 1;
		for(var k=1; k<=6; k++){
			var listPoints2 = [];
   			for(var i=1; i<=numberOfSides; i+=1){
   				console.log(i);
   				var vx = Xcenter + size* (k/6) * Math.cos(i * 2 * Math.PI / numberOfSides);
				var vy = Ycenter + size* (k/6)* Math.sin(i * 2 * Math.PI / numberOfSides);
				console.log(vx);
				console.log(vy);
				listPoints2.push(vx);
				listPoints2.push(vy);
				listToDraw.push( [vx, vy ] );
				APPLICATION_DATA['points'].push([vx,vy]);
			      		APPLICATION_DATA_copy['points'].push([vx,vy]);
				list_large2.push(vx);
			      list_large2.push(vy);
   			}

   			if(k==1) continue;

   			
			for(var i=0; i<listPoints.length ; i=i+2  ){
				for(var j=1; j<=N3; j++){
					if(i == listPoints.length-2){
						mx = ( listPoints2[i]+ (j/(N3 +1-j))*listPoints2[0] ) /( 1+(j/(N3+1-j)) ) ;
						my = ( listPoints2[i+1]+ (j/(N3+1-j))*listPoints2[1] ) /( 1+(j/(N3+1-j)) ) ;
						listToDraw.push( [ mx, my  ]  );
						list_large2.push(mx);
			      		list_large2.push(my);
						APPLICATION_DATA['points'].push([mx,my]);
			      		APPLICATION_DATA_copy['points'].push([mx,my]);
					}
					else{
						mx = ( listPoints2[i]+ (j/(N3+1-j))*listPoints2[i+2] ) /( 1+(j/(N3+1-j)) ) ;
						my = ( listPoints2[i+1]+ (j/(N3+1-j))*listPoints2[i+3] ) /( 1+(j/(N3+1-j)) ) ;
						listToDraw.push( [mx, my] );
						list_large2.push(mx);
			      		list_large2.push(my);
			      		APPLICATION_DATA['points'].push([mx,my]);
			      		APPLICATION_DATA_copy['points'].push([mx,my]);
					}	
				}
			}
			N3 = N3+1
   		}
   		console.log(list_large2);



/*
		for (var i = 1; i <= numberOfSides; i += 1) {
			vx = Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides);
			vy = Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides);
			listPoints.push(vx);
			listPoints.push(vy);
			APPLICATION_DATA['vertex'].push(vx);
			APPLICATION_DATA['vertex'].push(vy);
			listToDraw.push( [vx, vy ] );
		}

		for(var i=0; i<listPoints.length ; i=i+2  ){
			for(var j=1; j<=N; j++){
				if(i == listPoints.length-2){
					mx = ( listPoints[i]+ (j/(N +1-j))*listPoints[0] ) /( 1+(j/(N+1-j)) ) ;
					my = ( listPoints[i+1]+ (j/(N+1-j))*listPoints[1] ) /( 1+(j/(N+1-j)) ) ;
					listToDraw.push( [ mx, my  ]  );
				}
				else{
					mx = ( listPoints[i]+ (j/(N+1-j))*listPoints[i+2] ) /( 1+(j/(N+1-j)) ) ;
					my = ( listPoints[i+1]+ (j/(N+1-j))*listPoints[i+3] ) /( 1+(j/(N+1-j)) ) ;
					listToDraw.push( [mx, my] );
				}	
			}
		}

		

		//listPoints.push(Xcenter);
		//listPoints.push(Ycenter);
		var list_large = [];
		for(var i=1; i<=(numberOfSides)*N +numberOfSides; i++){
			if(listToDraw[i-1][0] && listToDraw[i-1][1]){
				for(var t=1; t<=N2+1; t++){
			      	//listPoints.pop();
			      	//listPoints.pop();
			      	if(t!=N2+1){
			      		t1 = Math.round((Xcenter + (t/(N2+1-t))*listToDraw[i-1][0])/(1 + (t/(N2+1-t))));
			      		t2 = Math.round((Ycenter +  (t/(N2+1-t))*listToDraw[i-1][1])/ (1 +(t/(N2+1-t)) ));
			      		//listPoints.push(t1);
			      		//listPoints.push(t2);
			      		APPLICATION_DATA['points'].push([t1,t2]);
			      		APPLICATION_DATA_copy['points'].push([t1,t2]);
			      		list_large.push(t1);
			      		list_large.push(t2);
			      	}else{
			      		t1 = Math.round(listToDraw[i-1][0]);
			      		t2 = Math.round(listToDraw[i-1][1]);
			      		//listPoints.push(t1);
			      		//listPoints.push(t2);
			      		APPLICATION_DATA['points'].push([t1,t2]);
			      		APPLICATION_DATA_copy['points'].push([t1,t2]);
			      		list_large.push(t1);
			      		list_large.push(t2);
			      	}
				}
		    }
		}
*/

		var myListOfArrays = [];
		for ( var i = 0; i < APPLICATION_DATA_copy['modelContainers'].length; i++ ){
					l  = APPLICATION_DATA_copy['modelContainers'][i].getCurrentLabels();
					l2 = APPLICATION_DATA_copy['modelContainers'][i].getCurrentMetrics();
					myListOfArrays = myListOfArrays.concat(l);
		}



		var t0 = performance.now();
		$.ajax({
			type:"POST",
			async: false,
			url: method,
			data: {
				"username": myListOfArrays,
			    "vertex": listPoints,
			    "points": list_large2,
			    "numbers_model" : numberOfSides,
			    csrfmiddlewaretoken:"{{ csrf_token }}",
			},
			success: function(data) {
				data = JSON.parse(data);
				APPLICATION_DATA['metrics'] = data['list_of_metrics']; //.push( [data['val3'], data['val4'], data['val5']  ]  );
				APPLICATION_DATA_copy['metrics'] = data['list_of_metrics'];
			},
			failure: function(data) { 	
				alert('Got an error dude');
			}
		});
		var t1 = performance.now();

			var dict = {}; 
			var tmp = [];

			var metric_of_method = [];
			for(var k = 0; k < APPLICATION_DATA_copy['modelContainers'].length; k++){
				metric_of_method = metric_of_method.concat(APPLICATION_DATA_copy['modelContainers'][k].getCurrentMetrics());
				tmp.push(1/numberOfSides);
			}
			dict['listWeight'] = tmp;

  			var Values = $( "#" + self.key).val();
  			var selectedcolor = $( "#" + self.key ).val();

			var l2 = [1,2,3,4];
			if(nameEnsemble.localeCompare("Voting") == 0){
			method = '/views/majority_vote_initial';
			}
			if(nameEnsemble.localeCompare("CSPA") == 0){
				method = '/views/ensamble_model_initial';
			}
			if(nameEnsemble.localeCompare("Agglomerative") == 0){
				method = '/views/ensamble_Agglomerative_initial';
			}

			//APPLICATION_DATA['Comparation']["methods"].push("Best");
			//APPLICATION_DATA['Comparation']["methods"].push("Average");
			//APPLICATION_DATA['Comparation']["methods"].push("Worst");
        	
        	$.ajax({
        		headers: {
    			'X-HTTP-Method-Override': 'PATCH'
   				},
        		type:"POST",
        		async: false,
			    url: method ,
			    data: {
	          	"username": myListOfArrays,
	          	"metrics": [1,2],
	          	"list_metrics": metric_of_method,
	          	"numbers_model" : APPLICATION_DATA_copy['modelContainers'].length,
	          	csrfmiddlewaretoken:"{{ csrf_token }}",
	        	},
			    success: function(data) {
			    	data = JSON.parse(data);
			    	APPLICATION_DATA['metric'] = [data['val3'], data['val4'], data['val5']];
			    	var id = "IDbarcharSVG".concat(self.m_name);
			    	if(document.getElementById(id)) document.getElementById(id).outerHTML = "";
			        self.m_parent.getVizScatter().draw( data["val1"] );
			        self.m_parent.getVizBarChart().draw( [{"metrica":"silhouette","valor":data['val3']},
  														{"metrica":"SSE","valor":data['val4']},
  														{"metrica":"SSB","valor":data['val5']}] , 1);
			        var params = {'number_polygon':1};
			        APPLICATION_DATA['metric_historial']  = [];
			        APPLICATION_DATA['metric_historial'].push([data['val3'], data['val4'], data['val5']]);
			        APPLICATION_DATA['label_historial']  = [];
			        APPLICATION_DATA['label_historial'].push(data['val1']);
			        APPLICATION_DATA['weight_historial'].push(dict);
			        self.m_parent.getVizPolygon().draw( params);
			        self.m_parent.getVizPolygon().draw_initial();
			        if(document.getElementById("IDDivStream")) document.getElementById("IDDivStream").outerHTML = "";
			        self.m_parent.setCurrentLabels(data["list_labels"]);
			        //APPLICATION_DATA["Comparation"]["valor"] = data['list_metrics'];
			        if(document.getElementById("IDcomparationMethod")) document.getElementById("IDcomparationMethod").innerHTML = "";
			        self.m_parent.getVizComparationMethods().draw( dict );//, ['best', 'average','worst']
			        APPLICATION_DATA['weight_historial'].push(dict); 
			        self.m_parent.getVizBar().draw( dict, APPLICATION_DATA_copy['modelContainers'] );
			        
			    },
			    failure: function(data) { 	
			    	alert("no entro");
			    }
			}); 

}