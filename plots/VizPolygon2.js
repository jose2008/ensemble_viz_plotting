function VizPolygon(parent, divId, divId2, divId3, name)
{
	this.m_divId = divId;
	this.m_divId2 = divId2;
	this.m_divId3 = divId3;

	this.m_parent = parent;
	this.m_name = name;
    this.m_canvas = document.createElement( "CANVAS" );
    this.m_canvas.id= "myCanvas"
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
    this.size = 70,
    //this.Xcenter = 200,
    //this.Ycenter = 120;    
    this.Xcenter = (document.getElementById('tcanvas').clientWidth)/4;
    this.Ycenter = (document.getElementById('tcanvas').clientHeight)/2;

    this.listPoints = [];
    this.listPointsValidate = [];

	this.m_posX = 400;
	this.m_posY = 400;

	this.m_posX2 = 400;
	this.m_posY2 = 400;

	this.m_posX3 = 400;
	this.m_posY3 = 400;
	var self  = this;
	this.m_canvas.onmousemove = function(event) {
	  	var rect = self.m_canvas.getBoundingClientRect();	  	
	  	self.m_posX = event.clientX - rect.left; //new center of circle
	  	self.m_posY = event.clientY - rect.top; //new center of circle
	  	listPointsValidate_test = [];
	  	n = APPLICATION_DATA['modelContainers'].length;
	  	for (var i = 1; i <= APPLICATION_DATA['modelContainers'].length;i += 1) {
			p = []
			p.push(self.Xcenter + self.size * Math.cos(i * 2 * Math.PI / n))
			p.push(self.Ycenter + self.size * Math.sin(i * 2 * Math.PI / n))
			listPointsValidate_test.push(p);
		}
	};

	this.m_canvas2.onmousemove = function(event) {
	  	var rect = self.m_canvas.getBoundingClientRect();
	  	self.m_posX2 = event.clientX - rect.left; //new center of circle
	  	self.m_posY2 = event.clientY - rect.top; //new center of circle
	  	listPointsValidate_test = [];
	  	n = APPLICATION_DATA['modelContainers'].length;
	  	for (var i = 1; i <= APPLICATION_DATA['modelContainers'].length;i += 1) {
			p = []
			p.push(self.Xcenter + self.size * Math.cos(i * 2 * Math.PI / n))
			p.push(self.Ycenter + self.size * Math.sin(i * 2 * Math.PI / n))
			listPointsValidate_test.push(p);
		}
	};


	this.m_canvas3.onmousemove = function(event) {
	  	var rect = self.m_canvas.getBoundingClientRect();
	  	self.m_posX3 = event.clientX - rect.left; //new center of circle
	  	self.m_posY3 = event.clientY - rect.top; //new center of circle
	  	listPointsValidate_test = [];
	  	n = APPLICATION_DATA['modelContainers'].length;
	  	for (var i = 1; i <= APPLICATION_DATA['modelContainers'].length;i += 1) {
			p = []
			p.push(self.Xcenter + self.size * Math.cos(i * 2 * Math.PI / n))
			p.push(self.Ycenter + self.size * Math.sin(i * 2 * Math.PI / n))
			listPointsValidate_test.push(p);
		}
	};

	this.m_canvas.onmouseup = function(event){
		var params = {'number_polygon':1};
		self.draw(params);
		self.listPoints.push(self.m_posX);
		self.listPoints.push(self.m_posY);
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

		for ( var i = 0; i < APPLICATION_DATA['modelContainers'].length; i++ )
		{
			l  = APPLICATION_DATA['modelContainers'][i].getCurrentLabels();
			l2 = APPLICATION_DATA['modelContainers'][i].getCurrentMetrics();
				numbers_model = APPLICATION_DATA['modelContainers'].length ;
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
				    self.m_parent.getVizBar().draw({"listWeight":data["listWeight"]});
				    //self.m_parent.getStreamGraph().draw({});
				    var id = "IDbarcharSVG".concat(self.m_name);
				    if(document.getElementById(id)) document.getElementById(id).outerHTML = "";
				    self.m_parent.getVizBarChart().draw( [{"metrica":"silhouette","valor":data['val3']},
  													{"metrica":"inner","valor":data['val4']},
  													{"metrica":"outer","valor":data['val5']}] );
				    self.m_parent.setCurrentLabels(data["list_labels"]);
				},
				failure: function(data) { 	
				    //alert('Got an error dude');
				}
		});
	}


	this.m_canvas2.onmouseup = function(event){
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

			for ( var i = 0; i < APPLICATION_DATA['modelContainers'].length; i++ )
			{
					l  = APPLICATION_DATA['modelContainers'][i].getCurrentLabels();
					l2 = APPLICATION_DATA['modelContainers'][i].getCurrentMetrics();
					numbers_model = APPLICATION_DATA['modelContainers'].length ;
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
				        self.m_parent.getVizBar().draw({"listWeight":data["listWeight"]});
				        //self.m_parent.getStreamGraph().draw({});
				        var id = "IDbarcharSVG".concat(self.m_name);
				        if(document.getElementById(id)) document.getElementById(id).outerHTML = "";
				        self.m_parent.getVizBarChart().draw( [{"metrica":"silhouette","valor":data['val3']},
  														{"metrica":"inner","valor":data['val4']},
  														{"metrica":"outer","valor":data['val5']}] );
				        self.m_parent.setCurrentLabels(data["list_labels"]);
				    },
				    failure: function(data) { 	
				        alert('Got an error dude');
				    }
				});
		}





	this.m_canvas3.onmouseup = function(event){
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

			for ( var i = 0; i < APPLICATION_DATA['modelContainers'].length; i++ )
			{
					l  = APPLICATION_DATA['modelContainers'][i].getCurrentLabels();
					l2 = APPLICATION_DATA['modelContainers'][i].getCurrentMetrics();
					numbers_model = APPLICATION_DATA['modelContainers'].length ;
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
				        self.m_parent.getVizBar().draw({"listWeight":data["listWeight"]});
				        //self.m_parent.getStreamGraph().draw({});
				        var id = "IDbarcharSVG".concat(self.m_name);
				        if(document.getElementById(id)) document.getElementById(id).outerHTML = "";
				        self.m_parent.getVizBarChart().draw( [{"metrica":"silhouette","valor":data['val3']},
  														{"metrica":"inner","valor":data['val4']},
  														{"metrica":"outer","valor":data['val5']}] );
				        self.m_parent.setCurrentLabels(data["list_labels"]);				        
				    },
				    failure: function(data) { 	
				        //alert('Got an error dude');
				    }
				});
	}
}



