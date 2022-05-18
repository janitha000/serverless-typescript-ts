import { DataTypes, Model } from "sequelize"
import CityCode from "./cityCode.model"
import { loadSequelizePromise } from "./postgresDb"

class CityClass extends Model {
    public id?: string
    public name!: string
    public country!: string
    public continent?: string
    public code?: string

    static associate(models: any) {
        // define association here
        CityCode.belongsTo(CityCode)
    }
}

CityClass.init(
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
        country: {
            type: DataTypes.STRING
        },
        continent: {
            type: DataTypes.STRING,
            get() {
                const value = this.getDataValue('continent');
                return value ? value.toUpperCase() : null;
            }
        },
        code: {
            type: DataTypes.STRING,
            set(value: string) {
                this.setDataValue('code', value.toUpperCase())
            }
        },
    },
    {
        sequelize: loadSequelizePromise(),
        tableName: 'Cities',
    }
)

console.log(`ciryCode ${CityCode}`)
CityClass.hasOne(CityCode)

export default CityClass;



class Project extends Model<
    InferAttributes<Project>,
    InferCreationAttributes<Project>
> {
    // id can be undefined during creation when using `autoIncrement`
    declare id: CreationOptional<number>;

    // foreign keys are automatically added by associations methods (like Project.belongsTo)
    // by branding them using the `ForeignKey` type, `Project.init` will know it does not need to
    // display an error if ownerId is missing.
    declare ownerId: ForeignKey<User['id']>;
    declare name: string;

    // `owner` is an eagerly-loaded association.
    // We tag it as `NonAttribute`
    declare owner?: NonAttribute<User>;

    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
}