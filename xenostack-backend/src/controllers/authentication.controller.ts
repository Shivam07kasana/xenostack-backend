import { property, Model, repository } from "@loopback/repository";
import { get, response, param, getModelSchemaRef } from "@loopback/rest";
import { UserRepository } from "../repositories";

class BaseResponse extends Model {
  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;
  @property({
    type: 'string',
    required: true,
  })
  message: string;
}

export class AuthenticationController {
  constructor(
    @repository(UserRepository) private userRepo: UserRepository
  ) {}

  @get(`/login/user/{username}/password/{password}`)
  @response(200, {
    description: 'Authentication Controller details',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BaseResponse)
      }
    }
  })
  async login(
    @param.path.string('username') username : string,
    @param.path.string('password') password : string
  ) {
    // TODO: Use this for register command
    // const addUser = await this.userRepo.create({
    //   firstName: 'Dummy',
    //   lastName: 'Value',
    //   password: 'admin',
    //   username: 'admin',
    // })
    const resLength = await this.userRepo.count();
    const findUser = await this.userRepo.find({
      where: {
        username: username,
        password: password,
      }
    })

    const returnObj =  new BaseResponse({})
    returnObj.status = findUser.length > 0;
    returnObj.message = `Length value: ${resLength?.count}`
    console.log('inside the element', username, password, findUser)
    return returnObj;
  }
}
