import BigNumber from "bignumber.js";
import {
  isAllowed,
  setAllowed,
  signTransaction,
  requestAccess,
  getNetwork,
  getPublicKey,
  addToken,
} from "@stellar/freighter-api";

import {
  TransactionBuilder,
  xdr,
  rpc,
  Networks,
  Contract,
  TimeoutInfinite,
  Address,
  Operation,
  scValToNative,
  Memo,
  nativeToScVal,
  ScInt,
  Keypair,
  StrKey,
  Soroban,
  sign,
  Horizon,
} from "@stellar/stellar-sdk";
import axios from "axios";

export const assetMetadata = {
  CCW67TSZV3SSS2HXMBQ5JFGCKJNXKZM7UQUWUZPUTHXSTZLEO7SJMI75: {
    assetCode: "USDC",
    assetIssuer: "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
  },
};

export const HORIZON_URL =
  "https://rpc.ankr.com/premium-http/stellar_horizon/7a27876214d22119ec2a70f6adb115e7eb45ede20a30f49f945cfcd5563e5a3b";

export async function hasTrustline(accountId, assetId) {
  try {
    const server = new Horizon.Server(HORIZON_URL);
    const assetData = assetMetadata[assetId];
    const account = await server.loadAccount(accountId);

    return account.balances.some(
      (balance) =>
        balance.asset_code === assetData?.assetCode &&
        balance.asset_issuer === assetData?.assetIssuer
    );
  } catch (error) {
    console.error("Error fetching account:", error);
    return false;
  }
}

export const BASE_FEE = "100";

export const STELLAR_SDK_SERVER_URL = "https://stellar-sdk-server.sorobuild.io";

export const RPC_URLS = {
  FUTURENET: "https://rpc-futurenet.stellar.org/",
  PUBLIC:
    "https://rpc.ankr.com/stellar_soroban/f476ee5dd085e5d78c7d981977f23ef68854db7b73bc55b96c564824c090fbc6",
};

export const accountToScVal = (account) => new Address(account).toScVal();

export const numberToI128 = (value) => nativeToScVal(value);

export const xlmToStroop = (lumens) => {
  // round to nearest stroop
  return new BigNumber(Math.round(Number(lumens) * 1e7));
};

export const stroopToXlm = (stroops) => {
  return new BigNumber(Number(stroops) / 1e7);
};

const getServer = (network) => new rpc.Server(RPC_URLS[network]);

export const server = getServer("FUTURENET");

export const getTxBuilder = async (pubKey, fee, server, networkPassphrase) => {
  const source = await server.getAccount(pubKey);
  return new TransactionBuilder(source, {
    fee,
    networkPassphrase,
  });
};

export const simulateTx = async (tx, server) => {
  const response = await server.simulateTransaction(tx);

  if (rpc.Api.isSimulationSuccess(response) && response.result !== undefined) {
    return scValToNative(response.result.retval);
  }

  throw new Error("cannot simulate transaction");
};

export async function createContract(txBuilder, contractWasm) {
  const tx = txBuilder.append(contractWasm).setTimeout(TimeoutInfinite).build();
}

export const getTokenInfo = async (tokenId, arg, txBuilder, server) => {
  const contract = new Contract(tokenId);
  const contract3 = new Contract(tokenId);
  const tx = txBuilder
    .addOperation(contract.call(arg))
    .setTimeout(TimeoutInfinite)
    .build();

  const result = await simulateTx(tx, server);
  return result;
};

export const getWalletBalance = async ({
  tokenId,
  userPubKey,
  txBuilderBalance,
  server,
}) => {
  const contract = new Contract(tokenId);

  const tx = txBuilderBalance
    .addOperation(
      contract.call(
        "balance",
        ...[
          accountToScVal(userPubKey), // to
        ]
      )
    )
    .setTimeout(TimeoutInfinite);

  const builtRes = tx.build();
  const walletBal = await simulateTx(builtRes, server);

  // console.log("the balance is", stroopToXlm(walletBal).c.at(0));

  return stroopToXlm(walletBal).c.at(0);
};

export const depositToken = async ({
  poolContract,
  from,
  token_address,
  amount,
  memo,
  txBuilderAdmin,
  server,
}) => {
  const contract = new Contract(poolContract);

  const tx = txBuilderAdmin
    .addOperation(
      contract.call(
        "deposit_token",
        ...[
          accountToScVal(from), // from
          accountToScVal(token_address), //token id
          new ScInt(amount).toI128(), // quantity
        ]
      )
    )
    .setTimeout(TimeoutInfinite);

  if (memo?.length > 0) {
    tx.addMemo(Memo.text(memo));
  }

  const built = tx.build();
  const sim = await server.simulateTransaction(built);

  const preparedTransaction = await server.prepareTransaction(built);
  // console.log("built transaction", sim);

  return preparedTransaction.toXDR();
};

export const transferToEVM = async ({
  poolContract,
  from,
  to,
  token_address,
  amount,
  memo,
  txBuilderAdmin,
  server,
}) => {
  const contract = new Contract(poolContract);

  const tx = txBuilderAdmin
    .addOperation(
      contract.call(
        "transfer_to_evm",
        ...[
          accountToScVal(from), // from
          nativeToScVal(to), // to
          accountToScVal(token_address), //token id
          new ScInt(amount).toI128(), // quantity
        ]
      )
    )
    .setTimeout(TimeoutInfinite);

  if (memo?.length > 0) {
    tx.addMemo(Memo.text(memo));
  }

  const built = tx.build();
  const sim = await server.simulateTransaction(built);

  const preparedTransaction = await server.prepareTransaction(built);
  // console.log("built transaction", sim);

  return preparedTransaction.toXDR();
};

