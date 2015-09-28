requirejs.config({
	"baseUrl": "/bower_modules",
	"paths": {
		"jquery": "jquery/jquery",
		"jquery.cookie": "jquery.cookie/jquery.cookie",
		"jquery.bootstrap": "bootstrap/dist/js/bootstrap",
		"angular": "angular/angular",
		"angular.cookies": "angular-cookies/angular-cookies",
		"material": "material-design-lite/material"
	},
	"shim": {
		"angular": {
			deps: ["jquery"],
			exports: "angular"
		},
		"angular-cookies": ["angular"],
		"jquery.cookie": ["jquery"],
		"jquery.bootstrap": ["jquery"]
	}
});

// Load the main app module to start the app
//requirejs(["../build/js/all.min.js"]);