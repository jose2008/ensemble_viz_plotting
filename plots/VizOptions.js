function VizOptions(parent, divId, params )
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
	//console.log(params['modelType']);
	this.key = params['modelType'];

}


//VizScatterPlot.prototype.draw = function( data )
//{


VizOptions.prototype.draw = function( params ) 
{

	//document.write("ññññññññññññññññññññññññññññ");
	//document.write(String(this.key));

	var self = this;
	console.log("-----------");
	console.log("#".concat(this.key));
	$("#" + this.key).change(function () {
  			var Values = $( "#" + self.key).val();
  			$("#value").val(Values);
  			console.log("-------------->");
  			console.log(self.key );

        	$.ajax({
			    url: '/views/'+self.key,
			    //type: 'get', // This is the default though, you don't actually need to always mention it
			    data: {
	          	'username': Values
	        	},
			    success: function(data) {
			    	data = JSON.parse(data);
			    	console.log( "entrooooo" );
			    	//console.log( data);
			        //alert(data);
			        var model2 = [ [1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1] ];
			        console.log(data["val1"]);
			        console.log(data["val2"]);

			        //var _container = new VizContainer( "container" );
			        //_container.draw( { 'dataScatter' : data["val1"] , 'dataMatrix':model2 }   );


			        self.m_parent.getVizScatter().draw( data["val1"] );
			        self.m_parent.getVizMatrix().draw( data["val2"] );
			        self.m_parent.getVizMetric().draw( [{"name":"silhouette","value":data['val3']},
  														{"name":"Sum_Squared_Within","value":data['val4']},
  														{"name":"Sum_Squared_Between","value":data['val5']}] );
			        self.m_parent.setCurrentLabels(data["list_labels"]);
			        if(APPLICATION_DATA['modelContainers'].length >0 ){
			        	console.log("value of models....");
			        	console.log(APPLICATION_DATA['modelContainers'][0].getCurrentLabels());
			    	}
			    },
			    failure: function(data) { 	
			        alert('Got an error dude');
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
