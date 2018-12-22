function VizContainerMain( divContainer, params )
{
	// create sub containers

	document.write(divContainer);
	this.m_divContainer = divContainer;

	this.fieldset= document.createElement('fieldset');
	this.legend = document.createElement('legend');
	//this.legend.text = "dddss";
	var node = document.createTextNode(params['modelType']);
	this.legend.appendChild(node);	

	//var this.x = document.createElement("LEGEND");
	//var t = document.createTextNode("Personalia:");
	//this.x.appendChild(t);

	this.fieldset.appendChild(this.legend);

	//<legend style="color:blue;font-weight:bold;">General Information</legend>


	this.m_divContainer.appendChild(this.fieldset);



	this.m_divScatter = document.createElement( 'div' );
	//this.m_divScatter.style.padding = "5px 1px 2px 3px";
	//this.m_divScatter.style.width = "200px";
	this.m_divScatter.style.height = "250px";
	this.m_divScatter.style.background = "";
	this.m_divScatter.style.display = "inline";
	this.m_divScatter.className = "columna";
	
	//this.m_divScatter.appendChild(this.fieldset);
//display: inline
	this.fieldset.appendChild(this.m_divScatter);
	//this.m_divContainer.appendChild( this.m_divScatter );

	
	this.m_divMatrix= document.createElement( 'div' );
	this.m_divMatrix.style.padding = "0px 0px 0px 0px";
	this.m_divMatrix.style.textAlign = "center"; 
	//this.m_divMatrix.style.width = "200px";
	this.m_divMatrix.style.height = "250px";
	this.m_divMatrix.style.background = "";
	this.m_divMatrix.style.display = "inline";
	this.m_divMatrix.className = "columna";
	this.fieldset.appendChild(this.m_divMatrix);
	//this.m_divContainer.appendChild( this.m_divMatrix );


	this.m_divOption= document.createElement( 'div' );
	//this.m_divOption.style.padding = "5px 1px 2px 3px";
	//this.m_divOption.style.width = "200px";
	this.m_divOption.style.height = "250px";
	this.m_divOption.style.background = "";
	this.m_divOption.style.display = "inline";
	this.m_divOption.className = "columna ";
	this.fieldset.appendChild(this.m_divOption);
	//this.m_divContainer.appendChild( this.m_divOption );

	this.m_divMetric = document.createElement('div');
	//this.m_divMetric.style.padding = "5px 1px 2px 3px";
	//this.m_divMetric.style.width = "200px";
	this.m_divMetric.style.height = "250px";
	this.m_divMetric.style.background = "";
	this.m_divMetric.style.display = "inline";
	this.m_divMetric.className = "columna";
	this.fieldset.appendChild(this.m_divMetric);
	//this.m_divContainer.appendChild( this.m_divMetric );

	//console.log("ensambleeeeeeeeeee");
	//console.log(APPLICATION_DATA['modelContainers'][0].getCurrentLabels());



	this.m_vizScatter = new VizScatterPlot( this.m_divScatter, {} );

	this.m_vizMatrix = new VizCoocurrenceMatrix( this.m_divMatrix, {} );

	//this.m_divOption = new VizOptions(this.m_divOption, params);
	this.m_vizOption = new VizOptions(this, this.m_divOption, {'modelType':params['modelType']});
	//this.m_vizOptions = null;

	this.m_vizMetric = new VizMetric(this, this.m_divMetric, {'Table':params['Table']});


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

VizContainerMain.prototype.getVizMetric = function() 
{
    return this.m_vizMetric;
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
	var _dataScatter 	= params['dataScatter'];
	var _dataMatrix 	= params['dataMatrix'];
	var _dataOption 	= params['dataOption'];
	var _dataMetric     = params['dataMetric'];


	var MOUNTAINS = [];	
	//this.m_vizScatter.draw(_dataScatter)
	this.m_vizMatrix.draw(_dataMatrix)
	this.m_vizScatter.draw(_dataScatter)
	this.m_vizOption.draw(_dataOption)
	this.m_vizMetric.draw(MOUNTAINS)

	//this.m_divOption.draw(_dataOption)

	// request or consume the data from django

	// draw child vizs                        



};
