import * as fs from 'fs'
import * as path from 'path'
// import * as R from 'ramda'

const player1Options: {[key: string]: string} = {
    "A": "Rock",
    "B": "Paper",
    "C": "Scissors"
}
const player2Options: {[key: string]: string} = {
    "X": "Rock",
    "Y": "Paper",
    "Z": "Scissors"
}

const choicePoints: {[key: string]: number} = {
    "Rock": 1,
    "Paper": 2,
    "Scissors": 3
}

const part2Strategies: {[key: string]: string} = {
    "X": "lose",
    "Y": "draw",
    "Z": "win"
}

const scoreTheRound = (player1: string, player2: string): number => {
    const player1Choice = player1Options[player1]
    const player2Choice = player2Options[player2]

    let score = 0
    if (player1Choice === player2Choice) {
        score = 3 + choicePoints[player1Choice]
    }
    else if(player1Choice === 'Rock') {
        if (player2Choice === 'Scissors')
            score = 0 + choicePoints[player2Choice]
        else
            score = 6 + choicePoints[player2Choice]
    }
    else if (player1Choice === 'Scissors') {
        if (player2Choice === 'Paper')
            score = 0 + choicePoints[player2Choice]
        else
            score = 6 + choicePoints[player2Choice]
    }
    else if (player1Choice === 'Paper') {
        if (player2Choice === 'Rock')
            score = 0 + choicePoints[player2Choice]
        else
            score = 6 + choicePoints[player2Choice]
    }
    return score
}

const getMyPick = (player1: string, strategy: string): string => {
    if (strategy === 'win') {
        switch (player1) {
            case "Rock":
                return 'Paper'
            case 'Scissors':
                return 'Rock'
            case 'Paper':
                return 'Scissors'
        }
    }
    else if (strategy === 'lose') {
        switch (player1) {
            case "Rock":
               return 'Scissors'
            case "Scissors":
                return "Paper"
            case "Paper":
                return "Rock"
        }
    }
    return player1
}
const determineYourPick = (player1: string, result: string): number => {

    const roundResult = part2Strategies[result]
    const player1Choice = player1Options[player1]
    const myPick = getMyPick(player1Choice, roundResult)
    if (roundResult === 'draw')
        return 3 + choicePoints[myPick]
    if (roundResult === 'win')
        return 6 + choicePoints[myPick]
    if (roundResult === 'lose')
        return 0 + choicePoints[myPick]
    return 0
}

const part1 = (input: string) => {
    const list = input.split('\n')
    const scores: number[] = list.map((round) => {
        const choices = round.split(' ')
        const [player1, player2] = choices
        return scoreTheRound(player1, player2)
    })
    let total = scores.reduce((total: number, score: number) => {
        return total + score
    })
    return total;
}

const part2 = (input: string) => {
    const list = input.split('\n')
    const scores: number[] = list.map((round) => {
        const choices = round.split(' ')
        const [player1, player2] = choices
        return determineYourPick(player1, player2)
    })
    let total = scores.reduce((total: number, score: number) => {
        return total + score
    })
    return total
}
const list = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
console.log("Part 1 answer: ", part1(list))
console.log("Part 2 answer: ", part2(list))