function VizStarChart( divId )
{
	this.m_divId = divId;
	this.m_canvas = document.createElement( "CANVAS" );
    this.m_canvas.id= "marksChart";

    this.m_context = this.m_canvas.getContext("2d" );

	this.m_divId.appendChild( this.m_canvas );

}


VizStarChart.prototype.draw = function( params )
{
	var self = this;
	var marksCanvas =  self.m_canvas;// document.getElementById("marksChart");
	$("#marksChart").remove();

	this.m_context.clearRect( 0, 0, this.m_canvas.width, this.m_canvas.height );


	Chart.defaults.global.defaultFontFamily = "Lato";
	Chart.defaults.global.defaultFontSize = 18;



	/*list_model = [];
	for(var i=0; ){
		list_model.push( {
		label: "Student A",
		backgroundColor: "transparent",
		borderColor: "rgba(200,0,0,0.6)",
		fill: false,
		radius: 3,
		pointRadius: 3,
		pointBorderWidth: 3,
		pointBackgroundColor: "orange",
		pointBorderColor: "rgba(200,0,0,0.6)",
		pointHoverRadius: 10,
		data: [65, 75, 70]
  		}  );
	
	}*/
	var dataset = [];
	for(var i = 0; i<params['colors'].length; i++){
		console.log("numbers to startttttttttttttttttttttttttttttt " + params['colors'] + " + " + params['weights']);
		dataset.push({
		label: "Ensemble "+ (i+1),
		backgroundColor: "transparent",
		borderColor: params['colors'][i],
		fill: false,
		radius: 3,
		pointRadius: 3,
		pointBorderWidth: 3,
		pointBackgroundColor: "orange",
		pointBorderColor:params['colors'][i],
		pointHoverRadius: 10,
		data: params['weights'][i]
  		});
	}


	var marksData = {
		labels: params['labels'], //["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
		datasets: dataset,
		/*[{
		label: "Student A",
		backgroundColor: "transparent",
		borderColor: "rgba(200,0,0,0.6)",
		fill: false,
		radius: 3,
		pointRadius: 3,
		pointBorderWidth: 3,
		pointBackgroundColor: "orange",
		pointBorderColor: "rgba(200,0,0,0.6)",
		pointHoverRadius: 10,
		data: [65, 75, 70]
  	}, {
		label: "Student B",
		backgroundColor: "transparent",
		borderColor: "rgba(0,0,200,0.6)",
		fill: false,
		radius: 3,
		pointRadius: 3,
		pointBorderWidth: 3,
		pointBackgroundColor: "cornflowerblue",
		pointBorderColor: "rgba(0,0,200,0.6)",
		pointHoverRadius: 10,
		data: [0, 65, 60]
  		}]*/
	};

	var chartOptions = {
		scale: {
			ticks: {
				beginAtZero: true,
				min: 0,
				//max: 100,
				//stepSize: 100
			},
			pointLabels: {
				fontSize: 18
			}
  		},
  		/*legend: {
    		position: 'left'
  		}*/
	};

	var radarChart = new Chart(this.m_canvas, {
		type: 'radar',
		data: marksData,
		options: chartOptions
	});

	radarChart.clear();
}