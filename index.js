import 'dotenv/config'
import linebot from 'linebot'
import commandFE from './commands/fe.js'
import commandTWGod from './commands/twgod.js'
import commandUsd from './commands/usd.js'
import { scheduleJob } from 'node-schedule'
import * as usdtwd from './data/usdtwd.js'

// https://crontab.guru/#0_5_*_*_*
scheduleJob('0 5 * * *', () => {
  usdtwd.update()
})
usdtwd.update()

const bot = linebot({
  channeId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', event => {
  if (process.env.DEBUG === 'true') {
    console.log(event)
  }
  if (event.message.type === 'text') {
    if (event.message.text === '前端') {
      commandFE(event)
    } else if (event.message.text === 'usd') {
      commandUsd(event)
    } else if (event.message.text === 'qr') {
      event.reply({
        type: 'text',
        text: '123',
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                type: 'message',
                // 使用者按下去會傳回的文字
                text: 'ubike:taipei',
                // 按鈕上的文字
                label: 'taipei'
              }
            },
            {
              type: 'action',
              action: {
                type: 'uri',
                uri: 'https://wdaweb.github.io',
                label: '職訓'
              }
            },
            {
              type: 'action',
              action: {
                type: 'postback',
                label: 'postback',
                data: 'aaa'
              }
            }
          ]
        }
      })
    }
  } else if (event.message.type === 'location') {
    commandTWGod(event)
  }
})

bot.on('postback', event => {
  console.log(event)
  event.reply('aaa')
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
