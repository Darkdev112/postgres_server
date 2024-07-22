const morgan=require("morgan");
const logger=require("./logger");
const config=require("./config");

morgan.token("message",(req,res)=>res.statusMessage || "");

const getIpFormat = config.mode==="production"?":remote-addr - " : "";

const successResponseFormat = `${getIpFormat}:method:url:status::response-time ms`;

const errroResponseFormat=`${getIpFormat}:method:url :status - :response-time ms - message: :message`;

const successHandler=morgan(successResponseFormat,{
    skip:(req,res)=>res.statusCode >=400,
    stream:{write:(message)=>logger.info(message.trim())},
})

const errorHandler=morgan(errroResponseFormat,{
    skip:(req,res)=>res.statusCode < 400,
    stream:{write:(message)=>logger.error(message.trim())},
});

module.exports={
    successHandler,
    errorHandler
}