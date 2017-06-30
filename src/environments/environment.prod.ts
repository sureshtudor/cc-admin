// ng build --prod --bh /cc-admin/

export const environment = {
  production: true,

  // authenticationUrl: 'https://10.215.40.66:8443/cc-admin/oauth2',
  authenticationUrl: 'http://localhost/cc-admin/oauth2',

  userServiceUrl: 'http://localhost/cc-admin/user-service',

  userSearchServiceUrl: 'http://localhost/cc-admin/user-search-service',

  accountServiceUrl: 'http://localhost/cc-admin/account-service',

  passwordServiceUrl: 'http://localhost/cc-admin/password-service',

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
