// searchFunction.js
const { Op } = require("sequelize");
const { User, Doctor_Infor, Allcode } = require("./src/models");

async function searchFunction() {
    const searchKeywords = ["Thạc sĩ", "Tiến sĩ", "Phó giáo sư", "Giáo sư", "Bachelor", "Doctor", "Associate Professor", "Professor"];

    const userSearchCondition = {
        [Op.or]: searchKeywords.map(keyword => ({
            [Op.or]: [
                { firstName: { [Op.like]: `%${keyword}%` } },
                { lastName: { [Op.like]: `%${keyword}%` } },
            ],
        })),
    };

    try {
        const users = await User.findAll({
            attributes: ['id', 'firstName', 'lastName'],
            where: userSearchCondition,
            raw: true,
        });

        // Fetch associated Doctor_Infor
        const doctorInfoPromises = users.map(async (user) => {
            const doctorInfo = await Doctor_Infor.findOne({
                where: { doctorId: user.id },
                attributes: ['clinicId', 'specialtyId'],
                raw: true,
            });
            return doctorInfo;
        });

        const doctorInfos = await Promise.all(doctorInfoPromises);

        // Fetch associated Position from Allcode
        const positionPromises = users.map(async (user) => {
            const position = await Allcode.findOne({
                where: {
                    [Op.or]: [
                        { 'Position.valueVi': { [Op.in]: searchKeywords } },
                        { 'Position.valueEn': { [Op.in]: searchKeywords } },
                    ],
                },
                attributes: ['positionId'],
                raw: true,
            });
            return position;
        });

        const positions = await Promise.all(positionPromises);

        // Combine the results
        const result = users.map((user, index) => ({
            ...user,
            DoctorInfo: doctorInfos[index],
            Position: positions[index],
        }));

        return result;
    } catch (error) {
        console.error('Error executing Sequelize query:', error);
        throw new Error('Internal Server Error');
    }
}

module.exports = searchFunction;
