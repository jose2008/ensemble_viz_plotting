// rectangu
function VizContainer( divContainer )
{
	// create sub containers
	this.m_divContainer = document.getElementById( divContainer );
	this.m_divScatter = document.createElement( 'div' );
	this.m_divScatter.style.width = "200px";
this.m_divScatter.style.height = "200px";
this.m_divScatter.style.background = "";
this.m_divScatter.style.display = "inline";
//display: inline
	this.m_divContainer.appendChild( this.m_divScatter );

	this.m_divMatrix= document.createElement( 'div' );
	this.m_divMatrix.style.width = "200px";
	this.m_divMatrix.style.height = "200px";
	this.m_divMatrix.style.background = "";
	this.m_divMatrix.style.display = "inline";


	this.m_divContainer.appendChild( this.m_divMatrix );


	this.m_vizScatter = new VizScatterPlot( this.m_divScatter );


	this.m_vizMatrix = new VizCoocurrenceMatrix( this.m_divMatrix );
	this.m_vizOptions = null;
};



VizContainer.prototype.draw = function(params) 
{
	var _dataScatter 	= params['dataScatter'];
	var _dataMatrix 	= params['dataMatrix'];
	var _dataOptions 	= params['dataOptions'];


	//this.m_vizScatter.draw(_dataScatter)
	this.m_vizMatrix.draw(_dataMatrix)
	this.m_vizScatter.draw(_dataScatter)


	// request or consume the data from django

	// draw child vizs                        



};