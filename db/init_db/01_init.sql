CREATE TABLE access_methods (
    access_method_id SERIAL PRIMARY KEY,
    access_method VARCHAR(50) NOT NULL
);

CREATE TABLE access_types (
  access_type_id SERIAL PRIMARY KEY,
  access_type VARCHAR(50) NOT NULL
);

CREATE TABLE adult_traumas (
  adult_trauma_id SERIAL PRIMARY KEY,
  trauma VARCHAR(100) NOT NULL
);

CREATE TABLE armed_bystanders (
  armed_bystander_id SERIAL PRIMARY KEY,
  armed_bystander_type VARCHAR(100) NOT NULL
);

CREATE TABLE attempt_to_flee (
    attempt_to_flee_id SERIAL PRIMARY KEY,
    attempt_to_flee VARCHAR(50) NOT NULL
);

CREATE TABLE birth_orders (
  birth_order_id SERIAL PRIMARY KEY,
  birth_order_description VARCHAR(100) NOT NULL
);

CREATE TABLE caliber (
    caliber_id SERIAL PRIMARY KEY,
    size VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE civic_designations (
  civic_designation_id SERIAL PRIMARY KEY,
  civic_designation_type VARCHAR(50) NOT NULL
);

CREATE TABLE firearm_classifications (
    firearm_classification_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE firearm_purchase_timeframes (
    firearm_purchase_timeframe_id SERIAL PRIMARY KEY,
    timeframe VARCHAR(100) NOT NULL
);

CREATE TABLE firearm_illegal_purchases (
    firearm_illegal_id SERIAL PRIMARY KEY,
    status VARCHAR(100) NOT NULL
);

CREATE TABLE firearm_legal_purchases (
    firearm_legal_id SERIAL PRIMARY KEY,
    status VARCHAR(100) NOT NULL
);

CREATE TABLE firearm_thefts (
    firearm_theft_id SERIAL PRIMARY KEY,
    status VARCHAR(100) NOT NULL
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

CREATE TABLE criminal_sentence (
  criminal_sentence_id SERIAL PRIMARY KEY,
  criminal_sentence VARCHAR(100) NOT NULL
);

CREATE TABLE crisis_timeframes (
  crisis_timeframe_id SERIAL PRIMARY KEY,
  timeframe VARCHAR(50) NOT NULL
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

CREATE TABLE family_mental_health_issues (
  family_mental_health_issues_id SERIAL PRIMARY KEY,
  history VARCHAR(255) UNIQUE
);

CREATE TABLE firearm_proficiency (
  firearm_proficiency_id SERIAL PRIMARY KEY,
  firearm_proficiency VARCHAR(255) UNIQUE
);

CREATE TABLE genders (
  gender_id SERIAL PRIMARY KEY,
  gender VARCHAR(50) NOT NULL
);

CREATE TABLE hate_group_associations (
  hate_group_association_id SERIAL PRIMARY KEY,
  hate_group_type VARCHAR(100) NOT NULL
);

CREATE TABLE insanity_defense (
  insanity_defense_id SERIAL PRIMARY KEY,
  insanity_defense VARCHAR(50) NOT NULL
);

CREATE TABLE known_prejudices (
    known_prejudices_id INT PRIMARY KEY,
    prejudice VARCHAR(100)
);

CREATE TABLE locations (
  location_id SERIAL PRIMARY KEY,
  location_type VARCHAR(100) NOT NULL
);

CREATE TABLE make_and_model (
    make_and_model_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE mental_illnesses (
  mental_illness_id SERIAL PRIMARY KEY,
  illness VARCHAR(255) NOT NULL
);

CREATE TABLE military_branches (
  military_branch_id SERIAL PRIMARY KEY,
  military_branch_description VARCHAR(100) NOT NULL
);

CREATE TABLE military_services (
  military_service_id SERIAL PRIMARY KEY,
  military_service_description VARCHAR(100) NOT NULL
);

CREATE TABLE motive_other (
    motive_other_id INT PRIMARY KEY,
    motive VARCHAR(100)
);

CREATE TABLE on_scene_outcome (
    on_scene_outcome_id INT PRIMARY KEY,
    on_scene_outcome VARCHAR(100)
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

CREATE TABLE racism (
  racism_id SERIAL PRIMARY KEY,
  racism_type VARCHAR(50) NOT NULL
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

CREATE TABLE religious_hate (
    religious_hate_id INT PRIMARY KEY,
    religions_hate_type VARCHAR(100)
);

CREATE TABLE role_of_psychosis (
    role_of_psychosis_id INT PRIMARY KEY,
    description VARCHAR(150)
);

CREATE TABLE school_performances (
  school_performance_id SERIAL PRIMARY KEY,
  performance_category VARCHAR(100) NOT NULL
);

CREATE TABLE socioeconomic_status (
  socioeconomic_status_id SERIAL PRIMARY KEY,
  socioeconomic_status VARCHAR(50) NOT NULL
);

CREATE TABLE states (
  state_id SERIAL PRIMARY KEY,
  state VARCHAR(50) NOT NULL
);

CREATE TABLE substance_abuse (
  substance_abuse_id SERIAL PRIMARY KEY,
  substance VARCHAR(255) UNIQUE
);

CREATE TABLE suicidality (
  suicidality_id SERIAL PRIMARY KEY,
  suicidal_ideation VARCHAR(100)
);

CREATE TABLE triggering_events (
  triggering_event_id SERIAL PRIMARY KEY,
  event VARCHAR(50) NOT NULL
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

CREATE TABLE voluntary_involuntary (
  voluntary_id SERIAL PRIMARY KEY,
  type VARCHAR(50) UNIQUE
);

CREATE TABLE who_killed_shooter_on_scene (
  who_killed_shooter_on_scene_id SERIAL PRIMARY KEY,
  who_killed_shooter_on_scene VARCHAR(50) UNIQUE
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

CREATE TABLE firearms (
  firearm_id SERIAL PRIMARY KEY,
  make_and_model VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE case_firearms (
  case_firearm_id SERIAL PRIMARY KEY,
  case_id INT NOT NULL,
  firearm_id INT NOT NULL,
  caliber_id INT,
  firearm_classification_id INT,
  firearm_illegal_id INT,
  firearm_legal_id INT,
  firearm_purchase_timeframe_id INT,
  firearm_theft_id INT,
  used_in_shooting BOOLEAN,
  modified BOOLEAN,
  large_capacity_magazine BOOLEAN,
  extended_magazine BOOLEAN,
  assembled_with_legal_parts BOOLEAN,
  gifted BOOLEAN,
  unknown BOOLEAN,
  FOREIGN KEY (case_id)
    REFERENCES cases(case_id),
  FOREIGN KEY (firearm_id)
    REFERENCES firearms(firearm_id),
  FOREIGN KEY (caliber_id)
    REFERENCES caliber(caliber_id),
  FOREIGN KEY (firearm_classification_id)
    REFERENCES firearm_classifications(firearm_classification_id),
  FOREIGN KEY (firearm_illegal_id)
    REFERENCES firearm_illegal_purchases(firearm_illegal_id),
  FOREIGN KEY (firearm_legal_id)
    REFERENCES firearm_legal_purchases(firearm_legal_id),
  FOREIGN KEY (firearm_theft_id)
    REFERENCES firearm_thefts(firearm_theft_id),
  FOREIGN KEY (firearm_purchase_timeframe_id)
    REFERENCES firearm_purchase_timeframes(firearm_purchase_timeframe_id)
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
  shooter_id INT UNIQUE,
  crimes1_id INT,
  crimes2_id INT,
  criminal_justice_involvement_id INT,
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
  FOREIGN KEY (hate_group_association_id)
    REFERENCES hate_group_associations(hate_group_association_id),
  FOREIGN KEY (physical_altercation_id)
    REFERENCES physical_altercations(physical_altercation_id),
  FOREIGN KEY (violent_video_games_id)
    REFERENCES played_violent_video_games(violent_video_game_id)
);

CREATE TABLE shooter_demographics (
  shooter_demographics_id SERIAL PRIMARY KEY,
  shooter_id INT UNIQUE,
  gender_id INT,
  race_id INT,
  age INT,
  birth_order_id INT,
  height INT,
  weight INT,
  heterosexual BOOLEAN,
  immigrant BOOLEAN,
  children BOOLEAN,
  number_of_siblings INT,
  number_of_older_siblings INT,
  number_of_younger_siblings INT,
  relationship_status_id INT,
  religion_id INT,
  community_involvement_id INT,
  violence_and_crimes_id INT,
  education_id INT,
  employment_type_id INT,
  military_branch_id INT,
  military_service_id INT,
  school_performance_id INT,
  community_involvement_specified TEXT,
  employed BOOLEAN,
  school_performance_specified TEXT,
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

CREATE TABLE childhood_traumas (
    childhood_trauma_id SERIAL PRIMARY KEY,
    shooter_id INT UNIQUE,
    adult_trauma_id INT,
    childhood_socioeconomic_status_id INT,
    bullied BOOLEAN,
    raised_by_single_parent BOOLEAN,
    parental_separation_or_divorce BOOLEAN,
    suicide_of_parent BOOLEAN,
    death_of_parent BOOLEAN,
    childhood_trauma BOOLEAN,
    physical_abuse BOOLEAN,
    sexual_abuse BOOLEAN,
    emotional_abuse BOOLEAN,
    neglect BOOLEAN,
    mother_violently_treated BOOLEAN,
    parent_substance_abuse BOOLEAN,
    parent_criminal_record BOOLEAN,
    family_member_incarcerated BOOLEAN,
    FOREIGN KEY (adult_trauma_id)
      REFERENCES adult_traumas(adult_trauma_id),
    FOREIGN KEY (childhood_socioeconomic_status_id)
      REFERENCES socioeconomic_status(socioeconomic_status_id)
);

CREATE TABLE signs_of_crisis (
    signs_of_crisis_id SERIAL PRIMARY KEY,
    shooter_id INT UNIQUE,
    crisis_timeframe_id INT,
    triggering_event_id INT,
    specify_signs_of_crisis TEXT,
    abusive_behavior BOOLEAN,
    inability_to_perform_daily_tasks BOOLEAN,
    increased_agitation BOOLEAN,
    notably_depressed_mood BOOLEAN,
    rapid_mood_swings BOOLEAN,
    signs_of_crisis BOOLEAN,
    unusually_calm_or_happy BOOLEAN,
    isolation BOOLEAN,
    losing_touch_with_reality BOOLEAN,
    paranoia BOOLEAN,
    FOREIGN KEY (triggering_event_id)
      REFERENCES triggering_events(triggering_event_id),
    FOREIGN KEY (crisis_timeframe_id)
      REFERENCES crisis_timeframes(crisis_timeframe_id)
);

CREATE TABLE grievances_and_motivations (
    grievances_and_motivations_id SERIAL PRIMARY KEY,
    shooter_id INT UNIQUE,
    known_prejudices_id INT,
    racism_id INT,
    religious_hate_id INT,
    misogyny BOOLEAN,
    homophobia BOOLEAN,
    employment_issue BOOLEAN,
    economic_issue BOOLEAN,
    legal_issue BOOLEAN,
    relationship_issue BOOLEAN,
    interpersonal_conflict BOOLEAN,
    fame_seeking BOOLEAN,
    motive_other_id INT,
    motive_unknown BOOLEAN,
    role_of_psychosis_id INT,
    FOREIGN KEY (known_prejudices_id)
      REFERENCES known_prejudices(known_prejudices_id),
    FOREIGN KEY (racism_id) 
      REFERENCES racism(racism_id),
    FOREIGN KEY (religious_hate_id)
      REFERENCES religious_hate(religious_hate_id),
    FOREIGN KEY (motive_other_id)
      REFERENCES motive_other(motive_other_id),
    FOREIGN KEY (role_of_psychosis_id)
      REFERENCES role_of_psychosis(role_of_psychosis_id)
);

CREATE TABLE health_and_mental_health (
    health_and_mental_health_id SERIAL PRIMARY KEY,
    shooter_id INT UNIQUE,
    suicidality_id INT,
    substance_abuse_id INT,
    voluntary_involuntary_hospitalization INT,
    voluntary_mandatory_counseling INT,
    mental_illness_id INT,
    family_mental_health_issues_id INT,
    hospitalization_for_psychiatric_reasons BOOLEAN,
    prior_counseling BOOLEAN,
    prescribed_psychiatric_medication BOOLEAN,
    psychiatric_medication_specified TEXT,
    treatment BOOLEAN,
    fasd BOOLEAN,
    autism_spectrum_disorder BOOLEAN,
    health_issues BOOLEAN,
    specify_health_issues TEXT,
    medication_category TEXT,
    head_injury BOOLEAN,
    FOREIGN KEY (family_mental_health_issues_id)
      REFERENCES family_mental_health_issues(family_mental_health_issues_id),
    FOREIGN KEY (mental_illness_id)  
      REFERENCES mental_illnesses(mental_illness_id),
    FOREIGN KEY (voluntary_involuntary_hospitalization)  
      REFERENCES voluntary_involuntary(voluntary_id),
    FOREIGN KEY (voluntary_mandatory_counseling) 
      REFERENCES voluntary_involuntary(voluntary_id),
    FOREIGN KEY (suicidality_id) 
      REFERENCES suicidality(suicidality_id),
    FOREIGN KEY (substance_abuse_id) 
      REFERENCES substance_abuse(substance_abuse_id)
);

CREATE TABLE shooters (
  shooter_id SERIAL PRIMARY KEY,
  childhood_trauma_id INT UNIQUE,
  grievances_and_motivations_id INT UNIQUE,
  health_and_mental_health_id INT UNIQUE,
  shooter_demographics_id INT UNIQUE,
  signs_of_crisis_id INT UNIQUE,
  violence_and_crimes_id INT UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  FOREIGN KEY (childhood_trauma_id)
    REFERENCES childhood_traumas(childhood_trauma_id),
  FOREIGN KEY (grievances_and_motivations_id)
    REFERENCES grievances_and_motivations(grievances_and_motivations_id),
  FOREIGN KEY (health_and_mental_health_id)
    REFERENCES health_and_mental_health(health_and_mental_health_id),
  FOREIGN KEY (shooter_demographics_id)
    REFERENCES shooter_demographics(shooter_demographics_id),
  FOREIGN KEY (signs_of_crisis_id)
    REFERENCES signs_of_crisis(signs_of_crisis_id),
  FOREIGN KEY (violence_and_crimes_id)
    REFERENCES violence_and_crimes(violence_and_crimes_id)
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

CREATE TABLE case_shooter_resolutions (
  case_shooter_resolution_id SERIAL PRIMARY KEY,
  case_id INT,
  shooter_id INT,
  on_scene_outcome_id INT,
  who_killed_shooter_on_scene_id INT,
  attempt_to_flee_id INT,
  insanity_defense_id INT,
  criminal_sentence_id INT,
  FOREIGN KEY (case_id, shooter_id)
    REFERENCES case_shooters(case_id, shooter_id),
  FOREIGN KEY (on_scene_outcome_id)
    REFERENCES on_scene_outcome(on_scene_outcome_id),
  FOREIGN KEY (who_killed_shooter_on_scene_id)
    REFERENCES who_killed_shooter_on_scene(who_killed_shooter_on_scene_id),
  FOREIGN KEY (attempt_to_flee_id)
    REFERENCES attempt_to_flee(attempt_to_flee_id),
  FOREIGN KEY (insanity_defense_id)
    REFERENCES insanity_defense(insanity_defense_id),
  FOREIGN KEY (criminal_sentence_id)
    REFERENCES criminal_sentence(criminal_sentence_id)
);

CREATE TABLE case_shooter_weapons (
  case_shooter_weapons_id SERIAL PRIMARY KEY,
  case_id INT,
  shooter_id INT,
  firearm_proficiency_id INT,
  interest_in_firearms BOOLEAN,
  other_weaposn_or_gear BOOLEAN,
  specify_weapons_or_gear TEXT,
  total_weapons_brought_to_scene INT,
  FOREIGN KEY (case_id, shooter_id)
    REFERENCES case_shooters(case_id, shooter_id),
  FOREIGN KEY (firearm_proficiency_id)
    REFERENCES firearm_proficiency(firearm_proficiency_id)
);

-- Junction table because database columns from Google Sheet have multiple values listed

CREATE TABLE shooter_domestic_abuses (
  violence_and_crimes_id INT,
  domestic_abuse_id INT,
  PRIMARY KEY (violence_and_crimes_id, domestic_abuse_id),
  FOREIGN KEY (violence_and_crimes_id)    
    REFERENCES violence_and_crimes(violence_and_crimes_id),
  FOREIGN KEY (domestic_abuse_id)
    REFERENCES domestic_abuses(domestic_abuse_id)
);

-- Junction table because database columns from Google Sheet have multiple values listed

CREATE TABLE shooter_domestic_abuse_histories (
  violence_and_crimes_id INT,
  domestic_abuse_history_id INT,
  PRIMARY KEY (violence_and_crimes_id, domestic_abuse_history_id),
  FOREIGN KEY (violence_and_crimes_id) 
    REFERENCES violence_and_crimes(violence_and_crimes_id),
  FOREIGN KEY (domestic_abuse_history_id) 
    REFERENCES domestic_abuse_histories(domestic_abuse_history_id)
);