// defining the class block and what it does. index = position 
// in the chain, timestamp = when the block was created, data = info about the block
// previousHash = the hash of the block before
//downloaded the cryto js using terminal created a variable for it
const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ' '){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    
    //function calculates a hash and returns it 
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/09/2021", "Genesis Block", 0);
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    // to add a new block, the method needs to get the latest block and its hash, then recalulate the new hash, then push it on the chain
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock() .hash;
        newBlock.hash  = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // verifying the integrity of the block/ hash before
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

// testing the blockchain
let oyCoin = new BlockChain();
oyCoin.addBlock(new Block(1, "2/09/2021", {amount: 4}));
oyCoin.addBlock(new Block(2, "5/09/2021", {amount: 10}));

console.log("Is blockchain valid: " + oyCoin.isChainValid());

oyCoin.chain[1].data = {amount: 100};
oyCoin.chain[1].hash = oyCoin.chain[1].calculateHash();

console.log("Is blockchain valid: " + oyCoin.isChainValid());

//console.log(JSON.stringify(oyCoin, null, 4));
