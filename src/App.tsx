import { useCurrentAccount, ConnectButton, useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';
import { useState } from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions';


function App() {

  const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
  const [digest, setDigest] = useState('');
  const currentAccount = useCurrentAccount();
  console.log(currentAccount)
  const txb = new TransactionBlock()
  const ammountInSui = 3;
  const ammountInMist: number = ammountInSui * 10 ** 9;
  const [coin] = txb.splitCoins(txb.gas, [txb.pure(ammountInMist)]);
  txb.transferObjects([coin], txb.pure("0xe318249d1b8b37758388b2c4447f2c428e19649f7030e37bf377251ba39667cb"));

  return (
    <div style={{ padding: 20 }}>
      <ConnectButton />
      {currentAccount && (
        <>
          <div>
            <button
              onClick={() => {
                signAndExecuteTransactionBlock(
                  {
                    transactionBlock: txb,
                    chain: 'sui:testnet',
                  },
                  {
                    onSuccess: (result) => {
                      console.log('executed transaction block', result);
                      setDigest(result.digest);
                    },
                  },
                );
              }}
            >
              Sign and execute transaction block
            </button>
          </div>
          <div>Digest: {digest}</div>
        </>
      )}
    </div>


























    // <div className="App">
    //   <header className="App-header">
    //     <ConnectButton />
    //   </header>

    //   <h2>Available accounts:</h2>
    //   {accounts.length === 0 && <div>No accounts detected</div>}
    //   <ul>
    //     {accounts.map((account) => (
    //       <li key={account.address}>- {account.address}</li>
    //     ))}
    //   </ul>

    //   {connectionStatus === 'connected' ? (
    //     <div>
    //       <h2>Current wallet:</h2>
    //       <div>Name: {currentWallet.name}</div>
    //       <div>
    //         Accounts:
    //         <ul>
    //           {currentWallet.accounts.map((account) => (
    //             <li key={account.address}>- {account.address}</li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>
    //   ) : (
    //     <div>Connection status: {connectionStatus}</div>
    //   )}
    // </div>
  );
}

export default App
