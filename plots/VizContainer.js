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


	this.m_divOption= document.createElement( 'div' );
	this.m_divOption.style.width = "200px";
	this.m_divOption.style.height = "200px";
	this.m_divOption.style.background = "";
	this.m_divOption.style.display = "inline";
	this.m_divContainer.appendChild( this.m_divOption );



	this.m_vizScatter = new VizScatterPlot( this.m_divScatter, {} );

	this.m_vizMatrix = new VizCoocurrenceMatrix( this.m_divMatrix, {} );

	//this.m_divOption = new VizOptions(this.m_divOption, params);
	this.m_vizOption = new VizOptions(this, this.m_divOption, {'foo':123});
	//this.m_vizOptions = null;

};

VizContainer.prototype.getVizScatter = function() 
{
    return this.m_vizScatter;
};

VizContainer.prototype.getVizMatrix = function() 
{
    return this.m_vizMatrix;
};

VizContainer.prototype.draw = function(params) 
{
	var _dataScatter 	= params['dataScatter'];
	var _dataMatrix 	= params['dataMatrix'];
	var _dataOption 	= params['dataOption'];


	//this.m_vizScatter.draw(_dataScatter)
	this.m_vizMatrix.draw(_dataMatrix)
	this.m_vizScatter.draw(_dataScatter)
	this.m_vizOption.draw(_dataOption)
	//this.m_divOption.draw(_dataOption)

	// request or consume the data from django

	// draw child vizs                        



};
