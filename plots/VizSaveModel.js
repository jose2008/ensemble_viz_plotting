function VizSaveModel(parent, divId, params, name )
{

	this.m_divId = divId;
	this.m_parent = parent;

	this.button =  document.createElement("input");
	//this.button.style.textAlign = "center";
	this.button.type = "button";
	//this.button.innerHTML = "Do Something";
	this.button.value = "Save";
	this.button.id = "button_id";

	//this.m_divId.appendChild(this.button);
}


VizSaveModel.prototype.draw = function( params ) 
{
	//params = ["uno", "dos", "tres"];
	
	params = [{"col1":"uno","col2":1 ,"col3":4, "col4":5}];

	var self = this;
	$("#idModalButton2").click(function(){

		self.m_parent.getVizHistorialTable().draw(params);


	});
}