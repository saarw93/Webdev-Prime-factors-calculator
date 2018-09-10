/* Name: Saar Weitzman
   Date: 8/9/18
   I.D: 204175137 */ 

// Factorization.tree.js
// Root namespace


Factorization.tree = function()
{
    var container;
    var primes;
    var integers;
    
    var initModule = function($container, params)
    {
        container = $container;
        primes = params.primes;
        integers = params.integers;
        container.append(" <div id = 'resTree'> </div>");  //make a div that will contain the tree
        if (primes.length <= 1)    //the input number is a prime number
            return;
        
        var result = showTree(primes, integers, primes.length);

        var maxNum = integers[0].toString().length;   // will keep the table cells' width of to be constant
        var cellWidth = (maxNum * 9) + "px";
        $("#resTree").html(result);
        $(".numberNode").css("width", cellWidth);     
    };


    function Create2DArray(rows)   //the function creates 2-dimension array
    {
        var arr = [];
    
        for (var i=0;i<rows;i++) 
        {
            arr[i] = [];
        }
        return arr;
    }


    function showTree(primes, integers, n)     //the function builds the prime factors tree
    {
        var result = $("#resTree");
        var rows = 1 + (n-1) + (n-1);
        var cols = n+1;
        var tree = "<br/><br/> <h3>Prime Factors Tree</h3> <br/> <table>";
		var arrTree = Create2DArray(rows);     //"arrTree" array represent the html table as a table which has indexes of rows and cols


            for (var i = 0, j = 1, k = 0; i<=rows && j <= cols; i=i+2, j++, k++)
            {
                arrTree[i][j] = integers[k]; 
            }
			
            for (var i = 2, j = 0, k = 0; i<=rows ; i=i+2, j++, k++)
            {
                arrTree[i][j] = primes[k];
            }
	
            for (var i = 1, j = 1; i<=rows-1 && j <= cols-1; i=i+2, j++)
            {
                arrTree[i][j] = "&#8601;&nbsp;&#8600;";
            }
			
			
			for(var i = 0; i < rows; i++)
			{
				tree = tree + "<tr>";
				for (var j = 0; j < cols; j++)
				{
                    if (arrTree[i][j] == undefined)
                        tree = tree + "<td></td>";
                    else
                        if (typeof(arrTree[i][j]) != "number" )
                            tree = tree + "<td class = 'arrowsNode'>" + arrTree[i][j] + "</td>";
                        else
					        tree = tree + "<td class = 'numberNode'>" + arrTree[i][j] + "</td>";	
				}
				tree = tree + "</tr>";
			}
			tree = tree + "</table>";
            
            return tree;   
    }
    return { initModule: initModule};
}();