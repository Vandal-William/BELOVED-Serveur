const ipfs = require('ipfs-api')()

const input = [
  {
    'id': '0x10',
    'date': '14.07.2018'
  },
  {
    'id': '0x20',
    'date': '14.07.2018'
  },
  {
    'id': '0x30',
    'date': '14.07.2018'
  }
]

ipfs.files.add(Buffer.from(JSON.stringify(input)))
  .then(res => {
    console.log(res)
    // const hash = res[0].hash
    // console.log('added data hash:', hash)
    // return ipfs.files.cat(hash)
  })
//   .then(output => {
//     console.log('retrieved data:', JSON.parse(output))
//   })