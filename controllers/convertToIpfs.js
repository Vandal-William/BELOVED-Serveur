import * as IPFS from 'ipfs-core'
import fs from 'fs'

   export async function jsonToIpfs(req, res) {

        const {name, description} = req.body

        const imagesDir = './uploads'

        const files = fs.readdirSync(imagesDir)
        const gateway = 'https://ipfs.io/ipfs/'

        const ipfs = await IPFS.create()

        for(let file of files) {
        const buffer = fs.readFileSync(`${imagesDir}/${req.file.originalname}`)
        const result = await ipfs.add(buffer)
        const image = gateway+result.path
        console.log(image)
        
        }  
    
    }
