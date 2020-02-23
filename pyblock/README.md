# Pyblockchain
> A simple blockchain implementation in Python

## How to run:

```shell
cd pyblockchain
flask run
```


## Features

* A genesis block is created with it's previous_hash as '0' and proof is assumed to be 1
* mine_block() creates a proof of work and if it satisfies the target,it will be mined.Target should have first 4 digits as 0000
* get_chain() displays all the blocks mined in json format
* is_it_valid checks if the blockchain is valid

