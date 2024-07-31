import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) { //o parâmetro Strategy deve ser importador do pacote "local" pois a estratégia é local
    constructor(private authService: AuthService) {
        super({ //se fosse em ingles, nao precisaria de todo esse codigo "super"
            usernameField: 'usuario', //usernamerfield é o parametro. 'usuario' é o atributo correspondente
            passwordField: 'senha' 
        });
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}