const { transporter } = require("../helpers/mailer")
const { User } = require("../models/user")
const jwt = require('jsonwebtoken')



const getCode = async function (req, res){
    const { email } = req.params

    const user = await User.findOne({ email })

    if (!user){
        await User.create({ email, firstName: "Jhonny", lastName:"Ocampo" })
        return res
            .status(400)
            .json({ ok: false, message: "No existe un usuario con ese correo"})
    }

    let code = ""

    for (let index = 0; index <= 5; index++){
        let character = Math.ceil(Math.random() * 9)
        code += character
    }

    user.login_code = code
    await user.save()

    const result = await transporter.sendMail({
        from: `Martin Gesualdo ${process.env.EMAIL}`,
        to: email,
        subject: "Código de inicio de sesión:  " + code,
        body: "Este es tu código para iniciar sesión: "
    })
    console.log({ result })
    res.status(200).json({ok: true, message: "Código enviado con éxito" })
}

const login = async function (req, res){
    const { email } = req.params
    const { code } = req.body

    const user = await User.findOne({ email, login_code: code })

    if(!user){
        await User.create({ email, firstName: "Jhonny", lastName:"Ocampo" })
        return res
            .status(400)
            .json({ ok: false, message: "Credenciales invalidas"})
    }

    const tokenPayload = {
        _id : user._id,
        firstName: user.firstName,
        email: user.email,
    }

    const token = jwt.sign(tokenPayload, proccess.env.JWT_SECRET_KEY)
    console.log({ token })
    res.cookie("jwt", token)

    res.status(200).json({
        ok: true,
        data: tokenPayload,
        message: "Inicio sesión exitoso!!"
    })
}


module.exports = { getCode, login }