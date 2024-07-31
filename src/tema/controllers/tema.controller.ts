import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/temas")
export class TemaController{
    constructor(private readonly temaService: TemaService) {}

    @Get()
    @HttpCode(HttpStatus.OK) // Http Status 200
    findAll(): Promise<Tema[]>{
        return this.temaService.findAll();
    }
   
    @Get('/:id')
    @HttpCode(HttpStatus.OK) // Http Status 200
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
        return this.temaService.findById(id);
    }

    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK) // Http Status 200
    findByDescricao(@Param('descricao') descricao: string): Promise<Tema[]> {
        return this.temaService.findByDescricao(descricao);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) //http status 201
    create(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.create(tema);
    }

    @Put()
    @HttpCode(HttpStatus.OK) //http status 200
    update(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.update(tema);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) //Http status 204
    delete(@Param('id', ParseIntPipe) id: number){
        return this.temaService.delete(id);
    }
}
