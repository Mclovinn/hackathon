import { CognitoIdentityServiceProvider, config } from 'aws-sdk'
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'
import { AWSService } from './aws.service'
import { ICognitoSignUpUser, ICognitoUser } from '../types/user.type'

export class AuthService extends AWSService {
  public userPool: CognitoUserPool | undefined
  constructor() {
    super()
  }

  private onInit = (): void => {
    config.update({
      region: this.region,
    })
    this.userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
    })
  }

  public signUp = async (
    userData: ICognitoSignUpUser
  ): Promise<{ userData: ICognitoSignUpUser | null; username: string } | undefined> => {
    const emailExist = await this.checkEmailExists(userData.email)
    if (emailExist?.length === 0) {
      const params = this.setSignupParams(userData)
      const cognitoISP = new CognitoIdentityServiceProvider()
      const response = await cognitoISP.signUp(params).promise()
      userData.cognitoId = response.UserSub
      if (!userData) {
        console.log('The user could not be created')
      }
      return { userData, username: params.Username }
    }
    return { userData: null, username: 'null' }
  }

  private setSignupParams = (userData: ICognitoUser): CognitoIdentityServiceProvider.SignUpRequest => {
    return {
      ClientId: process.env.LOGISTICS_AWSCOGNITO_APP || '',
      Username: userData.email,
      Password: userData.password,
      UserAttributes: [
        {
          Name: 'email',
          Value: userData.email,
        },
        {
          Name: 'profile',
          Value: 'testingProfileUser',
        },
      ],
    }
  }

  private async checkEmailExists(userEmail: string): Promise<CognitoIdentityServiceProvider.UsersListType | undefined> {
    const users = await this.filterPoolUsers(userEmail)
    return users
  }
  private async filterPoolUsers(userEmail: string): Promise<CognitoIdentityServiceProvider.UsersListType | undefined> {
    config.update({
      region: this.region,
    })
    this.userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
    })
    const params = {
      UserPoolId: this.userPoolId,
      Filter: `email = \"${userEmail}\"`,
      Limit: 1,
    }
    const { Users } = await new CognitoIdentityServiceProvider().listUsers(params).promise()

    return Users
  }

  public async signIn({ email: Username, password: Password }: ICognitoUser): Promise<any> {
    config.update({
      region: this.region,
    })
    this.userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
    })

    const cognitoUser = new CognitoUser({
      Username,
      Pool: this.userPool,
    })

    const authenticationDetails = new AuthenticationDetails({
      Username,
      Password,
    })

    const res = await this.asyncAuthenticateUser(cognitoUser, authenticationDetails)
      .then(res => {
        return res
      })
      .catch(err => {
        return err
      })

    if (res.accessToken) {
      const cognitoId = res.accessToken?.payload?.sub
      return {
        cognitoId,
        tokens: {
          accessToken: res.accessToken.getJwtToken(),
          idToken: res.idToken.getJwtToken(),
          refreshToken: res.refreshToken.getToken(),
        },
      }
    } else {
      return res
    }
  }

  private asyncAuthenticateUser = (
    cognitoUser: CognitoUser,
    authenticationDetails: AuthenticationDetails
  ): Promise<any> => {
    return new Promise(function (resolve, reject) {
      return cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: resolve,
        onFailure: reject,
      })
    })
  }
}
