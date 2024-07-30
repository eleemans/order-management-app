type AuthInfoPayload = {
  // contains the scopes of the user
  scope: Array<unknown>;
  // contains the email address of the user
  email: string;
  // family_name contains the last name of the user
  family_name: string;
  // given_name contains the first name of the user
  given_name: string;
  // user_name contains the AL-code of the user
  user_name: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Express {
  type User = {
    id?: string;
    name?: {
      givenName: string;
      familyName: string;
    };
    emails?: Array<{ value: string }>;
    context?: unknown;
  };
  type AuthInfo = {
    // checkLocalScope(arg0: string): any;
    // isInForeignMode(): any;
    // getClientId(): any;
    getTokenInfo: () => { getPayload: () => AuthInfoPayload };
    getAppToken: () => string;
    getEmail: () => string;
    token: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type Request = {
    user?: User;
    authInfo?: AuthInfo;
  };
}
