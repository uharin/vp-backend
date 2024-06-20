import fs from 'fs';
import csv from 'csv-parser';

const importData = async (pool, filePath, processRow) => {
  try {
    const insertPromises = [];

    const stream = fs.createReadStream(filePath)
      .on('error', (error) => {
        console.error('Error reading file:', error);
      });

    stream.pipe(csv())
      .on('data', async (row) => {
        try {
          const results = await processRow(row, pool);

          results.forEach(({ query, values }) => {
            insertPromises.push(pool.query(query, values));
          });
        } catch (error) {
          console.error('Error processing row:', error);
        }
      })
      .on('end', async () => {
        try {
          await Promise.all(insertPromises);
          console.log('CSV file successfully processed');
        } catch (error) {
          console.error('Error inserting rows:', error);
        }
      })
      .on('error', (error) => {
        console.error('CSV parsing error:', error);
      });
  } catch (error) {
    console.error('Error importing CSV:', error);
  }
};

export default importData;