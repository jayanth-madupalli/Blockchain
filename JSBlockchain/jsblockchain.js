const SHA256 = require("crypto-js/sha256");

//A Class defining the structure of a block.
class Block {
    constructor(timestamp, data, prevHs = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.prevHs = prevHs;
        this.hs = this.calcHash();
        this.nonce = 0;
    }
    calcHash() {
        //To Calculate the hash of the calling block.
        return SHA256(this.timestamp + this.prevHs + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(diff) {
        //Add POW functionality for mining new blocks with passed difficulty
        while (this.hs.substring(0, diff) != Array(diff + 1).join(0)) {
            this.nonce++;
            this.hs = this.calcHash();
        }
    }
}

//A Class representing a chain of blocks
class BlockChain {
    constructor(diff = 2) {
        this.chain = [this.theGenesisBlock()];
        this.diff = diff;
    }
    theGenesisBlock() {
        //to create a genesis/first block
        return new Block('000000000', 'Genesis Block', '0');
    }
    getLatestBlock() {
        //To get the last/latest block in the chain
        return this.chain[this.chain.length - 1];
    }
    addBlock(nBlock) {
        //To add a new block to the blockchain
        nBlock.prevHs = this.getLatestBlock().hs;
        nBlock.mineBlock(this.diff);
        this.chain.push(nBlock);
    }
    validateChain() {
        //skip genesis block
        for (let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];
            if (currBlock.hs != currBlock.calcHash())
                return false;
            if (currBlock.prevHs != prevBlock.hs)
                return false;
        }
        return true;
    }
}

//Test all the functionalities
let newChain = new BlockChain(4); //pass difficulty
//create a new blockchain with bunch of blocks
function createChain(num) {
    //skip genesis
    console.log("Adding blocks, Use lower difficulty if takes too long..");
    for (let i = 1; i <= num; i++) {
        newChain.addBlock(new Block(Date.now(), { 'i': i, 'i2': i * i }));
        console.log("Added block #" + i + " with hash " + newChain.getLatestBlock().hs);
    }
}

function modifyChain(BChain) {
    console.log("Modifying the blockchain...");
    for (let i = 1; i < BChain.chain.length; i++)
        BChain.chain[i].data = { 'i': i, 'i2': i / 2 };
}

function displayChain(BChain) {
    console.log(JSON.stringify(BChain, null, 2));
}

createChain(10); //10 blocks
console.log("Valid Chain: ");
displayChain(newChain); // display the whole blockchain
console.log('Is the chain valid?: ' + newChain.validateChain()); // returns true as no modifications were done
modifyChain(newChain); // Replacing data in the blockchain from squares to halves
console.log("Invalid Chain: ");
displayChain(newChain) // Display after modifications, Note that only data has been changed and we didn't recompute hashes
console.log('Is the chain valid?: ' + newChain.validateChain()); // returns false as it was modified
/*  This sample blockchain only deals with
    adding new blocks, validating the current
    blockchain, inducing difficulty in adding
    new blocks. The actual implementations however
    are much more complex as all the nodes are 
    connected and each have a copy of the blockchain.

    We can add mining rewards, and assume the data 
    consists of transactions and tweak this code to 
    work as a simple cryptocurrency.

    Difficulty is a concept to make block generation harder,
    so as to prevent creation of a "complete" modified
    blockchain as it would be computationlly infeasible.
    The difficulty here is based on the number of zeroes 
    in the hash of block, for this we keep using an incrementing
    nonce and append it to the data to be hashed until we get 
    our required number of zeroes in our SHA256 hash. The
    difficulty can also be implemented in many other ways.
*/