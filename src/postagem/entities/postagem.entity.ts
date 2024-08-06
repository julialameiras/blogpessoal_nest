import { Tema } from './../../tema/entities/tema.entity';
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: "tb_postagens"}) //criando a tabela
export class Postagem{

    @ApiProperty()
    @PrimaryGeneratedColumn()  //chave primária autoincremental
    id: number;
    
    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() //não aceitar titulo vazio
    @Column({length: 100, nullable: false}) //definir o tamanho e nao aceitar valor vazio
    titulo: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;
    
    @ApiProperty()
    @UpdateDateColumn()
    data: Date;

    //Muitos para Um, ou seja, Muitas postagens, possuem um tema
    @ApiProperty({ type: () => Tema })
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema;

    @ApiProperty({ type: () => Usuario })
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;

}