/* Name: Saar Weitzman
   Date: 8/9/18
   I.D: 204175137 */

// Factorization.js
// Root namespace

var Factorization = function () {

    var initModule = function () {

        $("#calculate").click(clickListener);
        $("#clear").click(clickListener);
        $("#checkbox").click(checkBoxListener);
    };

    var checkBoxListener = function (e) {
        var firstCheck = $("#txtNum").val();

        if (firstCheck == "")   //when you pressed chekbox before there is a number in the input text
            return;
            
        var calculate = $("#calculate");
        if (calculate.attr("class") === "calcIsOn" )
        {
            var inputNum = $("#txtNum").val();
            var check;
            check = $("#checkbox").is(":checked");  //check if the checkbox is pressed or not
            if (check) 
            {
                var answer = $("#answer").html();
                if (answer != "" && answer != "The number must be a positive integer") 
                {
                    if(isEmpty($("#resTree")))  //check if 'resTree' is empty object or not
                    {
                    var primes = getNumPrimes(parseInt(inputNum), 1);    //finds the prime numbers the input is build from
                    var integers = getNumPrimes(parseInt(inputNum), 0);  //gets the middle integers for the tree
                    
                    Factorization.tree.initModule($("#answer"), { primes: primes, integers: integers });
                    }
                }
            }
            else
                $("#resTree").remove();
        }
    };


    var clickListener = function (e) {
        var inputNum = $("#txtNum").val();

        var calc = $("#calculate");
        var clear = $("#clear");
        if (e.target.matches("button")) {

            var whichButton = e.target;
            var action = whichButton.dataset.action;
            if (action === "calculate")     //the calculate button was pressed
            {
                if (calc.attr("class") === "calcIsOn")  //have to clear the screen before trying to calculate a new number's factorization
                    {
                        $("#answer").html("<label for = 'answer'>Answer: </label><br/><br/> Please enter the clear button to continue calculations");
                        if ($("#resTree").length !== 0)
                            $("#resTree").remove();
                        return;
                    }
                var check = checkInput(inputNum);
                if (check == true) {
                    var primes = getNumPrimes(parseInt(inputNum), 1);    //finds the prime numbers the input is build from
                    Factorization.results.initModule($("#answer"), { primes: primes });
                    calc.attr("class", "calcIsOn"); //set new attribute to know the calculate button was pressed last
                    checkBoxListener();   //call the check box function, to know if need to show the prime factor tree
                }
            }
            else     //the clear button was pressed
            {
                $("#answer").html("<label for = 'answer'>Answer: </label><br/><br/>");
                calc.attr("class", "calcIsOff")  //set new value to the attribute to know the clear button was pressed last

                if ($("#resTree").length !== 0)
                    $("#resTree").remove();

                $('input:checkbox').prop('checked', false);  //clears the checkbox
                $("#txtNum").val("");
            }
        }
    };


    function checkInput(inputNum) {
        var errTxt = "<label for = 'answer'>Answer: </label><br/><br/> The number must be a positive integer";

        var fInputNum = parseFloat(inputNum);
        var iInputNum = parseInt(inputNum);

        if (inputNum != iInputNum) {
            $("#answer").html(errTxt);
            return false;
        }

        if (iInputNum == NaN) {
            $("#answer").html(errTxt);
            return false;
        }

        else if (iInputNum <= 0) {
            $("#answer").html(errTxt);
            return false;
        }
        else if (iInputNum !== fInputNum) {
            $("#answer").html(errTxt);
            return false;
        }
        else
            return true;
    }


    function getNumPrimes(inputNum, flag) {
        var n = inputNum;
        var p = 2;
        var factors = [];
        var integers = [];
        var i = 0;
        while (n !== 1) {
            if ((n % p) == 0) {
                factors[i] = p;
                integers[i] = n;
                n = n / p;
                i++;
            }
            else
                p = nextPrime(p, inputNum);
        }

        if (flag == 1)
            return factors;
        else
            return integers;
    }


    function nextPrime(currentPrime, inputNum)   //the function gets the next prime number for check
    {
        for (var i = currentPrime + 1; i <= inputNum; i++) {
            for (var j = 2; j < i; j++) {
                if (i % j == 0)
                    break;
                if (j + 1 == i)
                    return i;   //the next Prime number
            }
        }
    }


    function isEmpty(obj)    //function to check if an object is an empty object or not
    {
        for(var key in obj) 
        {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    return { initModule: initModule };
}();

$(document).ready(function () { Factorization.initModule(); });