export const LOGISTIC_ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    inputs: [
      { internalType: 'string[]', name: '_ordersIds', type: 'string[]' },
      { internalType: 'string', name: '_sourceAddress', type: 'string' },
    ],
    name: 'createOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: '_orderId', type: 'string' },
      { internalType: 'string', name: '_location', type: 'string' },
    ],
    name: 'deliverOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: '_orderId', type: 'string' }],
    name: 'getOrder',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      {
        components: [
          { internalType: 'enum Logistic.OrderStatusType', name: 'orderStatus', type: 'uint8' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
          { internalType: 'string', name: 'location', type: 'string' },
          { internalType: 'string', name: 'orderId', type: 'string' },
        ],
        internalType: 'struct Logistic.Event[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
