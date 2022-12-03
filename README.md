
<p align="center">	
<img alt='GitHub top language' src="https://img.shields.io/github/languages/top/pablomatheus171/api-node-ts">	
<img src="./badges/badge-statements.svg">	
<img src="./badges/badge-branches.svg">	
<img src="./badges/badge-functions.svg">	
<img src="./badges/badge-lines.svg">	
</p>	
<h2 style="margin:0;padding:0"align="center">🔙👨‍💻 API<h2>	

<h2 align="center"><img width="120" src="https://cdn2.iconfinder.com/data/icons/agile-methodology-14/64/intergration-256.png"></h2>
<p align="center">User registration and login api using typescript and node.js.</p>
<hr>

## Features	
   - Register User	   
   - Login User 
#### Project tree
```
src
├── app
│   ├── config
│   └── routes
├── presentation
│   ├── controller
│   |    ├── registerUser 
|   |    └── loginUser
│   ├── factories
│   ├── helpers
│   └── interfaces
├── domain
│   ├── entities
│   ├── security
│   └── useCases
│       ├── db
│       ├── user
│       └── token
├── implementations
│   ├── db
│   │   └── mongo
│   │       ├── conn
│   │       └── models
│   ├── security
│   │   ├── password
│   │   └── token
│   └── validators
├── repositories
└── validation
```
### Developed with:	
 - **Principles**	 
    - Single Responsability	    
    - Open Closed 	   
    - Interface Segregation 	    
    - Dependency Inversion 	    
 - **Design Paternns**	 
   - Dependency Injection	   
   - Composite	   
   - Factor	   
   - Adapter	   
 - **Tests**	 
   - Unit	   
   - Integration	  
___
© 2022 *Study project inspired by Rodrigo Manguinho's clean-Node-api training.*
