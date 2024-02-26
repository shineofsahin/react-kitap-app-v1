const {
    check
} = require('express-validator');
exports.validSign = [
    check('name', 'Lütfen kullanıcı adı alanı boş bırakılamaz..').notEmpty()
    .isLength({
        min: 3,
        max: 32
    }).withMessage('kullanıcı alanı 3-32 karakterler arası olmalıdır...'),
    check('email')
    .isEmail()
    .withMessage('E-posta alanı boş bırakılamaz..'),
    check('password', 'Şifre boş bırakılamaz...').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Şifreniz en az 6 karakter içermelidir.').matches(/\d/).withMessage('Şifreniz bir sayı içermelidir.')
]

exports.validLogin = [
    check('email')
    .isEmail()
    .withMessage('Geçerli bir e-posta girmelisiniz...'),
    check('password', 'Şifre boş bırakılamaz...').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Şifreniz en az 6 karakter içermelidir.').matches(/\d/).withMessage('Şifreniz bir sayı içermelidir.')
]


exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('E-posta alanı boş bırakılamaz...')
];

exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Yeni şifreniz 6 veya daha fazla karakter içermelidir...')
];