const arrayFromString = (input: string, separator = "\n"): string[] => {
	return input.split(separator);
};

const dedupe = (input: string): Array<string> => {
	return [...new Set(input)];
};

export { arrayFromString, dedupe };