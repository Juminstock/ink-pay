import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import RamperFactory from "./typedContract/constructors/ramper";
import Ramper from "./typedContract/contracts/ramper";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";

use(chaiAsPromised);

// Create a new instance of contract
const wsProvider = new WsProvider("ws://127.0.0.1:9944");
// Create a keyring instance
const keyring = new Keyring({ type: "sr25519" });

describe("ramper test", () => {
  let ramperFactory: RamperFactory;
  let api: ApiPromise;
  let deployer: KeyringPair;
  
  let contract: Ramper;
  const initialState = true;

  before(async function setup(): Promise<void> {
    api = await ApiPromise.create({ provider: wsProvider });
    deployer = keyring.addFromUri("//Alice");

    ramperFactory = new RamperFactory(api, deployer);

    contract = new Ramper(
      (await ramperFactory.new(initialState)).address,
      deployer,
      api
    );
  });

  after(async function tearDown() {
    await api.disconnect();
  });
});
