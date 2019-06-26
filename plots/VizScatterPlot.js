

function VizScatterPlot( divId )
{
	this.m_divId = divId;
    var margin = {top: 5, right: 20, bottom: 16, left: 40},
    width = 960 - margin.left - margin.right, 
    height = 500 - margin.top - margin.bottom;


    var width = 200;
    var height = 190;
    
    var container = this.m_divId;
    var xRange = 6;//xExtent[1] - xExtent[0];
    var yRange = 6;//yExtent[1] - yExtent[0];


    this.m_svg = d3.select(container).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.linear()
        .domain([-3.382848731613455, 3.919199612620012])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([-3, 3])
        .range([height, 0]);

    this.m_x = x;
    this.m_y = y;

    var color = d3.scale.category10();
    var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"
    ,"#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"
    ,"#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    this.m_colores_g = colores_g;


    // Init the lasso on the svg:g that contains the dots



 /*   this.m_svg.append("g")
        .attr( "class", "x axis" )
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        //.text("Sepal Width (cm)")
        ;


    this.m_svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");
        //.text("Sepal Length (cm)")

*/


        this.m_dirtyCount = 0;




};



VizScatterPlot.prototype.onResizeAxisX = function( minX, maxX ) 
{
    // selectiona el attribute del svg que maneja la escala
};

l = []
//VizScatterPlot.prototype.draw = function( data, labels ) 
VizScatterPlot.prototype.draw = function( data )
{
    console.log("draw----------------------------------------------------------------------");
    console.log(data);
    var self = this;
    this.m_svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        //.transition()
        //.attr("id",function(d,i) { return "dot_" + ( i + self.m_dirtyCount );}) // added
        //.attr("class", "dot")
        .attr("r", 2.5)
        .attr("cx", function(d) { return d3.scale.linear()
        .domain([d3.min(data, function(d) { return d[0]; }), d3.max(data, function(d) { return d[0]; })])
        .range([0, 200])(d[0]); })
        .attr("cy", function(d) { return d3.scale.linear()
        .domain([d3.min(data, function(d) { return d[1]; }), d3.max(data, function(d) { return d[1]; })])
        .range([190, 0])(d[1]); })
        //.attr("cx", function(d) { return self.m_x(d[0]); })
        //.attr("cy", function(d) { return self.m_y(d[1]); })
        .style("fill", 
                function(d) {  
                    return self.m_colores_g[d[2] ]; 
                });

/*
    this.m_svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")   
        .attr("x", function(d) { return d3.scale.linear()
        .domain([d3.min(data, function(d) { return d[0]; }), d3.max(data, function(d) { return d[0]; })])
        .range([0, 200])(d[0]); })
        .attr("y", function(d) { return d3.scale.linear()
        .domain([d3.min(data, function(d) { return d[1]; }), d3.max(data, function(d) { return d[1]; })])
        .range([200, 0])(d[1]); })
        .text( function (d) { return "da"; })
        ;
*/    


};