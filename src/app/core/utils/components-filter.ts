export function precoParaNumero(preco: string) {
  const precoConvertido = preco
    .replace('R$', '')
    .replace('.', '')
    .replace(',', '.');
  return precoConvertido;
}

export function filtrarProcessador(
  components: any,
  perfil: any,
  tipoProcessador: any,
  faixaPreco: any,
  precoMin: any,
  precoMax: any
) {
  if (
    (perfil === 'Edição de Vídeo' && faixaPreco.numberMin >= 5000) ||
    (perfil === 'Jogos' && faixaPreco.numberMin >= 5000)
  ) {
    const processadores = components.processadores[tipoProcessador].filter(
      (processador: any) => {
        const preco = precoParaNumero(processador.preco);
        if (faixaPreco.numberMin >= 10000) {
          return (
            processador.nome.includes('i9') ||
            (processador.nome.includes('Ryzen 9') &&
              preco >= precoMin &&
              preco <= precoMax)
          );
        } else {
          return (
            ((processador.nome.endsWith('X') && processador.cores >= 8) ||
              (processador.nome.endsWith('K') && processador.cores >= 8) ||
              processador.nome.endsWith('KF')) &&
            processador.cores >= 8 &&
            preco >= precoMin &&
            preco <= precoMax
          );
        }
      }
    );

    return processadores;
  } else {
    const processadores = components.processadores[tipoProcessador].filter(
      (processador: any) => {
        const preco = precoParaNumero(processador.preco);
        return preco >= precoMin && preco <= precoMax;
      }
    );
    return processadores;
  }
}

export function filtrarPlacaMae(
  components: any,
  tipoProcessador: any,
  precoMin: any,
  precoMax: any,
  socket: any

) {
  const placasMae = components.placas_mae[tipoProcessador].filter(
    (placaMae: any) => {
      return (
        precoParaNumero(placaMae.preco) >= precoMin &&
        precoParaNumero(placaMae.preco) <= precoMax &&
        placaMae.socket === socket
      );
    }
  );
  return placasMae;
}

export function filtrarPlacaDeVideo(
  components: any,
  tipoGPU: any,
  marcaGpu: any,
  precoMin: any,
  precoMax: any,
) {
  const placasDeVideo = components.placasDeVideo[tipoGPU].filter(
    (placaDeVideo: any) => {
      if (marcaGpu === placaDeVideo.marca) {
        return (
          placaDeVideo.marca.includes(marcaGpu) &&
          precoParaNumero(placaDeVideo.preco) >= precoMin &&
          precoParaNumero(placaDeVideo.preco) <= precoMax
        );
      } else {
        return (
          precoParaNumero(placaDeVideo.preco) >= precoMin &&
          precoParaNumero(placaDeVideo.preco) <= precoMax
        );
      }
    }
  );
  return placasDeVideo;
}

export function filtrarArmazenamento(

  components: any,
  perfil: any,
  faixaPreco: any,
  precoMin: any,
  precoMax: any
) {
  let tipoArmazenamento;
  if (perfil === "Uso Geral" && faixaPreco.numberMax == 2000)
    tipoArmazenamento = "HD";
  else if (perfil === "Uso Geral" && faixaPreco.numberMax == 3000)
    tipoArmazenamento = "SSD";
  else tipoArmazenamento = "SSD";
  const armazenamentos = components.Armazenamento[tipoArmazenamento].filter(
    (component: any) => {
      return (
        precoParaNumero(component.preco) >= precoMin &&
        precoParaNumero(component.preco) <= precoMax
      );
    }
  );

  return armazenamentos;
}

export function filtrarMemoriaRAM(perfil: any, components: any, tipoMemoria: any, faixaDePreco: any, precoMin: any, precoMax: any) {
  const memoriasRam = components.memoriaRam[tipoMemoria].filter((memoria: any) => {
    if(perfil === "Edição de Vídeo" && faixaDePreco.numberMin >= 5000) {
      console.log(memoria.velocidade)
      return (
        memoria.velocidade >= "3600MHz" &&
        precoParaNumero(memoria.preco) >= precoMin &&
        precoParaNumero(memoria.preco) <= precoMax
      );
    }else{
    return (
        precoParaNumero(memoria.preco) >= precoMin &&
        precoParaNumero(memoria.preco) <= precoMax
      );}
  });

  return memoriasRam;
}

export function filtrarFonte(components: any, precoMin: any, precoMax: any) {
  const fontes = components.Fontes.filter((fonte: any) => {
    return (
      precoParaNumero(fonte.preco) >= precoMin &&
      precoParaNumero(fonte.preco) <= precoMax
    );
  });

  return fontes;
}

export function filtrarGabinete(components: any, precoMin: any, precoMax: any) {
  const gabinetes = components.Gabinetes.filter((gabinete: any) => {
    return (
      precoParaNumero(gabinete.preco) >= precoMin &&
      precoParaNumero(gabinete.preco) <= precoMax
    );
  });

  return gabinetes;
}
