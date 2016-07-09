// Catalogue component
var catalogue = Vue.extend({
	props: ['filtered'],
	methods: {
		renderData: function() {
			
		}
	},
	data: function() {
		return {
			white : "white",
			emptyCircle : "fa-circle-o",
			fullCircle : "fa-circle"
		}
	},
	template: `

	    <div class="col-md-9 col-xs-12 col-lg-9">
			<div class="item-list">
				<div v-for="article in filtered" class="item">
					<div class="photo">
						<a href="#"><img v-bind:src="article.url" class="item-thumbnail"></img></a>
					</div>
					<div class="item-description">
						<a href="#">{{article.name}}</a>
						<b>{{article.price}}</b>
						<span class="catalogue-colors">
							<span v-for="color in article.colors">
								<i class="fa" v-bind:class="[color, color==white ? emptyCircle : fullCircle]"></i>&nbsp;
							</span>
						</span>
					</div>
				</div>
			</div>
	    </div>
	`
});
