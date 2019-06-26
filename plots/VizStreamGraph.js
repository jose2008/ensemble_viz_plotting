function VizStreamGraph( parent, divId, name )
{
	this.m_divId = divId;
	this.m_parent = parent;
	this.m_name = name;
}



VizStreamGraph.prototype.draw = function(data2)
{




	var self = this;

	m_divSVG = document.createElement('div');
	//this.m_divSVG.style.width ="200px";
	//this.m_divSVG.style.height = "150px";
	var id = "IDDivStream";
	//console.log(id);
	m_divSVG.id = id;
	m_divSVG.style.background = "";
	m_divSVG.className = "columna";
	m_divSVG.style.padding = "0px";
	this.m_divId.appendChild(m_divSVG);

	//var data = [ {"key":"m1","date":1,"value":"6860.0","point":0},{"key":"m2","date":1,"value":"5167.0","point":0},{"key":"m1","date":2,"value":"6860.0","point":0},{"key":"m2","date":2,"value":"5167.0","point":0}]
	var data = [];
	for(var i=0; i<	APPLICATION_DATA['points'].length;i++){
		//console.log("put data");
		data.push({"key":"silhouette","date":i, "value":APPLICATION_DATA["metrics"][i][0]});
		data.push({"key":"SSE","date":i, "value":APPLICATION_DATA["metrics"][i][1]});
		data.push({"key":"SSB","date":i, "value":APPLICATION_DATA["metrics"][i][2]});
	}


var color = "orange";
var colorrange = [];

//var data = [ {"key":"m1","date":1,"value":"6860.0","point":2},{"key":"m1","date":2,"value":"5167.0","point":2},{"key":"m1","date":3,"value":"4763.0","point":2},{"key":"m2","date":1,"value":"5467.0","point":2},{"key":"m2","date":2,"value":"4663.0","point":2},{"key":"m2","date":3,"value":"352.0","point":2}  ]
if (color == "blue") {
  colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
}
else if (color == "pink") {
  colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
}
else if (color == "orange") {
  colorrange = ["#FF0000", "#00FF00", "#0000FF", "#FDBB84", "#FDD49E", "#FEF0D9"];
}
strokecolor = colorrange[0];

var margin = {top: 20, right: 40, bottom: 30, left: 30};
var width =  500 - margin.left - margin.right;  //document.body.clientWidth - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

var tooltip = d3.select("body")
    .append("div")
    .attr("class", "remove")
    .style("position", "absolute")
    .style("z-index", "20")
    .style("visibility", "hidden")
    .style("top", "30px")
    .style("left", "55px");

var x = d3.scale.linear()
    .range([width-10, 0]);

var y = d3.scale.linear()
    .range([height-10, 0]);

var z = d3.scale.ordinal()
    .range(colorrange);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(d3.time.weeks);

var yAxis = d3.svg.axis()
    .scale(y);

var stack = d3.layout.stack()
    .offset("silhouette")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

var nest = d3.nest()
    .key(function(d) { return d.key; });

var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svg = d3.select(m_divSVG).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function(d) {
        d.date = (d.date);
    d.value = +d.value;
        });

  var layers = stack(nest.entries(data));
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

  svg.selectAll(".layer")
      .data(layers)
    .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i); });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ", 0)")
      .call(yAxis.orient("right"));

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis.orient("left"));

  svg.selectAll(".layer")
    .attr("opacity", 1)
    .on("mouseover", function(d, i) {
      svg.selectAll(".layer").transition()
      .duration(250)
      .attr("opacity", function(d, j) {
        return j != i ? 0.6 : 1;
    })})

    .on("mousemove", function(d, i) {
      mousex = d3.mouse(this);
      mousex = mousex[0];
      var invertedx = x.invert(mousex);
      var selected = (d.values);
      pro = d.values[Math.floor(invertedx)].value;

      d3.select(this)
      .classed("hover", true)
      .attr("stroke", strokecolor)
      .attr("stroke-width", "0.5px"), 
      tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "visible").style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d, i) {
     svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "1");
      d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
  })
    
    .on("click", function(d, i) {
      var invertedx = x.invert(mousex);
     svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "1");
      d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
      console.log("valor................................................ to print");
      console.log(d.values[Math.floor(invertedx)].date);
      var index = d.values[Math.floor(invertedx)].date;
      console.log(pro);


      var myListOfArrays = []; 
      	for ( var i = 0; i < APPLICATION_DATA['modelContainers'].length; i++ )
			{
				l  = APPLICATION_DATA['modelContainers'][i].getCurrentLabels();
				myListOfArrays = myListOfArrays.concat(l);
		};
		var listPoints = [];

		console.log("vertex");
		console.log(APPLICATION_DATA['vertex']);
		//listPoints = APPLICATION_DATA['vertex'];
		console.log("antes----------------------------------------");
		for(var k=0; k<APPLICATION_DATA['vertex'].length; k++){
			listPoints.push(APPLICATION_DATA['vertex'][k]);
		}
		console.log("despuessssssssssssssssssssssssssssssss");

		listPoints.push(APPLICATION_DATA['points'][index][0]);
		listPoints.push(APPLICATION_DATA['points'][index][1]);

		var nameEnsemble = $("#idSelect").val(); 
  		method = "";
		if(nameEnsemble.localeCompare("Voting") == 0){
			method = '/views/majority_vote';
		}
		if(nameEnsemble.localeCompare("CSPA") == 0){
			method = '/views/ensamble_model';
		}

      $.ajax({
					type:"POST",
				    url: method,
				    data: {
		          	"username": myListOfArrays,
		          	"points": listPoints,
		          	"metrics": [],
		          	"numbers_model" : APPLICATION_DATA['modelContainers'].length,
		        	},
				    success: function(data) {
				    	data = JSON.parse(data);
				        self.m_parent.getVizScatter().draw( data["val1"] );
				        console.log("VizPolygon--------------------------------------------------------1");
	  					console.log(data["listWeight"]);
	  					console.log(listPoints);
				        self.m_parent.getVizBar().draw({"listWeight":data["listWeight"]});
				        var id = "IDbarcharSVG".concat(self.m_name);
				        if(document.getElementById(id)) document.getElementById(id).outerHTML = "";
				        self.m_parent.getVizBarChart().draw( [{"metrica":"silhouette","valor":data['val3']},
  														{"metrica":"SSE","valor":data['val4']},
  														{"metrica":"SSB","valor":data['val5']}] );
				        console.log("areas.............................")
				        console.log(data["listWeight"]);
				        self.m_parent.setCurrentLabels(data["list_labels"]);
				        self.m_parent.getVizPolygon().draw( {"new_x":APPLICATION_DATA['points'][index][0],"new_y":APPLICATION_DATA['points'][index][1]} );
				    },
				    failure: function(data) { 	
				        //alert('Got an error dude');
				    }
		});


  })

  var vertical = d3.select(".chart")
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "19")
        .style("width", "1px")
        .style("height", "380px")
        .style("top", "10px")
        .style("bottom", "30px")
        .style("left", "0px")
        .style("background", "#fff");

  d3.select(".chart")
      .on("mousemove", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px" )})
      .on("mouseover", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px")});
};

