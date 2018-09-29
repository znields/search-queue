// allows for Google Analytics tracking

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-121318914-1']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function trackButton(e)
{

    console.log(e);
    var path = window.location.pathname;
    var page = path.split('/').pop().split('.')[0];
    console.log(page + ' -- ' + e.target.id);

    _gaq.push(['_trackEvent', page + ' -- ' + e.target.id, 'clicked']);
}

document.addEventListener('DOMContentLoaded', function () {

    // begin tracking buttons
    const buttons = document.getElementsByClassName('button-tracked');

    for (let i = 0; i < buttons.length; i++)
    {
        buttons[i].addEventListener('click', trackButton);
    }

});