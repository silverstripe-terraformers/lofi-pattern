//Namespace pattern
var namespace = require('./namespace.js');

//Require HighCharts
var Highcharts = require('highcharts');

//Page animation transitions
var pageAnimation = require('animsition');

// Metismenu js
var metis = require('metismenu');

//Syntax highlighting with Prism
var prism = require('prismjs');


//ALL CUSTOM JS
/*
Created: Sep 30, 2016 
Author:  Jared Neems // Statistics New Zealand
Pupose:  Front End UI Javascript For Initial Design, User Interface, 
		 Responsive Testing and Presentation.
Notes:   All node module export methods like 'cm()' below are renamed to shorthand. custom.js = cm
         namespace.js  = nm. 
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

			// Initialize Animsition Page Transition effects
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


			//Function for layout issues due to card condensed & card normal fixed heights
			var mobileClearFix = function(){

				  	var testArray = [];

				  	//Run a loop on all row divs/elements 
				    $('.row').each(function(i, obj) {

				    	//Look for rows that contain more 3 or more divs with m6 class (3 or more cards).
				        if ($(this).children('.m6').length > 2){
				        	var $capture = $(this).children('.m6');
				        	//Add a special css media query class 'mobile-clearfix' that sets a min height of 48em on the first 2 
				        	//divs in a row of 4 to balance out cards on tablet devices.
				        	$capture.addClass('mobile-clearfix');
				            
				            //Below is a nested loop to check for card duplicates. If there are 3 or more cards we may have a situation
				            //where the first 2 cards are of equal height (condensed && condensed || normal && normal). 
				            //This loop checks to see if the first 2 cards in a row are equal. It then removes the mobile-clearfix class. 
				            
				            //Nested Loop .m6 check that runs within .row loop above:
				            $capture.each(function(i, obj) {
				            	//Extract 'condensed' and 'normal' class names from element
				                var $classNames = $(this).children().context.firstElementChild.className.toString();
				                //Reduce string for inspection and also to delete other css multiclasses
								var updateString = $classNames.substring(0, 14);	
								//Push string items to an array			         
				                testArray.push(updateString);

				                //Check array items for equality, remove class, reset testArray
				                var checkArray = function(){
				                	if (testArray[0] === testArray[1]) {
				                		$capture.removeClass('mobile-clearfix');
				                	}
				                	//Reset array for next iteration
				                	testArray = [];
				                };

				                // Only run checkArray function when 2 items are present within the array
				                if (testArray.length > 1) {
				                	checkArray();
				                }
				             
				                //The return below will limit nested loop .m6 class check (line 96) to 2 iterations 
				                //so only the first 2 cards are checked within each ".row", CSS will adjust and correct bottom margins. 
				                //See _media.scss = .s12.m6.l3.mobile-clearfix:nth-of-type(-n+2) {min-height: 48em;}
				                return i < 1;
				            });

				        } //if m6 card check ends

				      }); //row .each() loop ends

			}(); //mobileClearFix function expression Ends



		}; //init method ends

		// Menus Functionality
		UI.menus = function(){

	 		//Check window size and run internal functions. 
	 		var checkSize = $(window).width();

			//Desktop side menu functionality and plugin
			$(function () {

			  $('.button-collapse').sideNav();
			  $('.side-nav').css('display', 'block');

			  //Targets the click event of the desktop submenu 
			  //Adds active to clicked element.  
			  $('.sub-menu li').on('click', function(){
			  	$('.sub-menu li.active').removeClass('active');
			  	$(this).closest('li').addClass('active');
			  });

			  //Plugin for desktop sidemenu for desktop and mobile.
			  //sideMenu = desktop // slide-out = mobile 
			  $('#sideMenu, #slide-out').metisMenu();

			});

		}; //UI.menus end

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

