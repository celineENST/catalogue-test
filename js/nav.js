// Nav component
var nav = Vue.extend({
	props: ['filtered','filters','unfiltered'],
	data: function() {
		return {
			list: f
		}	
	},
	methods: {
		reset: function() {
			$(".underlined").removeClass("underlined");
			$(".circled").removeClass("circled");
			app.$emit('reset-filters');
		},
		filterCatalogue: function() {
			var result = this.unfiltered.filter(this.isOk);
			app.$emit('render-catalogue',result);
		},
		alreadyFiltering: function(attr,val) {
			var catFilter = this.filters[attr];
			return (catFilter.length != 0 && catFilter.includes(val));
		},
		addFilter: function(attr,val) {
			var temp = this.filters;		   
			var catFilter = this.filters[attr];
			if (this.alreadyFiltering(attr,val)) {
				// we are already filtering with the current value, so taking it away
				temp[attr].splice(catFilter.indexOf(val),1);
			} else {
				// adding the filter
				temp[attr].push(val);
			}
			app.$emit('change-filters',temp);
			this.filterCatalogue();
		},
		isOk: function(unfilteredItem) {
			var self = this;
			var check = true;
			Object.getOwnPropertyNames(blank).forEach(function(filterCat) {
				if (self.filters[filterCat].length != 0 && filterCat != '__ob__') {
					self.filters[filterCat].forEach(function(element) {
						if (unfilteredItem[filterCat].includes(element) == false) {
							check = false;
							return false; // if the item corresponds to the filterCat requirements, it continues looping. Else it returns false
						}
					});
				} 	
			});
			return check;
		},
		toggleChevron: function(e) {
			var i = $(".chevron").index(e.target.nextElementSibling);
			$(".chevron").eq(i).toggleClass("fa-angle-up fa-angle-down");
		},
	},
	template: `

	    <div class="col-md-3 col-xs-12 col-lg-3" id="nav"> 
			<div class="container-fluid">
				<div class="row separator"> 
					<b @click="filterCatalogue()">Filters</b>
				</div>
				<div class="row category-end">
					<div class="col-md-12 col-xs-12 col-lg-12">
						<b>Gender</b> <br />
						<span v-for="val in list.genders">
							<a href="#" @click="addFilter('genders',val)">
								<span v-bind:class='[alreadyFiltering("genders",val) ? "underlined" : "no-underlined"]'>{{val}}</span>
							</a> &nbsp;
						</span>
						
					</div>
				</div>
				<div class="row category-end">
					<div class="col-md-12 col-xs-12 col-lg-12"> 
						<span class="header-expand" data-toggle="collapse" href="#category-list" @click="toggleChevron(event)">
							<b class="title-expand">Category</b>
							<i class="chevron fa fa-angle-up" aria-hidden="true"></i>
						</span>
						<ul class="collapse in" id="category-list" >
							<li v-for="val in list.cat">
								<a href="#" @click="addFilter('cat',val)" v-bind:class="[alreadyFiltering('cat',val)?'underlined':'no-underlined']">{{val}}</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="row category-end">
					<div class="col-md-12"> 
						<b>Color</b> <br />
						<span v-for="val in list.colors" @click="addFilter('colors',val)">
							<a v-bind:class="['fa', val, alreadyFiltering('colors',val) ? 'circled' : 'uncircled', val == 'white' ? 'fa-circle-thin' : 'fa-circle']">
							</a>
						</span>

					</div>
				</div>
				<div class="row category-end">
					<div class="col-md-12 col-xs-12 col-lg-12">
						<span class="header-expand" data-toggle="collapse" href="#theme-list" @click="toggleChevron(event)">
							<b class="title-expand">Theme</b>
							<i class="chevron fa fa-angle-down"  aria-hidden="true"></i>
						</span>
						<ul class="collapse" id="theme-list" >
							<li v-for="val in list.theme">
								<a href="#" @click="addFilter('theme',val)" v-bind:class="[alreadyFiltering('theme',val)?'underlined':'no-underlined']">{{val}}</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="row category">
					<a @click='reset()'>Reset all filters</a>
				</div>
			</div>
		</div>
	`
});
