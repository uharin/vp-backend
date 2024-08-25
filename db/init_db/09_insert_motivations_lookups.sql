INSERT INTO known_prejudices (known_prejudices_id, prejudice)
VALUES
  (1, 'No evidence'),
  (2, 'Racism'),
  (3, 'Misogyny'),
  (4, 'Homophobia / transphobia'),
  (5, 'Religious hatred');

INSERT INTO motive_other (motive_other_id, motive)
VALUES
  (1, 'No evidence'),
  (2, 'Yes'),
  (3, 'Generalized anger (angry at a group, society, world, carries out symbolic killing)');

INSERT INTO racism (racism_id, racism_type)
VALUES
  (1, 'No evidence'),
  (2, 'Yes, targeting people of color'),
  (3, 'Yes, targeting white people');

INSERT INTO religious_hate (religious_hate_id, religions_hate_type)
VALUES
  (1, 'No evidence'),
  (2, 'Antisemitism'),
  (3, 'Islamophobia'),
  (4, 'Angry with Christianity/Christian God'),
  (5, 'Both Antisemitism and Islamophobia');

INSERT INTO role_of_psychosis (role_of_psychosis_id, description)
VALUES
  (1, 'No evidence that symptoms of psychosis played a role in the shooting'),
  (2, 'Symptoms of psychosis may have played a minor role in the crime'),
  (3, 'Symptoms of psychosis played a moderate role in the crime, but there was an additional motive'),
  (4, 'Symptoms of psychosis played a major role in the crime, no other known motive');