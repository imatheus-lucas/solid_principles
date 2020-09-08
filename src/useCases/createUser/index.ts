import { CreateUserCase } from './createUserUseCase';
import { CreateUserController } from './createUserController';
import { PostgressUserRepository } from './../../repositories/implementations/PostgressUserRepository';
import { MailtrapMailProvider } from './../../providers/implementations/MailtrapMailProvider';


const mailtrapProvider = new MailtrapMailProvider();
const posgressUserRepository = new PostgressUserRepository()

const createUserCase = new CreateUserCase(posgressUserRepository, mailtrapProvider);
const createUserController = new CreateUserController(createUserCase);

export { createUserCase, createUserController }