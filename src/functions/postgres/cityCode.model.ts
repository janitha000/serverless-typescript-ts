import { DataTypes, Model } from "sequelize";
import CityClass from "./city.class";
import { loadSequelizePromise } from "./postgresDb";


//one to one
class CityCode extends Model {
    public id?: string
    public name!: string

    static associate(models: any) {
        // define association here
        CityCode.belongsTo(CityClass)
    }
}

CityCode.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },
    {
        sequelize: loadSequelizePromise(),
        tableName: 'CityCodes',
    }
)



console.log(`CityClass ${CityClass}`)

// CityCode.belongsTo(CityClass)

//CityCode.belongsTo(CityClass, { foreignKey: 'cityClassId', targetKey: 'id' });

export default CityCode;