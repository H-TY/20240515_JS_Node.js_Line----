import axios from 'axios'

const main = async event => {
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
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

main()
