import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const PaymentForm = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [paymentDetails, setPaymentDetails] = useState({
        amount: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        upiId: '',
    });
    const [isPayButtonDisabled, setIsPayButtonDisabled] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({
            ...paymentDetails,
            [name]: value,
        });
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
        // Reset UPI field when switching to card
        if (e.target.value !== 'upi') {
            setPaymentDetails({ ...paymentDetails, upiId: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const paymentData = {
                userId: 'your_user_id_here', // Replace with actual user ID
                paymentMethod: paymentMethod,
                paymentDetails: paymentDetails,
            };

            const endpoint =
                paymentMethod === 'card' ? '/payment/confirm' : '/payment/netbanking-upi';

            const response = await axiosInstance.post(endpoint, paymentData);

            if (response.status === 200) {
                console.log('Payment successful:', response.data);
                alert('Payment Successful');
            } else {
                console.log('Payment failed:', response.data);
                alert('Payment Failed');
            }
        } catch (error) {
            console.error('Error during payment:', error);
            alert('An error occurred during the payment process.');
        }
    };

    // Enable the Pay button only if all necessary fields are filled
    const validateForm = () => {
        if (paymentMethod === 'card') {
            return paymentDetails.cardNumber && paymentDetails.expiryDate && paymentDetails.cvv && paymentDetails.amount;
        }
        if (paymentMethod === 'upi') {
            return paymentDetails.upiId && paymentDetails.amount;
        }
        return false;
    };

    return (
        <div className="payment-form">
            <form onSubmit={handleSubmit}>
                <h2>Payment Details</h2>

                <div>
                    <label>Payment Method</label>
                    <select onChange={handlePaymentMethodChange} value={paymentMethod}>
                        <option value="card">Credit/Debit Card</option>
                        <option value="netbanking">Net Banking</option>
                        <option value="upi">UPI</option>
                    </select>
                </div>

                {paymentMethod === 'card' && (
                    <div>
                        <label>Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={handleInputChange}
                            placeholder="Enter Card Number"
                        />
                    </div>
                )}

                {paymentMethod === 'card' && (
                    <div>
                        <label>Expiry Date</label>
                        <input
                            type="text"
                            name="expiryDate"
                            value={paymentDetails.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                        />
                    </div>
                )}

                {paymentMethod === 'card' && (
                    <div>
                        <label>CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={handleInputChange}
                            placeholder="CVV"
                        />
                    </div>
                )}

                {paymentMethod === 'upi' && (
                    <div>
                        <label>UPI ID</label>
                        <input
                            type="text"
                            name="upiId"
                            value={paymentDetails.upiId}
                            onChange={handleInputChange}
                            placeholder="Enter UPI ID"
                        />
                    </div>
                )}

                <div>
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={paymentDetails.amount}
                        onChange={handleInputChange}
                        placeholder="Amount"
                    />
                </div>

                <button type="submit" disabled={!validateForm()}>
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
