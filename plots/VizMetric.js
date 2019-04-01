function VizMetric(parent, divId, params)
{
	this.m_divId = divId;
	this.m_parent = parent;

console.log("inicial namel of table........");
console.log(params['Table']);
//alert(params['Table']);
this.table = document.createElement("table");
	this.table.id = String(params['Table']);
  //table.id = "myTable";
    this.table.className="gridtable";
    var thead = document.createElement("thead");
    this.tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    ["Name","value"].forEach(function(el) {
      var th=document.createElement("th");
      th.appendChild(document.createTextNode(el));
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    this.table.appendChild(thead); 
    
    this.table.appendChild(this.tbody);             
    this.m_divId.appendChild(this.table);
    this.key = String(params['Table']);
}



VizMetric.prototype.draw = function(params) 
{
  var self = this;
	console.log("metricasss");  

  for (i=0; i<=3;i++) {  
    //alert(document.getElementById(String(self.table.id)));
    if(   document.getElementById(String(self.table.id)).rows.length >1  ){
              console.log( document.getElementById(String(self.table.id)).rows.length  );
              //tr.removeChild( tr.childNodes[i+1] ); 
              self.tbody.removeChild(self.tbody.lastElementChild);
              //var list = document.getElementById("myList");   // Get the <ul> element with id="myList"
              //list.removeChild(list.childNodes[0]);
    }
  }

	params.forEach(function(el) {
      var tr = document.createElement("tr");
      

      //for (i=0; i<=0;i++) {  
        //var td = document.createElement("td");
        //td.appendChild(document.createTextNode(el[o]));
        //tr.appendChild(td);
          
      //}
      

      for (var o in el) {  
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(el[o]));
        tr.appendChild(td);
      }
      self.tbody.appendChild(tr);  
  });

  //console.log(document.getElementById(String(this.table.id)).rows.length);

/*
  if(   document.getElementById(String(self.table.id)).rows.length == 7){
    document.getElementById(String(self.table.id)).deleteRow(1);
    document.getElementById(String(self.table.id)).deleteRow(2);
    document.getElementById(String(self.table.id)).deleteRow(3);
  }
*/

  console.log(document.getElementById(String(this.table.id)).rows.length);

};
