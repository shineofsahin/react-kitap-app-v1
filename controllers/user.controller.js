const User = require('../models/auth.model');
const expressJwt = require('express-jwt');

exports.readController = (req, res) => {
    const userId = req.params.id;
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Kullanıcı bulunamadı'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.updateController = (req, res) => {
    
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, password, city, picture, coverPicture } = req.body;
console.log(req.body)
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Kullanıcı bulunamadı'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Ad alanı gerekli'
            });
        } else { 
            user.name = name;
            user.city = city;
            user.picture = picture;
            user.coverPicture = coverPicture;


        }
        
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Şifre 6 karakterden uzun olmalıdır.'
                });
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('Kullanıcı güncelleme hatası ', err);
                return res.status(400).json({
                    error: 'Kullanıcı kaydedilemedi..'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
      
        });
    });
};