const {video} = require('../../model/index');

const dataSorting = async (request) => {

    // 从query中获取数据
    let { pageNumbers, pageSizes } = request;

    if (!pageNumbers || !pageSizes ) {
        //  默认分页数据
        pageNumbers = 1;
        pageSizes = 10;
    }

    let videosList = await video.find({})
        .skip((pageNumbers - 1) * pageSizes)
        .limit(pageSizes)
        .sort({ createdAt: -1 })
}

