import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PostagemService{

    constructor(
        @InjectRepository(Postagem) //injeçao de dependencia
        private postagemRepository: Repository<Postagem>
    ) {}

    async findAll(): Promise<Postagem[]>{ //conceitos: programacao assincrona, promessa
        return await this.postagemRepository.find(); //select * from tb_postagens;
        
    }
}

//classe service é responsavel por criar os metodos que vao manipular o crud
// entidade postagem define a tabela, onde tem varios atributos
// classe de serviço = postagem service. dentro dela há seis metodos
// o primeiro metodo é get all = para listar todas as postagens
// 