export const mintTokens = async ({
  tokenId,
  quantity,
  destinationPubKey,
  memo,
  txBuilderAdmin,
  server,
}) => {
  const contract = new Contract(tokenId);

  const tx = txBuilderAdmin
    .addOperation(
      contract.call(
        "mint",
        ...[
          accountToScVal(destinationPubKey), // to
          new ScInt(quantity).toI128(), // quantity
        ]
      )
    )
    .setTimeout(TimeoutInfinite);

  if (memo?.length > 0) {
    tx.addMemo(Memo.text(memo));
  }

  const built = tx.build();
  const sim = await server.simulateTransaction(built);

  const preparedTransaction = await server.prepareTransaction(built);
  // console.log("built transaction", sim);

  return preparedTransaction.toXDR();
};

export const getEstimatedFee = async (
  tokenId,
  quantity,
  destinationPubKey,
  memo,
  txBuilder,
  server
) => {
  const contract = new Contract(tokenId);

  const tx = txBuilder
    .addOperation(
      contract.call(
        "mint",
        ...[
          accountToScVal(destinationPubKey), // to
          numberToI128(quantity), // quantity
        ]
      )
    )
    .setTimeout(TimeoutInfinite);

  if (memo.length > 0) {
    tx.addMemo(Memo.text(memo));
  }

  const raw = tx.build();

  const simResponse = await server.simulateTransaction(raw);

  // console.log("sim response", simResponse);

  if (rpc.Api.isSimulationError(simResponse)) {
    throw simResponse.error;
  }
};

export const submitTx = async (signedXDR, networkPassphrase, server) => {
  const tx = TransactionBuilder.fromXDR(signedXDR, networkPassphrase);

  const sendResponse = await server.sendTransaction(tx);

  // console.log("transaction result", sendResponse);

  if (sendResponse.status === "PENDING") {
    let txResponse = await server.getTransaction(sendResponse.hash);

    // Poll this until the status is not "NOT_FOUND"
    while (txResponse.status === rpc.Api.GetTransactionStatus.NOT_FOUND) {
      // See if the transaction is complete
      // eslint-disable-next-line no-await-in-loop
      txResponse = await server.getTransaction(sendResponse.hash);
      // Wait a second
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (txResponse.status === rpc.Api.GetTransactionStatus.SUCCESS) {
      return txResponse.resultXdr.toXDR("base64");
    }
  }
  throw new Error(
    `Unabled to submit transaction, status: ${sendResponse.status}`
  );
};

export const ConnectWallet = async (setUserKey, setNetwork) => {
  let publicKey = "";
  let error = "";

  try {
    const isAllowed = await setAllowed();
    publicKey = (await requestAccess()).address;

    // console.log("user key is", publicKey);

    const nt = await getNetwork();

    setUserKey(() => publicKey);
    setNetwork(() => nt);
  } catch (e) {
    error = e;
  }

  if (error) {
    return error;
  }

  return publicKey;
};

export async function anyInvokeMainnet(
  pubKey,
  fee,
  networkPassphrase,
  contractId,
  operation,
  args,
  memo
) {
  const body = {
    pubKey: pubKey,
    fee: fee,
    networkPassphrase: networkPassphrase,
    contractId: contractId,
    operation: operation,
    args: args,
    memo: memo,
  };

  try {
    const response = await axios.post(
      `${STELLAR_SDK_SERVER_URL}/anyInvoke`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const xdr = response.data.data;

    const signedTx = await signTransaction(xdr, { network: "PUBLIC" });

    return signedTx;
  } catch (error) {
    console.error(
      "Error sending transaction:",
      error.response ? error.response.data : error.message
    );
  }
}

export async function getTrustline(accountId, assetId) {
  const body = {
    accountId: accountId,
    assetId: assetId,
  };

  try {
    const response = await axios.post(
      `${STELLAR_SDK_SERVER_URL}/getTrustline`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const trustline = response.data.data;

    return trustline;
  } catch (error) {
    console.error(
      "Error fetching trustline",
      error.response ? error.response.data : error.message
    );
  }
}

export async function changeTrustline(
  accountId,
  fee,
  networkPassphrase,
  assetId
) {
  const body = {
    accountId: accountId,
    fee: fee,
    networkPassphrase: networkPassphrase,
    assetId: assetId,
  };

  try {
    const response = await axios.post(
      `${STELLAR_SDK_SERVER_URL}/changeTrust`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const xdr = response.data.data;

    // console.log("the transaction", xdr);

    return;

    const signedTx = await signTransaction(xdr, { network: "PUBLIC" });

    return signedTx;
  } catch (error) {
    console.error(
      "Error sending transaction:",
      error.response ? error.response.data : error.message
    );
  }
}

export async function sendTransactionMainnet(signedTx, networkPassphrase) {
  try {
    const response = await axios.post(
      `${STELLAR_SDK_SERVER_URL}/sendTransaction`,
      {
        signedTx: signedTx,
        networkPassphrase: networkPassphrase,
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error sending transaction:",
      error.response ? error.response.data : error.message
    );
  }
}
