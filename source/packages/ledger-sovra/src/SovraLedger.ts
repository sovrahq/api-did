/*
 * Sovra Ledger - DID anchoring for ethrex network by LambdaClass
 *
 * This ledger extends EthereumLedger with:
 * - Sovra-specific branding and logging
 * - Chunked event fetching for scalability
 * - Explorer URL integration for transaction tracking
 *
 * Network: ethrex (https://github.com/lambdaclass/ethrex)
 * DID Method: did:quarkid:sovra
 */

import {
  EthereumLedgerUtils as ethereumLedgerUtils,
  EthereumLedger,
  ElementEventData,
  EthereumFilter
} from '@quarkid-sidetree/ethereum';

import {
  BlockchainTimeModel,
  TransactionModel,
  ServiceVersionModel
} from '@quarkid-sidetree/common';

import Web3 from 'web3';

const { version } = require('../package.json');

// Sovra network configuration
const SOVRA_CONFIG = {
  testnet: {
    explorer: 'https://explorer.testnet.sovra.io',
    rpc: 'https://rpc.testnet.sovra.io'
  },
  mainnet: {
    explorer: 'https://explorer.sovra.io', // TBD
    rpc: 'https://rpc.sovra.io' // TBD
  }
};

export default class SovraLedger extends EthereumLedger {
  // Branding prefix for all Sovra logs
  private readonly SOVRA_PREFIX = '[Sovra]';

  // Chunked fetching state (following RSKLedger pattern)
  protected lastSyncedBlockchainTime: number = 0;
  protected startingTime: number = 0;

  // Default to testnet explorer
  private explorerBaseUrl: string = SOVRA_CONFIG.testnet.explorer;

  constructor(
    web3: Web3,
    protected eventPullChunkSize: number,
    public contractAddress?: string,
    startingBlockchainTime?: number,
    logger?: Console
  ) {
    super(web3, contractAddress, logger);

    if (startingBlockchainTime) {
      this.startingTime = startingBlockchainTime;
    }
  }

  /**
   * Returns service version identifying this as 'sovra' ledger
   */
  getServiceVersion(): Promise<ServiceVersionModel> {
    return Promise.resolve({
      name: 'sovra',
      version,
    });
  }

  /**
   * Initialize the ledger with Sovra-specific logging
   */
  public async initialize(): Promise<void> {
    this.logger.log(`${this.SOVRA_PREFIX} Initializing Sovra Ledger (ethrex by LambdaClass)...`);

    if (this.contractAddress) {
      this.logger.log(`${this.SOVRA_PREFIX} Anchor contract: ${this.contractAddress}`);
    }

    // Call parent initialization (sets up account, networkId, contract)
    await super.initialize();

    // If no starting time was provided and contract was just deployed, use current block
    if (!this.contractAddress) {
      this.startingTime = (await this.getLatestTime()).time;
    }

    // Log connection details
    this.logger.log(`${this.SOVRA_PREFIX} Connected to Sovra network`);
    this.logger.log(`${this.SOVRA_PREFIX}   Network ID: ${this.networkId}`);
    this.logger.log(`${this.SOVRA_PREFIX}   Account: ${this.from}`);
    this.logger.log(`${this.SOVRA_PREFIX}   Explorer: ${this.explorerBaseUrl}`);
    this.logger.log(`${this.SOVRA_PREFIX} Ledger ready for DID operations`);
  }

  /**
   * Helper to check if a value is a number
   */
  private isNumber(n: any): boolean {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }

  /**
   * Fetch transactions with chunked event fetching for better performance
   * Following RSKLedger pattern for scalability
   */
  public _getTransactions = async (
    fromBlock: number | string,
    toBlock: number | string,
    options?: { filter?: EthereumFilter; omitTimestamp?: boolean }
  ): Promise<TransactionModel[]> => {
    const contract = await this.getAnchorContract();

    // Resolve block numbers if strings like 'latest' are provided
    let from: number;
    if (this.isNumber(fromBlock)) {
      from = fromBlock as number;
    } else {
      from = (await ethereumLedgerUtils.getBlock(this.web3, fromBlock)).number;
    }

    let to: number;
    if (this.isNumber(toBlock)) {
      to = toBlock as number;
    } else {
      to = (await ethereumLedgerUtils.getBlock(this.web3, toBlock)).number;
    }

    // Use the most recent synced position to avoid re-fetching
    const effectiveFrom = Math.max(from, this.lastSyncedBlockchainTime);

    this.logger.log(`${this.SOVRA_PREFIX} Fetching events from block ${effectiveFrom} to ${to}...`);

    // Chunked fetching prevents memory issues with large block ranges
    const { events, lastSynced } = await ethereumLedgerUtils.getPastEventsChunked(
      contract,
      'Anchor',
      effectiveFrom,
      to,
      this.eventPullChunkSize,
      options?.filter
    );

    this.logger.log(`${this.SOVRA_PREFIX} Fetched ${events.length} anchor event(s)`);

    // Update last synced position
    if (lastSynced > this.lastSyncedBlockchainTime) {
      this.lastSyncedBlockchainTime = lastSynced;
    }

    // Convert events to Sidetree transaction format
    const txns = events.map((log) =>
      ethereumLedgerUtils.eventLogToSidetreeTransaction(log as ElementEventData)
    );

    if (options?.omitTimestamp) {
      return txns;
    }

    return ethereumLedgerUtils.extendSidetreeTransactionWithTimestamp(this.web3, txns);
  };

