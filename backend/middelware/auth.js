import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const isAuthenticated = async(req,res,next)=>{
    try {
        const {token} = req.cookies;
        // console.log(token,"TOKEN")
        if(!token){
            return res.status(401).json({
                message:"Admin login required"
            })
        }
        const decode = await jwt.verify(token,process.env.JWTSECRET)
        req.userId = decode.id
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"In isAuth any fault"
        })
    }
}