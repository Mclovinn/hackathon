import Web3 from 'web3'
import { config } from '../config/env.config'

const INFURA_URL = `https://polygon-mumbai.infura.io/v3/${config.smartContractConfig.infuraKey}`

class Web3Service {
  private web3Instance: Web3
  constructor() {
    this.web3Instance = new Web3(new Web3.providers.HttpProvider(INFURA_URL))
  }

  get web3() {
    return this.web3Instance
  }
}

const instance = new Web3Service()
Object.freeze(instance)

export default instance
