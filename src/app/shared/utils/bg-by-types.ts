export enum BgByTypes {
  fire = 'bg-[#eda365]',
  grass = 'bg-[#8cc7ac]',
  electric = 'bg-[#f3d77c]',
  water = 'bg-[#8da9cf]',
  ground = 'bg-[#E0C068]',
  rock = 'bg-[#B8A038]',
  fairy = 'bg-[#EE99AC]',
  poison = 'bg-[#A040A0]',
  bug = 'bg-[#A8B820]',
  dragon = 'bg-[#7038F8]',
  psychic = 'bg-[#eec3cd]',
  flying = 'bg-[#A890F0]',
  fighting = 'bg-[#C03028]',
  normal = 'bg-[#A8A878]',
  ice = 'bg-[#98D8D8]',
  ghost = 'bg-[#705898]',
  steel = 'bg-[#B8B8D0]',
  dark = 'bg-[#705848]',
  unknown = 'bg-[#68A090]',
  shadow = 'bg-[#493963]',
  default = 'bg-[#68A090]',
}

export const BgByType = (type: keyof typeof BgByTypes) =>
  BgByTypes[type] ?? BgByTypes.default;
