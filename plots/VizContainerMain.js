function VizContainerMain( divContainer, params )
{

	this.name = params['modelType'];
	this.m_divContainer = divContainer;

	this.fieldset= document.createElement('fieldset');
	this.legend = document.createElement('legend');
	var node = document.createTextNode(params['modelType']);
	this.legend.appendChild(node);	
	this.fieldset.appendChild(this.legend);
	//this.m_divContainer.appendChild(this.fieldset);


	this.conta = document.createElement('div');
	this.conta.className = "panel panel-default";
	this.header = document.createElement('div');
	this.header.className = "panel-heading";
	var node2 = document.createTextNode("Ensemble Model");
	this.header.appendChild(node2);
	this.bodyContainer = document.createElement('div');
	this.bodyContainer.className = "panel-body";
	this.conta.appendChild(this.header);
	this.conta.appendChild(this.bodyContainer);
	this.m_divContainer.appendChild(this.conta);


	this.m_divSelect = document.createElement('div');
	//this.fieldset.appendChild(this.m_divSelect);
	this.bodyContainer.appendChild(this.m_divSelect);


	this.m_divScatter = document.createElement( 'div' );
	this.m_divScatter.style.height = "250px";
	this.m_divScatter.style.background = "";
	this.m_divScatter.style.display = "inline";
	this.m_divScatter.className = "columna";
	//this.fieldset.appendChild(this.m_divScatter);
	this.bodyContainer.appendChild(this.m_divScatter);



	this.m_divBarChart = document.createElement('div');
	this.m_divBarChart.style.padding = "70px 0px 0px 40px";
	this.m_divBarChart.style.height = "250px";
	this.m_divBarChart.style.background = "";
	this.m_divBarChart.style.display = "inline";
	this.m_divBarChart.className = "columna";
	//this.fieldset.appendChild(this.m_divBarChart);
	this.bodyContainer.appendChild( this.m_divBarChart );


	this.m_divBar = document.createElement('div');
	this.m_divBar.style.padding = "0px 0px 0px 0px";
	this.m_divBar.id = "idBar";
	this.m_divBar.style.height = "250px";
	this.m_divBar.style.textAlign = "center";
	//this.m_divBar.style.width = "350px";
	this.m_divBar.style.background = "";
	this.m_divBar.style.display = "inline";
	this.m_divBar.className = "columna";
	//this.fieldset.appendChild(this.m_divBar);
	this.bodyContainer.appendChild(this.m_divBar);



	this.m_divMatrix= document.createElement( 'div' );
	this.m_divMatrix.style.padding = "0px 0px 0px 0px";
	this.m_divMatrix.style.textAlign = "center"; 
	//this.m_divMatrix.style.width = "200px";
	this.m_divMatrix.style.height = "250px";
	this.m_divMatrix.style.background = "";
	this.m_divMatrix.style.display = "inline";
	this.m_divMatrix.className = "columna";
	//this.fieldset.appendChild(this.m_divMatrix);
	//this.m_divContainer.appendChild( this.m_divMatrix );





	this.m_divMetric = document.createElement('div');
	this.m_divMetric.style.height = "250px";
	this.m_divMetric.style.background = "";
	this.m_divMetric.style.display = "inline";
	this.m_divMetric.className = "columna";
	//this.fieldset.appendChild(this.m_divMetric);








	this.m_divPolygon = document.createElement('div');
	this.m_divPolygon.id = "canvas";
	this.m_divPolygon.style.height = "450px";
	this.m_divPolygon.style.width = "400px";
	this.m_divPolygon.style.background = "";
	this.m_divPolygon.style.display = "inline";
	this.m_divPolygon.className = "columna";
	//this.fieldset.appendChild(this.m_divPolygon);
	this.bodyContainer.appendChild(this.m_divPolygon);




	this.m_divStreamGraph = document.createElement('div');
	this.m_divStreamGraph.id = "streamgraph";
	//this.m_divStreamGraph.style.position = "absolute";
	this.m_divStreamGraph.style.bottom =  "10px";
	this.m_divStreamGraph.style.height = "250px";
	this.m_divPolygon.style.width = "400px";
	this.m_divStreamGraph.style.background = "";
	//this.m_divStreamGraph.style.display = "inline";
	this.m_divStreamGraph.className = "columna";
	//this.fieldset.appendChild(this.m_divStreamGraph);
	this.bodyContainer.appendChild(this.m_divStreamGraph);



	this.m_vizSelect   = new VizComboBox( this, this.m_divSelect, {'modelType':params['modelType']} );

	this.m_vizScatter  = new VizScatterPlot( this.m_divScatter, {} );

	this.m_vizMatrix   = new VizCoocurrenceMatrix( this.m_divMatrix, {} );

	//this.m_vizMetric   = new VizMetric(this, this.m_divMetric, {'Table':params['Table']});

	this.m_vizBarchart = new VizBarChart(this.m_divBarChart, this.m_divMetric, this.name );

	this.m_vizPolygon  = new VizPolygon(this, this.m_divPolygon, this.name);

	this.m_vizBar      = new VizBar(this, this.m_divBar);

	this.m_vizStreamGraph = new VizStreamGraph(this, this.m_divStreamGraph, this.name);


	this.m_currentLabels = null;


	console.log( "creoooo" );



};

VizContainerMain.prototype.getVizScatter = function() 
{
    return this.m_vizScatter;
};

VizContainerMain.prototype.getVizMatrix = function() 
{
    return this.m_vizMatrix;
};

VizContainerMain.prototype.getVizCombo = function() 
{
    return this.m_vizSelect;
};

VizContainerMain.prototype.getVizMetric = function() 
{
	return this.m_vizMetric;
};


VizContainerMain.prototype.getVizBarChart = function(){
	return this.m_vizBarchart;
};


VizContainerMain.prototype.getVizPolygon = function()
{
	return this.m_vizPolygon;
};


VizContainerMain.prototype.getVizBar = function(){
	return this.m_vizBar;
}

VizContainerMain.prototype.getVizStreamGraph = function(){
	return this.m_vizStreamGraph;
};




VizContainerMain.prototype.setCurrentLabels = function(labels) 
{
    this.m_currentLabels = labels;
};

VizContainerMain.prototype.getCurrentLabels = function() 
{
    return this.m_currentLabels;
};


VizContainerMain.prototype.draw = function(params) 
{
	var _dataScatter 	 = params['dataScatter'];
	var _dataMatrix 	 = params['dataMatrix'];
	var _dataOption 	 = params['dataOption'];
	var _dataMetric      = params['dataMetric'];
	var _dataPolygon     = params['dataPolygon'];
	var _dataBar         = params['listWeight'];
	var _dataStreamGraph = params['nameFile'];

	var MOUNTAINS = [];	
	//this.m_vizScatter.draw(_dataScatter)
	//this.m_vizMatrix.draw(_dataMatrix)
	//this.m_vizScatter.draw(_dataScatter)
	//this.m_vizOption.draw(_dataOption)
	this.m_vizSelect.draw(_dataOption);
	//this.m_vizMetric.draw(MOUNTAINS)
	this.m_vizPolygon.draw(_dataPolygon);
	//this.m_vizBar.draw(params);
	//this.m_vizStreamGraph.draw(_dataStreamGraph);


	//this.m_divOption.draw(_dataOption)

	// request or consume the data from django

	// draw child vizs                        



};
