import express from 'express';
import jwt from 'jsonwebtoken';
import User from './User';

const router = express.Router();

router.post('/login', (req, res) => {
    let user = req.body.user;
    if (!!user.username && !!user.password) {
        User.findOne({ username: user.username }).select('username password').exec()
        .then(foundUser => {
            if (foundUser) {
                if (foundUser.shouldChangePassword) {
                    return res.status(200).json({ success: true, data: { shouldChangePassword: true }, message: `Please change your password` });
                } else {
                    if (foundUser.comparePassword) {
                        let token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET);
                        return res.status(200).json({ success: true, data: { token }, message: null });
                    } else {
                        return res.status(401).json({ success: false, data: null, message: `Incorrect credentials` });
                    }
                }
            } else {
                return res.status(404).json({ success: false, data: null, message: `User not found` });
            }
        })
        .catch(err => err);
    } else {
        return res.status(400).json({ success: false, data: null, message: `A valid username and password is required` });
    }
});








export default router;