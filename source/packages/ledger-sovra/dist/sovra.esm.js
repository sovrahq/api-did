import { EthereumLedger, EthereumLedgerUtils } from '@quarkid-sidetree/ethereum';
export { EthereumLedgerUtils as SovraLedgerUtils } from '@quarkid-sidetree/ethereum';

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return {
          value: void 0,
          done: !0
        };
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable || "" === iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    throw new TypeError(typeof iterable + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var _require = /*#__PURE__*/require('../package.json'),
  version = _require.version;
// Sovra network configuration
var SOVRA_CONFIG = {
  testnet: {
    explorer: 'https://explorer.testnet.sovra.io',
    rpc: 'https://rpc.testnet.sovra.io'
  },
  mainnet: {
    explorer: 'https://explorer.sovra.io',
    rpc: 'https://rpc.sovra.io' // TBD
  }
};
var SovraLedger = /*#__PURE__*/function (_EthereumLedger) {
  _inheritsLoose(SovraLedger, _EthereumLedger);
  function SovraLedger(web3, eventPullChunkSize, contractAddress, startingBlockchainTime, logger) {
    var _this;
    _this = _EthereumLedger.call(this, web3, contractAddress, logger) || this;
    _this.eventPullChunkSize = eventPullChunkSize;
    _this.contractAddress = contractAddress;
    // Branding prefix for all Sovra logs
    _this.SOVRA_PREFIX = '[Sovra]';
    // Chunked fetching state (following RSKLedger pattern)
    _this.lastSyncedBlockchainTime = 0;
    _this.startingTime = 0;
    // Explorer URL - set dynamically based on network detection
    _this.explorerBaseUrl = '';
    /**
     * Fetch transactions with chunked event fetching for better performance
     * Following RSKLedger pattern for scalability
     */
    _this._getTransactions = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(fromBlock, toBlock, options) {
        var contract, from, to, effectiveFrom, _yield$ethereumLedger, events, lastSynced, txns;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.getAnchorContract();
            case 2:
              contract = _context.sent;
              if (!_this.isNumber(fromBlock)) {
                _context.next = 7;
                break;
              }
              from = fromBlock;
              _context.next = 10;
              break;
            case 7:
              _context.next = 9;
              return EthereumLedgerUtils.getBlock(_this.web3, fromBlock);
            case 9:
              from = _context.sent.number;
            case 10:
              if (!_this.isNumber(toBlock)) {
                _context.next = 14;
                break;
              }
              to = toBlock;
              _context.next = 17;
              break;
            case 14:
              _context.next = 16;
              return EthereumLedgerUtils.getBlock(_this.web3, toBlock);
            case 16:
              to = _context.sent.number;
            case 17:
              // Use the most recent synced position to avoid re-fetching
              effectiveFrom = Math.max(from, _this.lastSyncedBlockchainTime);
              _this.logger.log(_this.SOVRA_PREFIX + " Fetching events from block " + effectiveFrom + " to " + to + "...");
              // Chunked fetching prevents memory issues with large block ranges
              _context.next = 21;
              return EthereumLedgerUtils.getPastEventsChunked(contract, 'Anchor', effectiveFrom, to, _this.eventPullChunkSize, options == null ? void 0 : options.filter);
            case 21:
              _yield$ethereumLedger = _context.sent;
              events = _yield$ethereumLedger.events;
              lastSynced = _yield$ethereumLedger.lastSynced;
              _this.logger.log(_this.SOVRA_PREFIX + " Fetched " + events.length + " anchor event(s)");
              // Update last synced position
              if (lastSynced > _this.lastSyncedBlockchainTime) {
                _this.lastSyncedBlockchainTime = lastSynced;
              }
              // Convert events to Sidetree transaction format
              txns = events.map(function (log) {
                return EthereumLedgerUtils.eventLogToSidetreeTransaction(log);
              });
              if (!(options != null && options.omitTimestamp)) {
                _context.next = 29;
                break;
              }
              return _context.abrupt("return", txns);
            case 29:
              return _context.abrupt("return", EthereumLedgerUtils.extendSidetreeTransactionWithTimestamp(_this.web3, txns));
            case 30:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();
    /**
     * Write anchor to Sovra blockchain with branded logging
     */
    _this.write = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(anchorString, _fee) {
        var contract, _this$getWriteData, numberOfOperations, buffer, methodCall, currentGasPrice, gas, gasPrice, txn, txUrl, error;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this.logger.log(_this.SOVRA_PREFIX + " Preparing to anchor batch to Sovra blockchain...");
              _context2.next = 4;
              return _this.getAnchorContract();
            case 4:
              contract = _context2.sent;
              _this$getWriteData = _this.getWriteData(anchorString), numberOfOperations = _this$getWriteData.numberOfOperations, buffer = _this$getWriteData.buffer;
              _this.logger.log(_this.SOVRA_PREFIX + " Batch contains " + numberOfOperations + " DID operation(s)");
              _context2.prev = 7;
              methodCall = contract.methods.anchorHash('0x' + buffer.toString('hex').substring(4), numberOfOperations); // Estimate gas and get current gas price
              _context2.next = 11;
              return _this.web3.eth.getGasPrice();
            case 11:
              currentGasPrice = _context2.sent;
              _context2.next = 14;
              return methodCall.estimateGas();
            case 14:
              gas = _context2.sent;
              gasPrice = Math.round(parseInt(currentGasPrice) * 1).toString();
              _this.logger.log(_this.SOVRA_PREFIX + " Sending transaction (gas: " + gas + ", gasPrice: " + gasPrice + ")...");
              _context2.next = 19;
              return methodCall.send({
                from: _this.from,
                gas: gas,
                gasPrice: gasPrice
              });
            case 19:
              txn = _context2.sent;
              // Log success with explorer link
              txUrl = _this.explorerBaseUrl + "/tx/" + txn.transactionHash;
              _this.logger.info(_this.SOVRA_PREFIX + " Batch anchored successfully!");
              _this.logger.info(_this.SOVRA_PREFIX + "   Transaction: " + txn.transactionHash);
              _this.logger.info(_this.SOVRA_PREFIX + "   Explorer: " + txUrl);
              _this.logger.info(_this.SOVRA_PREFIX + "   Operations: " + numberOfOperations);
              _context2.next = 32;
              break;
            case 27:
              _context2.prev = 27;
              _context2.t0 = _context2["catch"](7);
              error = _context2.t0;
              _this.logger.error(_this.SOVRA_PREFIX + " Transaction failed: " + error.message);
              throw _context2.t0;
            case 32:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[7, 27]]);
      }));
      return function (_x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }();
    if (startingBlockchainTime) {
      _this.startingTime = startingBlockchainTime;
    }
    return _this;
  }
  /**
   * Returns service version identifying this as 'sovra' ledger
   */
  var _proto = SovraLedger.prototype;
  _proto.getServiceVersion = function getServiceVersion() {
    return Promise.resolve({
      name: 'sovra',
      version: version
    });
  }
  /**
   * Initialize the ledger with Sovra-specific logging
   */;
  _proto.initialize =
  /*#__PURE__*/
  function () {
    var _initialize = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var rpcUrl, isMainnet, networkName;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            this.logger.log(this.SOVRA_PREFIX + " Initializing Sovra Ledger (ethrex by LambdaClass)...");
            if (this.contractAddress) {
              this.logger.log(this.SOVRA_PREFIX + " Anchor contract: " + this.contractAddress);
            }
            // Call parent initialization (sets up account, networkId, contract)
            _context3.next = 4;
            return _EthereumLedger.prototype.initialize.call(this);
          case 4:
            // Detect network from RPC URL and set explorer accordingly
            rpcUrl = this.detectRpcUrl();
            isMainnet = rpcUrl && !rpcUrl.includes('testnet');
            this.explorerBaseUrl = isMainnet ? SOVRA_CONFIG.mainnet.explorer : SOVRA_CONFIG.testnet.explorer;
            networkName = isMainnet ? 'mainnet' : 'testnet'; // If no starting time was provided and contract was just deployed, use current block
            if (this.contractAddress) {
              _context3.next = 12;
              break;
            }
            _context3.next = 11;
            return this.getLatestTime();
          case 11:
            this.startingTime = _context3.sent.time;
          case 12:
            // Log connection details
            this.logger.log(this.SOVRA_PREFIX + " Connected to Sovra " + networkName);
            this.logger.log(this.SOVRA_PREFIX + "   Network ID: " + this.networkId);
            this.logger.log(this.SOVRA_PREFIX + "   Account: " + this.from);
            this.logger.log(this.SOVRA_PREFIX + "   RPC: " + (rpcUrl || 'unknown'));
            this.logger.log(this.SOVRA_PREFIX + "   Explorer: " + this.explorerBaseUrl);
            this.logger.log(this.SOVRA_PREFIX + " Ledger ready for DID operations");
          case 18:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function initialize() {
      return _initialize.apply(this, arguments);
    }
    return initialize;
  }()
  /**
   * Detect RPC URL from web3 provider or environment
   */
  ;
  _proto.detectRpcUrl = function detectRpcUrl() {
    try {
      var _provider$connection;
      // Try to get from web3 provider
      var provider = this.web3.currentProvider;
      if (provider != null && provider.host) {
        return provider.host;
      }
      if (provider != null && (_provider$connection = provider.connection) != null && _provider$connection.url) {
        return provider.connection.url;
      }
      // Fallback to environment variable
      if (process.env.RPC_URL) {
        return process.env.RPC_URL;
      }
      return null;
    } catch (_unused) {
      // Fallback to environment variable on error
      return process.env.RPC_URL || null;
    }
  }
  /**
   * Helper to check if a value is a number
   */;
  _proto.isNumber = function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }
  /**
   * Helper to get transactions since a specific transaction number
   */;
  _proto._getTransactionsSince =
  /*#__PURE__*/
  function () {
    var _getTransactionsSince2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(fromBlock, toBlock, since, options) {
      var transactions;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return this._getTransactions(fromBlock, toBlock, options);
          case 2:
            transactions = _context4.sent;
            return _context4.abrupt("return", transactions.filter(function (x) {
              return x.transactionNumber > since;
            }));
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this);
    }));
    function _getTransactionsSince(_x6, _x7, _x8, _x9) {
      return _getTransactionsSince2.apply(this, arguments);
    }
    return _getTransactionsSince;
  }()
  /**
   * Read transactions with optimized chunked fetching
   */
  ;
  _proto.read =
  /*#__PURE__*/
  function () {
    var _read = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(sinceTransactionNumber, transactionTimeHash) {
      var options, transactions, block;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            options = {
              omitTimestamp: true
            };
            if (!(sinceTransactionNumber !== undefined)) {
              _context5.next = 7;
              break;
            }
            _context5.next = 4;
            return this._getTransactionsSince(this.startingTime, 'latest', sinceTransactionNumber, options);
          case 4:
            transactions = _context5.sent;
            _context5.next = 23;
            break;
          case 7:
            if (!transactionTimeHash) {
              _context5.next = 20;
              break;
            }
            _context5.next = 10;
            return EthereumLedgerUtils.getBlock(this.web3, transactionTimeHash);
          case 10:
            block = _context5.sent;
            if (!(block != null && block.number)) {
              _context5.next = 17;
              break;
            }
            _context5.next = 14;
            return this._getTransactions(block.number, block.number, options);
          case 14:
            transactions = _context5.sent;
            _context5.next = 18;
            break;
          case 17:
            transactions = [];
          case 18:
            _context5.next = 23;
            break;
          case 20:
            _context5.next = 22;
            return this._getTransactions(this.startingTime, 'latest', options);
          case 22:
            transactions = _context5.sent;
          case 23:
            return _context5.abrupt("return", {
              moreTransactions: false,
              transactions: transactions
            });
          case 24:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this);
    }));
    function read(_x10, _x11) {
      return _read.apply(this, arguments);
    }
    return read;
  }()
  /**
   * Get approximate blockchain time from cache
   */
  ;
  /**
   * Set explorer URL (useful for switching between testnet/mainnet)
   */
  _proto.setExplorerUrl = function setExplorerUrl(url) {
    this.explorerBaseUrl = url;
    this.logger.log(this.SOVRA_PREFIX + " Explorer URL updated to: " + url);
  };
  _createClass(SovraLedger, [{
    key: "approximateTime",
    get: function get() {
      return this.cachedBlockchainTime;
    }
  }]);
  return SovraLedger;
}(EthereumLedger);

export { SovraLedger };
//# sourceMappingURL=sovra.esm.js.map
