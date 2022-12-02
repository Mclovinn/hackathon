import web3Service from './web3.service'
import { AbiItem } from 'web3-utils'
import { LOGISTIC_ABI } from './contract-interfaces/LOGISTIC_ABI'
import { config } from '../config/env.config'
import { OrderStatus } from '../types/order-status'

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
  return signedTx.transactionHash
}

type Order = {
  currentStatus: OrderStatus
  events: {
    status: OrderStatus
    timestamp: number
    location: string
    orderId: number
    creatorAddress: string
  }[]
}
const parseOrders = (data: any): Order => {
  return {
    currentStatus: (() => (data[0] == '0' ? OrderStatus.IN_TRANSIT : OrderStatus.DELIVERED))(),
    events: data[1].map((e: any) => ({
      status: (() => (e.orderStatus === '0' ? OrderStatus.IN_TRANSIT : OrderStatus.DELIVERED))(),
      timestamp: e.timestamp,
      location: e.location,
      orderId: e.orderId,
      creatorAddress: e.creator,
    })),
  }
}

export async function getOrder(orderId: string): Promise<Order> {
  const contract = logisticContract()
  const parsedData = parseOrders(await contract.methods.getOrder(orderId).call())
  return parsedData
}

export async function deliverOrder(orderId: string, location: string) {
  const contract = logisticContract()
  const encodeABI = await contract.methods.deliverOrder(orderId, location).encodeABI()

  const tx = await generateTx(encodeABI)

  const signedTx = await web3Service.web3.eth.accounts.signTransaction(tx, PK_ADMIN_ADDRESS)
  console.log(await web3Service.web3.eth.sendSignedTransaction(signedTx.rawTransaction || ''))
  return signedTx.transactionHash
}

async function generateTx(encodeABI: any) {
  const contract = logisticContract()
  const web3 = web3Service.web3

  const estimatedGas = await web3.eth.estimateGas({
    from: ADMIN_ADDRESS,
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
