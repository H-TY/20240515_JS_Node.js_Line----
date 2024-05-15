import { exrate } from '../data/usdtwd.js'

export default async (event) => {
  try {
    const result = await event.reply(exrate.toString())
    if (process.env.DEBUG === 'true') {
      console.log(result)
    }
  } catch (error) {
    console.log(error)
  }
}
