# MERN_authentication

Create a `config.env` file in root folder, In this file create few variables <br>

```env
PORT = port number must be integer
MONGO_URI = mongodb connection string within double quotes
JWT_SECRET = hex code for encryption
JWT_EXPIRE = time in integer or relavent time string
JWT_SECRET_REFRESH = hex code for encryption
REFRESH_JWT_EXPIRE = time in integer or relavent time string

For reset password:
EMAIL_SERVICE = 'smtp service provider'
EMAIL_USERNAME = 'user name in smtp relay'
EMAIL_PASSWORD = 'smtp password'
EMAIL_FROM = 'mail given in smtp to send mail'
(OR)
API_KEY = 'smtp service provider api key'
```
