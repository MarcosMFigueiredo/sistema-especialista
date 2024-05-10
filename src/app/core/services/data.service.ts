import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DadosPCService {
  dados: any;

  constructor() {}


  setDados(dados: any) {
    this.dados = dados;
  }

  getDados() {
    return this.dados;
  }
}
