import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GrantManagerModule = buildModule("GrantManagerModule", (m) => {

  const grantManager = m.contract("GrantManager", [], {});

  return { grantManager };
});

export default GrantManagerModule;
