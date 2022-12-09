import { part1, part2 } from ".";
const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

test("part1", () => {
	expect(part1(input)).toEqual(157);
});

test("part2", () => {
	expect(part2(input)).toEqual(70);
});
