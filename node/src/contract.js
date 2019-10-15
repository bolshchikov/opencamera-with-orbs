require('dotenv').config();

const { Client, argString, decodeHex } = require('orbs-client-sdk');

const ORBS_PUBLIC_KEY = decodeHex(process.env.ORBS_PUBLIC_KEY);
const ORBS_PRIVATE_KEY = decodeHex(process.env.ORBS_PRIVATE_KEY);
const ORBS_NODE_URL = process.env.ORBS_NODE_URL;
const ORBS_VCHAIN_ID = process.env.ORBS_VCHAIN_ID;
const CONTRACT_NAME = process.env.REGISTRY_CONTRACT_NAME;

const orbsClient = new Client(ORBS_NODE_URL, ORBS_VCHAIN_ID, 'TEST_NET');

const registerMedia = async (id, metadata) => {
  const [tx] = orbsClient.createTransaction(
    ORBS_PUBLIC_KEY,
    ORBS_PRIVATE_KEY,
    CONTRACT_NAME,
    'registerMedia',
    [
      argString(id),
      argString(metadata)
    ]
  );
  const receipt = await orbsClient.sendTransaction(tx);
  return (
    receipt.executionResult === 'SUCCESS' &&
    receipt.requestStatus === 'COMPLETED'
  );
};

const verifyMedia = async (id) => {
  const query = orbsClient.createQuery(
    ORBS_PUBLIC_KEY,
    CONTRACT_NAME,
    'verifyMedia',
    [argString(id)]
  );
  const { outputArguments, executionResult } = await orbsClient.sendQuery(query);
  return { executionResult, data: outputArguments[0].value };
};

module.exports = {
  registerMedia,
  verifyMedia
};
