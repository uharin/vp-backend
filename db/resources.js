import { generateFirearmsQuery } from './queries/firearms/firearms-queries.js';
import { generateCasesQuery } from './queries/cases/cases-queries.js';
import { generateShootersQuery } from './queries/shooters/shooters-queries.js';
import { getSignsOfCrisis } from './queries/shooters/crisis-queries.js';
import { getTraumas } from './queries/shooters/trauma-queries.js';
import { getMotivations } from './queries/shooters/motivation-queries.js';
import { getHealths } from './queries/shooters/health-queries.js';
import { getDemographics } from './queries/shooters/demographics-queries.js';
import { getCrimeViolence } from './queries/shooters/crime-violence-queries.js';


export const RESOURCES = {
  firearms: {
    table: 'fa',
    id: 'firearm_id',
    queryGenerator: () => generateFirearmsQuery,
  },
  cases: {
    table: 'c',
    id: 'case_id',
    queryGenerator: () => generateCasesQuery,
  },
  shooters: {
    table: 's',
    id: 'shooter_id',
    queryGenerator: () => generateShootersQuery,
    relatedData:  {
      signs_of_crisis: getSignsOfCrisis,
      childhood_trauma: getTraumas,
      grievances_and_motivations: getMotivations,
      health_and_mental_health: getHealths,
      shooter_demographics: getDemographics,
      violence_and_crimes: getCrimeViolence,
    },
  },
  // Add more entities here as needed
};