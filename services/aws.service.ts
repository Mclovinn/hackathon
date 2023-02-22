import AWS from 'aws-sdk'

export class AWSService {
  protected readonly region = process.env.LOGISTICS_REGION || ''
  protected readonly clientId = process.env.LOGISTICS_AWSCOGNITO_APP || ''
  protected readonly userPoolId = process.env.LOGISTICS_AWSCOGNITO_ID || ''
  protected readonly identityPoolId = process.env.LOGISTICS_AWSCOGNITO_IDENTITY_POOL || ''

  async getAWSSecret(secretName: string): Promise<String> {
    console.log('estoy en aws')
    let client = new AWS.SecretsManager({
      region: this.region,
    })
    console.log('client', client)

    return new Promise((resolve, reject) => {
      client.getSecretValue({ SecretId: secretName }, (err, data) => {
        if (err) reject(err)
        if (data.SecretString) {
          resolve(data.SecretString)
        } else {
          resolve('ss')
        }
      })
    })
  }
}
