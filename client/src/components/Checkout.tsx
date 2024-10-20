import React, { useEffect, useState } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import { Axios } from '../api/useAxios';
import { Client } from "braintree-web/client";

const Checkout: React.FC<{amount: number}> = ({amount}) => {
    const [clientToken, setClientToken] = useState<string | null>(null);
    const [instance, setInstance] = useState<Client | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        Axios.get('/api/v1/checkout/get_token')
        .then(response => {
            setClientToken(response.data.client_token);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const { nonce } = await instance.requestPaymentMethod();
            const response = await Axios.post('/api/v1/checkout/process_payment/', {
                payment_method_nonce: nonce,
                amount: amount
            });

            console.log(response)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute top-0 z-20 h-full w-full flex justify-center items-center">
            <div className="max-w-md bg-white p-6">
                {
                    clientToken? (
                        <>
                            <DropIn
                                options={{ authorization: clientToken }}
                                onInstance={instance => setInstance(instance)}
                            />
                            <button onClick={handlePayment} disabled={loading} className="flex ml-auto w-full text-center text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                                {loading ? 'loading...' : 'Buy'}
                            </button>
                        </>
                    ) : (
                        <div className="max-w-md mx-auto flex ml-auto text-black border-0 py-2 px-6 focus:outline-none cursor-wait rounded">loading checkout...</div>
                    )
                }
            </div>
        </div>
    );
};

export default Checkout;
