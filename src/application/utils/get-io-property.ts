import { CarDataEntity } from 'src/domain/entities';

export const getIoProperty = (data: CarDataEntity, property: string) => {
  const match = data.avl_data_list.find((avl) =>
    avl.io_elements.some((io) => io.property === property),
  );

  if (!match) {
    return null;
  }

  return match.io_elements.find((io) => io.property === property);
};
