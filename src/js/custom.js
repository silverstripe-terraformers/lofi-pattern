//Namespace pattern
var namespace = require('./namespace.js');

// Left vertical navigation
var sideNavigation = require('./sidenav.js');

// All Custom JS
exports.cm = function(){


(function(){
		
		// Initiale namespace instance to creeate accesible object
		UI = namespace.nm();

		//Use namespace method
		UI.createNS("UI.menus");
		UI.createNS("UI.init");

		UI.menus = function(){

	 		//Check window size and run internal functions. 
	 		var checkSize = $(window).width();
	 		var oldNav = 'leftNavContainer';
	 		var newBody = 'cardWrapper';

	 		if(checkSize <= 1180){
	 			removeNav();
	 			stretchHorizontalNav();
	 			updateMatClass();
	 		}

	 		//Removes static desktop side nav
			function removeNav(){
				//Grab the black side nav and remove it from the dom.
				var elem = document.getElementById(oldNav);
				elem.parentNode.removeChild(elem);
			}

			//Changes Material design class to full width
			function updateMatClass(){
				//Change Materilize layout from 10 to 12 for responsiv mobile. Checking via regex.
				document.getElementById(newBody).className = //cont' to next line
				document.getElementById(newBody).className.replace( /(?:^|\s)s10(?!\S)/g , ' s12' );
				//Trigger inclusion of mobile side nav
				mobileSideNav();
			}

			//Stretches current horizontal nav to full width after side nav removal
			function stretchHorizontalNav(){
				document.getElementById("navHorizontal").style.width = "100%";
			}

			//Activate and setup mobile side navigation
			function mobileSideNav(){
				$('.button-collapse').sideNav();
				$('.side-nav').css('display', 'block');
				$('#mobMenu').css('display', 'inline-block');
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

		};

	// Monitor Screen size for new menu breakpoint:
	UI.menus();	
	UI.init();

})(); //iffe ends


};

