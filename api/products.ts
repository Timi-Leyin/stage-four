import { api } from "@/config/api";
import { ENV } from "@/constants/env";
import { GetProduct, GetProducts } from "@/interfaces/products";

export const GET_PRODUCTS = ({
  reverse_sort = false,
  page = 1,
  size = 10,
}: GetProducts) => {
  const URL = /** ====> BASE URL ++++ **/ `/products?organization_id=${ENV.TIMBU_ORG_ID}&reverse_sort=${reverse_sort}&page=${page}&size=${size}&Appid=${ENV.TIMBU_APP_ID}&Apikey=${ENV.TIMBU_API_KEY} `;
  return api.get(URL);
};
export const GET_PRODUCT = ({ productId }: GetProduct) => {
  const URL = /** ====> BASE URL ++++ **/ `/products/${productId}?organization_id=${ENV.TIMBU_ORG_ID}&Appid=${ENV.TIMBU_APP_ID}&Apikey=${ENV.TIMBU_API_KEY} `;
  return api.get(URL);
};
