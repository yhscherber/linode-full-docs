'use strict';

var debug = 0 ? console.log.bind(console, '[router]') : function() {};

export function newCreateHref(searchConfig) {
	if (!searchConfig) {
		throw 'newCreateHref: must provide searchConfig';
	}

	const SECTIONS_BASEPATH = '/docs/';
	const WP_CONTENT_BASEPATH = '/docs/content/';

	return {
		sectionsFromPath: function() {
			let pathname = decodeURIComponent(window.location.pathname).replace(/^\/|\/$/g, '');
			let sections = pathname.split('/').slice(1);
			return sections;
		},
		hrefSection: function(key) {
			let parts = key.split(' > ');
			return `${SECTIONS_BASEPATH}${parts.join('/').toLowerCase()}/`;
		},
		hrefEntry: function(hit) {
			let urlParts = hit.url.split('/');
			let contentType = hit.objectID.split('#').shift().replace('content', 'resource');
			let slug = urlParts.pop() || urlParts.pop();
			return `${WP_CONTENT_BASEPATH}${contentType}/${slug}/`;
		}
	};
}
