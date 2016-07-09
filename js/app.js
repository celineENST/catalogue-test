// Main view
var app = new Vue({
	el: '#app',
	data: {
		filtered: articles,
		unfiltered: articles,
		filters: blank 
	},
	created: function() {
		var self = this;
		self.$on('render-catalogue', function(result) {
			self.filtered = result;
			console.log("render")
		});
		self.$on('reset-filters',function() {
			self.filtered = self.unfiltered;
			Object.getOwnPropertyNames(self.filters).forEach(function(el) { self.filters[el] = [];});
			console.log("filter reset");
		});
		self.$on('change-filters',function(filters) {
			self.filters = filters;
			console.log("filter update");
		});
	},
	components: {
		'nav-component': nav,
		'catalogue-component': catalogue
	}
});
