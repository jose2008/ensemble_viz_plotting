function VizContainerMain( divContainer, params )
{
	this.name = params['modelType'];
	this.m_divContainer = divContainer;



	this.conta = document.createElement('div');
	this.conta.className = "panel panel-default";
	this.header = document.createElement('div');
	this.header.className = "panel-heading";
	//var node2 = document.createTextNode("Ensemble Model");
	//this.header.appendChild(node2);
	this.bodyContainer = document.createElement('div');
	this.bodyContainer.className = "panel-body";
	this.conta.appendChild(this.header);
	this.conta.appendChild(this.bodyContainer);
	this.m_divContainer.appendChild(this.conta);


	this.m_divSelect = document.createElement('div');
	this.bodyContainer.appendChild(this.m_divSelect);


	this.m_divSaveModel = document.createElement('div');
	this.bodyContainer.appendChild(this.m_divSaveModel);



	this.m_divContainer_first_row = document.createElement('div');
	this.m_divContainer_first_row.className = "row3_polygon"


	this.m_divScatter = document.createElement( 'div' );
	this.m_divScatter.style.height = "250px";
	this.m_divScatter.style.background = "";
	this.m_divScatter.style.display = "inline";
	this.m_divScatter.className = "column3_polygon";
	//this.bodyContainer.appendChild(this.m_divScatter);



	this.m_divBarChart = document.createElement('div');
	this.m_divBarChart.style.padding = "70px 0px 0px 40px";
	this.m_divBarChart.style.height = "250px";
	this.m_divBarChart.style.background = "";
	this.m_divBarChart.style.display = "inline";
	this.m_divBarChart.className = "column3_polygon";
	this.m_divBarChart.id = "rightPanel";
	//this.bodyContainer.appendChild( this.m_divBarChart );


	this.m_divBar = document.createElement('div');
	this.m_divBar.style.padding = "0px 0px 0px 0px";
	this.m_divBar.id = "idBar";
	this.m_divBar.style="overflow-y: scroll;"
	//this.m_divBar.style = "overflow-y: scroll;";
	this.m_divBar.style.height = "250px";
	this.m_divBar.style.textAlign = "center";
	//this.m_divBar.style.width = "350px";
	this.m_divBar.style.background = "";
	this.m_divBar.style.display = "inline";
	this.m_divBar.className = "column3_polygon";

	this.m_divContainer_first_row.appendChild(this.m_divScatter);
	this.m_divContainer_first_row.appendChild(this.m_divBarChart);
	this.m_divContainer_first_row.appendChild(this.m_divBar);
	this.bodyContainer.appendChild(this.m_divContainer_first_row);
	//this.bodyContainer.appendChild(this.m_divBar);



	this.m_divMatrix= document.createElement( 'div' );
	this.m_divMatrix.style.padding = "0px 0px 0px 0px";
	this.m_divMatrix.style.textAlign = "center"; 
	this.m_divMatrix.style.height = "250px";
	this.m_divMatrix.style.background = "";
	this.m_divMatrix.style.display = "inline";
	this.m_divMatrix.className = "columna";
	//this.m_divContainer.appendChild( this.m_divMatrix );


	this.m_divMetric = document.createElement('div');
	this.m_divMetric.style.height = "250px";
	this.m_divMetric.style.background = "";
	this.m_divMetric.style.display = "inline";
	this.m_divMetric.className = "columna";


	this.m_divContainerPolygons = document.createElement('div');
	this.m_divContainerPolygons.className = "row3_polygon"
	this.m_divContainerPolygons.style.height = "250px";


	this.m_divPolygon = document.createElement('div');
	this.m_divPolygon.id = "tcanvas";
	this.m_divPolygon.style.background = "";
	this.m_divPolygon.className = "column3_polygon";

	this.m_divPolygon2 = document.createElement('div');
	this.m_divPolygon2.id = "tcanvas2";
	this.m_divPolygon2.style.background = "";
	this.m_divPolygon2.className = "column3_polygon";

	this.m_divPolygon3 = document.createElement('div');
	this.m_divPolygon3.id = "tcanvas3";
	this.m_divPolygon3.style.background = "";
	this.m_divPolygon3.className = "column3_polygon";



	this.m_divContainerPolygons.appendChild(this.m_divPolygon);
	this.m_divContainerPolygons.appendChild(this.m_divPolygon2);
	this.m_divContainerPolygons.appendChild(this.m_divPolygon3);


	this.divHeader_polygon =  document.createElement("div");
	this.headerPolygon = document.createElement("header");
	this.headerPolygon.className = "headerComparation";
	this.node = document.createTextNode("Metrics");
	this.headerPolygon.appendChild(this.node);

	this.divHeader_polygon.appendChild(this.headerPolygon);


	this.bodyContainer.appendChild(this.divHeader_polygon);
	this.bodyContainer.appendChild(this.m_divContainerPolygons);


	this.divRowMethod = document.createElement( 'div' );
	this.divRowMethod.style.height = "300px";
	this.divRowMethod.style.background = "";
	this.divRowMethod.style.display = "inline";
	this.divRowMethod.id = params['modelType']+"barss";
	this.divRowMethod.className = "row3_polygon";


	this.m_divComparationMethods = document.createElement( 'div' );
	this.m_divComparationMethods.style.background = "";
	this.m_divComparationMethods.id="IDcomparationMethod";
	this.m_divComparationMethods.className = "column2_save_ensamble_1";

	this.m_divSaveEnsamble = document.createElement( 'div' );
	this.m_divSaveEnsamble.style.background = "";
	this.m_divSaveEnsamble.className = "column2_save_ensamble_2";


	this.m_divButton= document.createElement( 'div' );
	this.m_divButton.style.padding = "15px 12px 0px 10px";
	//this.m_divOption.style.width = "180px";
	this.m_divButton.style.height = "50px";
	this.m_divButton.style.background = "";
	this.m_divButton.className = "row2_modal";
	//this.m_divButton = document.createElement( 'div' );
	//this.m_divButton.style.display = "inline";
	//this.m_divButton.style.textAlign = "center";

	this.m_divButtonRow1= document.createElement( 'div' );
	this.m_divButtonRow1.className = "column2_modal";
	this.m_divButtonRow1.style.height = "50px";
	this.button =  document.createElement("input");
	this.button.type = "button";
	//this.button.style.width = "120px";
	this.button.id = "idModalButton";
	this.button.className = "btn btn-primary btn-block";
	this.button.setAttribute("data-toggle", "modal");
	this.button.setAttribute("data-target", "#largeModal");//basicModal//miModal
	//this.button.innerHTML = "Do Something";
	this.button.value = "Compare";
	this.m_divButtonRow1.appendChild(this.button);
	//this.m_divButton.appendChild(this.button);


	this.m_divButtonRow2= document.createElement( 'div' );
	this.m_divButtonRow2.className = "column2_modal";
	this.m_divButtonRow2.style.height = "50px";
	this.button2 =  document.createElement("input");
	this.button2.type = "button";
	//this.button2.style.width = "120px";
	this.button2.id = "idModalButton2";
	this.button2.className = "btn btn-primary btn-block";
	this.button2.setAttribute("data-toggle", "modal");
	//autocomplete="off"
	//this.button2.setAttribute("autocomplete", "on");
	//this.button2.setAttribute("data-target", "#largeModal");//basicModal//miModal
	this.button2.value = "Save";
	//this.m_divButton.appendChild(this.button2);
	this.m_divButtonRow2.appendChild(this.button2);





	
	this.m_divButton.appendChild(this.m_divButtonRow2);
	this.m_divButton.appendChild(this.m_divButtonRow1);

	this.m_tableModels = document.createElement( 'table' );
	this.m_tableModels.className = "table table-striped gridtable2";
	this.m_tableModels.id = "idTablaModel";
	var thead = document.createElement("thead");
	this.tbodyTable = document.createElement("tbody");
	var th=document.createElement("th");
	//th.appendChild("jose","jose");
	var headRow = document.createElement("tr");
	var th1=document.createElement("th")
	headRow.appendChild(th1);
    ["E","Method","#Model", "Silh.","SSE","SSB"].forEach(function(el) {
      var th=document.createElement("th");
      th.appendChild(document.createTextNode(el));
      headRow.appendChild(th);
    });
	thead.appendChild(headRow)
	this.m_tableModels.appendChild(thead);
	this.m_tableModels.appendChild(this.tbodyTable);

	this.m_divHistorialTable = document.createElement( 'div' );
	this.m_divHistorialTable.style.height = "100px";
	this.m_divHistorialTable.appendChild(this.m_tableModels);

	this.m_divSaveEnsamble.appendChild(this.m_divButton);
	//this.m_divSaveEnsamble.appendChild(this.m_tableModels);
	this.m_divSaveEnsamble.appendChild( this.m_divHistorialTable );

	this.divHeader =  document.createElement("div");
	this.divHeader.className = "row_header";

	this.divNode1 = document.createElement('div');
	this.divNode1.className  = "column_header";
	//this.divNode1.style.width = "350px";

	this.divNode2 = document.createElement('div');
	this.divNode2.className = "column_header2";
	//this.divNode2.style.width = "350px";

	this.headerComparation = document.createElement("header");
	//this.headerComparation.style.height = "20px";
	this.headerComparation.className = "headerComparation";
	this.node2 = document.createTextNode("Global Comparison Clustering Method");
	this.headerComparation.appendChild(this.node2);
	//this.divRowMethod.appendChild(this.headerComparation);

	this.headerComparation2 = document.createElement("header");
	//this.headerComparation.style.height = "20px";
	this.headerComparation2.className = "headerComparation2";
	this.node3 = document.createTextNode("Performance Ensemble");
	this.headerComparation2.appendChild(this.node3);


	this.divNode1.appendChild(this.headerComparation);
	this.divNode2.appendChild(this.headerComparation2);

	//this.divHeader.appendChild(this.headerComparation);
	this.divHeader.appendChild(this.divNode1);
	this.divHeader.appendChild(this.divNode2);
	this.divRowMethod.appendChild(this.divHeader);
	this.divRowMethod.appendChild(this.m_divComparationMethods);
	this.divRowMethod.appendChild(this.m_divSaveEnsamble);

	this.bodyContainer.appendChild(this.divRowMethod);

	//this.bodyContainer.appendChild(this.m_divComparationMethods);




	this.bodyContainer.style.background = "";
	this.bodyContainer.className = "row3_polygon";


	this.m_divStreamGraph = document.createElement('div');
	this.m_divStreamGraph.id = "streamgraph";
	//this.m_divStreamGraph.style.position = "absolute";
	this.m_divStreamGraph.style.bottom =  "10px";
	this.m_divStreamGraph.style.height = "250px";
	//this.m_divPolygon.style.width = "400px";
	this.m_divStreamGraph.style.background = "";
	//this.m_divStreamGraph.style.display = "inline";
	this.m_divStreamGraph.className = "columna";



	this.m_vizSelect   = new VizComboBox( this, this.m_divSelect, {'modelType':params['modelType']}, this.name );
	this.m_vizSaveModel   = new VizSaveModel( this, this.m_divSaveModel, {'modelType':params['modelType']}, this.name );
	this.m_vizHistorialTable   = new VizHistorialTable( this, this.m_divSaveEnsamble, {'modelType':params['modelType']}, this.name , this.tbodyTable);

	this.m_vizModal = new VizModal( this, this.m_divSelect, {'modelType':params['modelType']}, this.name );

	this.m_vizScatter  = new VizScatterPlot( this.m_divScatter, {} );

	this.m_vizMatrix   = new VizCoocurrenceMatrix( this.m_divMatrix, {} );

	this.m_vizBarchart = new VizBarChart(this.m_divBarChart, this.m_divMetric, this.name );

	//this.m_vizPolygon  = new VizPolygon(this, this.m_divPolygon, this.name);
	this.m_vizPolygon  = new VizPolygon(this, this.m_divPolygon, this.m_divPolygon2, this.m_divPolygon3, this.name);

	this.m_vizComparationMethods = new VizComparationMethods(this, this.m_divComparationMethods, {} );

	this.m_vizBar      = new VizBar(this, this.m_divBar);

	this.m_vizStreamGraph = new VizStreamGraph(this, this.m_divStreamGraph, this.name);

	this.m_currentLabels = null;

};


VizContainerMain.prototype.getVizScatter = function() 
{
    return this.m_vizScatter;
};

VizContainerMain.prototype.getVizComparationMethods = function() 
{
    return this.m_vizComparationMethods;
};



VizContainerMain.prototype.getVizHistorialTable = function() 
{
    return this.m_vizHistorialTable;
};



VizContainerMain.prototype.getVizMatrix = function() 
{
    return this.m_vizMatrix;
};

VizContainerMain.prototype.getVizComboBox = function() 
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
	this.m_vizSaveModel.draw(_dataOption);

	this.m_vizModal.draw(_dataOption);
	this.m_vizComparationMethods.draw(null);
	//this.m_vizPolygon.draw(_dataPolygon);
	//this.m_vizBar.draw(params);
	//this.m_vizStreamGraph.draw(_dataStreamGraph);


	//this.m_divOption.draw(_dataOption)

	// request or consume the data from django

	// draw child vizs                        



};
