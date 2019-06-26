function VizBarChart(parent, divId, name)
{
	this.m_divId = parent;
	this.m_name = name;
};


VizBarChart.prototype.draw = function( params, value, colorBar = "steelblue" ) 
{
/*
	var margin = {top: 20, right: 40, bottom: 7, left: 80},
    width = 100 - margin.left - margin.right,
    height = 100 - margin.top - margin.bottom;
*/
	var self = this;

	m_divSVG = document.createElement('div');
	//this.m_divSVG.style.width ="200px";
	//this.m_divSVG.style.height = "150px";
	var id = "IDbarcharSVG".concat(this.m_name);
	m_divSVG.id = id;
	m_divSVG.style.background = "";
	m_divSVG.className = "columna";
	m_divSVG.style.padding = "0px";
	this.m_divId.appendChild(m_divSVG);

    var margin = {top: 5, right: 10, bottom: 20, left: 30};
    var width = 160 - margin.left - margin.right;
    var height = 150 - margin.top - margin.bottom;

    //element = document.getElementById("rightPanel");
    if(value)  width = 240 - margin.left - margin.right;

    this.m_width = width;
    this.m_height = height;


    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
    var y = d3.scale.linear().range([height, 0]);

    this.m_x = x;
    this.m_y = y;

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(d3.time.weeks);

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

    this.m_xAxis = xAxis;
    this.m_yAxis = yAxis;

    this.svg = d3.select(m_divSVG).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

//var data = [{'Run':"m1",'Speed':0.850},{'Run':2,'Speed':0.740},{'Run':3,'Speed':0.900}]
    var data = params;
	data.forEach(function(d) {
        d.metrica = (d.metrica);
        d.valor = +d.valor;
    });
	
    this.m_x.domain(data.map(function(d) { return d.metrica; }));
    //this.m_y.domain([0, d3.max(data, function(d) { return d.valor; })]);
    this.m_y.domain([0, 1]);

  	this.svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + this.m_height + ")")
    .call(this.m_xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "1.0em")
    .attr("dy", "0.5em")
    //.attr("transform", "rotate(-90)" );

    this.svg.append("g")
    .attr("class", "y axis")
    .call(this.m_yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")

    this.svg.selectAll("text")
   	.data(data)
   	.enter()
   	.append("text")
   	.text(function(d){ return self.m_(d.metrica);})
    .attr("x", function(d) {   console.log("number----") ; return  self.m_x(d.metrica); })
   	.attr("y", function(d) {return self.m_y(d.valor);});

      //.text("Value ($)");
    this.svg.selectAll("bar")
    .data(data)
    .enter().append("rect")
    .style("fill", colorBar)
    .attr("x", function(d) {  return self.m_x(d.metrica); })
    .attr("width", self.m_x.rangeBand())
    .attr("y", function(d) {  return self.m_y(d.valor); })
    .attr("height", function(d) { return self.m_height - self.m_y(d.valor); })
};