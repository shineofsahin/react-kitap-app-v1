const User = require('../models/auth.model');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandling');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);

exports.registerController = (req, res) => {
    const { name, email, password, city } = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    } else {

      User.findOne({
        email
      }).exec((err, user) => {
        if (user) {
          return res.status(400).json({
            errors: 'Bu e-posta kullanımda'
          });
        }
      });
      const token = jwt.sign(
        {
          name,
          email,
          city,
          password
        },
        process.env.JWT_ACCOUNT_ACTIVATION,
        {
          expiresIn: '20m'//20 dakikada onay 
        }
      );

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Hesap etkinleştirme linki',
      
        html: `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
          <head>
            <title>
              
            </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
              #outlook a { padding:0; }
              body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
              table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
              img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
              p { display:block;margin:13px 0; }
            </style>
            <!--[if mso]>
            <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <!--[if lte mso 11]>
            <style type="text/css">
              .outlook-group-fix { width:100% !important; }
            </style>
            <![endif]-->
            
          <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
            <style type="text/css">
              @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
            </style>
          <!--<![endif]-->
    
        
            
        <style type="text/css">
          @media only screen and (max-width:480px) {
            .mj-column-per-100 { width:100% !important; max-width: 100%; }
    .mj-column-per-50 { width:50% !important; max-width: 50%; }
          }
        </style>
        
      
            <style type="text/css">
            
            
    
        @media only screen and (max-width:480px) {
          table.full-width-mobile { width: 100% !important; }
          td.full-width-mobile { width: auto !important; }
        }
      
            </style>
            <style type="text/css">.hide_on_mobile { display: none !important;} 
            @media only screen and (min-width: 480px) { .hide_on_mobile { display: block !important;} }
            .hide_section_on_mobile { display: none !important;} 
            @media only screen and (min-width: 480px) { 
                .hide_section_on_mobile { 
                    display: table !important;
                } 
    
                div.hide_section_on_mobile { 
                    display: block !important;
                }
            }
            .hide_on_desktop { display: block !important;} 
            @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
            .hide_section_on_desktop { 
                display: table !important;
                width: 100%;
            } 
            @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
            
              p, h1, h2, h3 {
                  margin: 0px;
              }
    
              a {
                  text-decoration: none;
                  color: inherit;
              }
    
              @media only screen and (max-width:480px) {
    
                .mj-column-per-100 { width:100%!important; max-width:100%!important; }
                .mj-column-per-100 > .mj-column-per-75 { width:75%!important; max-width:75%!important; }
                .mj-column-per-100 > .mj-column-per-60 { width:60%!important; max-width:60%!important; }
                .mj-column-per-100 > .mj-column-per-50 { width:50%!important; max-width:50%!important; }
                .mj-column-per-100 > .mj-column-per-40 { width:40%!important; max-width:40%!important; }
                .mj-column-per-100 > .mj-column-per-33 { width:33.333333%!important; max-width:33.333333%!important; }
                .mj-column-per-100 > .mj-column-per-25 { width:25%!important; max-width:25%!important; }
    
                .mj-column-per-100 { width:100%!important; max-width:100%!important; }
                .mj-column-per-75 { width:100%!important; max-width:100%!important; }
                .mj-column-per-60 { width:100%!important; max-width:100%!important; }
                .mj-column-per-50 { width:100%!important; max-width:100%!important; }
                .mj-column-per-40 { width:100%!important; max-width:100%!important; }
                .mj-column-per-33 { width:100%!important; max-width:100%!important; }
                .mj-column-per-25 { width:100%!important; max-width:100%!important; }
            }</style>
            
          </head>
          <body style="background-color:#000000;">
            
            
          <div style="background-color:#000000;">
            
          
          <!--[if mso | IE]>
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
        
          
          <div style="margin:0px auto;max-width:600px;">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;">
                    <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="" style="vertical-align:top;width:600px;"
                >
              <![endif]-->
                
          <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
            
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
            
                <tr>
                  <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                    
          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-size: 11px; font-family: Ubuntu, Helvetica, Arial; text-align: center;"><strong><span style="font-family: Cabin, sans-serif; font-size: 22px; color: #ecf0f1;">ARAMIZA KATILMAN İ&Ccedil;İN SON BİR ADIM KALDI</span></strong></p></div>
        
                  </td>
                </tr>
              
                <tr>
                  <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                    
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
            <tbody>
              <tr>
                <td style="width:276px;">
                  
          <img height="auto" src="https://images.unsplash.com/photo-1530578851-a2488b4c5498?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="276">
        
                </td>
              </tr>
            </tbody>
          </table>
        
                  </td>
                </tr>
              
                <tr>
                  <td style="font-size:0px;padding:10px 10px;padding-top:10px;padding-right:10px;word-break:break-word;">
                    
          <p style="font-family: Ubuntu, Helvetica, Arial; border-top: solid 1px #127839; font-size: 1; margin: 0px auto; width: 100%;">
          </p>
          
          <!--[if mso | IE]>
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #127839;font-size:1;margin:0px auto;width:580px;" role="presentation" width="580px"
            >
              <tr>
                <td style="height:0;line-height:0;">
                  &nbsp;
                </td>
              </tr>
            </table>
          <![endif]-->
        
        
                  </td>
                </tr>
              
                <tr>
                  <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                    
          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-size: 11px; font-family: Ubuntu, Helvetica, Arial; text-align: center;"><span style="color: #ecf0f1; font-size: 17px; font-family: Cabin, sans-serif;">Aşağıdaki linke tıklayarak hesabını aktif edip aramıza katılabilirsin!</span></p></div>
        
                  </td>
                </tr>
              
                <tr>
                  <td style="font-size:0px;padding:10px 10px;padding-top:10px;padding-right:10px;word-break:break-word;">
                    
          <p style="font-family: Ubuntu, Helvetica, Arial; border-top: solid 1px #127839; font-size: 1; margin: 0px auto; width: 100%;">
          </p>
          
          <!--[if mso | IE]>
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #127839;font-size:1;margin:0px auto;width:580px;" role="presentation" width="580px"
            >
              <tr>
                <td style="height:0;line-height:0;">
                  &nbsp;
                </td>
              </tr>
            </table>
          <![endif]-->
        
        
                  </td>
                </tr>
              
                <tr>
                  <td align="center" vertical-align="middle" style="font-size:0px;padding:20px 20px 20px 20px;word-break:break-word;">
                    
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
            <tr>
              <td align="center" bgcolor="#085E26" role="presentation" style="border:none;border-radius:24px;cursor:auto;mso-padding-alt:9px 26px 9px 26px;background:#085E26;" valign="middle">
                <a href="${process.env.CLIENT_URL}/users/activate/${token}" style="display: inline-block; background: #085E26; color: #ffffff; font-family: Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif; font-size: 17px; font-weight: normal; line-height: 21.25px; margin: 0; text-decoration: none; text-transform: none; padding: 9px 26px 9px 26px; mso-padding-alt: 0px; border-radius: 24px;" target="_blank">
                  <strong><span style="font-family: Cabin, sans-serif; font-size: 17px;">Aktif ET</span></strong>
                </a>
              </td>
            </tr>
          </table>
        
                  </td>
                </tr>
              
          </table>
        
          </div>
        
              <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>
        
          
          <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
        
          
          <div style="margin:0px auto;max-width:600px;">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;">
                    <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="" style="vertical-align:top;width:300px;"
                >
              <![endif]-->
                
          <div class="mj-column-per-50 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:50%;">
            
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
            
                <tr>
                  <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                    
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
            <tbody>
              <tr>
                <td style="width:243px;">
                  
          <img height="auto" src="https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="243">
        
                </td>
              </tr>
            </tbody>
          </table>
        
                  </td>
                </tr>
              
          </table>
        
          </div>
        
              <!--[if mso | IE]>
                </td>
              
                <td
                   class="" style="vertical-align:top;width:300px;"
                >
              <![endif]-->
                
          <div class="mj-column-per-50 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:50%;">
            
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
            
                <tr>
                  <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                    
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
            <tbody>
              <tr>
                <td style="width:246px;">
                  
          <img height="auto" src="https://images.unsplash.com/photo-1492729762352-e42d40fd3ed5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="246">
        
                </td>
              </tr>
            </tbody>
          </table>
        
                  </td>
                </tr>
              
          </table>
        
          </div>
        
              <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>
        
          
          <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          <![endif]-->
        
        
          </div>
        
          </body>
        </html>
              
              `
      };
      sgMail
      .send(emailData)
      .then(sent => {
        return res.json({
          message: `${name}, Email bu e-postaya yollandı ${email}`
        });
      })
      .catch(err => {
        return res.status(400).json({
          success: false,
          errors: errorHandler(err),
         
        });
      });
  }
};


