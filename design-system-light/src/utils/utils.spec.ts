import { fnAssignPropFromAlias } from './utils';

describe('fnAssignPropFromAlias', () => {
	it('reads boolean aliases when the attribute is present without a value', () => {
		const host = document.createElement('div') as any;
		host.setAttribute('parent-disabled', '');

		expect(fnAssignPropFromAlias(host, 'parent-disabled')).toBe(true);
	});

	it('parses numeric aliases into numbers', () => {
		const host = document.createElement('div') as any;
		host.setAttribute('page-size', '20');

		expect(fnAssignPropFromAlias<number>(host, 'page-size')).toBe(20);
	});

	it('falls back to camelCase aliases when needed', () => {
		const host = document.createElement('div') as any;
		host.setAttribute('currentDisabledStatus', 'true');

		expect(fnAssignPropFromAlias(host, 'current-disabled-status')).toBe(true);
	});
});
