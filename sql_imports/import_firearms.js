import fs from 'fs';
import csv from 'csv-parser';
import { convertToBoolean } from '../handlers/utils.js';

const importFirearms = async (pool) => {
  try {
    const insertPromises = [];

    fs.createReadStream('./sql_imports/firearms.csv')
      .pipe(csv())
      .on('data', async (row) => {
        try {
          const fullDate = row['Full Date'];
          const parsedDate = new Date(fullDate).toISOString().split('T')[0];

          const firearmQuery = `
            INSERT INTO Firearms (CaseID, MakeAndModel, Classification, Caliber, UsedInShooting, Modified, LargeCapacityMagazine, ExtendedMagazine, WhenObtained)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          `;
          const firearmValues = [
            row['Case #'],
            row['Make and Model'],
            row['Classification'],
            row['Caliber'],
            convertToBoolean(row['Used in Shooting?']),
            convertToBoolean(row['Modified']),
            convertToBoolean(row['Large Capacity Magazine']),
            convertToBoolean(row['Extended Magazine']),
            parsedDate,
          ];

          const acquisitionCategories = [
            'Legal Purchase',
            'Illegal Purchase',
            'Assembled with Legal Parts',
            'Gifted',
            'Theft',
            'Unknown',
          ];

          const acquisitionValues = [
            row['Legal Purchase'],
            row['Illegal Purchase'],
            row['Assembled with Legal Parts'],
            row['Gifted'],
            row['Theft'],
            row['Unknown'],
          ];

          const acquisitionQuery = `
            INSERT INTO FirearmAcquisitionMethods (FirearmID, AcquisitionCategory, ValueID)
            VALUES ($1, $2, (SELECT ValueID FROM AcquisitionValues WHERE AcquisitionCategory = $3 AND ValueName = $4))
          `;

          const promises = acquisitionCategories.map(async (category, index) => {
            if (acquisitionValues[index]) {
              const values = [
                row['FirearmID'], // Assuming you have a FirearmID available from previous insert
                category,
                category,
                acquisitionValues[index],
              ];

              await pool.query(acquisitionQuery, values);
            }
          });

          promises.push(pool.query(firearmQuery, firearmValues));
          insertPromises.push(Promise.all(promises));
        } catch (err) {
          console.error('Error inserting row:', err.message);
        }
      })
      .on('end', async () => {
        try {
          await Promise.all(insertPromises);
          console.log('CSV file successfully processed');
        } catch (err) {
          console.error('Error inserting rows:', err.message);
        } finally {
          pool.end(); // Close the database connection pool after all operations are done
        }
      });
  } catch (err) {
    console.error('Error connecting to PostgreSQL and importing data:', err.message);
  }
};

export default importFirearms;
