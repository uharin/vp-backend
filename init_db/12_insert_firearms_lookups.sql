INSERT INTO caliber (caliber_id, size, description)
VALUES 
  (1, 'Small', '(e.g., .22, .25, and 7.62 x 39mm).'),
  (2, 'Medium', '(e.g., .32, .380, .38, and 9mm).'),
  (3, 'Large', '(e.g., .40s, .44, .45, 10mm).');

INSERT INTO firearm_classifications (firearm_classification_id, name, description)
VALUES 
  (1, 'Handgun', 'A handgun has a short barrel.'),
  (2, 'Shotgun', 'A shotgun has a long barrel and usually has a smooth bore.'),
  (3, 'Rifle', 'A rifle has a long barrel with rifling, which puts spin on the bullet, increasing accuracy and distance.'),
  (4, 'Assault weapon', 'An assault weapon is any semi-automatic gun that can accept a detachable ammunition magazine that has one or more additional features considered useful in military and criminal applications but unnecessary for sports or self-defense, such as a folding, telescoping or thumbhole rifle stock. This is consistent with the Federal Assault Weapons Ban of 1994.');

INSERT INTO firearm_illegal_purchases (firearm_illegal_id, status)
VALUES
  (1, 'Legally purchased'),
  (2, 'System failure (background check missed something, records not reported)'),
  (3, 'Straw purchase'),
  (4, 'Lying and buying'),
  (5, 'Illegal street sale'),
  (6, 'Illegal but specific source unknown'),
  (7, 'Legal sale but illegal possession');

INSERT INTO firearm_legal_purchases (firearm_legal_id, status)
VALUES 
  (1, 'Illegally purchased'),
  (2, 'Federal Firearms Licensed dealer'),
  (3, 'Unregulated private sale'),
  (4, 'Legal but specific source unknown');

INSERT INTO firearm_thefts (firearm_theft_id, status)
VALUES 
  (1, 'No'),
  (2, 'Theft/borrowed from family or friend'),
  (3, 'Theft other'),
  (4, 'Theft at the scene of the shooting');

INSERT INTO firearm_purchase_timeframes (firearm_purchase_timeframe_id, timeframe)
VALUES 
  (1, 'Less than one month prior to shooting'),
  (2, 'More than one month prior to shooting');
