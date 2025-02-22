import banglaAlphabets from '../common/bangladeshi-bangla-alphabets';
import joinedAlphabets from '../common/bangladeshi-joined-alphabets';
import numberAlphabets from '../common/bangladeshi-number-alphabets';
import signAlphabets from '../common/bangladeshi-sign-alphabets';
import vowelAlphabets from '../common/bangladeshi-vowel-alphabets';
import vowelSignAlphabets from '../common/bangladeshi-vowel-sign-alphabets';
import mappingMap from '../common/mapping/re-arrangement-map';


const unicodeConverter = (text: string): string => {
	const mappings = new Map<string, string>([
		...banglaAlphabets.map(([k, v]) => [v, k] as [string, string]),
		...vowelAlphabets.map(([k, v]) => [v, k] as [string, string]),
		...vowelSignAlphabets.map(([k, v]) => [v, k] as [string, string]),
		...numberAlphabets.map(([k, v]) => [v, k] as [string, string]),
		...signAlphabets.map(([k, v]) => [v, k] as [string, string]),
		...joinedAlphabets.map(([k, v]) => [v, k] as [string, string]),
	]);

	let convertedText = '';
	let i = 0;

	while (i < text.length) {
		let char = text[i];
		let nextChar = text[i + 1] || '';

		// Handle joined alphabets
		if (mappings.has(char)) {
			convertedText += mappings.get(char);
			i++;
		} else {
			convertedText += char;
			i++;
		}
	}

	return convertedText;
};

export default function UnicodeToBijoy(text: string): string {
	const mappings = new Map([...mappingMap.map(([k, v]) => [v, k] as [string, string])]);

	var remappingText = '';

	// Unicode to Bijoy remapping
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		const nextChar = text[i + 1];

		if (mappings.has(nextChar)) {
			let charMatch = mappings.get(nextChar);

			if (charMatch && charMatch.length || 0 > 1) {
				remappingText += charMatch?.charAt(0) + char + charMatch?.charAt(1);
			} else {
				remappingText += nextChar + char;
			}
			i++;
		} else {
			remappingText += char;
		}
	}

	return unicodeConverter(remappingText);
}
