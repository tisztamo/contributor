// Returns a string to be used as AI prompt, composed of a task description and the current attention

import { readAttention } from "../attention/readAttention.js"

const createQuery = async (task) => {
  return `${(await readAttention())}\n${task ? task : ""}`
}

export default createQuery