import { Model, DataTypes, STRING } from "sequelize";

export default (sequelize) => {
	class Utilisateur extends Model {
		static associate(models) {
			//..
		}
	}

	Utilisateur.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique : true
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique : true,
				validate : {
					isEmail : true,
				}
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			},

		},
		{
			sequelize,
			modelName : "Utilisateur",
			tableName : "Utilisateurs",
			timestamps : false
		}
	);

	return Utilisateur;
};