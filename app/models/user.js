import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * Initialize schema for user model
 * Schema fields include
 *       --first name
 *       --last name
 *       --email
 *       --password
 *
 *       **timestamps**
 *       --created at [ datetime this user was created ]
 *       --updated at [ datetime this user was updated ]
 */
const userSchema = new mongoose.Schema({
  firstName      : {type: String, trim: true, required: true},
  lastName       : {type: String, trim: true, required: true},
  email          : {type: String, index: true, unique: true, required: true},
  isActive       : {type: Boolean, default: true},
  password       : {type: String, set: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync())},
}, {
  timestamps: true
});

/**
 * Password validate method on seller model
 * @param {string} password
 */
userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

/**
 * Full name virtual method on seller model
 * Combines the firstName and lastName fields to create a fullName
 */
userSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

/**
 * Build and export admin model from schema and schema methods
 */
const User = mongoose.model('User', userSchema);
export default User;