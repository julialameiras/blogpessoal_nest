import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_postagens"}) //criando a tabela
export class Postagem{

    @PrimaryGeneratedColumn()  //chave primária autoincremental
    id: number;

    @IsNotEmpty() //não aceitar titulo vazio
    @Column({length: 100, nullable: false}) //definir o tamanho e nao aceitar valor vazio
    titulo: string;
    
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;
    
    @UpdateDateColumn()
    data: Date;

}