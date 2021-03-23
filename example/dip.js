const cosmosjs = require("@cosmostation/cosmosjs");

const chainId = "abc";
const dippernetwork = cosmosjs.network('http://localhost:1317', chainId);
dippernetwork.setBech32MainPrefix('dip')
dippernetwork.setPath("m/44'/925'/0'/0/0");

const mnemonic = "shuffle soon deer fitness inflict quantum reform video certain urge please friend razor hamster sting air ranch tragic sister van muscle under hint resemble";
const address = dippernetwork.getAddress(mnemonic);
const ecpairPriv = dippernetwork.getECPairPriv(mnemonic);

console.log(address);


dippernetwork.getAccounts(address).then(data => {
    console.log(data);
    let stdSignMsg = dippernetwork.newStdMsg({
        msgs: [
            {
                type: "dip/MsgSend",
                value: {
                    amount: [
                        {
                            amount: String(1000000000000),
                            denom: "pdip"
                        }
                    ],
                    from_address: address,
                    to_address: "dip1nzuhk7tpfqjf9y3hsv4feeehkw78euf9dkf3yy"
                }
            }
        ],
        chain_id: chainId,
        fee: { amount: [ { amount: String(10000000000000), denom: "pdip" } ], gas: String(200000) },
        memo: "",
        account_number: data.result.value.account_number,
        sequence: data.result.value.sequence
    });

    // console.log(stdSignMsg);

    const signedTx = dippernetwork.sign(stdSignMsg, ecpairPriv);
    dippernetwork.broadcast(signedTx).then(response => console.log(response));

})
