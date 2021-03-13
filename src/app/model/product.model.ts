export interface Product {
    id:number;
    name:string;
    price:number,
    quantity:number,
    selected:boolean,
    available:boolean;
}

export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}

export interface AppDataState<T> {
    dataState?:DataStateEnum,
    data?:T,
    errorMessage?:string
}

export enum ProductActions {
  ALL_PRODUCTS = "[Product] Get all products",
  SELECTED_PRODUCTS = "[Product] Get Selected products",
  AVAILABLE_PRODUCTS = "[Product] Get available products",
  SEARCH_PRODUCT = "[Product] Search product",
  ADD_PRODUCT = "[Product] add product",
  CHANGE_SELECT_PRODUCT = "[Product] change select product",
  EDIT_PRODUCT="[Product] edit product",
  DELETE_PRODUCT="[Product] delete product",
  PRODUCT_ADDED="[Product] product added",
  PRODUCT_EDITED="[Product] product edited"
}

export interface ActionEvent {
  type:ProductActions,
  payload?:any
}
