function VizModal(parent, div, params, name , tbody)
{
	this.m_div = div;
	this.m_parent = parent;

	this.select = document.createElement( 'select' );
	this.select.id = "idSelectModal";

	option0 = document.createElement( 'option' );
	option0.id = "ceroId";
	option0.text = "Ensemble";

	option1 = document.createElement( 'option' );
	option1.id = "unoId";
	option1.text = "Voting";

	option2 = document.createElement( 'option' );
	option2.id = "dosId";
	option2.text = "CSPA";

	this.select.appendChild(option0);
	this.select.appendChild(option1);
	this.select.appendChild(option2);
}


VizModal.prototype.draw = function( params ) 
{
	var self = this;
	var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];

	$("#idModalButton").click(function(){
		var id = "bodyIDModal";
		if(document.getElementById(id)) document.getElementById(id).innerHTML = "";
		var msg = document.getElementById("bodyIDModal");
		
		var mainDiv = document.createElement( 'div' );
		
		var rowModal = document.createElement( 'div' );
		rowModal.className = 'row_modal_polygon';	
		
		var rowModal2 = document.createElement( 'div' );
		rowModal2.className = 'row_modal_polygon';

		var leftColumn = document.createElement( 'div' );
		leftColumn.className = 'column_modal_left';
		
		var rightColumn = document.createElement( 'div' );
		rightColumn.className = 'column_modal_right';
		
		var labels = [];
		var colors = [];
		var w_models = [];
		for(var i=1; i<=APPLICATION_DATA['modelContainers'].length; i++){
			labels.push( APPLICATION_DATA['modelContainers'][i-1].name.substring(0, APPLICATION_DATA['modelContainers'][i-1].name.length-7) );
		}

		for(var v = 1; v <= APPLICATION_DATA['historial'].length; v++){
			if($('#check' +v ).is(":checked")){
				var myListOfArrays = [];
				for(var k = 0; k < APPLICATION_DATA['historial'][v-1]['container'].length ; k++){
		 			l  = APPLICATION_DATA['historial'][v-1]['container'][k].getCurrentLabels();
		 			myListOfArrays = myListOfArrays.concat(l);
  				}
			
				m_divScatter = document.createElement( 'div' );
				m_divScatter.className = "column3_polygon";

	    		m_divBarChart = document.createElement( 'div' );
	   		 	m_divBarChart.className = "div_column";
				m_divBar = document.createElement( 'div' );
				var m_divStarChart = document.createElement( 'div' );
				m_StartChart = null;
				m_scatter = null;
				m_barChart = null;
				m_barBar = null;

				m_barChart = new VizBarChart( m_divBarChart, null, "idd" );
				m_barChart.draw( [{"metrica":"silhouette","valor":APPLICATION_DATA['historial'][v-1]['metric'][0][0]},
	  														{"metrica":"SSE","valor":APPLICATION_DATA['historial'][v-1]['metric'][0][1]},
	  														{"metrica":"SSB","valor":APPLICATION_DATA['historial'][v-1]['metric'][0][2]}], 0 , colores_g[v-1]);

				rightColumn.appendChild(m_divBarChart);

				var tmp = 0;
				var tmp_w = [];
				for(var i = 1; i<=APPLICATION_DATA['modelContainers'].length; i++){
					if(tmp < APPLICATION_DATA['historial'][v-1]['container'].length && APPLICATION_DATA['modelContainers'][i-1].name == APPLICATION_DATA['historial'][v-1]['container'][tmp].name){
						tmp_w.push( (APPLICATION_DATA['historial'][v-1]['weight']['listWeight'][tmp])*100  );
						tmp++;
						console.log(APPLICATION_DATA['historial'][v-1]['weight']);
						console.log("entro iterator");
						console.log(APPLICATION_DATA['modelContainers'][i-1].name);
					}
					else{
						tmp_w.push(0);
					}
				}
				w_models.push(tmp_w);
				colors.push(colores_g[v-1]);
			}
		}

		m_StartChart = new VizStarChart(m_divStarChart);
		m_StartChart.draw({'labels':labels, 'colors':colors, 'weights':w_models});

		var intersection_list = []
		for (var i = 0 ; i < APPLICATION_DATA['modelContainers'].length; i++) {
			var c = 0;
			for(var j=0; j<w_models.length; j++){
				if(w_models[j][i]>0)
					c++;
			}
			if (c == w_models.length)
				intersection_list.push(1);
			else
				intersection_list.push(0)
		}

		colors = [];
		w_models = [];

		leftColumn.appendChild(m_divStarChart);

		var node = document.createTextNode("Ensemble Model");
		rowModal2.appendChild(node);		
		rowModal2.appendChild(self.select);

		rowModal.appendChild(rightColumn);
		rowModal.appendChild(leftColumn);
		msg.appendChild( rowModal );
		msg.appendChild( rowModal2 );

		$("#idSelectModal").change(function (){
			APPLICATION_DATA_copy['modelContainers'] = []
	        for(var k = 0; k< APPLICATION_DATA['modelContainers'].length; k++){
	        	if(intersection_list[k]>0)
					APPLICATION_DATA_copy['modelContainers'].push( APPLICATION_DATA['modelContainers'][k] );
			}
	        APPLICATION_DATA_copy['points'] = [];
	        APPLICATION_DATA_copy['metrics'] = [];
	        self.m_parent.getVizComboBox().draw_initial();
	        console.log("newwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
	        $("#IDbuttonModal").click()});
		
		$("#largeModal").on("hide.bs.modal", function () {
    	// put your default event here
		});


		self.m_parent.getVizHistorialTable().draw(params);
	});


}