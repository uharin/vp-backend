INSERT INTO family_mental_health_issues (family_mental_health_issues_id, history)
VALUES
  (1, 'No evidence'),
  (2, 'Parents had mental health issues'),
  (3, 'Other close relatives had mental health issues');

INSERT INTO mental_illnesses (mental_illness_id, illness)
VALUES
  (1, 'No evidence'),
  (2, 'Mood disorder'),
  (3, 'Thought disorder'),
  (4, 'Other psychiatric disorder'),
  (5, 'Indication of psychiatric disorder but no diagnosis');

INSERT INTO substance_abuse (substance_abuse_id,substance)
VALUES
  (1, 'No evidence'),
  (2, 'Problem with alcohol'),
  (3, 'Marijuana'),
  (4, 'Other drugs');

INSERT INTO suicidality (suicidality_id,suicidal_ideation)
VALUES
  (1, 'No evidence'),
  (2, 'Yes, at any point before the shooting '),
  (3, 'Intended to die in shooting but had no previous suicidality');

INSERT INTO voluntary_involuntary (voluntary_id, type)
VALUES
  (1,'N/A'),
  (2,'Voluntary'),
  (3,'Involuntary');