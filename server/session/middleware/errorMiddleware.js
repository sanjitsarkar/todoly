function errorMiddleware (err, req, res, next) {
        res.json({ err:err })
    // console.log("error");

    // next()
}
function dummyMiddleware(req, res, next)  {
    // res.msg = "HelloWOrld"
    
    // console.log("hello");
    // const err = new Error("dummy Error")
    // throw err;
    next()
}
module.exports = {errorMiddleware,dummyMiddleware}