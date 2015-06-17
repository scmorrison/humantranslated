'use strict';

describe('Stories E2E Tests:', function() {
	describe('Test stories page', function() {
		it('Should report missing credentials', function() {
			browser.get('http://localhost:3000/#!/stories');
			expect(element.all(by.repeater('story in stories')).count()).toEqual(0);
		});
	});
});
