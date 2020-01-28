export interface IReduxStore {
  phones: IPhonesStore;
  categories: ICategoriesStore;
  basket: string[];
  phonesPage: IPhonesPageStore;
  phonePage: IPhonePageStore;
}

export interface IPhone {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  cpu: string;
  camera: string;
  size: string;
  weight: string;
  display: string;
  battery: string;
  memory: string;
}

export interface ICategoriesStore {
  [key: number]: ICategory;
}

export interface IPhonesStore {
  [key: number]: IPhone;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IPhonesPageStore {
  ids: string[];
  search: string;
}

export interface IPhonePageStore {
  id: string;
}
