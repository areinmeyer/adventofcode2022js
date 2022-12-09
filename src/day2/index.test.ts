import { part1, part2 } from ".";
const input = `A Y
B X
C Z`;

test("part1", () => {
	expect(part1(input)).toEqual(15);
});

test("part2", () => {
	expect(part2(input)).toEqual(12);
});