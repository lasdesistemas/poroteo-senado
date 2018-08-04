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

export const SENATORS_KEY = 'senators'
export const CHANGED_KEY = 'votes_changed'
export const SHEET_ID = '143fmK1J9Lj9z2gc2EuCyzy9b5d72a32_N0GDveKMrvo'
export const SOCKET_HOST = 'https://tweetsock-egyjyglphh.now.sh'
