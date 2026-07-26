// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const base = '/caseum';

/**
 * Content links and image sources are written root-relative (`/guides/foo/`,
 * `/guides/foo.png`) so the markdown stays portable and matches the paths the
 * old MkDocs site used. This rehype plugin prefixes those with the deploy base
 * path at render time, for both `<a href>` and `<img src>` (including the raw
 * HTML `<img>` tags kept from the original docs).
 */
function rehypeBaseLinks() {
	/** @param {any} node */
	const visit = (node) => {
		const attr =
			node.type === 'element' && node.tagName === 'a'
				? 'href'
				: node.type === 'element' && node.tagName === 'img'
					? 'src'
					: null;
		if (attr) {
			const value = node.properties?.[attr];
			if (
				typeof value === 'string' &&
				value.startsWith('/') &&
				!value.startsWith('//') &&
				!value.startsWith(`${base}/`)
			) {
				node.properties[attr] = base + value;
			}
		}
		for (const child of node.children ?? []) visit(child);
	};
	return (/** @type {any} */ tree) => {
		visit(tree);
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://lsimons.github.io',
	base,
	markdown: {
		rehypePlugins: [rehypeBaseLinks],
	},
	// The reveal.js deck is a static file at /presentations/introduction.html.
	// Starlight strips the `.html` from the sidebar link (rendering
	// /presentations/introduction), so redirect that extensionless URL to the
	// real file. Works in dev, preview, and on GitHub Pages.
	// Astro applies `base` to the redirect source but not the target, so the
	// target carries `${base}` explicitly.
	redirects: {
		'/presentations/introduction': `${base}/presentations/introduction.html`,
	},
	integrations: [
		starlight({
			title: 'Caseum',
			description:
				'A simple approach to software architecture that combines multiple views ' +
				'to boost understanding and empathy across roles.',
			logo: { src: './src/assets/logo.svg', alt: 'Caseum' },
			favicon: '/favicon.svg',
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'apple-touch-icon',
						sizes: '180x180',
						href: `${base}/apple-touch-icon.png`,
					},
				},
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/lsimons/caseum' },
			],
			editLink: { baseUrl: 'https://github.com/lsimons/caseum/edit/main/docs/' },
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ slug: 'guides/stages', label: 'Architecture stages' },
						{ slug: 'guides/as-is-to-be', label: 'As-is and to-be' },
						{ slug: 'guides/records', label: 'Recording decisions' },
						{ slug: 'guides/whiteboarding', label: 'Whiteboarding architecture' },
						{ slug: 'guides/drawio', label: 'Draw.io for architecture' },
						{ slug: 'guides/platforms', label: 'Designing platforms' },
					],
				},
				{
					label: 'Components using C4',
					items: [
						{ slug: 'components/c4-whiteboarding', label: 'Component whiteboarding' },
						{ slug: 'components/c4-template', label: 'Component template' },
						{ slug: 'components/c4-code', label: 'Component architecture-as-code' },
					],
				},
				{
					label: 'Actors using roles',
					items: [
						{ slug: 'actors/actor-whiteboarding', label: 'Actor whiteboarding' },
						{ slug: 'actors/role-template', label: 'Role template' },
					],
				},
				{
					label: 'Stories using Gherkin',
					items: [
						{ slug: 'stories/story-whiteboarding', label: 'Story whiteboarding' },
						{ slug: 'stories/story-template', label: 'Story template' },
						{ slug: 'stories/gherkin-code', label: 'Gherkin specs-as-code' },
					],
				},
				{
					label: 'Events using event storming',
					items: [
						{ slug: 'events/event-storming', label: 'Event whiteboarding' },
						{ slug: 'events/event-template', label: 'Event template' },
						{ slug: 'events/asyncapi-code', label: 'AsyncAPI specs-as-code' },
					],
				},
				{
					label: 'UI using whiteboarding',
					items: [
						{ slug: 'ui/ui-whiteboarding', label: 'UI whiteboarding' },
						{ slug: 'ui/ui-template', label: 'UI template' },
					],
				},
				{
					label: 'Models using facts',
					items: [
						{ slug: 'models/fact-modeling', label: 'Fact-based modeling' },
						{ slug: 'models/fact-whiteboarding', label: 'Fact whiteboarding' },
						{ slug: 'models/model-diagrams', label: 'Model diagrams' },
						{ slug: 'models/linkml-code', label: 'LinkML models-as-code' },
					],
				},
				{
					label: 'Misc',
					items: [
						{ slug: 'code-of-conduct', label: 'Code of conduct' },
						{ slug: 'contributing', label: 'Contributing to Caseum' },
						{ slug: 'design/fonts', label: 'Caseum fonts' },
						{ slug: 'design/colors/colors', label: 'Caseum colors' },
						// Starlight prepends the deploy `base` to sidebar link values, so
						// these are written without it (unlike head/content links).
						{ label: 'License', link: '/LICENSE.txt', attrs: { target: '_blank' } },
						{
							label: 'Introduction slides',
							items: [
								{ label: 'PDF', link: '/presentations/introduction.pdf', attrs: { target: '_blank' } },
								{ label: 'HTML', link: '/presentations/introduction.html', attrs: { target: '_blank' } },
								{ label: 'Quarto source', link: '/presentations/introduction.qmd', attrs: { target: '_blank' } },
								{ label: 'PowerPoint', link: '/presentations/introduction.pptx', attrs: { target: '_blank' } },
							],
						},
					],
				},
			],
		}),
	],
});
