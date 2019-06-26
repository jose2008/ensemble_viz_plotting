function VizPolygon(parent, divId, divId2, divId3, name)
{
	this.m_divId = divId;
	this.m_divId2 = divId2;
	this.m_divId3 = divId3;

	this.m_parent = parent;
	this.m_name = name;
    this.m_canvas = document.createElement( "CANVAS" );
    this.m_canvas.id= "myCanvas";
    //this.m_canvas.style.width ='100%';
  	//this.m_canvas.style.height='100%';
    this.m_context = this.m_canvas.getContext("2d" );

    this.m_canvas2 = document.createElement( "CANVAS" );
    this.m_canvas2.id= "myCanvas2"
    this.m_context2 = this.m_canvas2.getContext("2d" );

    this.m_canvas3 = document.createElement( "CANVAS" );
    this.m_canvas3.id= "myCanvas3"
    this.m_context3 = this.m_canvas3.getContext("2d" );

    this.m_context.canvas.width  = window.innerWidth;
  	this.m_context.canvas.height = window.innerHeight;
  	this.m_divId.appendChild( this.m_canvas );

  	this.m_context2.canvas.width  = window.innerWidth;
  	this.m_context2.canvas.height = window.innerHeight;
  	this.m_divId2.appendChild( this.m_canvas2 );

  	this.m_context3.canvas.width  = window.innerWidth;
  	this.m_context3.canvas.height = window.innerHeight;
  	this.m_divId3.appendChild( this.m_canvas3 );

	this.numberOfSides = APPLICATION_DATA['modelContainers'].length,
    this.size = 60,
    //this.Xcenter = 200,
    //this.Ycenter = 120;    
    this.Xcenter = (document.getElementById('tcanvas').clientWidth)/4;
    this.Ycenter = (document.getElementById('tcanvas').clientHeight)/2;

    this.listPoints = [];
    this.listPointsValidate = [];

	this.m_posX ;//= 400;
	this.m_posY ;//= 400;

	this.m_posX2 = 400;
	this.m_posY2 = 400;

	this.m_posX3 = 400;
	this.m_posY3 = 400;
	var self  = this;
	this.m_canvas.onmousemove = function(event) {
	  	var rect = self.m_canvas.getBoundingClientRect();	  	
	  	self.m_posX = event.clientX - rect.left; //new center of circle
	  	self.m_posY = event.clientY - rect.top; //new center of circle
	};

	this.m_canvas2.onmousemove = function(event) {
	  	var rect = self.m_canvas.getBoundingClientRect();
	  	self.m_posX2 = event.clientX - rect.left; //new center of circle
	  	self.m_posY2 = event.clientY - rect.top; //new center of circle
	};


	this.m_canvas3.onmousemove = function(event) {
	  	var rect = self.m_canvas.getBoundingClientRect();
	  	self.m_posX3 = event.clientX - rect.left; //new center of circle
	  	self.m_posY3 = event.clientY - rect.top; //new center of circle
	};

	this.m_canvas.onmouseup = function(event){
		p.push(this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides))
		p.push(this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides))


		listPointsValidate_test = [];
	  	n = APPLICATION_DATA_copy['modelContainers'].length;
	  	for (var i = 1; i <= APPLICATION_DATA_copy['modelContainers'].length;i += 1) {
			p = []
			p.push(self.Xcenter + self.size * Math.cos(i * 2 * Math.PI / n))
			p.push(self.Ycenter + self.size * Math.sin(i * 2 * Math.PI / n))
			listPointsValidate_test.push(p);
		}
		if( inside( [ self.m_posX, self.m_posY] , listPointsValidate_test ) ){

		


			var params = {'number_polygon':1};
			self.draw(params);
			self.listPoints.push(self.m_posX);
			self.listPoints.push(self.m_posY);
			var myListOfArrays = []; 
			var numbers_model = APPLICATION_DATA_copy['modelContainers'].length;
			var nameEnsemble = $("#idSelect").val(); 
	  		method = "";
			if(nameEnsemble.localeCompare("Voting") == 0){
				method = '/views/majority_vote';
			}
			if(nameEnsemble.localeCompare("CSPA") == 0){
				method = '/views/ensamble_model';
			}

			for ( var i = 0; i < numbers_model; i++ )
			{
				l  = APPLICATION_DATA_copy['modelContainers'][i].getCurrentLabels();
				l2 = APPLICATION_DATA_copy['modelContainers'][i].getCurrentMetrics();
					myListOfArrays = myListOfArrays.concat(l);
			};



			$.ajax({
				type:"POST",
				url: method,
					data: {
			     	"username": myListOfArrays,
			       	"points": self.listPoints,
			       	"metrics": [],
			       	"numbers_model" : numbers_model,
			    	},
					success: function(data) {
					  	data = JSON.parse(data);
					    self.m_parent.getVizScatter().draw( data["val1"] );
					    self.m_parent.getVizBar().draw({"listWeight":data["listWeight"]}, APPLICATION_DATA_copy['modelContainers']);
					    //self.m_parent.getStreamGraph().draw({});
					    var id = "IDbarcharSVG".concat(self.m_name);
					    if(document.getElementById(id)) document.getElementById(id).outerHTML = "";
					    self.m_parent.getVizBarChart().draw( [{"metrica":"silhouette","valor":data['val3']},
	  													{"metrica":"SSE","valor":data['val4']},
	  													{"metrica":"SSB","valor":data['val5']}], 1 );
					    self.m_parent.setCurrentLabels(data["list_labels"]);
					    if(document.getElementById("idComparation")) document.getElementById("idComparation").outerHTML = "";
					    if(document.getElementById("IDcomparationMethod")) document.getElementById("IDcomparationMethod").innerHTML = "";
					    self.m_parent.getVizComparationMethods().draw( {"listWeight":data["listWeight"]} );
					    APPLICATION_DATA['metric_historial']  = [];
			        	APPLICATION_DATA['metric_historial'].push([data['val3'], data['val4'], data['val5']]);
			        	APPLICATION_DATA['label_historial']  = [];
			        	APPLICATION_DATA['label_historial'].push(data['val1']);
			        	APPLICATION_DATA['weight_historial'].push({"listWeight":data["listWeight"]});

					},
					failure: function(data) { 	
					    //alert('Got an error dude');
					}
			});

		}
	}


	this.m_canvas2.onmouseup = function(event){


		listPointsValidate_test = [];
	  	n = APPLICATION_DATA_copy['modelContainers'].length;
	  	for (var i = 1; i <= APPLICATION_DATA_copy['modelContainers'].length;i += 1) {
			p = []
			p.push(self.Xcenter + self.size * Math.cos(i * 2 * Math.PI / n))
			p.push(self.Ycenter + self.size * Math.sin(i * 2 * Math.PI / n))
			listPointsValidate_test.push(p);
		}
		if( inside( [   self.m_posX2 - (document.getElementById('tcanvas').clientWidth)  , self.m_posY2] , listPointsValidate_test ) ){

			var params = {'number_polygon':2};
			self.draw(params);

			self.listPoints.push(self.m_posX2 - (document.getElementById('tcanvas').clientWidth));
			self.listPoints.push(self.m_posY2);
			var myListOfArrays = []; 
			var myListMetric   = [];
			var numbers_model = 0;

			var nameEnsemble = $("#idSelect").val(); 
	  		method = "";
			if(nameEnsemble.localeCompare("Voting") == 0){
				method = '/views/majority_vote';
			}
			if(nameEnsemble.localeCompare("CSPA") == 0){
				method = '/views/ensamble_model';
			}

				for ( var i = 0; i < APPLICATION_DATA_copy['modelContainers'].length; i++ )
				{
						l  = APPLICATION_DATA_copy['modelContainers'][i].getCurrentLabels();
						l2 = APPLICATION_DATA_copy['modelContainers'][i].getCurrentMetrics();
						numbers_model = APPLICATION_DATA_copy['modelContainers'].length ;
						myListOfArrays = myListOfArrays.concat(l);
						myListMetric   = myListMetric.concat(l2)
				};

				$.ajax({
						type:"POST",
					    url: method,
					    data: {
			          	"username": myListOfArrays,
			          	"points": self.listPoints,
			          	"metrics": myListMetric,
			          	"numbers_model" : numbers_model,
			        	},
					    success: function(data) {
					    	data = JSON.parse(data);
					        self.m_parent.getVizScatter().draw( data["val1"] );
					        //self.m_parent.getVizMatrix().draw( data["val2"] );
					        //self.m_parent.getVizMetric().draw( [{"name":"silhouette","value":data['val3']},
		  					//									{"name":"Sum_Squared_Within","value":data['val4']},
		  					//									{"name":"Sum_Squared_Between","value":data['val5']}] );
					        self.m_parent.getVizBar().draw({"listWeight":data["listWeight"]}, APPLICATION_DATA_copy['modelContainers']);
					        //self.m_parent.getStreamGraph().draw({});
					        var id = "IDbarcharSVG".concat(self.m_name);
					        if(document.getElementById(id)) document.getElementById(id).outerHTML = "";
					        self.m_parent.getVizBarChart().draw( [{"metrica":"silhouette","valor":data['val3']},
	  														{"metrica":"SSE","valor":data['val4']},
	  														{"metrica":"SSB","valor":data['val5']}], 1 );
					        self.m_parent.setCurrentLabels(data["list_labels"]);
					        if(document.getElementById("idComparation")) document.getElementById("idComparation").outerHTML = "";
					    	if(document.getElementById("IDcomparationMethod")) document.getElementById("IDcomparationMethod").innerHTML = "";
					    	self.m_parent.getVizComparationMethods().draw( {"listWeight":data["listWeight"]} );
					        APPLICATION_DATA['metric_historial']  = [];
			        		APPLICATION_DATA['metric_historial'].push([data['val3'], data['val4'], data['val5']]);
			        		APPLICATION_DATA['label_historial']  = [];
			        		APPLICATION_DATA['label_historial'].push(data['val1']);
			        		APPLICATION_DATA['weight_historial'].push({"listWeight":data["listWeight"]});
					    },
					    failure: function(data) { 	
					        alert('Got an error dude');
					    }
					});
			}
		}





	this.m_canvas3.onmouseup = function(event){
		
		listPointsValidate_test = [];
	  	n = APPLICATION_DATA_copy['modelContainers'].length;
	  	for (var i = 1; i <= APPLICATION_DATA_copy['modelContainers'].length;i += 1) {
			p = []
			p.push(self.Xcenter + self.size * Math.cos(i * 2 * Math.PI / n))
			p.push(self.Ycenter + self.size * Math.sin(i * 2 * Math.PI / n))
			listPointsValidate_test.push(p);
		}

		if( inside( [   self.m_posX3 - 2*(document.getElementById('tcanvas').clientWidth)  , self.m_posY3] , listPointsValidate_test ) ){


			var params = {'number_polygon':3};
			self.draw(params);

			self.listPoints.push(self.m_posX3 - 2*(document.getElementById('tcanvas').clientWidth));
			self.listPoints.push(self.m_posY3);
			var myListOfArrays = []; 
			var myListMetric   = [];
			var numbers_model = 0;

			var nameEnsemble = $("#idSelect").val(); 
	  		method = "";
			if(nameEnsemble.localeCompare("Voting") == 0){
				method = '/views/majority_vote';
			}
			if(nameEnsemble.localeCompare("CSPA") == 0){
				method = '/views/ensamble_model';
			}

				for ( var i = 0; i < APPLICATION_DATA_copy['modelContainers'].length; i++ )
				{
						l  = APPLICATION_DATA_copy['modelContainers'][i].getCurrentLabels();
						l2 = APPLICATION_DATA_copy['modelContainers'][i].getCurrentMetrics();
						numbers_model = APPLICATION_DATA_copy['modelContainers'].length ;
						myListOfArrays = myListOfArrays.concat(l);
						myListMetric   = myListMetric.concat(l2)
				};

				$.ajax({
						type:"POST",
					    url: method,
					    data: {
			          	"username": myListOfArrays,
			          	"points": self.listPoints,
			          	"metrics": myListMetric,
			          	"numbers_model" : numbers_model,
			        	},
					    success: function(data) {
					    	data = JSON.parse(data);
					        self.m_parent.getVizScatter().draw( data["val1"] );
					        //self.m_parent.getVizMatrix().draw( data["val2"] );
					        //self.m_parent.getVizMetric().draw( [{"name":"silhouette","value":data['val3']},
		  					//									{"name":"Sum_Squared_Within","value":data['val4']},
		  					//									{"name":"Sum_Squared_Between","value":data['val5']}] );
					        self.m_parent.getVizBar().draw({"listWeight":data["listWeight"]}, APPLICATION_DATA_copy['modelContainers']);
					        //self.m_parent.getStreamGraph().draw({});
					        var id = "IDbarcharSVG".concat(self.m_name);
					        if(document.getElementById(id)) document.getElementById(id).outerHTML = "";
					        self.m_parent.getVizBarChart().draw( [{"metrica":"silhouette","valor":data['val3']},
	  														{"metrica":"SSE","valor":data['val4']},
	  														{"metrica":"SSB","valor":data['val5']}] ,1 );
					        self.m_parent.setCurrentLabels(data["list_labels"]);	
					        APPLICATION_DATA['metric_historial']  = [];
			        		APPLICATION_DATA['metric_historial'].push([data['val3'], data['val4'], data['val5']]);
			        		APPLICATION_DATA['label_historial']  = [];
			        		APPLICATION_DATA['label_historial'].push(data['val1']);		
			        		APPLICATION_DATA['weight_historial'].push({"listWeight":data["listWeight"]});        
					    },
					    failure: function(data) { 	
					        //alert('Got an error dude');
					    }
					});
		}
	}
}



