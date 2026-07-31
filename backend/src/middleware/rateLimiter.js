import ratelimit  from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
//if with auth then use it per user, instead of "my limit key" use user id, forex zulfi, alex

try{
    const {success} = await ratelimit.limit("my-rate-limit") 
    if(!success){
        return res.status(429).json({message:"Too many requests, please try again later."})
    }
    next();
}
catch (error) {
    console.log("rate limit error", error);
    next(error);
}


}

export default rateLimiter;