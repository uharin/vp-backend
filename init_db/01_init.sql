CREATE TABLE access_methods (
    access_method_id SERIAL PRIMARY KEY,
    access_method VARCHAR(50) NOT NULL
);

CREATE TABLE access_types (
  access_type_id SERIAL PRIMARY KEY,
  access_type VARCHAR(50) NOT NULL
);

CREATE TABLE armed_bystanders (
  armed_bystander_id SERIAL PRIMARY KEY,
  armed_bystander_type VARCHAR(100) NOT NULL
);

CREATE TABLE birth_orders (
  birth_order_id SERIAL PRIMARY KEY,
  birth_order_description VARCHAR(100) NOT NULL
);

CREATE TABLE civic_designations (
  civic_designation_id SERIAL PRIMARY KEY,
  civic_designation_type VARCHAR(50) NOT NULL
);

CREATE TABLE community_involvements (
  community_involvement_id SERIAL PRIMARY KEY,
  community_involvement_description VARCHAR(100) NOT NULL
);

CREATE TABLE crimes1 (
    crimes1_id SERIAL PRIMARY KEY,
    crime_type VARCHAR(100) NOT NULL
);

CREATE TABLE crimes2 (
    crimes2_id SERIAL PRIMARY KEY,
    crime_type VARCHAR(100) NOT NULL
);

CREATE TABLE criminal_justice_involvements (
  criminal_justice_involvement_id SERIAL PRIMARY KEY,
  involvement VARCHAR(50) NOT NULL
);

CREATE TABLE domestic_abuse_histories (
  domestic_abuse_history_id SERIAL PRIMARY KEY,
  abuse_history VARCHAR(100) NOT NULL
);

CREATE TABLE domestic_abuses (
  domestic_abuse_id SERIAL PRIMARY KEY,
  abuse_type VARCHAR(100) NOT NULL
);

CREATE TABLE educations (
  education_id SERIAL PRIMARY KEY,
  education_level VARCHAR(50) NOT NULL
);

CREATE TABLE employment_types (
  employment_type_id SERIAL PRIMARY KEY,
  employment_type_description VARCHAR(100) NOT NULL
);

CREATE TABLE genders (
  gender_id SERIAL PRIMARY KEY,
  gender VARCHAR(50) NOT NULL
);

CREATE TABLE hate_group_associations (
  hate_group_association_id SERIAL PRIMARY KEY,
  hate_group_type VARCHAR(100) NOT NULL
);

CREATE TABLE locations (
  location_id SERIAL PRIMARY KEY,
  location_type VARCHAR(100) NOT NULL
);

CREATE TABLE military_branches (
  military_branch_id SERIAL PRIMARY KEY,
  military_branch_description VARCHAR(100) NOT NULL
);

CREATE TABLE military_services (
  military_service_id SERIAL PRIMARY KEY,
  military_service_description VARCHAR(100) NOT NULL
);

CREATE TABLE physical_altercations (
  physical_altercation_id SERIAL PRIMARY KEY,
  altercation VARCHAR(100) NOT NULL
);

CREATE TABLE played_violent_video_games (
  violent_video_game_id SERIAL PRIMARY KEY,
  video_game_type VARCHAR(50) NOT NULL
);

CREATE TABLE races (
    race_id SERIAL PRIMARY KEY,
    race VARCHAR(50) NOT NULL
);

CREATE TABLE regions (
    region_id SERIAL PRIMARY KEY,
    region VARCHAR(50) NOT NULL
);

CREATE TABLE relationship_statuses (
  relationship_status_id SERIAL PRIMARY KEY,
  relationship_status_description VARCHAR(100) NOT NULL
);

CREATE TABLE religions (
    religion_id SERIAL PRIMARY KEY,
    religion_name VARCHAR(50) NOT NULL
);

CREATE TABLE school_performances (
  school_performance_id SERIAL PRIMARY KEY,
  performance_category VARCHAR(100) NOT NULL
);

CREATE TABLE states (
    state_id SERIAL PRIMARY KEY,
    state VARCHAR(50) NOT NULL
);

CREATE TABLE victim_locations (
    victim_location_id SERIAL PRIMARY KEY,
    victim_location VARCHAR(50) NOT NULL
);

