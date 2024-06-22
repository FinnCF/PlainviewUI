import React from 'react';
import { Button } from 'react-bootstrap';
import { useAccount, useNetwork } from 'wagmi';
import { useSwitchNetwork } from 'wagmi'

export default function ChangeChain() {

    const { chain } = useNetwork()
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

    return (
    <div className="row" style={{ position: 'absolute', width: '100%', top: '35%' }}>
    <div className="col-4">
    </div>
    <div className="col-4">
        <div className="card">
            <div className='card-title' style={{marginBottom: '10px'}}>
                Incorrect Chain
            </div>
            <div>
                EthKeys is only supported on the following networks, please switch to one of the below:
            </div>
            {chains.map((x) => (
                <Button
                    disabled={!switchNetwork || x.id === chain?.id}
                    key={x.id}
                    variant ='outline-dark'
                    style={{marginBottom: '10px'}}
                    onClick={() => switchNetwork?.(x.id)}
                >
                    {x.name}
                    {isLoading && pendingChainId === x.id && ' (switching)'}
                </Button>
            ))}

            <div>{error && error.message}</div>
        </div>
    </div>
    </div>
    )
}