const CartSummary = ({
  subtotal,
  discount,
  totalPrice,
  discountCode,
  setDiscountCode,
  isDiscountApplied,
  handleApplyDiscount,
  formatCurrency,
  handleCheckout,
  error,
}) => {
  return (
    <div className="md:mt-6 p-[1rem] shadow-md md:w-2/5 text-[0.7rem] md:text-[1rem] mb-4">
      <h2 className="text-lg md:text-xl font-bold mb-2">Cart Summary</h2>
      <p>Subtotal: {formatCurrency(subtotal)}</p>
      <p>
        Available Discounts: For 10% Discount - SAVE10 & For 20% Discount-
        SAVE20{" "}
      </p>
      {isDiscountApplied && <p>Discount: -{formatCurrency(discount)}</p>}
      <p>Total Price: {formatCurrency(totalPrice)}</p>

      {!isDiscountApplied && (
        <div className="my-[1rem]">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="Enter discount code"
            className="border p-2 rounded mr-2 px-2 py-1 md:px-3 md:py-2 mb-2"
          />
          <button
            onClick={handleApplyDiscount}
            className="bg-blue-500 text-white px-2 py-1 md:px-3 md:py-2 rounded"
          >
            Apply Discount
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}

      <button
        onClick={() => handleCheckout()}
        className="mt-4 bg-blue-500 text-white px-2 py-1 md:px-3 md:py-2 rounded"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
