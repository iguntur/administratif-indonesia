'use strict';

const makeTree = (input, parent) => {
	const segments = input.filter(obj => obj.parent === parent);

	if (segments.length > 0) {
		return segments.map(obj => {
			const childrens = makeTree(input, obj.code);

			delete obj.parent;

			return childrens ? Object.assign({}, obj, {childrens}) : obj;
		});
	}
};

module.exports = input => {
	input = input.map(obj => {
		const codes = obj.code.split('.');
		codes.pop();

		obj.parent = codes.length > 0 ? codes.join('.') : null;

		return obj;
	});

	return makeTree(input, null);
};
