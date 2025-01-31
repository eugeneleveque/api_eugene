import { DataTypes } from "sequelize";
import db from "../db.js"; // Assurez-vous que le chemin d'importation soit correct

const User = db.define(
  "User",
  {
    Id_Utilisateurs: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Prenom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    MotDePasse: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Telephone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Telephone_2: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Plaque_immatriculuation: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Id_Role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateSuppression: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
  },
  {
    db,
    tableName: "utilisateurs",
    schema: "utilisateur",
    timestamps: false,
  }
);

// Exporter le modèle
export default User;