VizPolygon.prototype.draw = function(params)
{
	var ListRed   = [];
	var ListBlue  = [];
	var ListGreen = [];
	var sum = 0;
	this.m_context.clearRect( 0, 0, this.m_canvas.width, this.m_canvas.height );
	this.m_context2.clearRect( 0, 0, this.m_canvas2.width, this.m_canvas2.height );
	this.m_context3.clearRect( 0, 0, this.m_canvas3.width, this.m_canvas3.height );
	this.numberOfSides = APPLICATION_DATA['modelContainers'].length;
	this.m_context.beginPath();
	this.m_context.moveTo (this.Xcenter +  this.size * Math.cos(0), this.Ycenter +  this.size *  Math.sin(0));

	this.m_context2.beginPath();
	this.m_context2.moveTo (this.Xcenter +  this.size * Math.cos(0), this.Ycenter +  this.size *  Math.sin(0));

	this.m_context3.beginPath();
	this.m_context3.moveTo (this.Xcenter +  this.size * Math.cos(0), this.Ycenter +  this.size *  Math.sin(0));


	this.listPoints = [];
	for (var i = 1; i <= this.numberOfSides;i += 1) {
		p = []
		this.listPoints.push(this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides));
		this.listPoints.push(this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
		p.push(this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides))
		p.push(this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides))
		this.listPointsValidate.push(p);
		this.m_context.font = "12px Georgia";
		this.m_context.fillStyle = 'blue'
		this.m_context.fillText(APPLICATION_DATA['modelContainers'][i-1].name.substring(0, APPLICATION_DATA['modelContainers'][i-1].name.length-7)
			,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context2.font = "12px Georgia";
		this.m_context2.fillStyle = 'blue'
		this.m_context2.fillText(APPLICATION_DATA['modelContainers'][i-1].name.substring(0, APPLICATION_DATA['modelContainers'][i-1].name.length-7)
			,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context2.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

	    this.m_context3.font = "12px Georgia";
		this.m_context3.fillStyle = 'blue'
		this.m_context3.fillText(APPLICATION_DATA['modelContainers'][i-1].name.substring(0, APPLICATION_DATA['modelContainers'][i-1].name.length-7)
			,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context3.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));

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

	if(  this.m_posX == 400 && this.m_posY == 400 && APPLICATION_DATA['modelContainers'].length>2 ){
		this.m_context.fillStyle = "black"; //red
		this.m_context.beginPath();
	    this.m_context.arc(this.Xcenter, this.Ycenter, 5, 0,Math.PI*2); //This will draw a circle of 10px radius
	  	this.m_context.closePath();
	  	this.m_context.fill();
	}

	var N=4;
	var ListRed   = [];
	var ListBlue  = [];
	var ListGreen = [];

	listToDraw = APPLICATION_DATA['points'] ;//[];
	var k = 0;
	
	for(var i=1; i <= ( this.numberOfSides )*N && listToDraw.length>0; i++){		
			for(var t=0; t<3; t++){
				var result = Math.max(APPLICATION_DATA['metrics'][k+t][0] - APPLICATION_DATA['metric'][0], 
				APPLICATION_DATA['metrics'][k+t][1]-APPLICATION_DATA['metric'][1], APPLICATION_DATA['metrics'][k+t][2] -APPLICATION_DATA['metric'][2] );
				if(APPLICATION_DATA['metrics'][k+t][0] - APPLICATION_DATA['metric'][0] == result){
					//s.push("red");
					ListRed.push(  APPLICATION_DATA['points'][k+t]  );
				}	
				else if(APPLICATION_DATA['metrics'][k+t][1] - APPLICATION_DATA['metric'][1] == result){
					//s.push("green");
					ListGreen.push(  APPLICATION_DATA['points'][k+t]  );
				}
				else{
					//s.push("blue");
					ListBlue.push(  APPLICATION_DATA['points'][k+t]  );
				}
			}
			k = k+3;
	}

	var cxt  = this.m_canvas.getContext("2d");
	var cxt2 = this.m_canvas2.getContext("2d");
	var cxt3 = this.m_canvas3.getContext("2d");

	listPointsValidate = [];
	  	n = APPLICATION_DATA['modelContainers'].length;
	  	for (var i = 1; i <= APPLICATION_DATA['modelContainers'].length;i += 1) {

			p = []
			p.push(this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / n))
			p.push(this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / n))
			listPointsValidate.push(p);
		}

		for(var i=0; i<200; i++){
			for(var j=0;j<250; j++){
				var m1 = 0;
				var m2 = 0;
				var m3 = 0;
				if( inside( [ i, j] , listPointsValidate ) ){
					for( var k=0; k<ListRed.length; k++ ){
						m1 = m1 + gaussian(1.8,  distance(  [ 100+i, 20+j] ,ListRed[k] ))
					}
					for( var k=0; k<ListGreen.length; k++ ){
						m2 = m2 + gaussian(1.8,  distance(  [ 100+i, 20+j] ,ListGreen[k] ))
					}
					for( var k=0; k<ListBlue.length; k++ ){
						m3 = m3 + gaussian(1.8,  distance(  [ 100+i, 20+j] ,ListBlue[k] ))
					}
					cxt.beginPath();
					cxt.arc(i,j, 1, 0,Math.PI*2);
					cxt.fillStyle = "rgba(255,0,0, " + 1 + ")";
					cxt.closePath();
					//if( m1 ==  Math.max(m1, m2, m3) ) cxt.fillStyle = "rgba(255,0,0, " + m1 + ")";
					//if( m2 ==  Math.max(m1, m2, m3) ) cxt.fillStyle = "rgba(0,255,0, " + m2 + ")";
					//if( m3 ==  Math.max(m1, m2, m3) ) cxt.fillStyle = "rgba(0,0,255, " + m3 + ")";
					//this.m_context.fillStyle = "rgba(255,0,0, " + m + ")"; //float2color(m);
					cxt.fill();
				}
			}
		}

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

}