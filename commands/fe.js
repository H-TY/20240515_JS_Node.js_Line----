import axios from 'axios'
import * as cheerio from 'cheerio'

export default async (event) => {
  try {
    const { data } = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)
    const courses = []
    $('#fe .card-title').each(function () {
      courses.push($(this).text().trim())
    })
    const result = await event.reply(courses)
    if (process.env.DEBUG === 'true') {
      console.log(result)
    }
  } catch (error) {
    console.log(error)
    event.reply('發生錯誤')
  }
}
