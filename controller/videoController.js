exports.list = async (req, res) => {
    res.send('Hello Nick!');
}

exports.id = async (req, res) => {
    let id = req.params.id;
    res.send(id)
}

