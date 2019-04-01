function inside(point, vs) {
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};

function isOnLine(x, y, endx, endy, px, py) {
    var f = function(somex) { return (endy - y) / (endx - x) * (somex - x) + y; };
    return Math.abs(f(px) - py) < 200 // tolerance, rounding errors
        && px >= x && px <= endx;      // are they also on this segment?
}


function triangle_area(x1, y1, x2, y2, x3, y3){
    return Math.abs(0.5*(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2)))
}


function gaussian(std, x){
	return    (1/(std*std*Math.PI))*Math.pow(Math.E, -Math.pow(x,2)/(std*std)  );

};



function VizComboBox(parent, divId, params )
{
	this.m_divId = divId;
	this.m_parent = parent;

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

	this.m_divId.appendChild( select );
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
		console.log( nameEnsemble);
  		method = "";
		if(nameEnsemble.localeCompare("Voting") == 0){
			method = '/views/majority_vote';
		}
		if(nameEnsemble.localeCompare("CSPA") == 0){
			method = '/views/ensamble_model';
		}
		if(nameEnsemble.localeCompare("Agglomerative") == 0){
			method = '/views/ensamble_Agglomerative_initial';
		}

		listToDraw = [];
		var N=4;
		var listPoints = [];
		var numberOfSides = APPLICATION_DATA['modelContainers'].length;
		var Xcenter = 200;
    	var Ycenter = 120;
    	var size = 100;
		var canvas = document.querySelector("#myCanvas");
		var m_context = canvas.getContext("2d");

		for (var i = 1; i <= numberOfSides;i += 1) {
			p = []
			listPoints.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
			listPoints.push(Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
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
					listToDraw.push( [ mx, my  ]  );
				}	
			}

		}

		APPLICATION_DATA['vertex'] = [];
		for (var i = 1; i <= numberOfSides;i += 1) {
				console.log("entro vextex");
				p = []
				APPLICATION_DATA['vertex'].push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
				APPLICATION_DATA['vertex'].push(Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
				console.log(APPLICATION_DATA['vertex']);
		}


		var myListOfArrays = [];
		for ( var i = 0; i < APPLICATION_DATA['modelContainers'].length; i++ )
		{
					l  = APPLICATION_DATA['modelContainers'][i].getCurrentLabels();
					l2 = APPLICATION_DATA['modelContainers'][i].getCurrentMetrics();
					numbers_model = APPLICATION_DATA['modelContainers'].length ;
					myListOfArrays = myListOfArrays.concat(l);
		}


		var listPoints2 = [];
		n = APPLICATION_DATA['modelContainers'].length;
		for (var i = 1; i <= numberOfSides;i += 1) {
			p = []
			listPoints2.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
			listPoints2.push(Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
		}
		var myListMetric = [1,2];
		var numbers_model = numbers_model = APPLICATION_DATA['modelContainers'].length ;
		listPoints2.push(Xcenter);
		listPoints2.push(Ycenter);
		
		for(var i=1; i<=(numberOfSides)*N ; i++){
			if(listToDraw[i-1][0] && listToDraw[i-1][1]){
				for(var t=0; t<3; t++){
			      	listPoints2.pop();
			      	listPoints2.pop();
			      	if(t==0){
			      		listPoints2.push( (Xcenter+(1/2)*listToDraw[i-1][0])/(1+(1/2)) );
			      		listPoints2.push(  (Ycenter+(1/2)*listToDraw[i-1][1])/(1+(1/2))  );
			      		APPLICATION_DATA['points'].push( [(Xcenter+(1/2)*listToDraw[i-1][0])/(1+(1/2)), (Ycenter+(1/2)*listToDraw[i-1][1])/(1+(1/2))  ]    );
			      	}
			      	if(t==1){
			      		listPoints2.push( (Xcenter+(2/1)*listToDraw[i-1][0])/(1+(2/1)) );
			      		listPoints2.push(  (Ycenter+(2/1)*listToDraw[i-1][1])/(1+(2/1)) );
			      		APPLICATION_DATA['points'].push( [(Xcenter+(2/1)*listToDraw[i-1][0])/(1+(2/1)), (Ycenter+(2/1)*listToDraw[i-1][1])/(1+(2/1))]   );
			      	}if(t==2){
			      		listPoints2.push(listToDraw[i-1][0]);
						listPoints2.push(listToDraw[i-1][1]);
						APPLICATION_DATA['points'].push( [ listToDraw[i-1][0], listToDraw[i-1][1]] );
			      	}
			      	console.log("debug debug--------------------------------------------------------------------------------------------------------------------")
					console.log(listPoints2);

			      	$.ajax({
						type:"POST",
						async: false,
					    url: method,
					    data: {
			          	"username": myListOfArrays,
			          	"points": listPoints2,
			          	"metrics": myListMetric,
			          	"numbers_model" : numbers_model,
			        	},
					    success: function(data) {
					    	data = JSON.parse(data);
					        APPLICATION_DATA['metrics'].push( [data['val3'], data['val4'], data['val5']  ]  );
					        self.m_parent.setCurrentLabels(data["list_labels"]);
					    },
					    failure: function(data) { 	
					        alert('Got an error dude');
					    }
					});
				}
		    }
		}
		
		console.log(APPLICATION_DATA['metrics']);

  			var Values = $( "#" + self.key).val();
  			var selectedcolor = $( "#" + self.key ).val();
  			$("#value").val(Values);
  			console.log( "combo.......................xd" );
			


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
	          	"numbers_model" : APPLICATION_DATA['modelContainers'].length,
	          	csrfmiddlewaretoken:"{{ csrf_token }}",
	        	},
			    success: function(data) {

			    	data = JSON.parse(data);
			    	APPLICATION_DATA['metric'] = [data['val3'], data['val4'], data['val5']];
			        self.m_parent.getVizScatter().draw( data["val1"] );
			        //self.m_parent.getVizMatrix().draw( data["val2"] );
			        //self.m_parent.getVizMetric().draw( [{"name":"silhouette","value":data['val3']},
  					//									{"name":"Sum_Squared_Within","value":data['val4']},
  					//									{"name":"Sum_Squared_Between","value":data['val5']}] );
			        self.m_parent.getVizBarChart().draw( [{"metrica":"silhouette","valor":data['val3']},
  														{"metrica":"SSE","valor":data['val4']},
  														{"metrica":"SSB","valor":data['val5']}] );

			        self.m_parent.getVizPolygon().draw( null);
			        if(document.getElementById("IDDivStream")) document.getElementById("IDDivStream").outerHTML = "";

			        self.m_parent.setCurrentLabels(data["list_labels"]);

			    },
			    failure: function(data) { 	
			    }
			}); 
        	self.m_parent.getVizStreamGraph().draw( {} );

		var svg = d3.select("#myCanvas")
            .append("svg")
            .attr("width", 300)
            .attr("height", 300);
         //Append circle 
         svg.append("circle")
            .attr("cx", 200)
            .attr("cy", 50)
            .attr("r", 20)
            .attr("fill", "green");

		});


};
