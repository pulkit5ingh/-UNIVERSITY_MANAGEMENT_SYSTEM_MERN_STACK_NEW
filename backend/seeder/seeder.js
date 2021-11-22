import connectToMongoDb from "../configs/db/mongoDB.js";

// * Import All The Seeding Datas
import AdminData from "./data/AdminData.js";
import StudentData from "./data/StudentData.js";
import TeacherData from "./data/TeacherData.js";

// * Import All the Models
import AdminModel from "../models/admin/admin.js";
import StudentModel from "../models/student/student.js";
import TeacherModel from "../models/teacher/teacher.js";

// * Connect to mongodb
connectToMongoDb();
// *

const importData = async () => {
    try {
        // await AdminModel.deleteMany();
        await StudentModel.deleteMany();
        // await TeacherModel.deleteMany();

        // await AdminModel.insertMany(AdminData);
        await StudentModel.insertMany(StudentData);
        // await TeacherModel.insertMany(TeacherData);

        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await AdminModel.deleteMany();
        await StudentModel.deleteMany();
        await TeacherModel.deleteMany();
        await AdminModel.deleteMany();

        console.log("Data Destroyed!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else if (process.argv[2] === "-i") {
    importData();
}
