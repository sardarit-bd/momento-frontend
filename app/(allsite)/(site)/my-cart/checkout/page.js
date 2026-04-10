"use client";

import SpinLoader from "@/app/componnent/SpingLoader";
import useCartStore from "@/store/useCartStore";
import getId from "@/utilis/helper/cookie/getid";
import getCookie from "@/utilis/helper/cookie/gettooken";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inputStyle =
  "border border-gray-300 bg-white/70 text-gray-900 placeholder-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 p-3 rounded-xl w-full outline-none transition";

export default function CheckoutPage() {

  const id = getId();
  console.log(id);
  const token = getCookie();
  const [loading, setloading] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [City, setCity] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [address, setaddress] = useState("");
  const { cart } = useCartStore();

  // Calculate total price
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + Number(item.productUnitPrice) * Number(item.productQuantity), 0);
  };

  // Create checkout session
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !City || !address) {
      toast.warn("All fields are required");
      return;
    }

    if (cart.length === 0) {
      toast.warn("Your cart is empty");
      return;
    }

    // Validate cart items have required fields
    const invalidItems = cart.filter(item =>
      !item.productId || !item.productQuantity || !item.productUnitPrice
    );

    if (invalidItems.length > 0) {
      toast.error("Some items in your cart are invalid. Please refresh and try again.");
      console.error("Invalid cart items:", invalidItems);
      return;
    }

    setloading(true);

    try {
      // Transform cart items with customization data
      const cartItems = await Promise.all(
        cart.map(async (item) => {
          let pdfData = null;

          // Convert Blob to base64 if FinalPDf exists
          if (item.FinalPDf && item.FinalPDf instanceof Blob) {
            pdfData = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
              };
              reader.onerror = reject;
              reader.readAsDataURL(item.FinalPDf);
            });
          }

          return {
            product_id: parseInt(item.productId), // ✅ Use productId, not id
            qty: parseInt(item.productQuantity),
            price: parseFloat(item.productUnitPrice),
            name: item.productName || 'Product',
            FinalProduct: item.FinalProduct || [],
            FinalPDF: pdfData ? { data: pdfData } : null,
          };
        })
      );

      const checkoutData = {
        name,
        email,
        phone,
        address,
        city: City,
        zipcode,
        gateway: 'stripe',
        items: cartItems,
        userID: id
      };

      // Call checkout endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
          },
          body: JSON.stringify(checkoutData),
        }
      );

      const result = await response.json();

      console.log("Checkout response:", result);

      if (result?.success && result?.checkout_url) {
        console.log("Redirecting to Stripe...");
        window.location.href = result.checkout_url;
      } else {
        const errorMessage = result?.message || result?.error || "Failed to create checkout session";
        toast.error(errorMessage);
        console.error("Checkout failed:", result);
      }

    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    } finally {
      setloading(false);
    }
  };

  return (
    <section className="min-h-[80vh] relative bg-gray-50 py-0 overflow-hidden">
      <ToastContainer />
      {/* Glassy blurred background for the entire section */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-30 blur-3xl -z-20"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 py-12 px-4">
        {/* Checkout Form */}
        <form
          onSubmit={handleCheckout}
          className="col-span-2 bg-white/30 backdrop-blur-lg border border-gray-200 rounded-lg shadow-lg p-10 space-y-8"
        >
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Checkout</h2>
            <p className="text-sm text-gray-700 mt-2">Fill in your billing & shipping details.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="Full Name"
              className={inputStyle}
              required
            />
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              placeholder="Email Address"
              className={inputStyle}
              required
            />
            <input
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              type="tel"
              placeholder="Phone Number"
              className={inputStyle}
              required
            />
            <input
              value={zipcode}
              onChange={(e) => setzipcode(e.target.value)}
              type="text"
              placeholder="Zip Code"
              className={inputStyle}
              required
            />
          </div>

          <input
            value={City}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="City"
            className={inputStyle}
            required
          />

          <textarea
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            placeholder="Shipping Address"
            className={inputStyle}
            rows={3}
            required
          ></textarea>

          <button
            type="submit"
            className="mt-6 bg-sky-400 text-white px-10 py-4 rounded-lg font-bold shadow-xl hover:opacity-90 transition w-full cursor-pointer flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || cart.length === 0}
          >
            {loading && <SpinLoader />}
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>

          <p className="text-xs text-gray-600 text-center mt-4">
            You will be redirected to Stripe for secure payment
          </p>
        </form>

        {/* Order Summary */}
        <div className="bg-white/30 backdrop-blur-lg border border-gray-200 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

          {cart.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Your cart is empty</p>
          ) : (
            <>
              <ul className="space-y-4 text-gray-700">
                {cart.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>
                      {item.productName}{" "}
                      <span className="text-sm text-gray-600">x{item.productQuantity}</span>
                    </span>
                    <span className="font-medium">
                      ${(Number(item.productUnitPrice) * Number(item.productQuantity)).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <hr className="my-6 border-t border-gray-300" />

              <div className="space-y-2">
                <div className="flex justify-between text-gray-800">
                  <span>Subtotal</span>
                  <span>${calculateTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-800">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-xl mt-4 text-gray-900 pt-4 border-t border-gray-300">
                  <span>Total</span>
                  <span>${calculateTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};