import User from '../models/userModels.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        throw new Error('Please fill in all the inputs.')
    }

    const userExists = await User.findOne({email})
    if (userExists) res.status(400).send('User already exists')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({ username, email, password: hashedPassword })

    try {
        await newUser.save()
        createToken(res, newUser._id);

        res.status(201)
            .json({
                _id: newUser._id, 
                username: newUser.username, 
                email: newUser.email, 
                isAdmin: newUser.isAdmin,
            });
    } catch (error) {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new Error('Please fill in all the inputs.')
    }

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        throw new Error("Email doesn't exist")
    }

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordValid) {
            throw new Error('Password is incorrect')
        } else {
            createToken(res, existingUser._id)

            res.status(201)
            .json({
                _id: existingUser._id, 
                username: existingUser.username, 
                email: existingUser.email, 
                isAdmin: existingUser.isAdmin,
            });
            return;
        }
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({message: 'logout successfull'})
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        })
    } else {
        res.status(404)
        throw new Error('User not found.')
    }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashedPassword;
        }

        const updatedUser = await user.save()
        res.json ({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,         
        })
    } else {
        res.status(404)
        throw new Error('User not found.')
    }
});

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        if (user.isAdmin) {
            res.status(400)
            throw new Error('Cannot delete admin user')
        }

        await User.deleteOne({_id: user._id})
        res.json({message: 'User removed'})
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
});

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body
    if (!email) {
        throw new Error("You haven't entered a valid email address")
    }

    const user = await User.findOne({email})
    if (!user) {
        throw new Error("This email address hasn't registered")
    }

    try {
        const token = jwt.sign({id: user._id}, process.env.VITE_JWT_SECRET, {expiresIn: '10m'})

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.VITE_EMAIL,
            pass: process.env.VITE_NODEMAILER
            }
        });
        
        let mailOptions = {
            from: process.env.VITE_EMAIL,
            to: email,
            subject: 'Reset Password',
            text: "Please click the link below to reset your password, this link will expire in 10 minutes \n\n" +  `https://metropolis-k549.onrender.com/forgotPassword/${token}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.json({ message: 'error sending Email'})
            } else {
                return res.json({ success: true, message: 'Email Sent'})
            }
        });
    } catch (err) {
        console.log(err);
        throw new Error("Nodemailer isn't working")
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const {password} = req.body
    const {token} = req.params
    if (!token) {
        throw new Error('No token')
    }

    const decoded = await jwt.verify(token, process.env.VITE_JWT_SECRET)
    if (!decoded) {
        throw new Error('You are not authorized to change the password')
    }

    try {
        const id = decoded.id
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({_id: id}, {password: hashedPassword})
        return res.json({message: "Updated Password Successfully"})
    } catch (err) {
        throw new Error('Invalid Token')
    }
})

export { 
    createUser, 
    loginUser, 
    logoutUser, 
    getAllUsers, 
    getCurrentUserProfile, 
    updateCurrentUserProfile, 
    deleteUserById, 
    getUserById, 
    updateUserById,
    forgotPassword,
    resetPassword,
};

