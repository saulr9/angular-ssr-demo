export const leadZeroId = (id: string | number) => {
  let formattedId: string = '';
  if (typeof id === 'string') {
    id = parseInt(id, 10);
  }
  formattedId = id < 10 ? `#00${id}` : id < 100 ? `#0${id}` : `#${id}`;
  return formattedId;
};
