import { MailProvider } from './../../providers/MailProvider';
import { User } from './../../entities/User';
import { CreateUserRequestDTO } from './createUserDTO';
import { UserRepository } from '../../repositories/userRepository';
export class CreateUserCase {

    constructor(
        private usersRepository: UserRepository,
        private mailProviders: MailProvider
    ) { }

    async execute(data: CreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            return new Error('User already exists.');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProviders.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe do meu app',
                email: 'equipe@meuapp.com'
            },
            subject: 'seja bem vindo ao meuapp',
            body: '<p>Você já pode fazer login em nossa plataforma</p>'

        })
    }
}