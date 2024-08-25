INSERT INTO access_methods (access_method_id, access_method)
VALUES
  (1, 'Wandered in (unsecured entry)'),
  (2, 'Used force'),
  (3, 'Unknown');

INSERT INTO access_types (access_type_id, access_type)
VALUES
  (1, 'Publicly accessible or unrestricted location'),
  (2, 'Restricted space and had access'),
  (3, 'Restricted space and did not have access');

INSERT INTO armed_bystanders (armed_bystander_id, armed_bystander_type)
VALUES
  (1, 'Not applicable'),
  (2, 'Law enforcement or public safety professional'),
  (3, 'Civilian');

INSERT INTO civic_designations (civic_designation_id, civic_designation_type)
VALUES
  (1, 'Urban'),
  (2, 'Suburban'),
  (3, 'Rural');

INSERT INTO locations (location_id, location_type)
VALUES
  (1, 'K-12 school'),
  (2, 'College or university'),
  (3, 'Government building or place of civic importance'),
  (4, 'House of worship'),
  (5, 'Retail'),
  (6, 'Restaurant, bar, or nightclub'),
  (7, 'Office'),
  (8, 'Place of residence'),
  (9, 'Outdoors'),
  (10, 'Warehouse or factory'),
  (11, 'Post office');

INSERT INTO regions (region_id, region)
VALUES
  (1, 'South'),
  (2, 'Midwest'),
  (3, 'Northeast'),
  (4, 'West');

INSERT INTO states (state_id, state)
VALUES
  (1, 'Alabama'),
  (2, 'Alaska'),
  (3, 'Arizona'),
  (4, 'Arkansas'),
  (5, 'California'),
  (6, 'Colorado'),
  (7, 'Connecticut'),
  (8, 'Delaware'),
  (9, 'Florida'),
  (10, 'Georgia'),
  (11, 'Hawaii'),
  (12, 'Idaho'),
  (13, 'Illinois'),
  (14, 'Indiana'),
  (15, 'Iowa'),
  (16, 'Kansas'),
  (17, 'Kentucky'),
  (18, 'Louisiana'),
  (19, 'Maine'),
  (20, 'Maryland'),
  (21, 'Massachusetts'),
  (22, 'Michigan'),
  (23, 'Minnesota'),
  (24, 'Mississippi'),
  (25, 'Missouri'),
  (26, 'Montana'),
  (27, 'Nebraska'),
  (28, 'Nevada'),
  (29, 'New Hampshire'),
  (30, 'New Jersey'),
  (31, 'New Mexico'),
  (32, 'New York'),
  (33, 'North Carolina'),
  (34, 'North Dakota'),
  (35, 'Ohio'),
  (36, 'Oklahoma'),
  (37, 'Oregon'),
  (38, 'Pennsylvania'),
  (39, 'Rhode Island'),
  (40, 'South Carolina'),
  (41, 'South Dakota'),
  (42, 'Tennessee'),
  (43, 'Texas'),
  (44, 'Utah'),
  (45, 'Vermont'),
  (46, 'Virginia'),
  (47, 'Washington'),
  (48, 'West Virginia'),
  (49, 'Wisconsin'),
  (50, 'Wyoming'),
  (51, 'Washington DC');

INSERT INTO victim_locations (victim_location_id, victim_location)
VALUES
  (1, 'Inside'),
  (2, 'Outside'),
  (3, 'Both inside and outside');
