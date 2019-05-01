import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * Initialize schema for buyer model
 * Schema fields include
 *       --first name
 *       --last name
 *       --email
 *       --gender
 *       --address
 *       --zip code
 *       --region or state
 *       --city
 *       --phone number
 *       --avatar [profile picture]
 *       --password
 *
 *       **timestamps**
 *       --created at [ datetime this buyer was created ]
 *       --updated at [ datetime this buyer was updated ]
 */
const userSchema = new mongoose.Schema({
  firstName      : {type: String, trim: true, required: true},
  lastName       : {type: String, trim: true, required: true},
  gender         : {type: String, enum: ['Male','Female']},
  email          : {type: String, index: true, unique: true, required: true},
  phoneNumber    : {type: String, default: ''},
  city           : {type: String, default: ''},
  country        : {type: String, default: ''},
  regionOrState  : {type: String, default: ''},
  address        : {type: String, default: ''},
  zipCode        : {type: String, default: ''},
  isActive       : {type: Boolean, default: false},
  avatar         : {type: String, default: 'http://via.placeholder.com/200x200'},
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