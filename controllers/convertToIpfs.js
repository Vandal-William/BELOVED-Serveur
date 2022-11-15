const ipfs = require('ipfs-api')()

const mintIpfs = {

    jsonToIpfs(req, res) {

        const data = {...req.body}
        if (data.original_image !== null && data.name !== null ){
            res.json(data)
        } 
        else {
            
            res.json('Empty Data')
        }
    
    }
}

module.exports = mintIpfs;