  /**
   * Helper to get transactions since a specific transaction number
   */
  private async _getTransactionsSince(
    fromBlock: number | string,
    toBlock: number | string,
    since: number,
    options?: { filter?: EthereumFilter; omitTimestamp?: boolean }
  ): Promise<TransactionModel[]> {
    const transactions = await this._getTransactions(fromBlock, toBlock, options);
    return transactions.filter(x => x.transactionNumber > since);
  }

  /**
   * Read transactions with optimized chunked fetching
   */
  public async read(
    sinceTransactionNumber?: number,
    transactionTimeHash?: string
  ): Promise<{ moreTransactions: boolean; transactions: TransactionModel[] }> {
    const options = { omitTimestamp: true };
    let transactions: TransactionModel[];

    if (sinceTransactionNumber !== undefined) {
      // Path 1: Get transactions since a specific transaction number
      transactions = await this._getTransactionsSince(
        this.startingTime,
        'latest',
        sinceTransactionNumber,
        options
      );
    } else if (transactionTimeHash) {
      // Path 2: Get transactions from a specific block
      const block = await ethereumLedgerUtils.getBlock(this.web3, transactionTimeHash);
      if (block?.number) {
        transactions = await this._getTransactions(block.number, block.number, options);
      } else {
        transactions = [];
      }
    } else {
      // Path 3: Get all transactions from starting block
      transactions = await this._getTransactions(this.startingTime, 'latest', options);
    }

    return {
      moreTransactions: false,
      transactions,
    };
  }

  /**
   * Write anchor to Sovra blockchain with branded logging
   */
  public write = async (anchorString: string, _fee = 0): Promise<void> => {
    this.logger.log(`${this.SOVRA_PREFIX} Preparing to anchor batch to Sovra blockchain...`);

    const contract = await this.getAnchorContract();
    const { numberOfOperations, buffer } = this.getWriteData(anchorString);

    this.logger.log(`${this.SOVRA_PREFIX} Batch contains ${numberOfOperations} DID operation(s)`);

    try {
      const methodCall = contract.methods.anchorHash(
        '0x' + buffer.toString('hex').substring(4),
        numberOfOperations
      );

      // Estimate gas and get current gas price
      const currentGasPrice = await this.web3.eth.getGasPrice();
      const gas = await methodCall.estimateGas();
      const gasPrice = Math.round(parseInt(currentGasPrice) * 1).toString();

      this.logger.log(`${this.SOVRA_PREFIX} Sending transaction (gas: ${gas}, gasPrice: ${gasPrice})...`);

      const txn = await methodCall.send({
        from: this.from,
        gas,
        gasPrice
      });

      // Log success with explorer link
      const txUrl = `${this.explorerBaseUrl}/tx/${txn.transactionHash}`;
      this.logger.info(`${this.SOVRA_PREFIX} Batch anchored successfully!`);
      this.logger.info(`${this.SOVRA_PREFIX}   Transaction: ${txn.transactionHash}`);
      this.logger.info(`${this.SOVRA_PREFIX}   Explorer: ${txUrl}`);
      this.logger.info(`${this.SOVRA_PREFIX}   Operations: ${numberOfOperations}`);

    } catch (err) {
      const error = err as Error;
      this.logger.error(`${this.SOVRA_PREFIX} Transaction failed: ${error.message}`);
      throw err;
    }
  };

  /**
   * Get approximate blockchain time from cache
   */
  public get approximateTime(): BlockchainTimeModel {
    return this.cachedBlockchainTime;
  }

  /**
   * Set explorer URL (useful for switching between testnet/mainnet)
   */
  public setExplorerUrl(url: string): void {
    this.explorerBaseUrl = url;
    this.logger.log(`${this.SOVRA_PREFIX} Explorer URL updated to: ${url}`);
  }
}
