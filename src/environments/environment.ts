// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {

  production: false,

  externalServiceUrl: 'http://localhost:8080/cc-admin/external',

  authenticationUrl: 'http://localhost:8080/cc-admin/login',

  userServiceUrl: 'http://localhost:8080/cc-admin/user-service',

  userSearchServiceUrl: 'http://localhost:8080/cc-admin/user-search-service',

  accountServiceUrl: 'http://localhost:8080/cc-admin/account-service',

  passwordServiceUrl: 'http://localhost:8080/cc-admin/password-service',

  LOSNames: [
    {value: 0, name: '-- Select a LOS --'},
    {value: 1, name: 'EllieMae'},
    {value: 2, name: 'Dynatek MORvision'},
    {value: 3, name: 'Supreme Software'},
    {value: 4, name: 'IDeal (Innovative Dealer Services)'},
    {value: 5, name: 'Radiant Concepts'},
    {value: 6, name: 'AutoDealerPro'},
    {value: 7, name: 'CPSCars'},
    {value: 8, name: 'VISUALES CARIBE'},
    {value: 9, name: 'Alliance Credit'},
    {value: 10, name: 'Alliance Credit Counseling'},
    {value: 11, name: 'ALLIANCE CREDIT COUNSELING'},
    {value: 12, name: 'ADAM SYSTEMS'},
    {value: 13, name: 'ClearToClose'},
    {value: 14, name: 'South Shore MTG'},
    {value: 15, name: 'DEALERVU'},
    {value: 16, name: 'Frazer'},
    {value: 17, name: 'DealerClick'},
    {value: 18, name: 'EverLogic'},
    {value: 19, name: 'PROFIT MONSTER'},
    {value: 20, name: 'AFS Information Systems'},
    {value: 21, name: 'AutoSoft Net'},
    {value: 22, name: 'Auto Manager'},
    {value: 23, name: 'DealerSocket AutoStar Fusion'},
    {value: 24, name: 'Calyx Software'},
    {value: 25, name: 'Dominion Access'}
  ],

  SecretQuestions_1: [
    {value: 1, name: 'In what city was your high school? (full name of city only)'},
    {value: 2, name: 'What is your maternal grandmother\'s first name?'},
    {value: 3, name: 'What is your father\'s middle name?'},
    {value: 4, name: 'What was the name of your High School?'},
    {value: 5, name: 'What is the name of the first company you worked for?'},
    {value: 6, name: 'What is the first name of the maid of honor at your wedding?'},
    {value: 7, name: 'What is the first name of your oldest nephew?'},
    {value: 8, name: 'What is your maternal grandfather\'s first name?'},
    {value: 9, name: 'What is your best friend\'s first name?'},
    {value: 10, name: 'In what city were you married? (Enter full name of city)'},
  ],

  SecretQuestions_2: [
    {value: 11, name: 'What is the first name of the best man at your wedding?'},
    {value: 12, name: 'What was your high school mascot?'},
    {value: 13, name: 'What was the first name of your first manager?'},
    {value: 14, name: 'In what city was your father born? (Enter full name of city only)'},
    {value: 15, name: 'What was the name of your first girlfriend/boyfriend?'},
    {value: 16, name: 'What was the name of your first pet?'},
    {value: 17, name: 'What is the first name of your oldest niece?'},
    {value: 18, name: 'What is your paternal grandmother\'s first name?'},
    {value: 19, name: 'In what city is your vacation home? (Enter full name of city only)'},
    {value: 20, name: 'What was the nickname of your grandfather?'},
  ],

  SecretQuestions_3: [
    {value: 21, name: 'In what city was your mother born? (Enter full name of city only)'},
    {value: 22, name: 'What is your mother\'s middle name?'},
    {value: 23, name: 'In what city were you born? (Enter full name of city only)'},
    {value: 24, name: 'Where did you meet your spouse for the first time? (Enter full name of city only)'},
    {value: 25, name: 'What was your favorite restaurant in college?'},
    {value: 26, name: 'What is your paternal grandfather\'s first name?'},
    {value: 27, name: 'What was the name of your junior high school? (Enter "Riverdale" for Riverdale Junior High School)'},
    {value: 28, name: 'What was the last name of your favorite teacher in final year of high school?'},
    {value: 29, name: 'What was the name of the town your grandmother lived in? (Enter full name of town only)'},
    {value: 30, name: 'What street did your best friend in high school live on? (Enter full name of street only)'}
  ]
};
