export enum paths {
  auth = 'auth',
  addWallet = 'add-wallet',
  login = 'login',
  wallet = 'wallet',
  create = 'create',
  open = 'open',
  restore = 'restore',
  seedPhrase = 'seed-phrase',
  details = 'details',
  assignAlias = 'assign-alias',
  editAlias = 'edit-alias',
  transferAlias = 'transfer-alias',
  settings = 'settings',
  import = 'import',
  deeplink = 'deeplink',
  uiKit = 'ui-kit',
}

export enum pathsChildrenAuth {
  noWallet = 'no-wallet',
}

export enum pathsChildrenWallet {
  assets = 'assets',
  send = 'send',
  receive = 'receive',
  history = 'history',
  contracts = 'contracts',
  staking = 'staking',
}

export enum pathsChildrenContracts {
  purchase = 'purchase',
}
