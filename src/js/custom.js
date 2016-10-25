//Namespace pattern
var namespace = require('./namespace.js');

// Left vertical navigation
var sideNavigation = require('./sidenav.js');


// All Custom JS
exports.cm = function(){

(function(){
		
		// Initiale namespace instance to create accesible object
		UI = namespace.nm();

		//Use namespace method
		UI.createNS("UI.menus");
		UI.createNS("UI.init");

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

		UI.init = function(){

			//Initialize side navigation
			sideNavigation.sn();
			$('#leftNavigation').ssdVerticalNavigation();

			//Close Button For Mobile Menu
			$('#closer').click(function(event){
				event.preventDefault();
				$('.button-collapse').sideNav('hide');
			});	

			//Modal Trigger and Setup
			$('.modal-trigger').leanModal();

			//Materialize Setup for check boxes. 
			$('select').material_select();

		};

	// Monitor Screen size for new menu breakpoint:
	// UI.menus();	
	UI.init();
	UI.menus();

})(); //iffe ends


};

