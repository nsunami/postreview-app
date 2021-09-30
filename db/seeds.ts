import db from "./index"
import { reviewAnswers } from "./reviewAnswers"
import { reviewQuestions } from "./reviewQuestions"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }
  for (let reviewQuestion of reviewQuestions) {
    await db.reviewQuestions.create({
      data: reviewQuestion,
    })
    await db.reviewAnswers.create({
      data: reviewAnswers,
    })
  }
}

export default seed
