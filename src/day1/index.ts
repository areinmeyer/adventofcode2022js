import * as fs from "fs";
import * as path from "path";
import { add, reverse, sort } from "ramda";

const getElves = (list: string[]): number[][] => {
	const elfList : number[][] = [];
	let elfFood :number[] = [];
	for (let i = 0; i < list.length; i++) {
		if (list[i] == "") {
			elfList.push(elfFood);
			elfFood = [];
		}
		else {
			const num = parseInt(list[i]);
			elfFood.push(num);
		}
	}
	return elfList;
};

const getElfTotalCalories = (elf: number[]) => {
	return elf.reduce(add);
};

const foldElves = (elves: number[][]): number[] => {
	return elves.map((elf) => {
		return getElfTotalCalories(elf);
	});
};

const determineMostCalories = (elfTotals: number[]): number => {
	return elfTotals.reduce((maxCalories, calorie) => {
		return maxCalories > calorie ? maxCalories : calorie;
	});
};

const determineTopNMostCalories = (elfTotals: number[], n: number): number[] => {
	const sorter = (a: number,b: number) => { return a - b;};
	return reverse(sort(sorter,elfTotals)).slice(0,n);
};

const part1 = (calorieString: string) => {
	const allcalories = calorieString.split("\n");
	return determineMostCalories(foldElves(getElves(allcalories)));
};

const part2 = (calorieString: string) => {
	const allcalories = calorieString.split("\n");
	const maxCalories = determineTopNMostCalories(foldElves(getElves(allcalories)),3);
	const totals: number = maxCalories.reduce(add);
	return totals;
};

const list = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
console.log(`Part 1 result: ${part1(list)}`);
console.log(`Part 2 result: ${part2(list)}`);
export { part1, part2 };