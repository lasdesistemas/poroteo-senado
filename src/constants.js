export const VOTE_TYPE = {
  AFAVOR: 'A Favor',
  CONTRA: 'En Contra',
  NOCONF: 'No confirmado',
  ABSTEN: 'Se Abstiene'
}

export const VOTE_CLASS = {
  [VOTE_TYPE.AFAVOR]: 'tarjeta-afavor',
  [VOTE_TYPE.CONTRA]: 'tarjeta-encontra',
  [VOTE_TYPE.NOCONF]: 'tarjeta-noconfirmados',
  [VOTE_TYPE.ABSTEN]: 'tarjeta-abstenciones'
}

export const STORAGE_KEYS = {
  SENATORS: 'senators',
  CHANGED: 'changed',
  CHECKSUM: 'checksum'
}

export const SHEET_IDS = {
  ALL: '143fmK1J9Lj9z2gc2EuCyzy9b5d72a32_N0GDveKMrvo',
  RESULTS: '1YymW1VM2GdnVNEtpz6rvLh7fOqbyb0WbEm_23bLtMF8',
  VOTES: '1-O6zxEYdMX6-5gED2yKAU4OE4RcJZKvP4Hfhqil5BwE'
}

export const SOCKET_HOST = 'https://tweetsock.now.sh'

export const UPDATE_TIMEOUT = 30000 // son 30000
