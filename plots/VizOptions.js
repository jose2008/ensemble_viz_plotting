function VizOptions(parent, divId, params , name)
//function VizOptions( parentContainer, params )
{
	this.m_divId = divId;

	this.m_parent = parent;

	input = document.createElement( 'input' );
	input.id    = String(params['modelType']);// "fontSlider"
	input.type  = "range"
	input.value = 15;
	input.min   = 1;
	input.max   = 20;
	input.step  = 1;

	this.m_divId.appendChild( input );

	output = document.createElement('p');
	output.id = "result"+String(params['modelType']);
	this.m_divId.appendChild( output );


	//console.log(params['modelType']);
	this.key = params['modelType'];


	this.m_name = name;

}

//creatslider(){
//}





VizOptions.prototype.draw = function( params ) 
{

	//document.write("ññññññññññññññññññññññññññññ");
	//document.write(String(this.key));



	var self = this;
	console.log("-----------");
	console.log("#".concat(this.key));
	var res = document.getElementById("result"+ String(this.key));

	$("#" + self.key).change(function () {
  			var Values = $( "#" + self.key).val();
  			res.innerHTML = "número de cluster: "+ Values;


  			$("#value").val(Values);
  			console.log("-------------->");
  			console.log(self.key );

  			//self.key = self.key.substring(0, self.key.length-1);


        	$.ajax({
			    url: '/views/' + self.key.substring(0, self.key.length-1),
			    //type: 'get', // This is the default though, you don't actually need to always mention it
			    data: {
	          	'username': Values
	        	},

			    success: function(data) {
			    	data = JSON.parse(data);
			    	console.log("+++++++++++++++++++++++++++++++++++");
	        	console.log(self.key);
			    	console.log( "entrooooo" );
			    	//console.log( data);
			        //alert(data);
			        var model2 = [ [1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1] ];
			        console.log(data["val1"]);
			        console.log(data["val2"]);

			        //var _container = new VizContainer( "container" );
			        //_container.draw( { 'dataScatter' : data["val1"] , 'dataMatrix':model2 }   );


			        self.m_parent.getVizScatter().draw( data["val1"] );
			        //self.m_parent.getVizMatrix().draw( data["val2"] );
			        //self.m_parent.getVizMetric().draw( [{"name":"silhouette","value":data['val3']},
  					//									{"name":"Sum_Squared_Within","value":data['val4']},
  					//									{"name":"Sum_Squared_Between","value":data['val5']}] );
			        console.log("name VizOptions----------------------------------------->");
			        var id = "IDbarcharSVG".concat(self.m_name);
			        console.log( id );
			        if(document.getElementById(id)) document.getElementById(id).outerHTML = "";
			        self.m_parent.getVizBarChart().draw( [{"metrica":"silhouette","valor":data['val3']},
  														{"metrica":"SSE","valor":data['val4']},
  														{"metrica":"SSB","valor":data['val5']}] );
			        

			        self.m_parent.setCurrentLabels(data["list_labels"]);
			        self.m_parent.setCurrentMetric( [  data['val3'], data['val4'], data['val5']     ]  );





			        /*if(APPLICATION_DATA['modelContainers'].length >0 ){
			        	console.log("value of models....");
			        	//console.log(APPLICATION_DATA['modelContainers'][0].getCurrentLabels());
			    	}*/
			    },
			    failure: function(data) { 	
			        //alert('Got an error dude');
			    }
			}); 
  			//document.write({{model_list}})

        	$("#fontSlider").change(        
            function () {
            var Values = $( "#fontSlider" ).val();
                $("#value").val(Values);
            }            
        );
    	});



};