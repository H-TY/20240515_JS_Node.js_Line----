import axios from 'axios'
import { distance } from '../utils/distance.js'
import template from '../templates/taiwangods.js'
import fs from 'node:fs'

export default async event => {
  try {
    const { data } = await axios.post('https://taiwangods.moi.gov.tw/Control/SearchDataViewer.ashx?t=landscape', new URLSearchParams({
      lang: 1,
      area: '',
      rtype: '',
      festival: '',
      keyWord: '',
      festival_s: '',
      festival_e: ''
    }))
    const replies = data
      .map(d => {
        d.distance = distance(d.L_MapY, d.L_MapX, event.message.latitude, event.message.longitude, 'K')
        return d
      })
      .sort((a, b) => {
        return a.distance - b.distance
      })
      .slice(0, 4)
      .map(d => {
        const t = template()
        t.body.contents[0].text = d.LL_Title
        t.body.contents[1].text = d.LL_Highlights
        t.body.contents[2].contents[0].contents[1].text = d.LL_Country + d.LL_Area + d.LL_Address
        t.body.contents[2].contents[1].contents[1].text = d.LL_OpeningData
        t.body.contents[2].contents[2].contents[1].text = d.LL_OpeningTime
        t.footer.contents[0].action.uri = `https://www.google.com/maps/search/?api=1&query=${d.L_MapY},${d.L_MapX}`
        t.footer.contents[1].action.uri = `https://taiwangods.moi.gov.tw/html/landscape/1_0011.aspx?i=${d.L_ID}`
        return t
      })
    const result = await event.reply({
      type: 'flex',
      altText: '宗教文化查詢結果',
      contents: {
        type: 'carousel',
        contents: replies
      }
    })
    if (process.env.DEBUG === 'true') {
      console.log(result)
      if (result.message) {
        fs.writeFileSync('./dump/twgod.json', JSON.stringify(replies, null, 2))
      }
    }
  } catch (error) {
    console.log(error)
    event.reply('發生錯誤')
  }
}
