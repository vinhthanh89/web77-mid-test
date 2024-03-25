import jwt from "jsonwebtoken"

export const authentication = (req , res , next) => {
    const bearerToken = req.headers.authorization;

    if(!bearerToken){
        return res.status(400).json({
            message : "Người dùng chưa đăng nhập"
        })
    }

    const token = bearerToken.split(" ")[1]
    const verify = jwt.verify(token , process.env.SCRET_KEY);

    if(!verify){
        return res.status(400).json({
            message : "Người dùng chưa đăng nhập"
        })
    }

    req.name = verify.name;
    next()
}