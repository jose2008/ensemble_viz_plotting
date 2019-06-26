function VizContainer( divContainer, params )
{
	// create sub containers
	this.container_model = document.createElement('div');
	this.container_model.className = "panel panel-default ";
	this.container_model.style.padding = "0px 0px 00px 0px";
	this.container_model.style.width = "100%"; 
	//this.conta.style.margin = "50px"

	this.header = document.createElement('div');
	this.header.className = " panel-heading";
	this.header.id = "header" + params['modelType'];
	this.header.setAttribute("role","tab");
	this.header.style.background = "#7599bd";

	this.titleHeader = document.createElement('h4');
	this.titleHeader.className = "panel-title";


	this.node2 = document.createTextNode(params['modelType'].substring(0, params['modelType'].length-7));
	//var pp = document.createElement('p');

	this.image = document.createElement('i');
	this.image.id =  params['modelType']+"img";
	this.image.className = "more-less glyphicon glyphicon-minus";
	this.image.style.margin = "0px 5px 0px 5px";
	this.image.setAttribute('data-class', 'before'); 

	this.selectImage = document.createElement('a');
	this.selectImage.setAttribute('role', 'button');
	this.selectImage.className = "test2";
	this.selectImage.setAttribute('data-toggle', 'collapse');
	this.selectImage.setAttribute('data-parent', '#accordion');
	this.selectImage.setAttribute('href', '#collapseOne');
	this.selectImage.setAttribute('aria-expanded', 'true');
	this.selectImage.setAttribute('aria-controls', 'collapseOne');

	//this.image.appendChild(node2);
	
	this.selectImage.appendChild(this.image);
	this.selectImage.appendChild(this.node2);

	this.titleHeader.appendChild(this.selectImage);
	//this.titleHeader.appendChild(node2);
	this.header.appendChild(this.titleHeader);

	this.bod = document.createElement('div');
	this.bod.className = "panel-body ";
	this.bod.style.padding = "0px 0px 0px 0px";
	this.bod.style.textAlign = "center";
	this.bod.style.width = "100%"; 
	this.bod.style.height = "100%"; 

	this.container_model.appendChild(this.header);
	this.container_model.appendChild(this.bod);

	this.m_divContainerColumn = document.createElement('div');
	this.m_divContainerColumn.className = "column3_polygon"
	//this.m_divContainerColumn.style.height = "250px";

	this.name = params['modelType'];
	this.m_divContainer = divContainer;
	this.m_divContainer.className = "column3_polygon bd-example-container-body";
	this.m_divContainer.style.padding = "8px 10px 0px 10px";
	//this.m_divContainer.style.width = "100%"; 
	this.m_divContainer.style.height = "100%"; 

	this.m_divContainer.appendChild(this.container_model);

	/*this.m_divMatrix= document.createElement( 'div' );
	this.m_divMatrix.style.padding = "0px 0px 0px 0px";
	this.m_divMatrix.style.textAlign = "center"; 
	this.m_divMatrix.style.background = "";
	this.m_divMatrix.style.display = "inline";
	this.m_divMetric = document.createElement('div');
	this.m_divMetric.style.width = "100px";
	this.m_divMetric.style.height = "150px";
	this.m_divMetric.style.background = "";
	this.m_divMetric.className = "columna";
	this.m_divMetric.style.padding = "0px 0px 0px 20px";
	*/


	this.divColumn = document.createElement( 'div' );
	this.divColumn.style.height = "300px";
	this.divColumn.style.background = "";
	this.divColumn.style.display = "inline";
	this.divColumn.id = params['modelType']+"bar";
	this.divColumn.className = "row2_component";

	this.m_divScatter = document.createElement( 'div' );
	this.m_divScatter.style.padding = "10px 0px 5px 0px";
	//this.m_divScatter.style.width = "200px";
	//this.m_divScatter.style.height = "250px";
	this.m_divScatter.style.background = "";
	this.m_divScatter.style.display = "block";
	this.m_divScatter.style.textAlign= "center";
	//this.m_divScatter.className = "column2_component";


	this.m_divOption= document.createElement( 'div' );
	this.m_divOption.style.padding = "15px 12px 0px 10px";
	//this.m_divOption.style.width = "180px";
	this.m_divOption.style.height = "200px";
	this.m_divOption.style.background = "";
	this.m_divOption.className = "column2_component_option_1";
		

	this.m_divBarChart = document.createElement('div');
	this.m_divBarChart.style.padding = "15px 10px 0px 0px";
	//this.m_divBarChart.style.width ="200px";
	this.m_divBarChart.style.height = "130px";
	
	this.m_divBarChart.style.background = "";
	//this.m_divBarChart.style.display= "inline-block";
	this.m_divBarChart.className = "column2_component_option_2";

	this.divColumn.appendChild(this.m_divOption);
	this.divColumn.appendChild(this.m_divBarChart);


	this.bod.appendChild(this.m_divScatter);
	//this.bod.appendChild(this.m_divOption);
	//this.bod.appendChild(this.m_divBarChart);
	this.bod.appendChild(this.divColumn);

	this.m_vizScatter = new VizScatterPlot( this.m_divScatter, {} );
	//this.m_vizMatrix = new VizCoocurrenceMatrix( this.m_divMatrix, {} );
	this.m_vizOption = new VizOptions(this, this.m_divOption, {'modelType':params['modelType']}, this.name);
	//this.m_vizOptions = null;
	//this.m_vizMetric = new VizMetric(this, this.m_divMetric, {'Table':params['Table']});
	this.m_vizBarchart = new VizBarChart(this.m_divBarChart, this.m_divMetric, this.name );
	this.m_currentLabels = null;
	this.m_currentMetrics = null;
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