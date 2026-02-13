import { EthereumLedger } from '@quarkid-sidetree/ethereum';
import { BlockchainTimeModel, TransactionModel, ServiceVersionModel } from '@quarkid-sidetree/common';
import Web3 from 'web3';
export default class SovraLedger extends EthereumLedger {
    protected eventPullChunkSize: number;
    contractAddress?: string | undefined;
    private readonly SOVRA_PREFIX;
    protected lastSyncedBlockchainTime: number;
    protected startingTime: number;
    private explorerBaseUrl;
    constructor(web3: Web3, eventPullChunkSize: number, contractAddress?: string | undefined, startingBlockchainTime?: number, logger?: Console);
    /**
     * Returns service version identifying this as 'sovra' ledger
     */
    getServiceVersion(): Promise<ServiceVersionModel>;
    /**
     * Initialize the ledger with Sovra-specific logging
     */
    initialize(): Promise<void>;
    /**
     * Detect RPC URL from web3 provider or environment
     */
    private detectRpcUrl;
    /**
     * Helper to check if a value is a number
     */
    private isNumber;
    /**
     * Fetch transactions with chunked event fetching for better performance
     * Following RSKLedger pattern for scalability
     */
    _getTransactions: (fromBlock: number | string, toBlock: number | string, options?: {
        filter?: import("web3-eth-contract").Filter | undefined;
        omitTimestamp?: boolean | undefined;
    } | undefined) => Promise<TransactionModel[]>;
    /**
     * Helper to get transactions since a specific transaction number
     */
    private _getTransactionsSince;
    /**
     * Read transactions with optimized chunked fetching
     */
    read(sinceTransactionNumber?: number, transactionTimeHash?: string): Promise<{
        moreTransactions: boolean;
        transactions: TransactionModel[];
    }>;
    /**
     * Write anchor to Sovra blockchain with branded logging
     */
    write: (anchorString: string, _fee?: number) => Promise<void>;
    /**
     * Get approximate blockchain time from cache
     */
    get approximateTime(): BlockchainTimeModel;
    /**
     * Set explorer URL (useful for switching between testnet/mainnet)
     */
    setExplorerUrl(url: string): void;
}
