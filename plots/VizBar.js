function calcPolygonArea(vertices) {
    var total = 0;

    for (var i = 0, l = vertices.length; i < l; i++) {
      var addX = vertices[i].x;
      var addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
      var subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
      var subY = vertices[i].y;

      total += (addX * addY * 0.5);
      total -= (subX * subY * 0.5);
    }

    return Math.abs(total);
}


function PolygonArea(corners){
	n = corners.length
	area = 0.0
	for(var i = 0; i<n; i++){
		j = (i + 1) % n;
		area += corners[i][0] * corners[j][1];
		area -= corners[j][0] * corners[i][1];
	}
	area = abs(area) / 2.0
	return area
}





function VizBar(parent, divId )
{
	this.m_divId = divId;

	this.m_parent = parent;


}



VizBar.prototype.draw = function( params ) 
{

	

	var self = this;
	listWeight =  params['listWeight'];
	if(listWeight){
		var toAdd = document.createDocumentFragment();
		console.log(listWeight);
		while (self.m_divId.firstChild) {
    		self.m_divId.removeChild(self.m_divId.firstChild);
		}

		for(var i=0; i < listWeight.length; i++){
		   container_bar = document.createElement('div');
			container_bar.className = "barWrapper";

			span = document.createElement('span');
			span.className = "progressText";
			//var t = document.createTextNode(APPLICATION_DATA['modelContainers'][i].name);
			var t = document.createTextNode( APPLICATION_DATA['modelContainers'][i].name.substring(0, APPLICATION_DATA['modelContainers'][i].name.length-7 ) );
			bar = document.createElement('div');
			bar.className = "progress";
			bar.style.height = "15px";
			child = document.createElement('div');
			child.className = "progress-bar";
			child.setAttribute("role", "progressbar"); 
			child.setAttribute("aria-valuenow", listWeight[i]*100); 
			child.setAttribute("aria-valuemin", "0"); 
			child.setAttribute("aria-valuemax", "100"); 
			bar.appendChild(child);
			container_bar.appendChild(t);
			container_bar.appendChild(bar);



		   toAdd.appendChild(container_bar);
		}


		self.m_divId.appendChild(toAdd);


	}
	


	



	$(function () { 
  $('[data-toggle="tooltip"]').tooltip({trigger: 'manual'}).tooltip('show');
});  

// $( window ).scroll(function() {   
 // if($( window ).scrollTop() > 10){  // scroll down abit and get the action   
  $(".progress-bar").each(function(){
    each_bar_width = $(this).attr('aria-valuenow');
    $(this).width(each_bar_width + '%');
  });

}