function toNumberString(num) { 
  if (Number.isInteger(num)) { 
    return num + ".0"
  } else {
    return num.toString(); 
  }
}


function VizComparationMethods(parent, divId )
{   
    this.m_parent = parent;
	this.m_divId = divId;
    
};


l = []
VizComparationMethods.prototype.draw = function( params  )
{
    //var listWeight =  params['listWeight'];

    var self = this;



    var margin = {top: 20, right: 20, bottom: 30, left: 10},
    width = 960 - margin.left - margin.right, 
    height = 500 - margin.top - margin.bottom;

    this.width = 590;
    this.height = 290;
    
    var container = this.m_divId;
    var xRange = 6;//xExtent[1] - xExtent[0];
    var yRange = 6;//yExtent[1] - yExtent[0];

    this.m_svg = d3.select(container).append("svg")
        .attr("width", this.width + margin.left + margin.right)
        .attr("height", this.height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.linear()
        .domain([-3.382848731613455, 3.919199612620012])
        .range([0, this.width+10]);

    var y = d3.scale.linear()
        .domain([-3, 3])
        .range([this.height+10, 0]);

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


    this.m_svg.append('line')
    .style("stroke", "#7599bd")
    .style("stroke-width", 5)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", this.height+10); 

    this.m_svg.append('line')
    .style("stroke", "#7599bd")
    .style("stroke-width", 5)
    .attr("x1", 0)
    .attr("y1", this.height+10)
    .attr("x2", this.width+10)
    .attr("y2", this.height+10); 


    this.m_svg.append('line')
    .style("stroke", "#7599bd")
    .style("stroke-width", 5)
    .attr("x1", this.width+10)
    .attr("y1", this.height+10)
    .attr("x2", this.width+10)
    .attr("y2", 0); 

    this.m_svg.append('line')
    .style("stroke", "#7599bd")
    .style("stroke-width", 5)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", this.width+10)
    .attr("y2", 0); 























    var data = APPLICATION_DATA['Comparation'].valor;
    console.log("evaluateeeeeeeeeeeeeeeeeeee");
    console.log(APPLICATION_DATA['Comparation'].color);
    console.log(APPLICATION_DATA['Comparation'].methods);
    console.log(APPLICATION_DATA['Comparation'].valor);
    console.log("this is a final example...."); 
    var data2 = APPLICATION_DATA['Comparation'].methods;
    var data3 = APPLICATION_DATA['Comparation'].color;
    var mySelectedArray = [];

    // Lasso functions to execute while lassoing
    var lasso_start = function() {
        lasso.items()
        .attr("r",3.5) // reset size
        .style("fill",null) // clear all of the fills
        .classed({"not_possible":true,"selected":false}); // style as not possible
    };

    var lasso_draw = function() {
        // Style the possible dots
        lasso.items().filter(function(d) {return d.possible===true})
        .classed({"not_possible":false,"possible":true});
        //console.log("draw1");
        //Style the not possible dot
        lasso.items().filter(function(d) {return d.possible===false})
        .classed({"not_possible":true,"possible":false});
        //console.log("draw2"); 
    };

    var lasso_end = function() {
        // Reset the color of all dots
        lasso.items()
        .style("fill", function(d, i) { return data3[i]; });

        // Style the selected dots
        lasso.items().filter(function(d,j) {
        //document.write(d[j]);
        if(d.selected===true) 
            //l.push(j);//document.write(j);
         return d.selected===true;
        })
        .classed({"not_possible":false,"possible":false})
        .attr("r",7);

        // Reset the style of the not selected dots
        lasso.items().filter(function(d) {return d.selected===false})
        .classed({"not_possible":false,"possible":false})
        .attr("r",3.5);

        var selected = lasso.items().filter(function(d) {
            return d.selected===true
        });

        selected[0].forEach(function(d,i){
        //mySelectedArray.push(d3.select(d).datum());
        console.log("number of  item no enter");
        console.log( data.length );

            if(APPLICATION_DATA['modelContainers'].length>d3.select(d).datum()[2])
                mySelectedArray.push(d3.select(d).datum()[2]);
            //else
        //console.log(i);
        });
        console.log("see mySelectedArray---------------------------------------");
        console.log(mySelectedArray);
        if(mySelectedArray.length != 0){
            console.log("entro a cambiar numero de modelContainers")
            APPLICATION_DATA_copy['modelContainers'] = []
            for(var k = 0; k< mySelectedArray.length; k++){
                //APPLICATION_DATA['modelContainers'].pop(k);
                
                APPLICATION_DATA_copy['modelContainers'].push( APPLICATION_DATA['modelContainers'][mySelectedArray[k]] );
            }
            APPLICATION_DATA_copy['points'] = [];
            APPLICATION_DATA_copy['metrics'] = [];
             self.m_parent.getVizComboBox().draw_initial();
             mySelectedArray = [];
        }
    };

    data.push(1);
    data.pop();

    // Create the area where the lasso event can be triggered
    var lasso_area = this.m_svg.append("rect")
                      .attr("width",self.width)
                      .attr("height",self.height)
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


    this.m_svg.call(lasso);

    this.m_svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("id",function(d,i) {return "dot_" + i;})
        //.attr("transform", d3.event.transform)
        //.transition()
        //.attr("id",function(d,i) { return "dot_" + i+count;}) // added
        //.attr("id",function(d,i) { return "dot_" + ( i + self.m_dirtyCount );}) // added
        .attr("class", "dot")
        .attr("r", 2.5)
        .attr("cx", function(d) { return d3.scale.linear()
        .domain([d3.min(data, function(d) { return d[0]; }), d3.max(data, function(d) { return d[0]; })])
        .range([0+15, self.width -15])(d[0]); })
        .attr("cy", function(d) { return d3.scale.linear()
        .domain([d3.min(data, function(d) { return d[1]; }), d3.max(data, function(d) { return d[1]; })])
        .range([self.height, 0+15])(d[1]); })
        //.attr("cx", function(d) { return self.m_x(d[0]); })
        //.attr("cy", function(d) { return self.m_y(d[1]); })
        .style("fill", 
                function(d,i) {  
                    return data3[i]; 
                });

    /*var weight = [];
    for(var k = 0; k<listWeight.length; k++){
        console.log(listWeight[k]*100);
        weight.push(toNumberString(listWeight[k]*100));
    }
    weight.push(" ");
    weight.push(" ");
    weight.push(" ");
    */

    var h = [10,5,10, 10, 10, 10];
    //var h = 10;
    this.m_svg.selectAll("text")
        .data(data)
        .enter()
        .append("text") 
        .attr("font-size",8)  
        .attr("x", function(d) { return d3.scale.linear()
        .domain([d3.min(data, function(d) {return d[0]; }), d3.max(data, function(d) { return d[0]; })])
        .range([0+15, self.width-15])(d[0]+0.005); })
        .attr("y", function(d) {  console.log("Comparation............................."); return d3.scale.linear()
        .domain([d3.min(data, function(d) {return d[1] }), d3.max(data, function(d) { return d[1]; })])
        .range([self.height, 0+ 10   ])(d[1]); })
        .text( function (d,i) { return data2[i] })
        ;
    
    
    lasso.items(d3.selectAll(".dot"));

    this.m_svg.append("svg") ;

};