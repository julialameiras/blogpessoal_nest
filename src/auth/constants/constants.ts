//serve apenas para guardar a assinatura do nosso token

export const jwtConstants = {
    secret: '37eb3d74e44561d2b9ec3e40da179f9e91571b7f350aee31cfee06b481f146fe',
};

//essa é uma chave sha 256-bit criptograva que pode ser gerada por meio
//de sites apropriados

//em produçao:
//criar variavel de ambiente, jogar a chave na variavel de ambiente
//em produçao essas informaçoes sao sempre ocultas