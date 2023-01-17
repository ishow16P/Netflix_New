const User = require('../models/User.model');
const status = require('../utils/enum/status');

module.exports.addTolikedMovies = async (req, res) => {
    let resMessage = {}
    try {
        const { email, data } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => (id === data.id))
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id,
                    { likedMovies: [...user.likedMovies, data] }, { new: true }
                )
            } else {
                resMessage = {
                    resultCode: status.DATA_EXIST.RESULT_CODE,
                    resultMessage: status.DATA_EXIST.DEVELOPER_MESSAGE
                }
                return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage)
            }
        } else {
            await User.create({ email, likedMovies: [data] })
        }
        resMessage = {
            resultCode: status.CREATED.RESULT_CODE,
            resultMessage: status.CREATED.DEVELOPER_MESSAGE
        }
        return res.status(resMessage.resultCode.substring(0, 3)).send(resMessage)
    } catch (error) {
        console.error(error);
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            resultMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE
        }
        return res.status(resMessage.resultCode.substring(0, 3)).send(resMessage)
    }
}

module.exports.getLikedMovies = async (req, res) => {
    try {
        const { email } = req.params;
        console.log(email)
        const user = await User.findOne({ email });
        if (user) {
            resMessage = {
                resultCode: status.SUCCESS.RESULT_CODE,
                resultMessage: status.SUCCESS.DEVELOPER_MESSAGE,
                movies: user.likedMovies
            }
            return res.status(resMessage.resultCode.substring(0, 3)).json(resMessage)
        } else {
            resMessage = {
                resultCode: status.DATA_NOT_FOUND.RESULT_CODE,
                resultMessage: status.DATA_NOT_FOUND.DEVELOPER_MESSAGE,
            }
            return res.status(resMessage.resultCode.substring(0, 3)).json(resMessage)
        }
    } catch (error) {
        console.log(error)
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            resultMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE
        }
        return res.status(resMessage.resultCode.substring(0, 3)).json(resMessage)
    }
}

module.exports.removeFromLikedMovies = async (req, res) => {
    let resMessage = {};
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            const { likedMovies } = user;
            const movieIndex = likedMovies.findIndex(({ id }) => id === movieId)
            if (!movieIndex) {
                resMessage = {
                    resultCode: status.DATA_NOT_FOUND.RESULT_CODE,
                    resultMessage: status.DATA_NOT_FOUND.DEVELOPER_MESSAGE
                }
                return res.status(parseInt(resMessage.resultCode.substring(0, 3))).send(resMessage)
            }
            likedMovies.splice(movieIndex, 1);
            await User.findByIdAndUpdate(user._id, { likedMovies }, { new: true })
            resMessage = {
                resultCode: status.CREATED.RESULT_CODE,
                resultMessage: status.CREATED.DEVELOPER_MESSAGE,
                movies: likedMovies
            }
        } else {
            resMessage = {
                resultCode: status.DATA_NOT_FOUND.RESULT_CODE,
                resultMessage: status.DATA_NOT_FOUND.DEVELOPER_MESSAGE
            }
        }
        return res.status(resMessage.resultCode.substring(0, 3)).send(resMessage)
    } catch (error) {
        console.log(error)
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            resultMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE
        }
        return res.status(resMessage.resultCode.substring(0, 3)).json(resMessage)
    }
}