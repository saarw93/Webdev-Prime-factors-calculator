/* Name: Saar Weitzman
   Date: 8/9/18
   I.D: 204175137 */ 

// Factorization.results.js
// Root namespace

Factorization.results = function()
{
    var container;
    var primes;
    
    var initModule = function($container, params)
    {
        container = $container;
        primes = params.primes;
        var result = showResults(primes);
        container.html("<label for = 'answer'>Answer: </label><br/><br/>" + result);   
    };

    function showResults(primes)
    {
        if (primes.length <= 1)
            return "The number is prime and does not have a factorization";
        var regularForm = "";
        for ( var i = 0; i < primes.length; i++)
        {
            if (i+1 == primes.length)
                regularForm = regularForm + primes[i];
            else
                regularForm = regularForm + primes[i] + " &times; ";
        }
        
        var text = " The Prime Factorization is: <br/>" + regularForm + "<br/><br/> In Exponential Form: <br/>";

        var exp_txt = "";
        var primes_copy = primes;
        for (var i = 0; i < primes.length; i++)
        {
            var times = 1;
            for (var j = i+1; j < primes.length; j++)
            {

                if (primes_copy[i] == primes_copy[j])
                {
                    times++;
                    primes_copy.splice(j,1);
                    j--;
                }
            }

            if (i+1 == primes.length)
                exp_txt = exp_txt + "" + primes[i] + "<sup>" + times + "</sup>";
            else
                exp_txt = exp_txt + "" + primes[i] + "<sup>" + times + "</sup>" + " &times; ";
        }

        text = text + exp_txt;
        return text;
    }
    return { initModule: initModule};
}();
