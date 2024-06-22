import { useConnect } from 'wagmi'
import { Button } from 'react-bootstrap'
import React, { useMemo } from 'react';

export default function ConnectWallet({ }) {

    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

    return (
        <div className="row" style={{ zIndex: '900', position: 'absolute', width: '100%', top: '35%' }}>
            <div className="col-4">
            </div>
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title" style={{ textAlign: 'center' }}>
                            Connect Wallet
                        </div>
                        <div className='row'>
                            {connectors.map((connector) => (
                                <div className='col-12'>
                                    <Button
                                        style={{ width: '100%', padding: '7px', marginBottom: '7px' }}
                                        variant={'outline-dark'}
                                        key={connector.id}
                                        onClick={() => connect({ connector })}
                                    >
                                        {connector.name}
                                        {!connector.ready && ' (unsupported)'}
                                        {isLoading &&
                                            connector.id === pendingConnector?.id &&
                                            ' (connecting)'}
                                    </Button>
                                </div>
                            ))}

                            {error && <div>{error.message}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}