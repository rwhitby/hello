enyo.kind({
	name: 'wi.Header',
	kind: enyo.Control,
	published: {
		type:		'',
		icon:		'',
		title:		'',
		version:	'',
		tagline:	'Random Taglines Are Awesome',
		date:		[],
		random:		[]
	},
	components: [
		{kind: 'PageHeader', components: [
			{name: 'header', kind: 'HFlexBox', className: 'wi-header', components: [
				{name: 'icon', className: 'icon', kind: 'Image'},
				{className: 'text', flex: 1, components: [
					{kind: 'HFlexBox', components: [
						{name: 'title', className: 'title', allowHtml: true},
						{name: 'version', flex: 1, className: 'version'},
					]},
					{name: 'tagline', className: 'tagline', allowHtml: true},
				]},
			]},
		]},
	],
	
	rendered: function() {
		var d       = this.getDate()
		var r       = this.getRandom();
		var icon    = d.icon    || r.icon    || this.icon    || enyo.fetchAppInfo().icon;
		var title   = d.title   || r.title   || this.title   || enyo.fetchAppInfo().title;
		var version = d.version || r.version || 'v' + (this.version || enyo.fetchAppInfo().version);
		var tagline = d.tagline || r.tagline || this.tagline || '&nbsp;';
		if (this.type) this.$.header.addClass(this.type);
		this.$.icon.setSrc(icon);
		this.$.title.setContent(title);
		this.$.version.setContent(version);
		this.$.tagline.setContent(tagline);
	},
	
	getDate: function() {
		if (this.date.length == 0) return false;
		var date  = new Date();
		var day   = date.getDate();
		var month = date.getMonth() + 1;
		var year  = date.getFullYear();
		for (var d = 0; d < this.date.length; d++) {
			if ((this.date[d].day   && this.date[d].day   == day)   &&
				(this.date[d].month && this.date[d].month == month) &&
				(this.date[d].year  && this.date[d].year  == year))
				return this.date[d];
		}
		for (var d = 0; d < this.date.length; d++) {
			if ((this.date[d].day   && this.date[d].day   == day)   &&
				(this.date[d].month && this.date[d].month == month) &&
				(!this.date[d].year))
				return this.date[d];
		}
		return false;
	},
	getRandom: function() {
		var w = 0;
		if (this.random.length == 0) return false;
		for (var r = 0; r < this.random.length; r++) {
			if (!this.random[r].weight) this.random[r].weight = 1;
			w += this.random[r].weight;
		}
		var ran = Math.floor(Math.random() * w) + 1;
		for (var r = 0; r < this.random.length; r++) {
			if (ran <= this.random[r].weight)
				return this.random[r];
			else
				ran -= this.random[r].weight;
		}
		return this.random[0];
	},
	
});