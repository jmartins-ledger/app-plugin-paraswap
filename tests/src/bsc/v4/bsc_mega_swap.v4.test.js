import { processTest, populateTransaction} from "../../test.fixture";

const contractName = "Paraswap V4";

const testLabel = "Mega Swap"; // <= Name of the test
const testDirSuffix = "mega_swap_v4"; // <= directory to compare device snapshots to
const testNetwork = "bsc"; 
const signedPlugin = false;

const contractAddr = "0x55a0e3b6579972055faa983482aceb4b251dcf15";
const chainID = 56; // BSC

// From : https://bscscan.com/tx/0xaa4e5767b66f789d4a952b22ecc05d078fb0a9dbea3ec09fe3dde71bc5c77cb9
const inputData = "0xec1d21dd00000000000000000000000000000000000000000000000000000000000000200000000000000000000000008ac76a51cc950d9822d68b83fe1ad97b32cd580d000000000000000000000000000000000000000000000270196b7fa18a1c000000000000000000000000000000000000000000000000000002a8c176d5112e5100000000000000000000000000000000000000000000000002bdcf5d7a01e093000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000076c656467657232000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000002e000000000000000000000000000000000000000000000000000000000000021980000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000007130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d0cdb2be9eb03fbcc6a78b11d4636845db799cc40000000000000000000000004da562d2c48d5ba404643a2ce0dd5cfda6d7aa98000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000000000000000008ac76a51cc950d9822d68b83fe1ad97b32cd580d00000000000000000000000055d398326f99059ff775485246999027b31979550000000000000000000000007130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c00000000000000000000000000000000000000000000000000000000000005780000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000240000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000ad2f7039b0f4c410654886d049ae8406f5ade709000000000000000000000000dc3999f88723e44a44ebd53c3cd0a5633f948246000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000008ac76a51cc950d9822d68b83fe1ad97b32cd580d000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000007130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d0cdb2be9eb03fbcc6a78b11d4636845db799cc40000000000000000000000004da562d2c48d5ba404643a2ce0dd5cfda6d7aa98000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000007130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c"

// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
  {
    name: "nanos",
    label: "Nano S",
    steps: 8, // <= Define the number of steps for this test case and this device
  },
  // {
  //   name: "nanox",
  //   label: "Nano X",
  //   steps: 5, // <= Define the number of steps for this test case and this device
  // },
];

devices.forEach((device) =>
  processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx,testNetwork)
);
