import * as fs from "fs";
import * as path from "path";
import {add} from "ramda";
import { arrayFromString } from "../utils";

const playerTranslates: {[key: string]: string} = {
	"A": "Rock",
	"B": "Paper",
	"C": "Scissors",
	"X": "Rock",
	"Y": "Paper",
	"Z": "Scissors"
};

const part2Strategies: {[key: string]: string} = {
	"X": "lose",
	"Y": "draw",
	"Z": "win"
};

// Outer object values are player 1 choices.  Once that is made, player 2's
// choice determines points (choicePoints + win(6)/lose(0)/draw(3))
const rockpaperscissors: {[key: string]: {[key: string]: number}} = {
	"Rock": {
		"Rock": 4,
		"Scissors": 3,
		"Paper": 8
	},
	"Scissors": {
		"Rock": 7,
		"Scissors": 6,
		"Paper": 2
	},
	"Paper": {
		"Rock": 1,
		"Scissors": 9,
		"Paper": 5
	}
};

const scoreTheRound = (player1: string, player2: string): number => {
	const player1Choice = playerTranslates[player1];
	const player2Choice = playerTranslates[player2];
	return rockpaperscissors[player1Choice][player2Choice];
};

const getMyPick = (player1: string, strategy: string): string => {
	if (strategy === "win") {
		switch (player1) {
		case "Rock":
			return "Paper";
		case "Scissors":
			return "Rock";
		case "Paper":
			return "Scissors";
		}
	}
	else if (strategy === "lose") {
		switch (player1) {
		case "Rock":
			return "Scissors";
		case "Scissors":
			return "Paper";
		case "Paper":
			return "Rock";
		}
	}
	return player1;
};

const determineYourPick = (player1: string, result: string): number => {
	const roundResult = part2Strategies[result];
	const player1Choice = playerTranslates[player1];
	const myPick = getMyPick(player1Choice, roundResult);
	return rockpaperscissors[player1Choice][myPick];
};

const part1 = (input: string) => {
	const list = arrayFromString(input);
	const scores: number[] = list.map((round) => {
		const [player1, player2] = round.split(" ");
		return scoreTheRound(player1, player2);
	});
	const total = scores.reduce(add);
	return total;
};

const part2 = (input: string) => {
	const list = arrayFromString(input);
	const scores: number[] = list.map((round) => {
		const [player1, player2] = round.split(" ");
		return determineYourPick(player1, player2);
	});
	const total = scores.reduce(add);
	return total;
};

const list = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const solution1 = part1(list);
const solution2 = part2(list);
console.log("Part 1 answer: ", solution1);
console.log("Part 2 answer: ", solution2);

export { part1, part2 };