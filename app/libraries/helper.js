export default {
  /**
   * Sign User - Return fields for signing
   * @param {Object} user
   */
  signUser(user) {
    return {
      _id       : user._id,
      firstName : user.firstName,
      lastName  : user.lastName,
      createdAt : user.createdAt,
    }
  }

};