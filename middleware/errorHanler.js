const notFound = (req, resp, next) => {
    const error = new Error(`Not found`);
    resp.status(404);
    next(error);
}

const errorHanlder = (err, req, resp, next) => {
    const statusCode = resp.statusCode === 200 ? 500 : resp.statusCode;
    resp.status(statusCode);
    // console.log("Helooo", err);
    resp.send({
        message: err.message,
    })
};


export {
    notFound,
    errorHanlder
}