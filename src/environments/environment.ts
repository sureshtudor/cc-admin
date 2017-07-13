// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  recaptchaUrl: 'https://www.google.com/recaptcha/api/siteverify',

  authenticationUrl: 'http://localhost:8080/cc-admin/login',

  userServiceUrl: 'http://localhost:8080/cc-admin/user-service',

  userSearchServiceUrl: 'http://localhost:8080/cc-admin/user-search-service',

  accountServiceUrl: 'http://localhost:8080/cc-admin/account-service',

  passwordServiceUrl: 'http://localhost:8080/cc-admin/password-service',

  LOSNames: [
    {value: 0, name: '-- Select --'},
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
  ]
};
