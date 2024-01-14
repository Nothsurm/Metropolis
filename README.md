# Full-Stack MERN E-Commerce Project

## A fully functional project written in React for the front-end and Express/Node.js for the back-end

This project utilizes React components and states to fetch data from a database created in MongoDB. Data storage and maintainability is done using Redux, CRUD operations are availbale to the User and Admin.
Certain priveleges such as creating listings, deleting users and confirming deliveries are only availbale to the Admin. This app is scalable and components are utilized in a way to make the code readable and easy to debug. Additional information includes:

* Login and registeration is performed using local storage and json web tokens for security purposes
* Filtering the shop items is available to the user through multiple means
* This app is responsive on numerous devices; mobile, ipad through to desktop
* Insomnia was used for API testing and integration in the backend
* Authentication of paypal payment is done using [Paypal Developer](https://developer.paypal.com/home)

### Before editing the following installations are essential

1. Install React with Vite and TailwindCSS, more information on how to do this may be found [Here](https://tailwindcss.com/docs/guides/vite)
> [!TIP]
> Replace my-project with the name of your desired working directory, in this case 'frontend'
2. Follow the instructions in the terminal
3. cd to your root folder and enter ```npm init -y```
4. Create a new folder in your root called 'backend'

### The following packages and dependencies were installed for the back-end through Node in the root folder (not in order)
```
1. npm i bcrptjs
2. npm i cookie-parser
3. npm i dotenv
4. npm i express
5. npm i jsonwebtoken
6. npm i mongoose
7. npm i nodemon
8. npm i multer
9. npm i express-formidable
10. npm i express-async-handler
11. npm i cors
12. npm i concurrently
```

### The following packages and dependencies were installed for the front-end through Node in the frontend folder (not in order)
```
1. npm i slick-carousel
2. npm i react-slick
3. npm i react-toastify
4. npm i react-router
5. npm i react-router-dom
6. npm i react-redux
7. npm i react-icons
8. npm i apexcharts
9. npm i react-apexcharts
10. npm i moment
11. npm i flowbite
12. npm i axios
13. npm i @reduxjs/toolkit
14. npm i @paypal/react-paypal-js
```
