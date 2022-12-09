import * as fs from "fs";
import * as path from "path";
// import * as R from 'ramda'
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
	const letterMap = new Map();
	const part1 = dedupe(rucksack.part1);
	const part2 = dedupe(rucksack.part2);
	part1.map(letter => {
		letterMap.set(letter, 1);
	});
	part2.map(letter => {
		if (letterMap.has(letter)) {
			let count = letterMap.get(letter);
			letterMap.set(letter, ++count);
		}
		else {
			letterMap.set(letter, 1);
		}
	});
	let priority = "";
	letterMap.forEach((value, key) => {
		if (value > 1) {
			priority = key;
		}
	});
	return priority;
};

const part1 = (input: string): number => {
	const list = arrayFromString(input);
	const rucks = list.map(rucksack => {
		const length = rucksack.length;
		return {
			"part1": rucksack.slice(0,length / 2),
			"part2": rucksack.slice(length / 2),
			length
		};
	});
	const priorities = rucks.map(ruck => {
		const match = findMatches(ruck);
		return getPriorityValue(match);
	});
	return priorities.reduce((total, priority) => {
		return total + priority;
	});
};
const list = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
console.log("Part 1 answer: ", part1(list));
// console.log("Part 2 answer: ", part2(list));