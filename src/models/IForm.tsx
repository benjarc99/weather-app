export interface ICityState {
  city: string;
  state: string;
}

export interface IForm {
    streetAddress: string,
    city: string,
    state: string,
    postalCode: string,
    selectedCityState: ICityState,
}