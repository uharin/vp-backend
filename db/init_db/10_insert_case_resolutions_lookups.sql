INSERT INTO attempt_to_flee(attempt_to_flee_id, attempt_to_flee)
VALUES
  (1, 'No'),
  (2, 'Tried to escape'),
  (3, 'Escaped and killed self');

INSERT INTO criminal_sentence(criminal_sentence_id, criminal_sentence)
VALUES
  (1, 'N/A'),
  (2, 'Death penalty'),
  (3, 'Life without parole'),
  (4, 'Life imprisonment (with possibility of parole)'),
  (5, 'Hospitalization'),
  (6, 'Juvenile detention');

INSERT INTO insanity_defense(insanity_defense_id, insanity_defense)
VALUES
  (1, 'No'),
  (2, 'Yes'),
  (3, 'N/A (dead before trial)');

INSERT INTO on_scene_outcome(on_scene_outcome_id, on_scene_outcome)
VALUES
  (1, 'Killed self'),
  (2, 'Killed on scene'),
  (3, 'Apprehended'),
  (4, 'Apprehended, then suicide before trial'),
  (5, 'Fled');

INSERT INTO who_killed_shooter_on_scene (who_killed_shooter_on_scene_id, who_killed_shooter_on_scene)
VALUES
  (1, 'Alive'),
  (2, 'Self'),
  (3, 'Police'),
  (4, 'School resource officer'),
  (5, 'Armed civilian');
