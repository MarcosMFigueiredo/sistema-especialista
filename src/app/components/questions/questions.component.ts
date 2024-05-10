import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { montarPC } from '../../core/services/selectComponents';



@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent {
  constructor(private router: Router) {}

  perfisUsuario: string[] = ['Uso Geral', 'Jogos', 'Edição de Vídeo'];
  dadosDoUsuario = {
    perfil: '',
    faixaPreco: {
      min: 0,
      max: 0,
    },
    tipoDeProcessador: '',
    tipoDePlacaDeVideo: '',
    fabricanteDaPlacaDeVideo: '',
  };

  

  etapas = {
    mostrarFaixaPreco: false,
    mostrarTiposDeCpu: false,
    mostrarTiposDeGpu: false,
    mostrarSePrefMarca: false,
    mostrarFabricanteGpu: false,
    mostrarResultado: false,
  };

  displayStep2(perfil: string) {
    this.dadosDoUsuario.perfil = perfil;
    this.etapas.mostrarFaixaPreco = true;
  }

  displayStep3(min: number, max: number) {
    this.dadosDoUsuario.faixaPreco.min = min;
    this.dadosDoUsuario.faixaPreco.max = max;
    this.etapas.mostrarTiposDeCpu = true;
  }

  displayStep4(tipoCpu: string) {
    this.dadosDoUsuario.tipoDeProcessador = tipoCpu;
    this.etapas.mostrarTiposDeGpu = true;
  }

  displayStep5(tipoGpu: string) {
    this.dadosDoUsuario.tipoDePlacaDeVideo = tipoGpu;
    this.etapas.mostrarSePrefMarca = true;
  }

  displayStep6(sePrefMarca: string) {
    if (sePrefMarca == 'sim') {
      this.etapas.mostrarFabricanteGpu = true;
    }
    else {
      this.dadosDoUsuario.fabricanteDaPlacaDeVideo = "sem preferência"
      this.displayStep7()
    }
  }

  displayStep7() {
    const pcMontado = montarPC(this.dadosDoUsuario);
    console.log('pcMontado display', pcMontado);
    this.etapas.mostrarResultado = true;
    if ((this.etapas.mostrarResultado = true)) {
      this.router.navigate(['/result'], {
        queryParams: { dados: JSON.stringify(pcMontado), dadosUsuario: JSON.stringify(this.dadosDoUsuario)},
      });
    }


  }
}
