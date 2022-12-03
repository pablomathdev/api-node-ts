### Register User 
<img width="50" src="https://cdn4.iconfinder.com/data/icons/zeir-miscellaneous-007/64/form_write_document_register-512.png">
---
- [x] - Receives a POST request on the /register endpoint;
 - [x] - Register User with fields name,email,password;
 - [x] - Should returns bad request (400) if the fields are not provided;
 - [x] - Should returns bad request (400) if the email is invalid;
 - [x] - Should returns bad request (400) if email already exists;
 - [x] - should generate an encrypted password;
 - [x] - should register user with the informed data and replacing the password with the encrypted password;
 - [x] - should generate an access token from the user Id;
 - [x] - Should returns created (201) and access token if the user is successfully registered;
 - [x] - Should return internal error (500) if it gives an error when trying to generate an encrypted password;
 - [x] - Should return internal error (500) if gives an error when trying to create the user account;
 - [x] - Should return internal error (500) if gives an error when trying to generate the access token;
 - [x] - Should return internal error (500) if gives an error when trying to add the user with the generated access token;
 ---
