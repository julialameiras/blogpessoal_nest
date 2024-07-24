import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller("/postagens") // localhost:4000/postagens
export class PostagemController{

    constructor(private readonly postagemService: PostagemService){}

    @Get()
    @HttpCode(HttpStatus.OK) // Http Status 200
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }
   
    @Get('/:id') //localhost:4000/postagens/1
    @HttpCode(HttpStatus.OK) // Http Status 200
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem>{
        return this.postagemService.findById(id);
    }

    @Get('/titulo/:titulo') //localhost:400/postagens/ 
    @HttpCode(HttpStatus.OK) // Http Status 200
    findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]>{
        return this.postagemService.findByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) //http status 201
    create(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK) //http status 200
    update(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.update(postagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) //Http status 204
    delete(@Param('id', ParseIntPipe) id: number){
        return this.postagemService.delete(id);
    }
}

//problema no banco de dados = repository
//problema no processamento = service
//se ta chegando com erro no processamento = controller