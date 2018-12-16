function VizOptions(parent, divId, params )
//function VizOptions( parentContainer, params )
{

	this.m_divId = divId;


	this.m_parent = parent;


	input = document.createElement( 'input' );
	input.id    = "fontSlider"
	input.type  = "range"
	input.value = 15;
	input.min   = 1;
	input.max   = 20;
	input.step  = 1;


	//input.style.width = "100px";
	//input.style.height = "100px";
	//input.textContent = "Sup, y'all?";
	//input.style.background = "#012345";
	//input.style.display = "inline";
//display: inline
	this.m_divId.appendChild( input );


/*
	this.m_parentContainer = parentContainer;

	var self = this;
$.ajax({
			    url: '/views/kmean_model',
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

			        //var _container = new VizContainer( "container" );
			        //_container.draw( { 'dataScatter' : data["val1"] , 'dataMatrix':model2 }   );

			        self.m_parentContainer.draw( {'dataScatter':data} );
			    },
			    failure: function(data) { 
			        alert('Got an error dude');
			    }
			}); 

};

*/



/*
<input style="float: left; padding: 3px; margin-right: 3px;" id="fontSlider" type="range" name="points" value="15" min="1" max="100" step="1"/>
		<input type="text" value="" id="value"/>
<input style="float: left; padding: 3px; margin-right: 3px;" id="fontSlider" type="range" name="points" value="15" min="1" max="100" step="1"/>
		<input type="text" value="" id="value"/>
*/


}


//VizScatterPlot.prototype.draw = function( data )
//{


VizOptions.prototype.draw = function(params) 
{


	document.write("uno.....");


	var self = this;

	$(document).change(function () {
  			var Values = $( "#fontSlider" ).val();
  			$("#value").val(Values);
  			
  			console.log( "fuuubarfunnn111" );
  			
  			/*
  			$.ajax({
        	url: '',
        	type: 'get',
        	data: {
          	'username': Values
        	},
        	dataType: 'json',
        	success: function (data) {
        		console.log( "fuuubarfunnn" );
          	if (data.is_taken) {
            	alert("A user with this username already exists.");
          	}
        	}
        	});
        	*/

        	
        	$.ajax({
			    url: '/views/kmean_model',
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

			        //var _container = new VizContainer( "container" );
			        //_container.draw( { 'dataScatter' : data["val1"] , 'dataMatrix':model2 }   );


			        self.m_parent.getVizScatter().draw( data["val1"] );
			        //self.m_parent.getVizMatrix().draw( {} );

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
