//Namespace pattern
var namespace = require('./namespace.js');

//Require HighCharts
var Highcharts = require('highcharts');

//Page animation transitions
var pageAnimation = require('animsition');



//ALL CUSTOM JS
/*
Created: Sep 30, 2016 
Author:  Jared Neems // Statistics New Zealand
Pupose:  Front End UI Javascript For Initial Design, User Interface, 
		 Responsive Testing and Presentation.
Notes:   All node module export methods like 'cm()' below are renamed to shorthand. custom.js = cm
         namespace.js  = nm. 
Standards: 
*/

// All Custom JS
exports.cm = function(){

(function(){
		
		// Initiale namespace instance to create accesible object
		UI = namespace.nm();

		//Use namespace method
		UI.createNS("UI.init");
		UI.createNS("UI.menus");
		UI.createNS("UI.charts");

		// All initialize UI invocations
		UI.init = function(){

			//Close Button For Mobile Menu
			$('#closer').click(function(event){
				event.preventDefault();
				$('.button-collapse').sideNav('hide');
			});	

			//Modal Trigger and Setup
			$('.modal-trigger').leanModal();

			//Materialize Setup for check boxes. 
			$('select').material_select();

			// Animsition Page Transition effects
			$("#cardWrapper").animsition({
				inClass: 'fade-in',
				outClass: 'fade-out',
				inDuration: 600,
				outDuration: 800,
				linkElement: '.animsition-link',
				// e.g. linkElement: 'a:not([target="_blank"]):not([href^=#])'
				loading: true,
				loadingParentElement: 'body', //animsition wrapper element
				loadingClass: 'animsition-loading',
				unSupportCss: [
				'animation-duration',
				'-webkit-animation-duration',
				'-o-animation-duration'
			],
				//"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
				//The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
				overlay : false,
				overlayClass : 'animsition-overlay-slide',
				overlayParentElement : 'body'
			});

		}; //init method ends

		// Menus Functionality
		UI.menus = function(){

	 		//Check window size and run internal functions. 
	 		var checkSize = $(window).width();

	 		if(checkSize <= 1180){
	 			mobileSideNav();
	 		}

			//Activate and setup mobile side navigation
			function mobileSideNav(){
				$('.button-collapse').sideNav();
				$('.side-nav').css('display', 'block');
			}


		};

		//Highcharts functionality 
		UI.charts = function(){
			// Load module after Highcharts is loaded
			require('highcharts/modules/exporting')(Highcharts);

			//Multiple Render Of High Charts with jQuery .each function
			$('.high-chart').each(function(){
			    var chart = new Highcharts.Chart({
			        chart: {
			            renderTo: this,
			            height: 400
			        },
			        xAxis: {
			            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			        },

			        series: [{
			            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]        
			        }]
			    });
			});
		}; // UI.charts method ends
		

	// Monitor Screen size for new menu breakpoint:
	// UI.menus();	
	UI.init();
	UI.menus();
	UI.charts();

})(); //iffe ends


}; //exports.cm ends