exports.activationController = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        console.log('Kayıt hatası');
        return res.status(401).json({
          errors: 'Link geçersiz lütfen tekrar kayıt olmayı deneyin'
        });
      } else {
        const { name, email, password,city } = jwt.decode(token);

        console.log(email);
        
        const user = new User({
          name,
          email,
          password,
          city
        });

        user.save((err, user) => {
          if (err) {
            console.log('Kayıt edilemedi. Hata.', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          } else {
            return res.json({
              success: true,
              message: user,
              message: 'Kayıt başarıyla tamamlandı'
            });
          }
        });
      }
    });
  } else {
    return res.json({
      message: 'Hata. Lütfen tekrar deneyin.'
    });
  }
};


exports.signinController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    User.findOne({
      email
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: 'E-posta kayıtlı değil lütfen kaydolun'
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: 'E-posta ve şifre eşleşmiyor...'
        });
      }
      const token = jwt.sign(
        {
          _id: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d'
        }
      );
      const { _id, name, email, role, coverPicture, picture, followings, followers,voters,totalrating, city,createdAt,report1,report2 } = user;

      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role, 
          coverPicture, 
          picture, 
          followings,
          voters, 
          totalrating,
          createdAt,
          followers,
          report1,
          report2,
          city
        }
      });
    });
  }
};



exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET, 
  algorithms: ['HS256']// req.user._id 
});


exports.adminMiddleware = (req, res, next) => {
  User.findById({
    _id: req.user._id
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'Kullanıcı bulunamadı.'
      });
    }

    if (user.role !== 'admin') {
      return res.status(400).json({
        error: 'Admin girişi başarısız.'
      });
    }

    req.profile = user;
    next();
  });
};


exports.forgotPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    User.findOne(
      {
        email
      },
      (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: 'Bu e-posta sistemde kayıtlı değil'
          });
        }

        const token = jwt.sign(
          {
            _id: user._id
          },
          process.env.JWT_RESET_PASSWORD,
          {
            expiresIn: '10m'//10 dk
          }
        );

        const emailData = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: `Şifre yenileme bağlantısı`,
          html: `
                    <h1>Şifre değiştirmek için lütfen linke tıklayın</h1>
                    <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                    <hr />
                `
        };

        return user.updateOne(
          {
            resetPasswordLink: token
          },
          (err, success) => {
            if (err) {
              console.log('RESET PASSWORD LINK ERROR', err);
              return res.status(400).json({
                error:
                  'err'
              });
            } else {
              sgMail
                .send(emailData)
                .then(sent => {
          
                  return res.json({
                    message: `E-posta yollandı ${email}.`
                  });
                })
                .catch(err => {
               
                  return res.json({
                    message: err.message
                  });
                });
            }
          }
        );
      }
    );
  }
};


exports.resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(
        err,
        decoded
      ) {
        if (err) {
          return res.status(400).json({
            error: 'Geçersiz link. Lütfen tekrar deneyin'
          });
        }

        User.findOne(
          {
            resetPasswordLink
          },
          (err, user) => {
            if (err || !user) {
              return res.status(400).json({
                error: 'Bir şeyler yanlış gitti. Lütfen tekrar deneyin'
              });
            }

            const updatedFields = {
              password: newPassword,
              resetPasswordLink: ''
            };

            user = _.extend(user, updatedFields);

            user.save((err, result) => {
              if (err) {
                return res.status(400).json({
                  error: 'Şifre değiştirilemedi'
                });
              }
              res.json({
                message: `Şifre değişikliği başarılı... Yeni şifrenizle giriş yapabilirsiniz`
              });
            });
          }
        );
      });
    }
  }
};


exports.googleController = (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then(response => {
      const { email_verified, name, email, picture,city } = response.payload;
      console.log(response.payload);
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d'
            });
            const { _id, email, name, role,followings,voters,totalrating,followers, picture,city,createdAt,report1,report2 } = user;
            return res.json({
              token,
              user: { _id, email, name, role,followings,voters,totalrating,followers, picture,city,createdAt,report1,report2 }
            });
          } else {
            let password = email + process.env.JWT_SECRET;

            user = new User({ name: name.toLocaleLowerCase('tr-TR').replace(' ',''), email, password, picture,city });
            user.save((err, data) => {
              if (err) {
                console.log('Google giriş hatası', err);
                return res.status(400).json({
                  error: 'Google ile giriş yapılamadı...'
                }); 
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
              );
              const { _id, email, name, role,picture,city } = data;
              return res.json({
                token,
                user: { _id, email, name, role,picture,city  }
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: 'Google ile giriş yapılamadı... Tekrar deneyin'
        });
      }
    });
};


exports.facebookController = (req, res) => {
  console.log('FACEBOOK LOGIN REQ BODY', req.body);
  const { userID, accessToken } = req.body; 

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

  return (
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json()) 
      .then(response => {
        const { email, name,picture } = response;
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d'
            });
            const { _id, email, name, role,followings,voters,totalrating,followers,picture,createdAt,report1,report2 } = user;
            return res.json({
              token,
              user: { _id, email, name, role,followings,voters,totalrating,followers, picture,createdAt,report1,report2 }
            });
          } else {
            let password = email + process.env.JWT_SECRET;
          
            user = new User({name: name.toLocaleLowerCase('tr-TR').replace(' ',''), email, password, picture:picture.data.url }); 
            user.save((err, data) => {
              if (err) {
                console.log('Facebook giriş hatası', err);
                return res.status(400).json({
                  error: 'Facebook ile giriş yapılamadı.'
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
              );
              const { _id, email, name, role, picture } = data;
  

              return res.json({

                token,

                user: { _id, email, name, role,picture }

              });
            });
          } 
        });
      })
      .catch(error => {
        res.json({
          error: 'FaceboOk ile giriş yapılamadı... Tekrar deneyin'
        });
      })
  );
};

