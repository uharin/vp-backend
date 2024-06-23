INSERT INTO birth_orders (birth_order_id, birth_order_description)
VALUES
  (1, 'Only child'),
  (2, 'Oldest child'),
  (3, 'Middle child'),
  (4, 'Youngest child'),
  (5, 'Twin');

INSERT INTO community_involvements (community_involvement_id, community_involvement_description)
VALUES
  (1, 'No evidence'),
  (2, 'Somewhat involved'),
  (3, 'Heavily involved'),
  (4, 'Formerly involved but recently withdrawn');

INSERT INTO educations (education_id, education_level)
VALUES
  (1, 'Less than high school'),
  (2, 'High school or GED'),
  (3, 'Some college or trade school'),
  (4, 'Bachelor''s degree'),
  (5, 'Graduate school or advanced degree');

INSERT INTO employment_types (employment_type_id, employment_type_description)
VALUES
  (1, 'Blue collar'),
  (2, 'White collar'),
  (3, 'In between');

INSERT INTO genders (gender_id, gender)
VALUES
  (1, 'Male'),
  (2, 'Female'),
  (3, 'Transgender');

INSERT INTO military_branches (military_branch_id, military_branch_description) VALUES
  (1, 'Army'),
  (2, 'Navy'),
  (3, 'Air Force'),
  (4, 'Marines'),
  (5, 'Coast Guard'),
  (6, 'National Guard');

INSERT INTO military_services (military_service_id, military_service_description) VALUES
  (1, 'No'),
  (2, 'Yes'),
  (3, 'Joined but did not make it through training');

INSERT INTO races (race_id, race)
VALUES
  (1, 'White'),
  (2, 'Black'),
  (3, 'Latinx'),
  (4, 'Middle Eastern'),
  (5, 'Native American'),
  (6, 'Other');

INSERT INTO relationship_statuses (relationship_status_id, relationship_status_description)
VALUES
  (1, 'Single'),
  (2, 'Boyfriend/girlfriend'),
  (3, 'Married'),
  (4, 'Divorced/separated/widowed');

INSERT INTO religions (religion_id, religion_name)
VALUES
  (1, 'None'),
  (2, 'Christian'),
  (3, 'Muslim'),
  (4, 'Buddhist'),
  (5, 'Cultural spirituality/other'),
  (6, 'Jewish');

INSERT INTO school_performances (school_performance_id, performance_category) VALUES
  (1, 'Poor (D-F grades, under 2.0 GPA, failed classes, repeated grades)'),
  (2, 'Average (C''s, 2.0-3.49 GPA)'),
  (3, 'Good (A-B grades, 3.5-4.0 GPA)');
