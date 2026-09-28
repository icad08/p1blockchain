const { ethers } = require("ethers"); const artifact = require("../artifacts/HelloWorld.json"); 
  
(async () => { 
  const provider = new ethers.JsonRpcProvider(process.env.CMU_RPC_URL); 
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider); 
  
  const bytecodeRaw = artifact.evm.bytecode.object; 
  const bytecode = bytecodeRaw.startsWith("0x") ? bytecodeRaw : "0x" + bytecodeRaw; 
  
  const factory = new ethers.ContractFactory(artifact.abi, bytecode, signer); 
  
  console.log("Deploying HelloWorld..."); 
  const contract = await factory.deploy("Hello, EVM!");   await contract.waitForDeployment(); 
  
  const address = await contract.getAddress();   console.log("HelloWorld deployed at:", address); 
  
  const message = await contract.greet();   console.log("greet() result:", message); 
})().catch((err) => {   console.error(err);   process.exit(1); 
}); 
