import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPEN_AI_SECRET,
});
const openai = new OpenAIApi(configuration);

export type Correction = {
  reason: string;
  correctedText: string;
  originalText: string;
};

export default class OpenAICorrector {
  async correctComposition(composition: string, compositionLanguage: string) {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: [
        {
          role: "system",
          content: "Reply only with JSON",
        },
        {
          role: "system",
          content: `I will send you a paragraph of text in ${compositionLanguage} that I want you to correct for any grammar or vocabulary errors. The response format is an array of objects. For each sentence of the paragraph, create an object which has an 'originalText' property (the original text), a 'correctedText' property (grammatically correct version of the text in ${compositionLanguage}) and a 'reason' property, giving a reason for the correction in English. The reason can be an empty string if there are no errors.`,
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
