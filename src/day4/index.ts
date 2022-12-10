import * as fs from "fs";
import * as path from "path";
import { intersection, range } from "ramda";
import { arrayFromString } from "../utils";

const part1 = (input: string): number => {
	const assignments = arrayFromString(input);
	const overlaps = assignments.filter(assignment => {
		const [first, second] = assignment.split(",").map(pair => {
			const [min, max] = pair.split("-").map(Number);
			return {min, max};
		});
		if ((first.min <= second.min && first.max >= second.max) || (second.min <= first.min && second.max >= first.max) ) {
			return true;
		}
		return false;
	});
	return overlaps.length;
};

const part2 = (input: string): number => {
	const assignments = arrayFromString(input);
	const overlaps = assignments.filter(assignment => {
		const [first, second] = assignment.split(",").map(pair => {
			const [min, max] = pair.split("-").map(Number);
			return {min, max};
		});
		const range1 = range(first.min, first.max+1);
		const range2 = range(second.min, second.max+1);
		const intersect = intersection(range1, range2);
		if (intersect.length > 0)
			return true;
		return false;
	});
	return overlaps.length;
};

const list = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
console.log("Part 1 answer: ", part1(list)); //540
console.log("Part 2 answer: ", part2(list));

export { part1, part2 };