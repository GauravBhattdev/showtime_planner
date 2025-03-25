module.exports = (sequelize, DataTypes) => {
    const afterPartie = sequelize.define("afterPartie",{
        location:DataTypes.STRING,
        city:DataTypes.STRING,
        date:DataTypes.DATE,
        ticketPrice:DataTypes.FLOAT,
        
    },
    {
        timestamps:true,
    });
    return afterPartie;
}