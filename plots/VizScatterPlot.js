

function VizScatterPlot( divId )
{
	this.m_divId = divId;
	//var container = this.m_divId


	// initialize some stuff

	// define some d3js stuff here





    // call d3js stuff here
    //document.write("ooooooo")
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right, 
    height = 500 - margin.top - margin.bottom;


    var width = 200;
    var height = 200;
    
    var container = this.m_divId;
    //var container = options.container;
    //var legend = options.legend;
    //var model  = options.model;
    //var count  = options.count;

    //var xExtent = d3.extent(data, function(d) { return d[0] });
    //var yExtent = d3.extent(data, function(d) { return d[1] });
    var xRange = 6;//xExtent[1] - xExtent[0];
    var yRange = 6;//yExtent[1] - yExtent[0];




    this.m_svg = d3.select(container).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");








    var x = d3.scale.linear()
        .domain([-3, 3])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([-3, 3])
        .range([height, 0]);

    this.m_x = x;
    this.m_y = y;

    var color = d3.scale.category10();
    var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    this.m_colores_g = colores_g;

    // Lasso functions to execute while lassoing
    var lasso_start = function() {
        lasso.items()
        .attr("r",3.5) // reset size
        .style("fill",null) // clear all of the fills
        .classed({"not_possible":true,"selected":false}); // style as not possible
        console.log("start"); 
    };

    var lasso_draw = function() {
        // Style the possible dots
        lasso.items().filter(function(d) {return d.possible===true})
        .classed({"not_possible":false,"possible":true});
        console.log("draw1");
        // Style the not possible dot
        lasso.items().filter(function(d) {return d.possible===false})
        .classed({"not_possible":true,"possible":false});
        console.log("draw2"); 
    };

    var lasso_end = function() {
        // Reset the color of all dots
        lasso.items()
        .style("fill", function(d) { return colores_g[d[2]]; });

        // Style the selected dots
        lasso.items().filter(function(d,j) {
        //document.write(d[j]);
        if(d.selected===true) l.push(j);//document.write(j);
        
         return d.selected===true;
        })
        .classed({"not_possible":false,"possible":false})
        .attr("r",7);

        // Reset the style of the not selected dots
        lasso.items().filter(function(d) {return d.selected===false})
        .classed({"not_possible":false,"possible":false})
        .attr("r",3.5);
        //document.write(" ---- "+l);
        console.log("end"); 
    };

    // Create the area where the lasso event can be triggered
    var lasso_area = this.m_svg.append("rect")
                      .attr("width",width)
                      .attr("height",height)
                      .style("opacity",0);

    // Define the lasso
    var lasso = d3.lasso()
        .closePathDistance(75) // max distance for the lasso loop to be closed
        .closePathSelect(true) // can items be selected by closing the path?
        .hoverSelect(true) // can items by selected by hovering over them?
        .area(lasso_area) // area where the lasso can be started
        .on("start",lasso_start) // lasso start function
        .on("draw",lasso_draw) // lasso draw function
        .on("end",lasso_end); // lasso end function

    // Init the lasso on the svg:g that contains the dots
    


    this.m_svg.append("g")
        .attr("class", "x axis")
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
        .style("text-anchor", "end")
        //.text("Sepal Length (cm)")



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
    var self = this;

    this.m_svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("id",function(d,i) { return "dot_" + ( i + self.m_dirtyCount );}) // added
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return self.m_x(d[0]); })
        .attr("cy", function(d) { return self.m_y(d[1]); })
        .style("fill", 
                function(d) {  
                    return self.m_colores_g[d[2] ]; 
                });

    self.m_dirtyCount += 10000;
    //this.m_svg.call(lasso);
    //lasso.items(d3.selectAll(".dot"));

};