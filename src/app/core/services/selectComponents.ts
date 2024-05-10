import componentes from '../../../assets/data/componentes.json';
import * as utils from '../utils/components-filter'


function calcularIntervalosDePreco(faixaPrecoMin: any, faixaPrecoMax: any) {
  // Define a porcentagem de alocação para cada categoria de componente
  const percentualPorComponente: any = {
    processador: 0.2,
    placaMae: 0.17,
    memoriaRAM: 0.09,
    armazenamento: 0.09,
    placaDeVideo: 0.19,
    fonte: 0.09,
    gabinete: 0.1,
  };


    // Calcula os intervalos de preço dinâmicos para cada categoria de componente dentro do intervalo fornecido
    const intervalosDePreco: any = {};

    for (const componente in percentualPorComponente) {
        const percentual = percentualPorComponente[componente];
        const precoMin = faixaPrecoMin * percentual;  // Define o mínimo como metade do preço do componente
        const precoMax = faixaPrecoMax * percentual * 1.5;  // Define o máximo como 1.5 vezes o preço do componente
        intervalosDePreco[componente] = { min: precoMin, max: precoMax };
    }
    console.log(intervalosDePreco)
    return intervalosDePreco;
}


function selecionarProcessador(perfil: any, tipoProcesador: any, faixaDePreco: any) {
  const intervalosDePreco = calcularIntervalosDePreco(
    faixaDePreco.min,
    faixaDePreco.max
  );
  const processadores = utils.filtrarProcessador(
    componentes,
    perfil,
    tipoProcesador,
    faixaDePreco,
    intervalosDePreco.processador.min,
    intervalosDePreco.processador.max
  );
  console.log(processadores)
  return processadores;
}

function selecionarPlacaMae(perfil: any, tipoProcesador: any, faixaDePreco: any) {
  const processador = selecionarProcessador(
    perfil,
    tipoProcesador,
    faixaDePreco
  );
  const socketCompativel = processador[0].socket;

  const intervalosDePreco = calcularIntervalosDePreco(
    faixaDePreco.min,
    faixaDePreco.max
  );


  const placas = utils.filtrarPlacaMae(
    componentes,
    tipoProcesador,
    intervalosDePreco.placaMae.min,
    intervalosDePreco.placaMae.max,
    socketCompativel
  );
  return placas;
}

function selecionarMemoriaRAM(perfil: any, tipoProcesador: any, faixaDePreco: any) {
  const placaMae = selecionarPlacaMae(perfil, tipoProcesador, faixaDePreco);
  const tipoMemoria = placaMae[0].memoria;

  const intervalosDePreco = calcularIntervalosDePreco(
    faixaDePreco.min,
    faixaDePreco.max
  );

  const memoriasRam = utils.filtrarMemoriaRAM(
    perfil,
    componentes,
    tipoMemoria,
    faixaDePreco,
    intervalosDePreco.memoriaRAM.min,
    intervalosDePreco.memoriaRAM.max
  );
  return memoriasRam;
}

function selecionarPlacaVideo(tipoPlacaDeVideo: any, marcaPlacaDeVideo: any, faixaDePreco: any) {
  const intervalosDePreco = calcularIntervalosDePreco(
    faixaDePreco.min,
    faixaDePreco.max
  );

  const placaDeVideo = utils.filtrarPlacaDeVideo(
    componentes,
    tipoPlacaDeVideo,
    marcaPlacaDeVideo,
    intervalosDePreco.placaDeVideo.min,
    intervalosDePreco.placaDeVideo.max
  );

  return placaDeVideo;
}

function selecionarArmazenamento(perfil: any, faixaDePreco: any) {
  const intervalosDePreco = calcularIntervalosDePreco(faixaDePreco.min,
    faixaDePreco.max)

    const armazenamento = utils.filtrarArmazenamento(
      componentes,
      perfil,
      faixaDePreco,
      intervalosDePreco.armazenamento.min,
      intervalosDePreco.armazenamento.max
    );
    return armazenamento;
}

function selecionarFonte(faixaDePreco: any) {
  const intervalosDePreco = calcularIntervalosDePreco(
    faixaDePreco.min,
    faixaDePreco.max
  );

  const fontes = utils.filtrarFonte(
    componentes,
    intervalosDePreco.fonte.min,
    intervalosDePreco.fonte.max
  );
  return fontes;
}

function selecionarGabinete(faixaDePreco: any) {
  const intervalosDePreco = calcularIntervalosDePreco(
    faixaDePreco.min,
    faixaDePreco.max
  );

  const gabinetes = utils.filtrarGabinete(
    componentes,
    intervalosDePreco.gabinete.min,
    intervalosDePreco.gabinete.max
  );
  return gabinetes;
}


export function montarPC(dadosDoUsuario: any) {
  const processador = selecionarProcessador(
    dadosDoUsuario.perfil,
    dadosDoUsuario.tipoDeProcessador,
    dadosDoUsuario.faixaPreco
  );
  const placaMae = selecionarPlacaMae(
    dadosDoUsuario.perfil,
    dadosDoUsuario.tipoDeProcessador,
     dadosDoUsuario.faixaPreco
  );
  const memoriaRAM = selecionarMemoriaRAM(
    dadosDoUsuario.perfil,
    dadosDoUsuario.tipoDeProcessador,
     dadosDoUsuario.faixaPreco
  );
  const placaVideo = selecionarPlacaVideo(
    dadosDoUsuario.tipoDePlacaDeVideo,
    dadosDoUsuario.fabricanteDaPlacaDeVideo,
    dadosDoUsuario.faixaPreco
  );
  const armazenamento = selecionarArmazenamento(
    dadosDoUsuario.perfil,
     dadosDoUsuario.faixaPreco
  );

  const fonte = selecionarFonte( dadosDoUsuario.faixaPreco);
  const gabinete = selecionarGabinete( dadosDoUsuario.faixaPreco);


  return {processador, placaMae, placaVideo, memoriaRAM, armazenamento, fonte, gabinete}
}

