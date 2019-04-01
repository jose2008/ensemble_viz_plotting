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


function distance(l1,l2){
	return Math.sqrt(  (l1[0]-l2[0])*(l1[0]-l2[0])  +   (l1[1]-l2[1])*(l1[1]-l2[1])  )/10;
}

function float2color( percentage ) {
    var color_part_dec = 255 * percentage;
    var color_part_hex = Number(parseInt( color_part_dec , 10)).toString(16);
    return "#" + color_part_hex + color_part_hex + color_part_hex;
}


function VizPolygon(parent, divId, name)
{
	this.m_divId = divId;
	this.m_parent = parent;
	this.m_name = name;
    this.m_canvas = document.createElement( "CANVAS" );
    this.m_canvas.id= "myCanvas"
    this.m_context = this.m_canvas.getContext("2d" );

    this.m_context.canvas.width  = window.innerWidth;
  	this.m_context.canvas.height = window.innerHeight;
  	this.m_divId.appendChild( this.m_canvas );


  	this.m_canvas2 = document.createElement( "CANVAS" );
    this.m_canvas2.id= "myCanvas2"
    this.m_context2 = this.m_canvas2.getContext("2d" );

	this.m_context2.canvas.width  = window.innerWidth;
  	this.m_context2.canvas.height = window.innerHeight;
  	this.m_divId.appendChild( this.m_canvas2 );


	this.numberOfSides = APPLICATION_DATA['modelContainers'].length,
    this.size = 100,
    this.Xcenter = 200,
    this.Ycenter = 120;
    this.listPoints = [];
    this.listPointsValidate = [];


    this.posCircleX = 400;
    this.posCircleY = 120;

	this.m_posX = 400;
	this.m_posY = 400;
	this.click = false;

	var self  = this;
	this.m_canvas.onmousemove = function(event) {
	  	var rect = self.m_canvas.getBoundingClientRect();
	  	console.log("onmouse move");
	  	console.log( event.clientX );
	  	console.log( event.clientY );
	  	


	  	self.m_posX = event.clientX - rect.left; //new center of circle
	  	self.m_posY = event.clientY - rect.top; //new center of circle
	  	console.log( self.m_posX );
	  	console.log( self.m_posY );


	  	listPointsValidate_test = [];
	  	n = APPLICATION_DATA['modelContainers'].length;
	  	for (var i = 1; i <= APPLICATION_DATA['modelContainers'].length;i += 1) {
			p = []
			p.push(self.Xcenter + self.size * Math.cos(i * 2 * Math.PI / n))
			p.push(self.Ycenter + self.size * Math.sin(i * 2 * Math.PI / n))
			listPointsValidate_test.push(p);
		}

	  	if(inside( [self.m_posX, self.m_posY] , listPointsValidate_test ) && ( Math.abs(self.posCircleX- self.m_posX)<25 && Math.abs(self.posCircleY- self.m_posY)<25   ) ){
	  		console.log("inside.... onmousemove");
	  		self.draw(null);
	  	}
	};

	this.m_canvas.onmousedown = function(event){
	}

	this.m_canvas.onmouseup = function(event){

		self.draw(null);

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


		if( self.click ) {
			console.log("entro if");
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
	  					console.log("VizPolygon--------------------------------------------------------");
	  					console.log(data["listWeight"]);
				        self.m_parent.getVizBar().draw({"listWeight":data["listWeight"]});
				        //self.m_parent.getStreamGraph().draw({});
				        console.log("areas.............................")
				        console.log(data["listWeight"]);
				        var id = "IDbarcharSVG".concat(self.m_name);
				        if(document.getElementById(id)) document.getElementById(id).outerHTML = "";
				        self.m_parent.getVizBarChart().draw( [{"metrica":"silhouette","valor":data['val3']},
  														{"metrica":"inner","valor":data['val4']},
  														{"metrica":"outer","valor":data['val5']}] );
				        self.m_parent.setCurrentLabels(data["list_labels"]);
				        
				        for ( var i = 0; i < APPLICATION_DATA['modelContainers'].length; i++ )
						{
							//myListOfArrays.push(APPLICATION_DATA['modelContainers'][i].getCurrentLabels());
						};
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
	if(params){
		this.m_posX = params["new_x"];
		this.m_posY = params["new_y"];
	}
	var ListRed   = [];
	var ListBlue  = [];
	var ListGreen = [];
	var sum = 0;
	this.m_context.clearRect( 0, 0, this.m_canvas.width, this.m_canvas.height );
	this.numberOfSides = APPLICATION_DATA['modelContainers'].length;
	//this.m_context.clearRect( 0, 0, this.m_canvas.width, this.m_canvas.height );
	//clear(); 
	this.m_context.beginPath();
	this.m_context.moveTo (this.Xcenter +  this.size * Math.cos(0), this.Ycenter +  this.size *  Math.sin(0));          
	this.listPoints = [];
	for (var i = 1; i <= this.numberOfSides;i += 1) {
		p = []
		this.listPoints.push(this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides));
		this.listPoints.push(this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
		p.push(this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides))
		p.push(this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides))
		this.listPointsValidate.push(p);
		console.log("entro to text--------------------------------");
		this.m_context.font = "12px Georgia";
		this.m_context.fillStyle = 'blue'
		this.m_context.fillText(APPLICATION_DATA['modelContainers'][i-1].name.substring(0, APPLICATION_DATA['modelContainers'][i-1].name.length-7)
			,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	    this.m_context.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
	}
	this.m_context.strokeStyle = "#000000";
	this.m_context.lineWidth = 1;
	this.m_context.stroke();

	if( inside( [this.m_posX, this.m_posY] , this.listPointsValidate )  ) {
		this.m_context.fillStyle = "black";
	  	this.m_context.beginPath();
	    this.m_context.arc(this.m_posX, this.m_posY, 5, 0,Math.PI*2); //This will draw a circle of 10px radius

	  	this.m_context.closePath();
	  	this.m_context.fill();
	  	this.m_context.stroke();
	  	this.posCircleX = this.m_posX;
	  	this.posCircleY = this.m_posY;


	  	this.click = true;
	}else{
		this.click = false;
	}

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
				console.log(APPLICATION_DATA['metrics'][k+t][0] - APPLICATION_DATA['metric'][0]);
				console.log(APPLICATION_DATA['metrics'][k+t][1] - APPLICATION_DATA['metric'][1])
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
				/*else{
					if(Math.round(Math.random())>0.5){
						ListGreen.push(  APPLICATION_DATA['points'][k+t]  );
					}
					else{
						ListBlue.push(  APPLICATION_DATA['points'][k+t]  );
					}
				}*/
			}
			k = k+3;
	}

	var cxt = this.m_canvas.getContext("2d");

	listPointsValidate = [];
	  	n = APPLICATION_DATA['modelContainers'].length;
	  	for (var i = 1; i <= APPLICATION_DATA['modelContainers'].length;i += 1) {

			p = []
			p.push(this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / n))
			p.push(this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / n))
			listPointsValidate.push(p);
		}

		for(var i=0; i<200; i++){
			for(var j=0;j<200; j++){
				var m1 = 0;
				var m2 = 0;
				var m3 = 0;
				if( inside( [ 100+i, 20+j] , listPointsValidate ) ){
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
					cxt.arc(100+i,20+j, 1, 0,Math.PI*2);
					 
					cxt.closePath();
					if( m1 ==  Math.max(m1, m2, m3) ) cxt.fillStyle = "rgba(255,0,0, " + m1 + ")";
					if( m2 ==  Math.max(m1, m2, m3) ) cxt.fillStyle = "rgba(0,255,0, " + m2 + ")";
					if( m3 ==  Math.max(m1, m2, m3) ) cxt.fillStyle = "rgba(0,0,255, " + m3 + ")";
					//this.m_context.fillStyle = "rgba(255,0,0, " + m + ")"; //float2color(m);
					cxt.fill();
					//this.m_context.stroke();
					//this.m_context.closePath();

				}
			}
		}

		for (var i = 1; i <= this.numberOfSides;i += 1) {
			p = [];
			//this.listPoints.push(this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides));
			//this.listPoints.push(this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
			//p.push(this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides))
			//p.push(this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides))
			//this.listPointsValidate.push(p);
			//console.log("entro to text--------------------------------");
			this.m_context.font = "20px Georgia";
			this.m_context.fillText(APPLICATION_DATA['modelContainers'][i-1].name
				,this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
		    //this.m_context.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
		}


		//this.m_context.stroke();
	this.listPointsValidate = [];	

}

