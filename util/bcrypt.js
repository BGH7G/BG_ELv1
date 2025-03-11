const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'nihao44279911'

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
       // console.log(hash); // 加密后的内容
    });
});

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    //console.log(hash);
});

//.log(bcrypt.hash(myPlaintextPassword, saltRounds));
//console.log(bcrypt.hashSync(myPlaintextPassword, saltRounds));