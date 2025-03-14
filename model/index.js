const mongoose = require('mongoose');

async function main (){
    // await mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/`)
    await mongoose.connect(`mongodb://${process.env.DB_HOST}/expressL`)
}
main().then( ()=>{
    console.log('connected successfully');
}).catch(()=>{
    console.log('connect failed');
})

module.exports = {
    user : mongoose.model('User', require("./userModel")),
    video : mongoose.model('Video', require("./videoModel")),
}