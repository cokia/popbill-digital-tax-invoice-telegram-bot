import { ExecuteArgs, HttpException, RouterController } from '@asapjs/router';
import { TypeIs } from '@asapjs/sequelize';
import { UserApplication } from '@user/application/UserApplication';
import LoginCallbackResponseDto from '@user/dto/response/LoginCallbackResponseDto';

export default class AuthController extends RouterController {
  public tag = '공통 - 유저 인증 관련';

  public basePath = '/auth';

  private userService: UserApplication;

  constructor() {
    super();
    this.initializeRoutes();
    this.userService = new UserApplication();
  }

  private initializeRoutes() {
    this.router.get({
      title: '로그인 (SPARCS SSO)',
      path: '/login',
      response: TypeIs.JSON(),
      excute: this.UserLoginController,
    })
    this.router.get({
      title: '로그인 콜백 (SPARCS SSO)',
      path: '/login/callback',
      // body: LoginRequestDto,
      response: LoginCallbackResponseDto,
      excute: this.UserLoginCallbackController,
    });
    this.router.post({
      title: '로그아웃',
      path: '/logout',
      auth: true,
      response: TypeIs.BOOLEAN(),
      excute: this.LogoutUserController,
    });
    // this.router.get({
    //   title: '로그인 정보 조회',
    //   path: '/login',
    //   auth: true,
    //   excute: this.UserInfoController,
    // });

    // this.router.put({
    //   title: '회원정보 수정',
    //   path: '/login',
    //   auth: true,
    //   body: UpdateInfoDto,
    //   response: LoginResponseDto,
    //   excute: this.UpdateUserInfoController,
    // });
  }

  private UserLoginController = async ({ req, body, res }: ExecuteArgs<undefined, undefined, any>) => {
    await this.userService.loginSparcssso(req, res, body);
  };

  private UserLoginCallbackController = async ({ req, query }: ExecuteArgs) => {
    const result = await this.userService.loginSparcsssoCallback(req, query);
    return result;
  }

  private LogoutUserController = async ({ user }: ExecuteArgs<undefined, undefined, any>) => {
    const result = await this.userService.logout(user);
    return result;
  };

  private UserInfoController = async ({ user }: ExecuteArgs) => {
    const result = await this.userService.getUserInfo(user?.id);
    return { result };
  };

  // private UpdateUserInfoController = async ({ body, user }: ExecuteArgs<undefined, undefined, UpdateInfoDto>) => {
  //   const result = await this.userService.updateMyInfo(body, user);
  //   return result;
  // };
}
