const path = require('path')
 
module.exports = {
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'build/dist'),
        filename:'bundle.js'
    }
}