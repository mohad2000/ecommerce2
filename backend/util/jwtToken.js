export const sendToken = (user, statusCode, res) => {
    const token = user.getJWToken();

    const options = {
        expires : new Date(Date.now() + 7*24*60*60*1000),
        httpOnly : true,
        // secure: true,
        // sameSite: "lax"
        
    }

    res.status(statusCode).cookie("token", token, options).json({
        success : true,
        token,
        user
    })

}