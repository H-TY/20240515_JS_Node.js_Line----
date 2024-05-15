import axios from 'axios'

export let exrate = 32

export const update = async () => {
  try {
    const { data } = await axios.get('https://tw.rter.info/capi.php')
    exrate = data.USDTWD.Exrate
  } catch (error) {
    console.log(error)
  }
}
