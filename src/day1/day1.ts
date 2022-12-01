import * as fs from 'fs'
import * as path from 'path'
import * as R from 'ramda'

const getElves = (list: string[]): number[][] => {
    let elfList : number[][] = []
    let elfFood :number[] = []
    for (let i = 0; i < list.length; i++) {
        if (list[i] == '') {
            elfList.push(elfFood);
            elfFood = []
        }
        else {
            const num = parseInt(list[i])
            elfFood.push(num)
        }
    }
    return elfList;
}

const getElfTotalCalories = (elf: number[]) => {
    return elf.reduce((totalCals, calories) => {
        return totalCals + calories
    })
}

const foldElves = (elves: number[][]): number[] => {
    return elves.map((elf) => {
        return getElfTotalCalories(elf)
    })
}

const determineMostCalories = (elfTotals: number[]): number => {
    const maxCalories = 0;
    return elfTotals.reduce((maxCalories, calorie) => {
        return maxCalories > calorie ? maxCalories : calorie
    })
}

const determineTopNMostCalories = (elfTotals: number[], n: number): number[] => {
    const sorter = (a: number,b: number) => { return a - b}
    return R.reverse(R.sort(sorter,elfTotals)).slice(0,3)
}

const part1 = (calorieString: string) => {
    const allcalories = calorieString.split('\n')
    return determineMostCalories(foldElves(getElves(allcalories)))
}

const part2 = (calorieString: string) => {
    const allcalories = calorieString.split('\n')
    const maxCalories = determineTopNMostCalories(foldElves(getElves(allcalories)),3)
    let totals: number = maxCalories.reduce((totals, calorie) => {
        totals = totals + calorie
        return totals
    })
    return totals
}

const list = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
console.log(`Part 1 result: ${part1(list)}`)
console.log(`Part 2 result: ${part2(list)}`)
export { getElves }