VizPolygon.prototype.draw = function(params)
{

	var myListOfArrays = [];
	for ( var i = 0; i < APPLICATION_DATA_copy['modelContainers'].length; i++ ){
			l  = APPLICATION_DATA_copy['modelContainers'][i].getCurrentLabels();
			l2 = APPLICATION_DATA_copy['modelContainers'][i].getCurrentMetrics();
			myListOfArrays = myListOfArrays.concat(l);
	}

	APPLICATION_DATA['positions_historial'].push([this.m_posX, this.m_posY]);
	var ListRed   = [];
	var ListBlue  = [];
	var ListGreen = [];
	var sum = 0;
	this.m_context.clearRect( 0, 0, this.m_canvas.width, this.m_canvas.height );
	this.m_context2.clearRect( 0, 0, this.m_canvas2.width, this.m_canvas2.height );
	this.m_context3.clearRect( 0, 0, this.m_canvas3.width, this.m_canvas3.height );
	this.numberOfSides = APPLICATION_DATA_copy['modelContainers'].length;
	this.m_context.beginPath();
	this.m_context.moveTo (this.Xcenter +  this.size * Math.cos(0), this.Ycenter +  this.size *  Math.sin(0));

	this.m_context2.beginPath();
	this.m_context2.moveTo (this.Xcenter +  this.size * Math.cos(0), this.Ycenter +  this.size *  Math.sin(0));

	this.m_context3.beginPath();
	this.m_context3.moveTo (this.Xcenter +  this.size * Math.cos(0), this.Ycenter +  this.size *  Math.sin(0));

	this.listPoints = [];

	if(  this.m_posX == 400 && this.m_posY == 400 && APPLICATION_DATA_copy['modelContainers'].length>2 ){
		this.m_context.fillStyle = "black"; //red
		this.m_context.beginPath();
	    this.m_context.arc(this.Xcenter, this.Ycenter, 5, 0,Math.PI*2); //This will draw a circle of 10px radius
	  	this.m_context.closePath();
	  	this.m_context.fill();
	}
	var ListRed   = [];
	var ListBlue  = [];
	var ListGreen = [];

	for(var i=0; i<APPLICATION_DATA['metrics'].length; i++){
		ListRed.push(  APPLICATION_DATA_copy['points'][i]  );
		ListGreen.push(  APPLICATION_DATA_copy['points'][i]  );
		ListBlue.push(  APPLICATION_DATA_copy['points'][i]  );
	}



	var cxt  = this.m_canvas.getContext("2d");
	var cxt2 = this.m_canvas2.getContext("2d");
	var cxt3 = this.m_canvas3.getContext("2d");

	listPointsValidate = [];
	  	n = APPLICATION_DATA_copy['modelContainers'].length;
	  	for (var i = 1; i <= APPLICATION_DATA_copy['modelContainers'].length;i += 1) {

			p = []
			p.push(this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / n))
			p.push(this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / n))
			listPointsValidate.push(p);
		}


		var array_test = [];
		for( var k=0; k<ListRed.length; k++ ){
			array_test.push(APPLICATION_DATA['metrics'][k][0]);
		}


		var min_test = arrayMin(array_test);
		var max_test = arrayMax(array_test);
		



		var array_test2 = [];
		for( var k=0; k<ListGreen.length; k++ ){
			array_test2.push(APPLICATION_DATA['metrics'][k][1])*2;
		}
		var min_test2 = arrayMin(array_test2);
		var max_test2 = arrayMax(array_test2);
		for( var k=0; k<ListGreen.length; k++ ){
					/*cxt2.beginPath();
					cxt2.arc( ListGreen[k][0], ListGreen[k][1], 1, 0,Math.PI*2);
					//(max'-min')/(max-min)*(value-max)+max
					p =APPLICATION_DATA['metrics'][k][1]/max_test2;
					color = getGradientColorGreen("#ffffff", "#00ff00", p);
					cxt2.fillStyle = color;//"rgba(255,0,0, " + p + ")";
					cxt2.closePath();
					cxt2.fill();*/
		}


		var array_test3 = [];
		for( var k=0; k<ListBlue.length; k++ ){
			array_test3.push(APPLICATION_DATA['metrics'][k][2])*2;
		}
		var min_test3 = arrayMin(array_test3);
		var max_test3 = arrayMax(array_test3);
		for( var k=0; k<ListBlue.length; k++ ){
					/*cxt3.beginPath();
					cxt3.arc( ListGreen[k][0], ListGreen[k][1], 13, 0,Math.PI*2);
					p = APPLICATION_DATA['metrics'][k][2]/max_test3;
					color = color = getGradientColorGreen("#ffffff", "#0000ff", p);
					cxt3.fillStyle = color;//"rgba(255,0,0, " + p + ")";
					cxt3.closePath();
					cxt3.fill();*/
		}


		var array_final = [];
		var array_final2 = [];
		var array_final3 = [];
		for(var i=0; i<200; i++){
			for(var j=0;j<230; j++){
				if( inside( [ i, j] , listPointsValidate ) ){
					
					index_min = Math.abs(i - ListRed[0][0])  + Math.abs(j - ListRed[0][1]);
					var near1 = 0;
					for(var k = 0; k<ListRed.length; k++){
						aux = Math.abs(i - ListRed[k][0])  + Math.abs(j - ListRed[k][1]);
						if(  aux < index_min ){
							index_min = Math.abs(i - ListRed[k][0])  + Math.abs(j - ListRed[k][1])
							near1 = k;
						}
					}

					index_min_green = Math.abs(i - ListGreen[0][0])  + Math.abs(j - ListGreen[0][1]);
					var near1_green = 0;
					for(var k = 0; k<ListGreen.length; k++){
						aux = Math.abs(i - ListGreen[k][0])  + Math.abs(j - ListGreen[k][1]);
						if(  aux < index_min_green ){
							index_min_green = Math.abs(i - ListGreen[k][0])  + Math.abs(j - ListGreen[k][1])
							near1_green = k;
						}
					}


					index_min_blue = Math.abs(i - ListBlue[0][0])  + Math.abs(j - ListBlue[0][1]);
					var near1_blue = 0;
					for(var k = 0; k<ListBlue.length; k++){
						aux = Math.abs(i - ListBlue[k][0])  + Math.abs(j - ListBlue[k][1]);
						if(  aux < index_min_blue ){
							index_min_blue = Math.abs(i - ListBlue[k][0])  + Math.abs(j - ListBlue[k][1])
							near1_blue = k;
						}
					}

					
					index_min2 = Math.abs( i - ListRed[0][0] ) + Math.abs( j - ListRed[0][1]);
					var near2 = 0;
					for(var k = 0; k<ListRed.length ; k++){
						if (k==near1) continue;
						aux = Math.abs( i - ListRed[k][0] ) + Math.abs( j - ListRed[k][1]);
						if(  aux < index_min2 ){
							index_min2 = Math.abs( i - ListRed[k][0] ) + Math.abs( j - ListRed[k][1]);
							near2 = k;
						}
					}
					

					index_min2_green = Math.abs( i - ListGreen[0][0] ) + Math.abs( j - ListGreen[0][1]);
					var near2_green = 0;
					for(var k = 0; k<ListGreen.length ; k++){
						if (k==near1_green) continue;
						aux = Math.abs( i - ListGreen[k][0] ) + Math.abs( j - ListGreen[k][1]);
						if(  aux < index_min2_green ){
							index_min2_green = Math.abs( i - ListGreen[k][0] ) + Math.abs( j - ListGreen[k][1]);
							near2_green = k;
						}
					}


					index_min3 = Math.abs(i - ListRed[0][0])  + Math.abs(j - ListRed[0][1]);
					var near3 = 0;
					for(var k = 0; k<ListRed.length ; k++){
						if (k==near1) continue;
						if (k==near2) continue;
						aux = Math.abs(i - ListRed[k][0])  + Math.abs(j - ListRed[k][1]);
						if(  aux < index_min3 ){
							index_min3 = Math.abs(i - ListRed[k][0])  + Math.abs(j - ListRed[k][1]);
							near3 = k;
						}
					}



					index_min3_green = Math.abs(i - ListGreen[0][0])  + Math.abs(j - ListGreen[0][1]);
					var near3_green = 0;
					for(var k = 0; k<ListGreen.length ; k++){
						if (k==near1_green) continue;
						if (k==near2_green) continue;
						aux = Math.abs(i - ListGreen[k][0])  + Math.abs(j - ListGreen[k][1]);
						if(  aux < index_min3_green ){
							index_min3_green = Math.abs(i - ListGreen[k][0])  + Math.abs(j - ListGreen[k][1]);
							near3_green = k;
						}
					}



					
					var promed = index_min + index_min2 + index_min;
					var promed2 = index_min_green + index_min2_green + index_min3_green;
					//array_final.push( ( APPLICATION_DATA['metrics'][near1][0]*index_min + APPLICATION_DATA['metrics'][near2][0]*index_min2 + APPLICATION_DATA['metrics'][near3][0]*index_min3 )/promed )
					array_final.push( ( APPLICATION_DATA['metrics'][near1][0]));
					array_final2.push( ( APPLICATION_DATA['metrics'][near1_green][1]));
					array_final3.push( ( APPLICATION_DATA['metrics'][near1_blue][2]));
				}
			}
		}
		var count = 0;
		var new_max = arrayMax(array_final);
		var new_min = arrayMin(array_final);
		var value = 0;
		for(var i=0; i<200; i++){
			for(var j=0;j<230; j++){
				var m1 = 0;
				var m2 = 0;
				var m3 = 0;
				if( inside( [ i, j] , listPointsValidate ) ){
					value = array_final[count]/new_max;
					//value =  (array_final[count] - new_min)/(new_max - new_min) ;
					temp = (a/b);
					t = t+1;
					cxt.beginPath();
					cxt.arc(i,j, 1, 0,Math.PI*2);
					console.log(value);
					cxt.fillStyle = getGradientColorGreen("#ffffff", "#ff0000", value);//"rgba(255,0,0, " + value + ")";
					cxt.closePath();
					cxt.fill();
					count = count +1;
				}
			}
		}
		//console.log("all red");
		//console.log(ListRed);


		count = 0;
		var new_max2 = arrayMax(array_final2);
		var new_min2 = arrayMin(array_final2);
		value = 0;
		for(var i=0; i<200; i++){
			for(var j=0;j<230; j++){
				m1 = 0;
				m2 = 0;
				m3 = 0;
				if( inside( [ i, j] , listPointsValidate ) ){
					value = array_final2[count]/new_max2;
					//value =  (array_final[count] - new_min)/(new_max - new_min) ;
					temp = (a/b);
					t = t+1;
					cxt2.beginPath();
					cxt2.arc(i,j, 1, 0,Math.PI*2);
					cxt2.fillStyle = getGradientColorGreen("#ffffff", "#336600", value);//"rgba(255,0,0, " + value + ")";
					cxt2.closePath();
					cxt2.fill();
					count = count +1;
				}
			}
		}

		count = 0;
		var new_max3 = arrayMax(array_final3);
		var new_min3 = arrayMin(array_final3);
		value = 0;
		for(var i=0; i<200; i++){
			for(var j=0;j<230; j++){
				m1 = 0;
				m2 = 0;
				m3 = 0;
				if( inside( [ i, j] , listPointsValidate ) ){
					value = array_final3[count]/new_max3;
					temp = (a/b);
					t = t+1;
					cxt3.beginPath();
					cxt3.arc(i,j, 1, 0,Math.PI*2);
					cxt3.fillStyle = getGradientColorGreen("#ffffff", "#0000ff", value);//"rgba(255,0,0, " + value + ")";
					cxt3.closePath();
					cxt3.fill();
					count = count +1;
				}
			}
		}


		var array_red_t = [];
		var a = 0;
		var b = 0;
		var t = 0;
		var temp = 0;
		for(var i=0; i<200; i++){
			for(var j=0;j<230; j++){
				var m1 = 0;
				var m2 = 0;
				var m3 = 0;
				if( inside( [ i, j] , listPointsValidate ) ){
					for( var k=0; k<ListRed.length; k++ ){
						a = a +  APPLICATION_DATA['metrics'][k][0]*(1/distance( [i,j], ListRed[k] ));
						b = b + (1/distance( [i,j], ListRed[k] ));
					}
					array_red_t.push(a/b);
					temp = (a/b);
					t = t+1;
					a = 0;
					b = 0;

					for( var k=0; k<ListGreen.length; k++ ){
						m2 = m2 + gaussian(1.8,  distance(  [ 100+i, 20+j] ,ListGreen[k] ))
					}
					for( var k=0; k<ListBlue.length; k++ ){
						m3 = m3 + gaussian(1.8,  distance(  [ 100+i, 20+j] ,ListBlue[k] ))
					}
					/*cxt.beginPath();
					cxt.arc(i,j, 1, 0,Math.PI*2);
					cxt.fillStyle = "rgba(255,0,0, " + temp + ")";
					cxt.closePath();
					cxt.fill();*/
				}
			}
		}

		var min = arrayMin(array_red_t);
		var max = 1;//arrayMax(array_red_t);
		t = 0;
		for(var i=0; i<200; i++){
			for(var j=0;j<230; j++){
				var m1 = 0;
				var m2 = 0;
				var m3 = 0;
				if( inside( [ i, j] , listPointsValidate ) ){

					/*v =  (array_red_t[t] - min)/(max -min) ;
					//v = array_red_t[t]/max;
					//console.log(v);
					temp = (a/b);
					t = t+1;
					color = getGradientColorGreen("#ffffff", "#ff0000", v);
					//console.log(color);
					cxt.beginPath();
					cxt.arc(i,j, 1, 0,Math.PI*2);
					cxt.fillStyle = color;//"rgba(255,0,0, " + v + ")";
					cxt.closePath();
					cxt.fill();*/
				}
			}
		}



	for (var i = 1; i <= this.numberOfSides;i += 1) {
		p = []
		this.listPoints.push(this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides));
		this.listPoints.push(this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
		p.push(this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides))
		p.push(this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides))
		this.listPointsValidate.push(p);
		this.m_context.font = "10px Georgia";
		this.m_context.fillStyle = 'blue'
		console.log("paintttttttttttttttttttttttttttttttt");
		if(i==1){
		//	this.m_context.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
		//	,this.Xcenter+3 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context2.font = "10px Georgia";
		this.m_context2.fillStyle = 'blue'
		//this.m_context2.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
		//	,this.Xcenter+3 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context2.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context2.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context3.font = "10px Georgia";
		this.m_context3.fillStyle = 'blue'
		//this.m_context3.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
		//	,this.Xcenter+3 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context3.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context3.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
		}
		if(i==2){
		//	this.m_context.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
		//	,this.Xcenter-30 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context2.font = "10px Georgia";
		this.m_context2.fillStyle = 'blue'
		//this.m_context2.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
		//	,this.Xcenter-30 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context2.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context2.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context3.font = "10px Georgia";
		this.m_context3.fillStyle = 'blue'
		//this.m_context3.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
		//	,this.Xcenter-30 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context3.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context3.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
		}
		if(i==3){
		//	this.m_context.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
		//	,this.Xcenter-17 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter -5+ this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context2.font = "10px Georgia";
		this.m_context2.fillStyle = 'blue'
		//this.m_context2.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
		//	,this.Xcenter-17 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter-5 + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context2.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context2.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context3.font = "10px Georgia";
		this.m_context3.fillStyle = 'blue'
		//this.m_context3.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
		//	,this.Xcenter-17 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter-5 + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context3.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context3.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
		}
		if(i==4){
		//	this.m_context.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
		//	,this.Xcenter-40 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context2.font = "10px Georgia";
		this.m_context2.fillStyle = 'blue'
		//this.m_context2.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
		//	,this.Xcenter-40 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context2.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context2.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context3.font = "10px Georgia";
		this.m_context3.fillStyle = 'blue'
		//this.m_context3.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
		//	,this.Xcenter-40 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context3.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context3.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
		}
		if(i==5){
			this.m_context.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
			,this.Xcenter+2 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context2.font = "10px Georgia";
		this.m_context2.fillStyle = 'blue'
		this.m_context2.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
			,this.Xcenter+2 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context2.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context2.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context3.font = "10px Georgia";
		this.m_context3.fillStyle = 'blue'
		this.m_context3.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
			,this.Xcenter+2 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context3.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context3.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
		}
		if(i==6){
			this.m_context.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
			,this.Xcenter+1 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter-5 + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context2.font = "10px Georgia";
		this.m_context2.fillStyle = 'blue'
		this.m_context2.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
			,this.Xcenter+1 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter-5 + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context2.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context2.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context3.font = "10px Georgia";
		this.m_context3.fillStyle = 'blue'
		this.m_context3.fillText(APPLICATION_DATA_copy['modelContainers'][i-1].name.substring(0, APPLICATION_DATA_copy['modelContainers'][i-1].name.length-7)
			,this.Xcenter+1 + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter-5 + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    //this.m_context3.fillText("M"+i,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context3.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
		}

	}
	this.m_context.strokeStyle = "#000000";
	this.m_context.lineWidth = 1;
	this.m_context.stroke();

	this.m_context2.strokeStyle = "#000000";
	this.m_context2.lineWidth = 1;
	this.m_context2.stroke();

	this.m_context3.strokeStyle = "#000000";
	this.m_context3.lineWidth = 1;
	this.m_context3.stroke();
	


	switch(params['number_polygon']){
		case 1:
			if( inside( [this.m_posX , this.m_posY] , this.listPointsValidate )  ) {
				this.m_context.fillStyle = "black";
			  	this.m_context.beginPath();
			    this.m_context.arc(this.m_posX, this.m_posY, 5, 0,Math.PI*2); //This will draw a circle of 10px radius
			  	this.m_context.closePath();
			  	this.m_context.fill();
			  	this.m_context.stroke();

			  	this.m_context2.fillStyle = "black";
			  	this.m_context2.beginPath();
			    this.m_context2.arc(this.m_posX , this.m_posY, 5, 0,Math.PI*2); //This will draw a circle of 10px radius
			  	this.m_context2.closePath();
			  	this.m_context2.fill();
			  	this.m_context2.stroke();

			  	this.m_context3.fillStyle = "black";
			  	this.m_context3.beginPath();
			    this.m_context3.arc(this.m_posX, this.m_posY, 5, 0,Math.PI*2); //This will draw a circle of 10px radius
			  	this.m_context3.closePath();
			  	this.m_context3.fill();
			  	this.m_context3.stroke();
			}
		break;

		case 2:
			if( inside( [  this.m_posX2 - (document.getElementById('tcanvas').clientWidth)  , this.m_posY2] , this.listPointsValidate )  ) {				
				this.m_context.fillStyle = "black";
			  	this.m_context.beginPath();
			    this.m_context.arc(this.m_posX2 - (document.getElementById('tcanvas').clientWidth), this.m_posY2, 5, 0,Math.PI*2); //This will draw a circle of 10px radius
			  	this.m_context.closePath();
			  	this.m_context.fill();
			  	this.m_context.stroke();

			  	this.m_context2.fillStyle = "black";
			  	this.m_context2.beginPath();
			    this.m_context2.arc(this.m_posX2 - (document.getElementById('tcanvas').clientWidth), this.m_posY2, 5, 0,Math.PI*2); //This will draw a circle of 10px radius
			  	this.m_context2.closePath();
			  	this.m_context2.fill();
			  	this.m_context2.stroke();

			  	this.m_context3.fillStyle = "black";
			  	this.m_context3.beginPath();
			    this.m_context3.arc(this.m_posX2 - (document.getElementById('tcanvas').clientWidth), this.m_posY2, 5, 0,Math.PI*2); //This will draw a circle of 10px radius
			  	this.m_context3.closePath();
			  	this.m_context3.fill();
			  	this.m_context3.stroke();
			}
		break;

		case 3:
			if( inside( [this.m_posX3 - 2*(document.getElementById('tcanvas').clientWidth), this.m_posY3] , this.listPointsValidate )  ) {
				this.m_context.fillStyle = "black";
			  	this.m_context.beginPath();
			    this.m_context.arc(this.m_posX3 - 2*(document.getElementById('tcanvas').clientWidth), this.m_posY3, 5, 0,Math.PI*2); //This will draw a circle of 10px radius
			  	this.m_context.closePath();
			  	this.m_context.fill();
			  	this.m_context.stroke();

			  	this.m_context2.fillStyle = "black";
			  	this.m_context2.beginPath();
			    this.m_context2.arc(this.m_posX3 - 2*(document.getElementById('tcanvas').clientWidth) , this.m_posY3, 5, 0,Math.PI*2); //This will draw a circle of 10px radius
			  	this.m_context2.closePath();
			  	this.m_context2.fill();
			  	this.m_context2.stroke();

			  	this.m_context3.fillStyle = "black";
			  	this.m_context3.beginPath();
			    this.m_context3.arc(this.m_posX3 - 2*(document.getElementById('tcanvas').clientWidth), this.m_posY3, 5, 0,Math.PI*2); //This will draw a circle of 10px radius
			  	this.m_context3.closePath();
			  	this.m_context3.fill();
			  	this.m_context3.stroke();
			}
		break;
	}

	//this.m_context.stroke();
	this.listPointsValidate = [];	

	/*for( var k=0; k<ListRed.length; k++ ){
					cxt.beginPath();
					cxt.arc( ListRed[k][0], ListRed[k][1], 2, 0,Math.PI*2);
					p = APPLICATION_DATA['metrics'][k][0]/max_test;
					color = getGradientColorGreen("#ffffff", "#ff0000", p);
					cxt.fillStyle = color;//"rgba(255,0,0, " + p + ")";
					cxt.closePath();
					cxt.fill();
		}*/
}


VizPolygon.prototype.draw_initial = function(params)
{
	
	this.m_context.fillStyle = "black";
	this.m_context.beginPath();
	this.m_context.arc(this.Xcenter, this.Ycenter, 3, 0,Math.PI*2); //This will draw a circle of 10px radius
	this.m_context.closePath();
	this.m_context.fill();
	this.m_context.stroke();

	this.m_context2.fillStyle = "black";
	this.m_context2.beginPath();
	this.m_context2.arc(this.Xcenter , this.Ycenter, 3, 0,Math.PI*2); //This will draw a circle of 10px radius
	this.m_context2.closePath();
	this.m_context2.fill();
	this.m_context2.stroke();

	this.m_context3.fillStyle = "black";
	this.m_context3.beginPath();
	this.m_context3.arc(this.Xcenter, this.Ycenter, 3, 0,Math.PI*2); //This will draw a circle of 10px radius
	this.m_context3.closePath();
	this.m_context3.fill();
	this.m_context3.stroke();	
	
}