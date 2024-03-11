const jwt = require("jsonwebtoken")

const jwtValidation = (req, res, next) =>{
    try {
        const token = req.cookies.jwt
        const validPayload = jwt.verify(token, procces.env.JWT_SECRET_KEY)
        console.log({ validPayload})
        next()
    } catch (error) {
        console.log({ error })
        res.status(401).json({ ok: false, message: "Invalid TOKEN"})

    }
}

module.exports = { jwtValidation }