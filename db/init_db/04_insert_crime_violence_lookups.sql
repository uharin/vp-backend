INSERT INTO criminal_justice_involvements (criminal_justice_involvement_id, involvement) 
VALUES
  (1, 'N/A'),
  (2, 'Suspected'),
  (3, 'Arrested'),
  (4, 'Charged'),
  (5, 'Convicted');

INSERT INTO crimes1 (crimes1_id, crime_type)
VALUES
  (1, 'No evidence'),
  (2, 'Homicide'),
  (3, 'Forcible rape'),
  (4, 'Robbery'),
  (5, 'Aggravated assault'),
  (6, 'Burglary'),
  (7, 'Larceny or theft'),
  (8, 'Motor vehicle theft'),
  (9, 'Arson');

INSERT INTO crimes2 (crimes2_id, crime_type) 
VALUES
  (1, 'No evidence'),
  (2, 'Simple assault'),
  (3, 'Fraud, forgery, embezzlement'),
  (4, 'Stolen property'),
  (5, 'Vandalism'),
  (6, 'Weapons offenses'),
  (7, 'Prostitution or other non-rape sex offenses'),
  (8, 'Drugs'),
  (9, 'DUI'),
  (10, 'Other');

INSERT INTO domestic_abuse_histories (domestic_abuse_history_id, abuse_history) 
VALUES
  (1, 'No evidence'),
  (2, 'Abused romantic partner'),
  (3, 'Abused other family');

INSERT INTO domestic_abuses (domestic_abuse_id, abuse_type) 
VALUES
  (1, 'N/A'),
  (2, 'Non-sexual physical violence'),
  (3, 'Sexual violence'),
  (4, 'Threats or coercive control'),
  (5, 'Threats with deadly weapon');

INSERT INTO hate_group_associations (hate_group_association_id, hate_group_type) 
VALUES
  (1, 'No evidence'),
  (2, 'Hate group community'),
  (3, 'Other radical group association'),
  (4, 'Inspired by hate group but no direct connection'),
  (5, 'Website or chat room');

INSERT INTO physical_altercations (physical_altercation_id, altercation) 
VALUES
  (1, 'No evidence'),
  (2, 'Getting into physical fights with people'),
  (3, 'Attacked inanimate objects during arguments');

INSERT INTO played_violent_video_games (violent_video_game_id, video_game_type) 
VALUES
  (1, 'No evidence'),
  (2, 'Yes'),
  (3, 'Unspecified'),
  (4, 'N/A - pre-1992');