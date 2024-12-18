export interface AuthorizationCodeModel {
  code: string;
  state: string;
}

export interface AuthorizationCodeType {
  code: string;
  state: string;
}

export const authorizationCodeTypeFromModel = (
  model: AuthorizationCodeModel,
): AuthorizationCodeType => {
  return {
    code: model.code,
    state: model.state,
  };
};

export class AuthorizationCode {
  code: string;
  state: string;

  static fromModel(model: AuthorizationCodeModel) {
    return new this(authorizationCodeTypeFromModel(model));
  }

  constructor(authorizationCode: AuthorizationCodeType) {
    this.code = authorizationCode.code;
    this.state = authorizationCode.state;
  }
}
