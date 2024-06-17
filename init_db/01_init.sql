-- CREATE TABLE races (
--     race_id SERIAL PRIMARY KEY,
--     race VARCHAR(50) UNIQUE NOT NULL
-- );

-- CREATE TABLE educations (
--     education_id SERIAL PRIMARY KEY,
--     education_level VARCHAR(50) UNIQUE NOT NULL
-- );

-- CREATE TABLE mental_health_statuses (
--     mental_health_id SERIAL PRIMARY KEY,
--     status VARCHAR(50) UNIQUE NOT NULL
-- );

-- CREATE TABLE genders (
--     gender_id SERIAL PRIMARY KEY,
--     gender VARCHAR(10) UNIQUE NOT NULL
-- );

CREATE TABLE access_methods (
    access_method_id INT PRIMARY KEY,
    access_method VARCHAR(50)
);

CREATE TABLE access_types (
    access_type_id INT PRIMARY KEY,
    access_type VARCHAR(50)
);

CREATE TABLE armed_bystanders (
    armed_bystander_id INT PRIMARY KEY,
    armed_bystander_type VARCHAR(100)
);

CREATE TABLE civic_designations (
    civic_designation_id INT PRIMARY KEY,
    civic_designation_type VARCHAR(50)
);

CREATE TABLE locations (
    location_id INT PRIMARY KEY,
    location_type VARCHAR(100)
);

CREATE TABLE regions (
    region_id INT PRIMARY KEY,
    region VARCHAR(50)
);

CREATE TABLE states (
    state_id INT PRIMARY KEY,
    state VARCHAR(50)
);

CREATE TABLE victim_locations (
    victim_location_id INT PRIMARY KEY,
    victim_location VARCHAR(50)
);

CREATE TABLE cases (
    case_id INT PRIMARY KEY,
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
    FOREIGN KEY (state_id) REFERENCES states(state_id),
    FOREIGN KEY (region_id) REFERENCES regions(region_id),
    FOREIGN KEY (civic_designation_id) REFERENCES civic_designations(civic_designation_id),
    FOREIGN KEY (location_id) REFERENCES locations(location_id),
    FOREIGN KEY (access_type_id) REFERENCES access_types(access_type_id),
    FOREIGN KEY (access_method_id) REFERENCES access_methods(access_method_id),
    FOREIGN KEY (victim_location_id) REFERENCES victim_locations(victim_location_id),
    FOREIGN KEY (armed_bystander_id) REFERENCES armed_bystanders(armed_bystander_id)
);

-- CREATE TABLE shooters (
--     ShooterID SERIAL PRIMARY KEY,
--     CaseID INT REFERENCES Cases(CaseID),
--     LastName VARCHAR(50) NOT NULL,
--     FirstName VARCHAR(50) NOT NULL,
--     GenderID INT REFERENCES Genders(GenderID),
--     Age INT,
--     RaceID INT REFERENCES Races(RaceID),
--     EducationID INT REFERENCES Educations(EducationID),
--     MentalHealthID INT REFERENCES MentalHealthStatuses(MentalHealthID),
--     CriminalHistory TEXT
-- );

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