const Multer = require('koa-multer')
const uploadAvatar = Multer({
    dest: './uploads/avatar'
})
const uploadPicture = Multer({
    dest: './uploads/picture'
})
const avatarHandler = uploadAvatar.single('avatar')
const pictureHandler = uploadPicture.array('picture', 9)


module.exports = {
    avatarHandler,
    pictureHandler
}
