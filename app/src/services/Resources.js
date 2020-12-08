import APIRequest from './ApiRequest';
import RequestObservable from '@/services/RequestObservable.js';

const observable = new RequestObservable();
export const $product = new APIRequest('http://localhost:3000/api/product', false, observable);
export const $employee = new APIRequest('http://localhost:3000/api/employee', false, observable);
let venda = new APIRequest('/api/venda', true, observable);
let sorteio = new APIRequest('/api/sorteio', true, observable);
venda.entrega = new APIRequest('/api/venda/entrega', true, observable);
export const $venda = venda;
export const $sorteio = sorteio;
export const watchRequest = callback => observable.watch(callback);
