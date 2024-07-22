import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller("/postagens")
export class PostagemController{

    constructor(private readonly postagemService: PostagemService){}

    @Get()
    @HttpCode(HttpStatus.OK) //Http Status 200
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }
}

//problema no banco de dados = reposi
//problema no processamento = service
//se ta chegando com erro no processamento = controller