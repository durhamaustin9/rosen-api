const contact = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'contacts',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userID: {
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      streetAddress: {
        type: DataTypes.STRING
      },
      zip: {
        type: DataTypes.STRING
      },
      state: {
        type: DataTypes.STRING
      },
      notes: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  )

  Contact.sync()
  return Contact
}

module.exports = contact
