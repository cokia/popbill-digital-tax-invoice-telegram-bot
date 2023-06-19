import { ExtendableDto, TypeIs } from '@asapjs/sequelize';

export default class LoginCallbackResponseDto extends ExtendableDto {
  @TypeIs.STRING({ comment: '엑세스 토큰' })
  accessToken: string;

  @TypeIs.STRING({ comment: '리프레시 토큰' })
  refreshToken: string;
}
