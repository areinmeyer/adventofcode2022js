import * as fs from "fs";
import * as path from "path";
import {drop, head, indexOf, insertAll, partial, reverse,take, takeLast} from "ramda";
import { arrayFromString } from "../utils";

type Instruction = [counter: number, startStack: number, endStack: number];

const createInstruction = (countStr: string, startStr: string, endStr: string) => {
	return [Number(countStr), parseInt(startStr), parseInt(endStr)] as Instruction;
};

const parseStacks = (list: string[]) => {
	const lineNumRowCheck = new RegExp(/^\d+/);
	const lineNumRow = list.filter(row => {
		return lineNumRowCheck.test(row.trim());
	});
	if (lineNumRow.length != 1) {
		throw Error(`should be one match in ${lineNumRow.join("\n")}`);
	}
	const stackCounters: string[] = lineNumRow[0].split(" ").filter(val => val !== "");
	const lastStack = takeLast(1, stackCounters)[0];
	const numStacks = parseInt(lastStack);

	const stackMap: {[key: string]: string[]} = {};
	for (let i = 1; i <= numStacks; i++) {
		stackMap[i.toString()] = [];
	}
	list.slice(0,-1).map(row => {
		const numPieces = row.length/4 + 1;
		let currPointer = 0;
		for (let s = 1; s < numPieces; s++) {
			const stack = row.substring(currPointer, currPointer+4).trim();
			if (stack !== "") {
				stackMap[s.toString()].push(stack);
			}
			currPointer += 4;
		}
	});
	return stackMap;
};

const parseIntstructions = (list: string[]): Instruction[] => {
	const instrRexExp = /^\w+\s(\d+)\s\w+\s(\d+)\s\w+\s(\d+)$/g;
	const instructions: Instruction[] = list.map(instr => {
		const result = [...instr.matchAll(instrRexExp)][0];
		const instruction: Instruction = createInstruction(
			result[1], result[2], result[3]);
		return instruction;
	});
	return instructions;
};

const performActions = (doReverse: boolean, instructions:Instruction[], stacks: {[key: string]: string[]}) => {
	instructions.map(instruction => {
		const toMove = doReverse ? reverse(take(instruction[0], stacks[instruction[1]])) : take(instruction[0], stacks[instruction[1]]);
		stacks[instruction[1]] = drop(instruction[0], stacks[instruction[1]]);
		stacks[instruction[2]] = insertAll(0,toMove, stacks[instruction[2]]);
	});
	return stacks;
};

const getStackHeads = (stacks: {[key: string]: string[]}) => {
	const stackKeys = Object.keys(stacks);
	return stackKeys.map(stack => {

		const top = head(stacks[stack]);
		if (top)
			return top.split("")[1];
	});
};

const crateMover9000 = partial(performActions, [true]);
const crateMover9001 = partial(performActions, [false]);

const part1 = (input: string): string => {
	const inputArr = arrayFromString(input);
	const splitter = indexOf("",inputArr);
	const stackList = inputArr.slice(0,splitter);
	const instructionList = inputArr.slice(splitter+1);

	const instructions = parseIntstructions(instructionList);
	const stacks = parseStacks(stackList);
	const updated = crateMover9000(instructions, stacks);
	return getStackHeads(updated).join("");
};

const part2 = (input: string): string => {
	const inputArr = arrayFromString(input);
	const splitter = indexOf("",inputArr);
	const stackList = inputArr.slice(0,splitter);
	const instructionList = inputArr.slice(splitter+1);

	const instructions = parseIntstructions(instructionList);
	const stacks = parseStacks(stackList);
	const updated = crateMover9001(instructions, stacks);
	return getStackHeads(updated).join("");
};

const list = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
console.log("Part 1 answer: ", part1(list)); //WCZTHTMPS
console.log("Part 2 answer: ", part2(list)); //BLSGJSDTS

export { part1, part2 };