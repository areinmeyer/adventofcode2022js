import * as fs from "fs";
import * as path from "path";
import {add, intersection } from "ramda";
import { arrayFromString, dedupe } from "../utils";
const letters = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Rucksack = {
    part1: string;
    part2: string;
    length: number
}

const getPriorityValue = (letter: string): number => {
	return letters.indexOf(letter);
};

const findMatches = (rucksack: Rucksack): string => {
	const part1 = dedupe(rucksack.part1);
	const part2 = dedupe(rucksack.part2);
	const priority = intersection(part1, part2);
	return priority.join("");
};

const part1 = (input: string): number => {
	const list = arrayFromString(input);
	const priorities = list.map(rucksack => {
		const length = rucksack.length;
		return {
			"part1": rucksack.slice(0,length / 2),
			"part2": rucksack.slice(length / 2),
			length
		};
	}).map(ruck => {
		const match = findMatches(ruck);
		return getPriorityValue(match);
	});
	return priorities.reduce(add);
};


const parseGroups = (list: string[]): string[] => {
	const acc:string[] = [];
	const intersects = list.slice(0,3).map(ruck => {
		return dedupe(ruck);
	}).reduce((acc, ruck) => {
		return intersection(acc, ruck);
	});
	acc.push(...intersects);
	if (list.length > 3) {
		const sliced = list.slice(3, list.length);
		acc.push(...parseGroups(sliced));
	}
	return acc;
};

const part2 = (input: string): number => {
	const list = arrayFromString(input);
	let priorities:string[] = [];
	priorities = parseGroups(list);
	const num = priorities.map(priority => {
		const val = getPriorityValue(priority[0]);
		return val;
	}).reduce(add);
	return num;
};

const list = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
console.log("Part 1 answer: ", part1(list));
console.log("Part 2 answer: ", part2(list));

export { part1, part2 };