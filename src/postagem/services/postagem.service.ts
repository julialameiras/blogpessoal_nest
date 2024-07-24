import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PostagemService{
    delete(id: number) {
        throw new Error("Method not implemented.");
    }

    constructor(
        @InjectRepository(Postagem) //injeçao de dependencia
        private postagemRepository: Repository<Postagem>
    ) {}

    async findAll(): Promise<Postagem[]>{ //conceitos: programacao assincrona, promessa
        return await this.postagemRepository.find(); //select * from tb_postagens;
        
    }
    async findById(id: number): Promise<Postagem> {
        let buscaPostagem = await this.postagemRepository.findOne({
          where: {
            id,
          },
        });
    
        if (!buscaPostagem)
          throw new HttpException(
            'Postagem não foi encontrada!',
            HttpStatus.NOT_FOUND,
          );
        return buscaPostagem;
      }
      async findByTitulo(titulo: string): Promise<Postagem[]> { // o colchete é usado quando se espera mais de um objeto, um array
        return await this.postagemRepository.find({
          where:{
            titulo: ILike(%${titulo}%)
          }
        })

      }

      async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
      }

      async update(postagem: Postagem): Promise<Postagem> {

        let buscaPostagem = await this.findById(postagem.id);

        if (!buscaPostagem || !postagem.id)
            throw new HttpException('A Postagem não foi encontrada!', Http.HttpStatus.NOT_FOUND)

        return await this.postagemRepository.save(postagem);
      }

      async this.delete(id:number): Promise<DeleteResult>{

        let buscaPostagem = await this.findById(id)

        if(!buscaPostagem)
            throw new HttpException('A Postagem não foi encontrada', HttpStatus.NOT_FOUND);

        return await this.postagemRepository.delete(id);

      }


}

//classe service é responsavel por criar os metodos que vao manipular o crud
// entidade postagem define a tabela, onde tem varios atributos
// classe de serviço = postagem service. dentro dela há seis metodos
// o primeiro metodo é get all = para listar todas as postagens
// 