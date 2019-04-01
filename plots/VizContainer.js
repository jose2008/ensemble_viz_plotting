function VizContainer( divContainer, params )
{
	// create sub containers


	this.conta = document.createElement('div');
	this.conta.className = "panel panel-default ";
	this.conta.style.padding = "0px 0px 00px 0px";
	//this.conta.style.margin = "50px"


	this.header = document.createElement('div');
	this.header.className = " panel-heading";
	var node2 = document.createTextNode(params['modelType'].substring(0, params['modelType'].length-7));
	this.header.appendChild(node2);
	this.bod = document.createElement('div');
	this.bod.className = "panel-body ";
	//var node3 = document.createTextNode("nombre de modelo");
	//this.bod.appendChild(node3);
	this.conta.appendChild(this.header);
	this.conta.appendChild(this.bod);

	this.name = params['modelType'];
	console.log("---------------------------------------------------------->>>>>");
	console.log(this.name);
	this.m_divContainer = divContainer;
	this.m_divContainer.className = "column2 bd-example-container-body";

	this.fieldset= document.createElement('fieldset');
	this.fieldset.className = "fieldset-class";
	this.legend = document.createElement('legend');

	//this.legend.text = "dddss";
	var node = document.createTextNode(params['modelType']);
	this.legend.appendChild(node);	
	//var this.x = document.createElement("LEGEND");
	//var t = document.createTextNode("Personalia:");
	//this.x.appendChild(t);

	this.fieldset.appendChild(this.legend);

	//<legend style="color:blue;font-weight:bold;">General Information</legend>


	this.m_divContainer.appendChild(this.conta);
	//this.m_divContainer.appendChild(this.fieldset);



	



	this.m_divScatter = document.createElement( 'div' );
	//this.m_divScatter.style.padding = "5px 1px 2px 3px";
	//this.m_divScatter.style.width = "200px";
	this.m_divScatter.style.height = "250px";
	this.m_divScatter.style.background = "";
	this.m_divScatter.style.display = "block";
	this.m_divScatter.style.textAlign= "center";
	//this.m_divScatter.className = "columna";
	
	//this.m_divScatter.appendChild(this.fieldset);
//display: inline

	this.fieldsetScatter = document.createElement( 'fieldset' );
	this.fieldsetScatter.className = "fieldset-class";
	this.legend2 = document.createElement('legend');
	var node3    = document.createTextNode("scatter plot");
	this.legend2.appendChild(node3);	
	this.fieldsetScatter.appendChild(this.legend2);
	this.fieldsetScatter.appendChild(this.m_divScatter);
	//this.bod.appendChild(this.fieldsetScatter);



	//this.fieldset.appendChild(this.m_divScatter);
	this.bod.appendChild(this.m_divScatter);
	//this.m_divContainer.appendChild( this.m_divScatter );

	this.m_divMatrix= document.createElement( 'div' );
	this.m_divMatrix.style.padding = "0px 0px 0px 0px";
	this.m_divMatrix.style.textAlign = "center"; 
	//this.m_divMatrix.style.width = "200px";
	this.m_divMatrix.style.height = "250px";
	this.m_divMatrix.style.background = "";
	this.m_divMatrix.style.display = "inline";
	//this.m_divMatrix.className = "columna";
	//this.fieldset.appendChild(this.m_divMatrix);
	//this.m_divContainer.appendChild( this.m_divMatrix );


	this.divColumn = document.createElement( 'div' );
	this.divColumn.style.height = "250px";
	this.divColumn.style.background = "";
	this.divColumn.style.display = "inline";
	this.divColumn.className = "row";


	this.m_divOption= document.createElement( 'div' );
	this.m_divOption.style.padding = "45px 12px 22px 62px";
	this.m_divOption.style.width = "180px";
	this.m_divOption.style.height = "150px";
	this.m_divOption.style.background = "";
	//this.m_divOption.style.display = "inline";
	this.m_divOption.className = "columna";
	//this.fieldset.appendChild(this.m_divOption);
	this.divColumn.appendChild(this.m_divOption);
	//this.m_divContainer.appendChild( this.m_divOption );
	


	this.m_divMetric = document.createElement('div');
	//this.m_divMetric.style.padding = "5px 1px 2px 3px";
	this.m_divMetric.style.width = "100px";
	this.m_divMetric.style.height = "150px";
	this.m_divMetric.style.background = "";
	//this.m_divMetric.style.display = "inline";
	this.m_divMetric.className = "columna";
	this.m_divMetric.style.padding = "0px 0px 0px 20px";
	//this.divColumn.appendChild(this.m_divMetric);
	


	this.m_divBarChart = document.createElement('div');
	this.m_divBarChart.style.padding = "0px 0px 0px 20px";
	this.m_divBarChart.style.width ="200px";
	this.m_divBarChart.style.height = "150px";
	
	this.m_divBarChart.id = "IDbarchar";
	this.m_divBarChart.style.background = "";
	this.m_divBarChart.className = "columna";
	this.divColumn.appendChild(this.m_divBarChart);


	//this.fieldset.appendChild(this.divColumn);
	this.bod.appendChild(this.divColumn);
	//this.fieldset.appendChild(this.m_divMetric);

	//this.m_divContainer.appendChild( this.m_divMetric );
	//document.write(divContainer);






	this.m_vizScatter = new VizScatterPlot( this.m_divScatter, {} );
	this.m_vizMatrix = new VizCoocurrenceMatrix( this.m_divMatrix, {} );

	//this.m_divOption = new VizOptions(this.m_divOption, params);
	this.m_vizOption = new VizOptions(this, this.m_divOption, {'modelType':params['modelType']}, this.name);
	//this.m_vizOptions = null;

	this.m_vizMetric = new VizMetric(this, this.m_divMetric, {'Table':params['Table']});


	this.m_vizBarchart = new VizBarChart(this.m_divBarChart, this.m_divMetric, this.name );

	this.m_currentLabels = null;

	this.m_currentMetrics = null;



	//console.log( "creoooo" );



};

VizContainer.prototype.getVizScatter = function() 
{
    return this.m_vizScatter;
};

VizContainer.prototype.getVizMatrix = function() 
{
    return this.m_vizMatrix;
};

VizContainer.prototype.getVizMetric = function() 
{
    return this.m_vizMetric;
};


VizContainer.prototype.getVizBarChart = function(){
	return this.m_vizBarchart;
}


VizContainer.prototype.setCurrentBartChart = function(metrics){
	return this.m_currentMetrics = metrics;
}



VizContainer.prototype.setCurrentMetric = function(metrics) 
{
    return this.m_currentMetrics = metrics;
};

VizContainer.prototype.getCurrentMetrics = function() 
{
    return this.m_currentMetrics;
};



VizContainer.prototype.setCurrentLabels = function(labels) 
{
    this.m_currentLabels = labels;
};

VizContainer.prototype.getCurrentLabels = function() 
{
    return this.m_currentLabels;
};


VizContainer.prototype.draw = function(params) 
{
	var _dataScatter 	= params['dataScatter'];
	var _dataMatrix 	= params['dataMatrix'];
	var _dataOption 	= params['dataOption'];
	var _dataMetric     = params['dataMetric'];


	var MOUNTAINS = [];	
	//this.m_vizScatter.draw(_dataScatter)
	//this.m_vizMatrix.draw(_dataMatrix)
	//this.m_vizScatter.draw(_dataScatter)
	this.m_vizOption.draw(_dataOption)

	//this.m_vizMetric.draw(MOUNTAINS)

	//this.m_divOption.draw(_dataOption)

	// request or consume the data from django

	// draw child vizs                        



};
