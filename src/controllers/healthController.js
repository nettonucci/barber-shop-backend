
const healthController = (req, res) => {
    res.status(200).json({
        message: `Server is running on ${process.env.ENV.toLocaleUpperCase()}`
    })
}

export default healthController