CREATE TABLE victim_knew_shooter_statuses (
    victim_knew_shooter_status_id SERIAL PRIMARY KEY,
    victim_knew_shooter_status VARCHAR(10) UNIQUE NOT NULL
);

CREATE TABLE victim_relationships (
    victim_relationship_id SERIAL PRIMARY KEY,
    victim_relationship VARCHAR(50) NOT NULL
);

CREATE TABLE cases (
  case_id SERIAL PRIMARY KEY,
  full_date DATE,
  day_of_week VARCHAR(10),
  day INT,
  month INT,
  year INT,
  street_number VARCHAR(50),
  street_name VARCHAR(255),
  city VARCHAR(100),
  county VARCHAR(100),
  zip_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  state_id INT,
  region_id INT,
  civic_designation_id INT,
  metropolitan BOOLEAN,
  location_id INT,
  location_specifics VARCHAR(255),
  insider BOOLEAN,
  access_type_id INT,
  access_method_id INT,
  victim_location_id INT,
  workplace_shooting BOOLEAN,
  multiple_locations BOOLEAN,
  other_location_specified VARCHAR(255),
  armed_person_on_scene BOOLEAN,
  armed_bystander_id INT,
  number_killed INT,
  number_injured INT,
  family_member_victim BOOLEAN,
  romantic_partner_victim BOOLEAN,
  kidnapping_hostage_situation BOOLEAN,
  FOREIGN KEY (state_id)
    REFERENCES states(state_id),
  FOREIGN KEY (region_id)
    REFERENCES regions(region_id),
  FOREIGN KEY (civic_designation_id)
    REFERENCES civic_designations(civic_designation_id),
  FOREIGN KEY (location_id)
    REFERENCES locations(location_id),
  FOREIGN KEY (access_type_id)
    REFERENCES access_types(access_type_id),
  FOREIGN KEY (access_method_id)
    REFERENCES access_methods(access_method_id),
  FOREIGN KEY (victim_location_id)
    REFERENCES victim_locations(victim_location_id),
  FOREIGN KEY (armed_bystander_id)
    REFERENCES armed_bystanders(armed_bystander_id)
);

CREATE TABLE victims (
  victim_id SERIAL PRIMARY KEY,
  gender_id INT,
  race_id INT,
  victim_knew_shooter_status_id INT,
  victim_relationship_id INT,
  age INT,
  life_expectancy FLOAT,
  relationship_to_shooter_details VARCHAR(255),
  victim_name VARCHAR(255),
  years_lost FLOAT,
  FOREIGN KEY (gender_id)
    REFERENCES genders(gender_id),
  FOREIGN KEY (race_id)
    REFERENCES races(race_id),
  FOREIGN KEY (victim_knew_shooter_status_id)
    REFERENCES victim_knew_shooter_statuses(victim_knew_shooter_status_id),
  FOREIGN KEY (victim_relationship_id)
    REFERENCES victim_relationships(victim_relationship_id)
);

CREATE TABLE case_victims (
  case_id INT NOT NULL,
  victim_id INT NOT NULL,
  PRIMARY KEY (case_id, victim_id),
  FOREIGN KEY (case_id)
    REFERENCES cases(case_id),
  FOREIGN KEY (victim_id)
    REFERENCES victims(victim_id)
);

CREATE TABLE violence_and_crimes (
  violence_and_crimes_id SERIAL PRIMARY KEY,
  crimes1_id INT,
  crimes2_id INT,
  criminal_justice_involvement_id INT,
  domestic_abuse_id INT,
  domestic_abuse_history_id INT,
  hate_group_association_id INT,
  physical_altercation_id INT,
  violent_video_games_id INT,
  animal_abuse BOOLEAN,
  bully BOOLEAN,
  criminal_record BOOLEAN,
  gang_association BOOLEAN,
  known_to_police_or_fbi BOOLEAN,
  sexual_offenses BOOLEAN,
  terror_group_association BOOLEAN,
  FOREIGN KEY (crimes1_id)
    REFERENCES crimes1(crimes1_id),
  FOREIGN KEY (crimes2_id)
    REFERENCES crimes2(crimes2_id),
  FOREIGN KEY (criminal_justice_involvement_id)
    REFERENCES criminal_justice_involvements(criminal_justice_involvement_id),
  FOREIGN KEY (domestic_abuse_id)
    REFERENCES domestic_abuses(domestic_abuse_id),
  FOREIGN KEY (domestic_abuse_history_id)
    REFERENCES domestic_abuse_histories(domestic_abuse_history_id),
  FOREIGN KEY (hate_group_association_id)
    REFERENCES hate_group_associations(hate_group_association_id),
  FOREIGN KEY (physical_altercation_id)
    REFERENCES physical_altercations(physical_altercation_id),
  FOREIGN KEY (violent_video_games_id)
    REFERENCES played_violent_video_games(violent_video_game_id)
);

