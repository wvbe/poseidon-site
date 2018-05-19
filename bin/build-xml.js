const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');
const markdown = require('remark-parse');
const unified = require('unified');
const trident = require('xml-trident');

function resolve (linkTarget) {
	return linkTarget;
}

function transform (node) {
	switch (node.type) {
		// Text nodes
		case 'text':
			return node.value;

		// Block level nodes
		case 'paragraph':
			return [
				'paragraph',
				...node.children.map(transform)
			];

		case 'heading':
			return [
				'heading',
				{ level: node.depth || 1 },
				...node.children.map(transform)
			];

		case 'code':
			return [
				'code-block',
				{ language: node.lang || null },
				node.value
			];

		// Inline nodes
		case 'link':
			let resolvedTarget = resolve(node.url);

			return [
				'link',
				{
					reference: resolvedTarget,
					unresolved: !resolvedTarget ? node.url : null
				},
				...node.children.map(transform)
			];

		case 'emphasis':
			return [
				'emphasis',
				...node.children.map(transform)
			];

		case 'strong':
			return [
				'strong',
				...node.children.map(transform)
			];

		case 'delete':
			return [
				'strike-through',
				...node.children.map(transform)
			];

		case 'html':
			return [
				'code-phrase',
				{ language: node.lang || null },
				node.value
			];

		case 'list':
			return [
				'list',
				...node.children.map(transform)
			];

		case 'listItem':
			return [
				'list-item',
				...node.children.map(transform)
			];

		case 'thematicBreak':
			return [
				'horizontal-thematicBreak'
			];

		case 'table':
			return [
				'table',
				...node.children.map(transform)
			];

		case 'tableRow':
			return [
				'row',
				...node.children.map(transform)
			];

		case 'tableCell':
			return [
				'cell',
				...node.children.map(transform)
			];

		default:
			console.warn('Could not serialize Markdown AST node:');
			console.dir(node, { colors: true, depth: 3 });
			return null;
	}
}

function copyMarkdownFileAsXml (orig, dest) {
	console.log(orig + ' => ' + dest);
	fs.outputFileSync(dest, trident.toString([
		'narrative',
		{
			date: new Date(path.basename(orig).substr(0, 8)).toDateString()
		},
		...unified()
			.use(markdown, { commonmark: true })
			.parse(fs.readFileSync(orig, 'utf-8'))
			.children
			.map(transform)
	]), 'utf8');
}

//copyMarkdownFileAsXml('../blog/20180519-1--initial-commit.md', '../build/derp.xml');
const srcDir = path.join(__dirname, '../blog');
const destDir = path.join(__dirname, '../build/blog');
glob.sync('*.md', { cwd: srcDir })
	.map(srcFile => copyMarkdownFileAsXml(path.join(srcDir, srcFile), path.join(destDir, srcFile.substr(0, srcFile.length - 3) + '.xml')));


