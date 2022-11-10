import {response} from "express"
import jwt from "jwt-simple";

const validateJWT = (req:any, res :any = response , next:any) => {
    const token = req.header("Authorization")
    if(!token){
        return res.status(401).json(
            {ok:false, msg:"No autorizado"}
        )
    }

    try {
        let {username, role} = jwt.decode(token,process.env.SECRET_JWT_SEED!,false, 'HS256')
        next()
    } catch (error) {
        return res.status(401).json(
            {ok:false, msg:"Token no valido"}
        )
    }
}

export default validateJWT