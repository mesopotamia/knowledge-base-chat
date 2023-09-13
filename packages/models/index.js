import { HfInference } from "@huggingface/inference";
import {config} from "dotenv";

config()
const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

const hf = new HfInference(HF_ACCESS_TOKEN);
const result = await hf.featureExtraction({
  model: "intfloat/e5-small",
  inputs: "That is a happy person",
});
const result2 = await hf.featureExtraction({
  model: "intfloat/e5-small",
  inputs: "That is a happy person",
});
function dotProduct(vector1, vector2) {
  let result = 0;
  for (let i = 0; i < vector1.length; i++) {
    result += vector1[i] * vector2[i];
  }
  return result;
}
console.log(dotProduct(result, result2));
