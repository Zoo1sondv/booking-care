import db from '../models/index';

let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.descriptionHTML || !data.descriptionMarkdown || !data.imageBase64) {
        resolve({
          errCode: 1,
          errMessage: 'Missing parameters',
        });
      } else {
        await db.Specialty.create({
          image: data.imageBase64,
          name: data.name,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });

        resolve({
          errCode: 0,
          errMessage: 'ok!',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({
        raw: true,
      });

      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, 'base64').toString('binary');
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: 'ok!',
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: 'Missing parameters',
        });
      } else {
        let data = await db.Specialty.findOne({
          where: {
            id: inputId,
          },
          attributes: ['descriptionHTML', 'descriptionMarkdown'],
        });

        if (data) {
          let doctorSpecialty = [];
          if (location === 'ALL') {
            doctorSpecialty = await db.Doctor_Info.findAll({
              where: {
                specialtyId: inputId,
              },
              attributes: ['doctorId', 'provinceId'],
            });
          } else {
            // find by location
            doctorSpecialty = await db.Doctor_Info.findAll({
              where: {
                specialtyId: inputId,
                provinceId: location,
              },
              attributes: ['doctorId', 'provinceId'],
            });
          }
          data.dataValues.doctorSpecialty = doctorSpecialty;
        } else data = {};

        resolve({
          errCode: 0,
          errMessage: 'ok!',
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
};