CREATE TABLE shooters (
  shooter_id SERIAL PRIMARY KEY,
  birth_order_id INT,
  community_involvement_id INT,
  violence_and_crimes_id INT,
  education_id INT,
  employment_type_id INT,
  gender_id INT,
  military_branch_id INT,
  military_service_id INT,
  race_id INT,
  relationship_status_id INT,
  religion_id INT,
  school_performance_id INT,
  age INT,
  children BOOLEAN,
  community_involvement_specified TEXT,
  employed BOOLEAN,
  first_name VARCHAR(100),
  height INT,
  heterosexual BOOLEAN,
  immigrant BOOLEAN,
  last_name VARCHAR(100),
  number_of_siblings INT,
  older_siblings INT,
  school_performance_specified TEXT,
  weight INT,
  younger_siblings INT,
  FOREIGN KEY (violence_and_crimes_id)
    REFERENCES violence_and_crimes(violence_and_crimes_id),
  FOREIGN KEY (gender_id)
    REFERENCES genders(gender_id),
  FOREIGN KEY (race_id)
    REFERENCES races(race_id),
  FOREIGN KEY (religion_id)
    REFERENCES religions(religion_id),
  FOREIGN KEY (education_id)
    REFERENCES educations(education_id),
  FOREIGN KEY (school_performance_id)
    REFERENCES school_performances(school_performance_id),
  FOREIGN KEY (birth_order_id)
    REFERENCES birth_orders(birth_order_id),
  FOREIGN KEY (relationship_status_id)
    REFERENCES relationship_statuses(relationship_status_id),
  FOREIGN KEY (employment_type_id)
    REFERENCES employment_types(employment_type_id),
  FOREIGN KEY (military_service_id)
    REFERENCES military_services(military_service_id),
  FOREIGN KEY (military_branch_id)
    REFERENCES military_branches(military_branch_id),
  FOREIGN KEY (community_involvement_id)
    REFERENCES community_involvements(community_involvement_id)
);

CREATE TABLE case_shooters (
  case_id INT,
  shooter_id INT,
  PRIMARY KEY (case_id, shooter_id),
  FOREIGN KEY (case_id)
    REFERENCES cases(case_id),
  FOREIGN KEY (shooter_id)
    REFERENCES shooters(shooter_id)
);

-- CREATE INDEX idx_shooter_id ON Cases(ShooterID);

-- CREATE TABLE firearms (
--     FirearmID SERIAL PRIMARY KEY,
--     CaseID INT REFERENCES Cases(CaseID),
--     MakeAndModel VARCHAR(100),
--     Classification VARCHAR(50),
--     Caliber VARCHAR(20),
--     UsedInShooting BOOLEAN,
--     Modified BOOLEAN,
--     LargeCapacityMagazine BOOLEAN,
--     ExtendedMagazine BOOLEAN,
--     WhenObtained DATE
-- );

-- CREATE INDEX idx_case_id_firearms ON Firearms(CaseID);

-- CREATE TABLE acquisition_values (
--     ValueID SERIAL PRIMARY KEY,
--     AcquisitionCategory VARCHAR(50),
--     ValueName VARCHAR(100)
-- );

-- CREATE TABLE firearm_acquisition_methods (
--     MethodID SERIAL PRIMARY KEY,
--     FirearmID INT REFERENCES Firearms(FirearmID),
--     AcquisitionCategory VARCHAR(50),
--     ValueID INT REFERENCES AcquisitionValues(ValueID),
--     FOREIGN KEY (FirearmID) REFERENCES Firearms(FirearmID)
-- );