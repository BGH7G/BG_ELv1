const {user} = require('../model/index')
const {createToken} = require('../util/JWT')
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const register = req.body;
    await user.create(register);
    return res.status(201).send('success');
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    // 使用 .select('+password') 显式包含被排除的密码字段，以及其他数据内容
    const dbBack = await user.findOne({email}).select('+password');

    const isPasswordValid = await bcrypt.compare(password, dbBack.password)

    if (!isPasswordValid) {
        res.status(402).send('Incorrect email or password');
    } else {
        const dbToken = dbBack.toJSON();
        dbToken.token = await createToken(dbToken);
        res.status(200).send(dbToken);
    }
}

exports.list = async (req, res) => {
    res.send('Hello List!');
}
exports.delete = async (req, res) => {
    res.send('Hello Delete!');
}