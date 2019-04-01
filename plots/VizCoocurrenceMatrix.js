
function VizCoocurrenceMatrix(divId)
{

	this.m_divId = divId;

		//container = options.container;
	//data = options.data;
	var width  = 300;
	var height = 300;

	container = this.m_divId;

	this.colores_g = ["#FFF", "#240", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
	//this.colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];


	//create svg element
	this.svg = d3.select(container)
		.append("svg")
		.attr("width",width)
		.attr("height",height);





};


function float2color( percentage ) {
    var color_part_dec = 255 * percentage;
    var color_part_hex = Number(parseInt( color_part_dec , 10)).toString(16);
    return "#" + color_part_hex + color_part_hex + color_part_hex;
}




//VizCoocurenceMatrix.prototype.draw = function( data, labels ) 
VizCoocurrenceMatrix.prototype.draw = function( data ) 
{
	

		this.svg.data(data);
		//document.write("before...")
		for(i=0; i<data.length; i++){
			for(j=0; j<data.length; j++){
				if(data[i][j] > 0 ) c = float2color(1- data[i][j]);
				else c=float2color(1)
				//document.write(data.length)
				this.svg.append("rect")
				.attr("x",1*j+40)
				.attr("y",1*i+40)
				.attr("width",5)
				.attr("height",5)
				.attr("fill", c );	
			}
		}


};

// how to use
// var _matrix = new VizCoocurrenceMatrix("PARAMETROS");
// _matrix.draw( ..., ... );