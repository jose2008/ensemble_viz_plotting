function VizOptions(parent, divId, params , name)
{
	this.m_divId = divId;
	this.m_parent = parent;
	this.m_name = name;

	input = document.createElement( 'input' );
	input.id    = String(params['modelType']);// "fontSlider"
	input.type  = "range"
	input.value = 1;
	input.min   = 1;
	input.className = "vranger";
	input.max   = 30;
	input.step  = 1;
	this.m_divId.appendChild( input );
	output = document.createElement('p');
	output.id = "result"+String(params['modelType']);
	output.style.padding = "75px 12px 22px 10px";
	this.m_divId.appendChild( output );
	this.key = params['modelType'];
}


VizOptions.prototype.draw = function( params ) 
{
	var self = this;
	$("#header"+ self.m_name).click(function(e){
	    $("#"+ self.m_name+"img").toggleClass('glyphicon-minus glyphicon-plus');
	    element = document.getElementById(self.m_name+"img");
	    if(element.className == "more-less glyphicon glyphicon-minus"){
	    	$("#"+ self.m_name+"bar").show();
	    }else{
	    	$("#"+ self.m_name+"bar").fadeOut();
	    }

	});

	$('#cbox1').change(function() {
		$("#"+ self.m_name+"img").toggleClass('glyphicon-minus glyphicon-plus');
        if(this.checked) {
        	console.log(self.m_name);
        	console.log("is checked..................................................");
        	$("#"+ self.m_name+"bar").fadeOut();
            /*var returnVal = confirm("Are you sure?");
            $(this).prop("checked", returnVal);
            console.log("click all");*/
        }
        if(!this.checked) {
        	console.log(self.m_name);
        	console.log("is not checked..................................................");
        	$("#"+ self.m_name+"bar").show();
            /*var returnVal = confirm("Are you sure?");
            $(this).prop("checked", returnVal);
            console.log("click all");*/
        }
        //$('#textbox1').val(this.checked);        
    });


	var res = document.getElementById("result"+ String(this.key));
	$("#" + self.key).change(function () {
		var Values = $( "#" + self.key).val();
  		res.innerHTML = "numbers of clusters: "+ Values;
  		$("#value").val(Values);
        $.ajax({
			url: '/views/' + self.key.substring(0, self.key.length-1),
			data: {
					'username': Values
	        },
			success: function(data) {
			   	data = JSON.parse(data);
				self.m_parent.getVizScatter().draw( data["val1"] );
			    //self.m_parent.getVizMetric().draw( [{"name":"silhouette","value":data['val3']},
  				//									{"name":"Sum_Squared_Within","value":data['val4']},
  				//									{"name":"Sum_Squared_Between","value":data['val5']}] );
			    var id = "IDbarcharSVG".concat(self.m_name);
			    if(document.getElementById(id)) document.getElementById(id).outerHTML = "";
			    self.m_parent.getVizBarChart().draw( [{"metrica":"silhouette","valor":data['val3']},
  														{"metrica":"SSE","valor":data['val4']},
  														{"metrica":"SSB","valor":data['val5']}], 0 );

				self.m_parent.setCurrentLabels(data["list_labels"]);
				self.m_parent.setCurrentMetric( [  data['val3'], data['val4'], data['val5']     ]  );
				for(var k = 0; k<APPLICATION_DATA['Comparation']['methods'].length; k++){
					if(APPLICATION_DATA['Comparation']['methods'][k] == data['name']){
			        	APPLICATION_DATA['Comparation']["methods"].pop( k );
						APPLICATION_DATA["Comparation"]["valor"].pop( k );
						APPLICATION_DATA["Comparation"]["color"].pop( k );
						APPLICATION_DATA['Comparation']["metric"].pop(3*k);
						APPLICATION_DATA['Comparation']["metric"].pop(3*k);
						APPLICATION_DATA['Comparation']["metric"].pop(3*k);	
						console.log("delete valor of comparation................................");			
			        }
				}
			    APPLICATION_DATA['Comparation']["methods"].push(data['name']);
			    APPLICATION_DATA['Comparation']["color"].push("#0404B4");
				APPLICATION_DATA['Comparation']["metric"] = APPLICATION_DATA['Comparation']["metric"].concat([  data['val3'], data['val4'], data['val5'] ]);
				//APPLICATION_DATA["Comparation"]["valor"].push([  data['val3'], data['val4'], data['val5'] ]);
			},
			failure: function(data) {
				alert('Got an error dude');
			}
		}); 

        $("#fontSlider").change(        
            function () {
            var Values = $( "#fontSlider" ).val();
                $("#value").val(Values);
            }            
       	);
    });
};