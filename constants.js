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
