import { TRIES } from './config.js';
import { async } from 'regenerator-runtime';

export const state = {
  wordsSubmitted: [],
  tries: TRIES,
  currentTimerID: null,
};

export async function searchTheWord(word) {
  try {
    const result = await fetch(
      `https://wordsapiv1.p.rapidapi.com/words/${word}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            'c9c7045ac4mshbf9d5ab6252841cp1dfc2bjsnf03d281df14b',
          'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
        },
      }
    );

    return result.ok;
  } catch (err) {
    throw err;
  }
}
