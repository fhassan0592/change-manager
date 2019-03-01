import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    shouldChangePassword: {
        type: String,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


UserSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(process.env.SALT_ROUNDS, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            return next();
        });
    });
});

UserSchema.methods.comparePassword = (password) => bcrypt.compareSync(password, this.password);

/*
log in,
sign up,


*/

export default mongoose.model('User', UserSchema);