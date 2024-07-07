import { convertToBoolean, parseValue } from '../handlers/utils.js';

const insertViolenceAndCrimes = async (row, pool, shooter_id) => {
  const query = `
    INSERT INTO violence_and_crimes (
      shooter_id, known_to_police_or_fbi, criminal_record, crimes1_id, crimes2_id, criminal_justice_involvement_id, physical_altercation_id, animal_abuse, sexual_offenses, gang_association, terror_group_association, hate_group_association_id, violent_video_games_id, bully
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING violence_and_crimes_id
  `;
  const knownToPoliceOrFBI = convertToBoolean(row['Known to Police or FBI']);
  const criminalRecord = convertToBoolean(row['Criminal Record']);
  const crimes1Id = parseValue(row['Part I Crimes'], parseInt);
  const crimes2Id = parseValue(row['Part II Crimes'], parseInt);
  const criminalJusticeInvolvementId = parseValue(row['Highest Level of Justice System Involvement'], parseInt);
  const physicalAltercationId = parseValue(row['History of Physical Altercations'], parseInt);
  const animalAbuse = convertToBoolean(row['History of Animal Abuse']);
  const domesticAbuseHistoryIds = row['History of Domestic Abuse'].split(',').map((id) => parseInt(id));
  const domesticAbuseTypeIds = row['Domestic Abuse Specified'].split(',').map((id) => parseInt(id.trim()));
  const sexualOffenses = convertToBoolean(row['History of Sexual Offenses']);
  const gangAssociation = convertToBoolean(row['Gang Affiliation']);
  const terrorGroupAssociation = convertToBoolean(row['Terror Group Affiliation']);
  const hateGroupAssociationId = parseValue(row['Known Hate Group or Chat Room Affiliation'], parseInt);
  const violentVideoGamesId = parseValue(row['Violent Video Games'], parseInt);
  const bully = convertToBoolean(row['Bully']);

  const values = [
    shooter_id,
    knownToPoliceOrFBI,
    criminalRecord,
    crimes1Id,
    crimes2Id,
    criminalJusticeInvolvementId,
    physicalAltercationId,
    animalAbuse,
    sexualOffenses,
    gangAssociation,
    terrorGroupAssociation,
    hateGroupAssociationId,
    violentVideoGamesId,
    bully,
  ];

  const result = await pool.query(query, values);
  const violenceAndCrimesId = result.rows[0].violence_and_crimes_id;

  for (const domesticAbuseTypeId of domesticAbuseTypeIds) {
    const parsedDomesticAbuseTypeId = parseValue(domesticAbuseTypeId, parseInt);

    await pool.query(
      'INSERT INTO shooter_domestic_abuses (violence_and_crimes_id, domestic_abuse_id) VALUES ($1, $2)',
      [violenceAndCrimesId, parsedDomesticAbuseTypeId]
    );
  }

  for (const domesticAbuseHistoryId of domesticAbuseHistoryIds) {
    const parsedDomesticAbuseHistoryId = parseValue(domesticAbuseHistoryId, parseInt);

    await pool.query(
      'INSERT INTO shooter_domestic_abuse_histories (violence_and_crimes_id, domestic_abuse_history_id) VALUES ($1, $2)',
      [violenceAndCrimesId, parsedDomesticAbuseHistoryId]
    );
  }
  return violenceAndCrimesId;
};

export default insertViolenceAndCrimes;
