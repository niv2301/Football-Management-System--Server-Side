Names: Niv Meir - 312480171, Alona Lasry - 205567944

In this project, we have designed a Football managment server that communicates with Sportmonks API (https://docs.sportmonks.com/football) We have designed and architectured a database using Azure which contains data like league matches, the system's users and other useful data.

Useful information about the system: The Football association manager is the first user in the DB. in order to make the Football Association Representor functionality work, you have to sign in as a representor with the following details:

username: niv123

password: 1a2b3c4d!

The DB contains 4 differentnt matchs as requested in the project instructions: 2 past matches and 2 future matches. In addition, the past matches includes 4 events each. You also can add your oun matches (if you are logged in as a representor) or add favorite games to your account if you are a regular user.

API: https://app.swaggerhub.com/apis/Ben-Gurion-Univers/Assignment3.1_API/1.0.0

In order to make it work, you shoud create an .env file with the following parameters:

tedious_userName=niv

tedious_password=abcd1234!

tedious_server=development-web.database.windows.net

tedious_database=Football_DB

api_token=MQrj663TjCyoNcPwxCrUFvMYHr9gcrDbYkpgoiSkv8HvQ8Xh4oTfCIpvjEWm

COOKIE_SECRET=abcd

bcrypt_saltRounds=11

ENJOY! :)