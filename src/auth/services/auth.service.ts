import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';


@Injectable()
export class AuthService{
    constructor( //essas sao 3 injecoes de dependencia
        private usuarioService: UsuarioService, //injecao de dep.
        private jwtService: JwtService, //injecao de dep.
        private bcrypt: Bcrypt //injecao de dep.
    ){ }
// isto abaixo é um metodo:
    async validateUser(username: string, password: string): Promise<any>{

        const buscaUsuario = await this.usuarioService.findByUsuario(username)

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenhas(password, buscaUsuario.senha)

        if(buscaUsuario && matchPassword){
            const { senha, ...resposta } = buscaUsuario
            return resposta
        }
// {senha, ...resposta} = spread operator; pesquisar sobre isso
        return null

    }
//abaixo, outro método: (cria o token)
    async login(usuarioLogin: UsuarioLogin){
//recebe o objeto usuarioLogin 
        const payload = { sub: usuarioLogin.usuario }
//sub é uma claim do token
        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)

        return{
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: usuarioLogin.usuario,
            senha: '',
            foto: buscaUsuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
//para gerar o token vai usar o sign da classe service
//o espaço entre a palavra Bearer e o $ é OBRIGATORIO
 }
}