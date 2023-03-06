import { Configuration, OpenAIApi } from "openai";
import { LOCAL_STORAGE_COMPOSITION_KEY } from "../constants";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPEN_AI_SECRET,
});

const openai = new OpenAIApi(configuration);

export type Correction = {
  reason: string;
  correctedText: string;
  originalText: string;
};

/** We will be saving the correction to local storage for now, but in the future we'd want them to be associated with a logged in user, and persist */
export function saveCorrection(correction: Correction[], key: number) {
  let stored = getCompositions();

  stored = { ...stored, [key]: correction };
  localStorage.setItem(LOCAL_STORAGE_COMPOSITION_KEY, JSON.stringify(stored));
}

export function getComposition(key: number) {
  const stored = getCompositions();
  return stored[key];
}

export function getCompositions() {
  return JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_COMPOSITION_KEY) ?? "{}"
  );
}

export function deleteComposition(key: string) {
  let stored = getCompositions();

  stored = delete stored[key];
  localStorage.setItem(LOCAL_STORAGE_COMPOSITION_KEY, JSON.stringify(stored));
}

export default class OpenAICorrector {
  async correctComposition(composition: string, compositionLanguage: string) {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: [
        {
          role: "system",
          content: "Reply only with JSON.",
        },
        {
          role: "system",
          content: `I will send you a paragraph of text in ${compositionLanguage} that I want you to correct for any grammar or vocabulary errors. The response format is an array of objects. For each sentence of the paragraph, create an object which has an 'originalText' property (the original text), a 'correctedText' property (grammatically correct version of the text in ${compositionLanguage}) and a 'reason' property, giving a reason for the correction in English. The reason can be an empty string if there are no errors. The 'reason' property needs to be written in English. The composition may also contain English words. Please give the correct word in the 'reason' field.`,
        },
        {
          role: "user",
          content: composition,
        },
      ],
    });

    const correction = response.data.choices[0].message?.content
      ? JSON.parse(response.data.choices[0].message?.content)
      : null;

    const verified = this.verifyCorrection(correction);
    if (!verified) {
      throw new Error("Response is missing required property.");
    }
    return correction;
  }

  /** Make sure the JSON.parsed response from openAI is the correct value */
  verifyCorrection(correction: Correction[]) {
    return correction.every(
      (correction) =>
        correction.hasOwnProperty("reason") &&
        correction.hasOwnProperty("correctedText") &&
        correction.hasOwnProperty("originalText")
    );
  }
}
