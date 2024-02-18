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
  contacts = 'contacts',
  addContacts = 'add-contacts',
  editContacts = 'edit-contacts',
  contactSend = 'contact-send',
  import = 'import',
  deeplink = 'deeplink',
  uiKit = 'ui-kit'
}

export enum pathsChildrenAuth {
  noWallet = 'no-wallet',
}

export enum pathsChildrenWallet {
  send = 'send',
  receive = 'receive',
  history = 'history',
  contracts = 'contracts',
  staking = 'staking'
}

export enum pathsChildrenContracts {
  purchase = 'purchase'
}
