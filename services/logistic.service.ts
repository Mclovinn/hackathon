import web3Service from './web3.service'
import { AbiItem } from 'web3-utils'
import { LOGISTIC_ABI } from './contract-interfaces/LOGISTIC_ABI'
import { config } from '../config/env.config'

const ADMIN_ADDRESS = config.smartContractConfig.adminContractAddress
const PK_ADMIN_ADDRESS = config.smartContractConfig.privateKeyAdminAddress
const LOGISTIC_CONTRACT_ADDRESS = config.smartContractConfig.logisticContractAddress

function logisticContract() {
  const web3 = web3Service.web3
  return new web3.eth.Contract(LOGISTIC_ABI as AbiItem[], LOGISTIC_CONTRACT_ADDRESS)
}

export async function createOrders(orderIds: string[], location: string) {
  const contract = logisticContract()
  const encodeABI = await contract.methods.createOrders(orderIds, location).encodeABI()

  const tx = await generateTx(encodeABI)

  const signedTx = await web3Service.web3.eth.accounts.signTransaction(tx, PK_ADMIN_ADDRESS)
  console.log(signedTx.transactionHash)
  console.log(await web3Service.web3.eth.sendSignedTransaction(signedTx.rawTransaction || ''))
}

export async function getOrder(orderId: string) {
  const contract = logisticContract()
  return await contract.methods.getOrder(orderId).call()
}

export async function deliverOrder(orderId: string, location: string) {
  const contract = logisticContract()
  const encodeABI = await contract.methods.deliverOrder(orderId, location).encodeABI()

  const tx = await generateTx(encodeABI)

  const signedTx = await web3Service.web3.eth.accounts.signTransaction(tx, PK_ADMIN_ADDRESS)
  return await web3Service.web3.eth.sendSignedTransaction(signedTx.rawTransaction || '')
}

async function generateTx(encodeABI: any) {
  const contract = logisticContract()
  const web3 = web3Service.web3

  const estimatedGas = await web3.eth.estimateGas({
    to: contract.options.address,
    data: encodeABI,
  })

  return {
    from: ADMIN_ADDRESS,
    to: contract.options.address,
    gas: estimatedGas,
    data: encodeABI,
  }
}
