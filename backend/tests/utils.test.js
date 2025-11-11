import add from '../src/controllers/recipesController.js';

// === TEST ===
test('addition simple', () => {
	expect(add(2, 3)).toBe(5);
});
