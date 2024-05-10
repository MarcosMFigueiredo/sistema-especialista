import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {precoParaNumero} from '../../core/utils/components-filter'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css', './result.component.modal.css'],
})
export class ResultComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  listaDeComponentes: any;
  componenteSelecionado: any;
  dadosUsuario: any;
  precoTotal: any
  tiposComponentes: any = [
    'processador',
    'placaMae',
    'placaDeVideo',
    'memoria',
    'armazenamento',
    'fonte',
    'gabinete',
  ];
  tiposComponentesModal = [
    'processador',
    'placaMae',
    'placaVideo',
    'memoriaRAM',
    'armazenamento',
    'fonte',
    'gabinete',
  ];
  nomesComponentes = [
    'Processador',
    'Placa Mãe',
    'Placa de Vídeo',
    'Memoria RAM',
    'Armazenamento (SSD/HD)',
    'Fonte de alimentação',
    'Gabinete',
  ];
  nomesComponentesModal: any = [];
  dadosComponentes: any;
  caminhoImgs: string = '../../../assets/imgs/';
  caminhoImgsModal: string = '../../../assets/imgs/';

  modal = 'display: none';
  tipoComponenteModal = '';
  modalOpcoes: any;
  listaDeComponentesModal: any = [];
  exibirListaDeComponentesModal: any = [];
  tipoModalcomponente: any;
  listaDePrecoComponenteModal: any = []
  exibirListaDePrecoComponenteModal: any = [];


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const dadosPc = JSON.parse(params['dados']);
      const dadosUsuario = JSON.parse(params['dadosUsuario']);
      this.listaDeComponentes = dadosPc;
      this.dadosUsuario = dadosUsuario;

      this.componenteSelecionado = [
        {
          processador: SelecionarComponenetes(
            dadosPc.processador,
            'processador'
          ),
        },
        { placaMae: SelecionarComponenetes(dadosPc.placaMae, 'placaMae') },
        {
          placaDeVideo: SelecionarComponenetes(
            dadosPc.placaVideo,
            'placaVideo'
          ),
        },
        { memoria: SelecionarComponenetes(dadosPc.memoriaRAM, 'memoriaRAM') },
        {
          armazenamento: SelecionarComponenetes(
            dadosPc.armazenamento,
            'armazenamento'
          ),
        },
        { fonte: SelecionarComponenetes(dadosPc.fonte, 'fonte') },
        { gabinete: SelecionarComponenetes(dadosPc.gabinete, 'gabinete') },
      ];

      function SelecionarComponenetes(componente: any, tipoComponente: any) {
        if (tipoComponente === 'placaVideo') {
          const gpu = componente.filter(
            (gpu: any) =>
              gpu.marca.toLowerCase() ===
              dadosUsuario.fabricanteDaPlacaDeVideo.toLowerCase()
          );
          console.log(gpu);
          if (gpu.length > 0) {
            return gpu[Math.floor(Math.random() * gpu.length)];
          }
        }

        return componente[Math.floor(Math.random() * componente.length)];
      }

      this.precoTotal = this.totalPrice(this.componenteSelecionado)
      console.log(this.precoTotal)

      this.dadosComponentes = valuesOfObject(
        this.componenteSelecionado,
        this.tiposComponentes
      );

      this.tiposComponentesModal.forEach((tipo: any) => {
        this.listaDeComponentesModal.push(
          dadosDosComponentesModal(this.listaDeComponentes, tipo)
        );
      });

      this.tiposComponentesModal.forEach((tipo: any) => {
        this.listaDePrecoComponenteModal.push(
          precoDosComponentesModal(this.listaDeComponentes, tipo)
        );
      });

      function dadosDosComponentesModal(objeto: any, tipo: any) {
        const valores = objeto[tipo].map((c: any) => {
          return Object.entries(c)
            .filter(([chave]) => chave !== 'preco')
            .map(([_, valor]) => valor);
        });

        return valores.map((valor: any) => valor.join(', '));
      }

      function precoDosComponentesModal(objeto: any, tipo: any) {
        const valores = objeto[tipo].map((c: any) => {
          return Object.entries(c)
            .filter(([chave]) => chave === 'preco')
            .map(([_, valor]) => valor);
        });

        return valores.map((valor: any) => valor.join(', '));
      }

      function valuesOfObject(objetos: any, tiposComponentes: any) {
        const valores = objetos.map((obj: any, index: number) => {
          return Object.entries(obj[tiposComponentes[index]])
            .filter(([chave]) => chave !== 'preco')
            .map(([_, valor]) => valor);
        });
        return valores.map((valor: any) => valor.join(', '));
      }



    });

  }


  totalPrice(componentes: any) {

    let precoTotal = 0;
    Object.entries(componentes).forEach((component: any, indice: any) => {
      console.log(component[1][this.tiposComponentes[indice]])
      const numero = precoParaNumero(component[1][this.tiposComponentes[indice]].preco);
      precoTotal += parseFloat(numero);
      console.log(precoTotal)
    });

    return precoTotal.toFixed(2);
  }


  mostrarModal(tipoComponente: any) {
    console.log("cima ", tipoComponente);
    this.tipoModalcomponente = tipoComponente;
    switch (tipoComponente) {
      case 'processador':
        this.exibirListaDeComponentesModal = this.listaDeComponentesModal[0];
        this.caminhoImgsModal = '../../../assets/imgs/processador.svg';
        this.nomesComponentesModal = this.nomesComponentes[0];
        this.exibirListaDePrecoComponenteModal = this.listaDePrecoComponenteModal[0]
        break;
      case 'placaMae':
        this.exibirListaDeComponentesModal = this.listaDeComponentesModal[1];
        this.caminhoImgsModal = '../../../assets/imgs/placaMae.svg';
        this.nomesComponentesModal = this.nomesComponentes[1];
        this.exibirListaDePrecoComponenteModal = this.listaDePrecoComponenteModal[1]
        break;
      case 'placaDeVideo':
        this.exibirListaDeComponentesModal = this.listaDeComponentesModal[2];
        this.caminhoImgsModal = '../../../assets/imgs/placaDeVideo.svg';
        this.nomesComponentesModal = this.nomesComponentes[2];
        this.exibirListaDePrecoComponenteModal = this.listaDePrecoComponenteModal[2]
        break;
      case 'memoria':
        this.exibirListaDeComponentesModal = this.listaDeComponentesModal[3];
        this.caminhoImgsModal = '../../../assets/imgs/memoria.svg';
        this.nomesComponentesModal = this.nomesComponentes[3];
        this.exibirListaDePrecoComponenteModal = this.listaDePrecoComponenteModal[3]
        break;
      case 'armazenamento':
        this.exibirListaDeComponentesModal = this.listaDeComponentesModal[4];
        this.caminhoImgsModal = '../../../assets/imgs/armazenamento.svg';
        this.nomesComponentesModal = this.nomesComponentes[4];
        this.exibirListaDePrecoComponenteModal = this.listaDePrecoComponenteModal[4]
        break;
      case 'fonte':
        this.exibirListaDeComponentesModal = this.listaDeComponentesModal[5];
        this.caminhoImgsModal = '../../../assets/imgs/fonte.png';
        this.nomesComponentesModal = this.nomesComponentes[5];
        this.exibirListaDePrecoComponenteModal = this.listaDePrecoComponenteModal[5]
        break;
      case 'gabinete':
        this.exibirListaDeComponentesModal = this.listaDeComponentesModal[6];
        this.caminhoImgsModal = '../../../assets/imgs/gabinete.png';
        this.nomesComponentesModal = this.nomesComponentes[6];
        this.exibirListaDePrecoComponenteModal = this.listaDePrecoComponenteModal[6]
        break;
    }

    this.modal = 'display: block';
  }


  atualizarComponente(
    novoComponente: any,
    novoPreco: any
  ) {
    console.log( )

    switch (this.tipoModalcomponente) {
      case 'processador':
        this.dadosComponentes[0] = novoComponente;
        this.componenteSelecionado[0][this.tipoModalcomponente].preco = novoPreco
        this.precoTotal = this.totalPrice(this.componenteSelecionado)
        break;
      case 'placaMae':
        this.dadosComponentes[1] = novoComponente;
        this.componenteSelecionado[1][this.tipoModalcomponente].preco = novoPreco
        this.precoTotal = this.totalPrice(this.componenteSelecionado)
        break;
      case 'placaDeVideo':
        this.dadosComponentes[2] = novoComponente;
        this.componenteSelecionado[2][this.tipoModalcomponente].preco = novoPreco
        this.precoTotal = this.totalPrice(this.componenteSelecionado)
        break;
      case 'memoria':
        this.dadosComponentes[3] = novoComponente;
        this.componenteSelecionado[3][this.tipoModalcomponente].preco = novoPreco
        this.precoTotal = this.totalPrice(this.componenteSelecionado)
        break;
      case 'armazenamento':
        this.dadosComponentes[4] = novoComponente;
        this.componenteSelecionado[4][this.tipoModalcomponente].preco = novoPreco
        this.precoTotal = this.totalPrice(this.componenteSelecionado)
        break;
      case 'fonte':
        this.dadosComponentes[5] = novoComponente;
        this.componenteSelecionado[5][this.tipoModalcomponente].preco = novoPreco
        this.precoTotal = this.totalPrice(this.componenteSelecionado)
        break;
      case 'gabinete':
        this.dadosComponentes[6] = novoComponente;
        this.componenteSelecionado[6][this.tipoModalcomponente].preco = novoPreco
        this.precoTotal = this.totalPrice(this.componenteSelecionado)
        break;
    }


    this.fecharModal();
  }

  reiniciar() {
    this.router.navigate(['/home'])
  }


  fecharModal() {
    this.modal = 'display: none';
  }
}
