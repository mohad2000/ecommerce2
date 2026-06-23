import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { toast } from 'react-toastify'

const CARD_OPTIONS = {
  style: {
    base: {
      color: '#1a202c',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      lineHeight: '24px',
      '::placeholder': { color: '#a0aec0' },
    },
    invalid: { color: '#e53e3e', iconColor: '#e53e3e' },
  },
  hidePostalCode: true,
}

const PaymentForm = ({ total, cartItems, shippingInfo, onSuccess }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [cardError, setCardError] = useState('')

  if (!stripe || !elements) {
    return (
      <p className="text-sm text-gray-400 text-center py-2">
        Loading payment form...
      </p>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setCardError('')

    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/v1/payment/create-payment-intent',
        { amount: total },
        { withCredentials: true }
      )

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      })

      if (result.error) {
        setCardError(result.error.message)
      } else if (result.paymentIntent.status === 'succeeded') {
        const orderItems = cartItems.map((item) => ({
          name: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.images[0]?.url,
          product: item._id,
        }))

        await axios.post(
          'http://localhost:8000/api/v1/orders/create-order',
          {
            orderItems,
            shippingInfo,
            paymentInfo: {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            },
            taxPrice: 0,
            shippingCost: 0,
            totalPrice: total,
            orderStatus: 'Processing',
          },
          { withCredentials: true }
        )

        toast.success('Order placed successfully!')
        onSuccess()
      }
    } catch (error) {
      setCardError(error.response?.data?.message || 'Payment failed. Please try again.')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '12px',
          padding: '14px 16px',
          minHeight: '50px',
        }}
      >
        <CardElement options={CARD_OPTIONS} />
      </div>

      {cardError && (
        <p className="text-red-500 text-sm">{cardError}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-success text-white w-full"
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          `Pay Rs ${total.toLocaleString()}`
        )}
      </button>
    </form>
  )
}

export default PaymentForm