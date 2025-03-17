const {user, subscribe} = require('../model/index')
const _ = require('lodash')
const {createToken} = require('../util/JWT')
const bcrypt = require('bcrypt');
const {video} = require("../model");

exports.register = async (req, res) => {
    const register = req.body;
    await user.create(register);
    return res.status(201).json({msg: 'success'});
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    // 使用 .select('+password') 显式包含被排除的密码字段，以及其他数据内容
    const dbBack = await user.findOne({email}).select('+password');

    const isPasswordValid = await bcrypt.compare(password, dbBack.password)

    if (!isPasswordValid) {
        res.status(402).json({msg: 'Incorrect email or password'});
    } else {
        const dbToken = dbBack.toJSON();
        dbToken.token = await createToken(dbToken);
        res.status(200).json(dbToken);
    }
}

exports.list = async (req, res) => {
    res.json({msg: 'Hello List!'});
}

exports.update = async (req, res) => {
    await user.findByIdAndUpdate(req.user._id, req.body, {new: true})
    return res.status(201).json({msg: 'updated successfully'});
}

exports.avatarUpload = async (req, res) => {
    const avatar = req.file.filename;
    await user.findByIdAndUpdate(req.user._id, {avatar: avatar})
    res.status(201).json({msg: 'Avatar upload successfully'})
}

exports.delete = async (req, res) => {
    res.json({msg: 'Hello Delete!'});
}

exports.subscribe = async (req, res) => {
    const userId = req.user._id;
    const subscribeId = req.params.id;
    const existingSubscription = await subscribe.findOne({
        userID: userId,
        channelID: subscribeId
    });
    const findSubscribe = await user.findOne({_id: subscribeId});
    try {
        if (userId === subscribeId) {
            return res.status(400).json({msg: 'You can`t subscribe to yourself'});
        }
        if (existingSubscription) {
            return res.status(400).json({msg: 'You cannot subscribe to the same user repeatedly'});
        }
        if (!findSubscribe) {
            return res.status(400).json({msg: 'The user cannot be found'});
        } else {
            await subscribe.create({userID: userId, channelID: subscribeId})
            const result = await user.findByIdAndUpdate(subscribeId, {$inc: {subscribeCount: 1}}, {new: true})
            return res.status(200).json({msg: 'Subscription successfully!', result});
        }
    } catch (err) {
        return res.status(500).json({msg: 'Unknown server error'});
    }
}

exports.unsubscribe = async (req, res) => {
    const userId = req.user._id;
    const subscribeId = req.params.id;
    const existingSubscription = await subscribe.findOne({
        userID: userId,
        channelID: subscribeId
    });
    try {
        if (userId === subscribeId) {
            return res.status(400).json({msg: 'You can`t unsubscribe to yourself'});
        }
        if (!existingSubscription) {
            return res.status(400).json({msg: 'You didnt subscribe the channel'})
        }
        await subscribe.deleteOne({
            userID: userId,
            channelID: subscribeId
        });
        const result = await user.findByIdAndUpdate(subscribeId, {$inc: {subscribeCount: -1}}, {new: true})
        res.status(200).json({msg: 'unsubscription successfully!', result});
    } catch (err) {
        return res.status(500).json({msg: 'Unknown server error'});
    }
}

exports.getChannel = async (req, res) => {
    let isSubscribe = false;
    const channelId = req.params.id;
    let data = await user.findById(channelId);
    data = _.pick(data, ['username', 'avatar', 'subscribeCount', 'channelDesc', 'cover'])
    if (!req.user) {
        if (!data) {
            return res.status(400).json({msg: 'The channel does not exist'});
        }
        return res.status(200).json({isSubscribe, ...data});
    }
    const userID = req.user._id;
    const isSubscribed = await subscribe.findOne({userID: userID, channelID: channelId});
    if (!isSubscribed) {
        if (!data) {
            return res.status(400).json({msg: 'The channel does not exist'});
        }
        return res.status(200).json({isSubscribe, ...data});
    }
    isSubscribe = true
    return res.status(200).json({isSubscribe, ...data});
}

exports.subscribeList = async (req, res) => {
    const userId = req.params.id;
    let {pageNumber, pageSize} = req.query;
    if (!pageNumber || !pageSize) {
        //  默认分页数据
        pageNumber = 1;
        pageSize = 10;
    }
    let data = await subscribe.find({userID: userId})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({createdAt: -1})
        .populate('channelID')
    ;
    const filterData = data.map((item) => {
        item = _.pick(item.channelID, ['username', 'avatar', 'subscribeCount', 'channelDesc', 'cover']);
        return item;
    })
    res.status(200).json({filterData});
}

exports.channelFans = async (req, res) => {
    const channelId = req.params.id;
    let {pageNumber, pageSize} = req.query;
    if (!pageNumber || !pageSize) {
        //  默认分页数据
        pageNumber = 1;
        pageSize = 10;
    }

    let data = await subscribe.find({channelID: channelId}).populate('userID')
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({createdAt: -1})
    ;
    const filterData = data.map((item) => {
        item = _.pick(item.userID, ['username', 'avatar', 'subscribeCount', 'channelDesc', 'cover']);
        return item;
    })
    res.status(200).json({filterData});
}