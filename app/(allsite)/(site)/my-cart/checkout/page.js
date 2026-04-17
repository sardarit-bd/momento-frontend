"use client";

import SpinLoader from "@/app/componnent/SpingLoader";
import useCartStore from "@/store/useCartStore";
import getId from "@/utilis/helper/cookie/getid";
import getCookie from "@/utilis/helper/cookie/gettooken";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inputStyle =
  "w-full bg-[#F3F4F6] text-gray-900 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all text-sm border border-transparent";

export default function CheckoutPage() {
  const id = getId();
  const token = getCookie();
  const router = useRouter();
  
  const [loading, setloading] = useState(false);
  
  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [City, setCity] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [address, setaddress] = useState("");
  
  // Dummy state for visual payment fields (since actual payment is via Stripe redirect)
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  // Deck Customization State
  const [deckFinish, setDeckFinish] = useState("prism");

  const { cart } = useCartStore();

  const getSavedCustomization = (item) => {
    if (!item?.customizationStorageKey) return null;
    try {
      const saved = localStorage.getItem(item.customizationStorageKey);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  const getItemPreviewImages = (item) => {
    const snapshot = getSavedCustomization(item);
    if (snapshot?.previews) {
      const localPreviews = [snapshot?.previews?.front, snapshot?.previews?.back].filter(Boolean);
      if (localPreviews.length > 0) return localPreviews;
    }

    if (Array.isArray(item?.FinalProductImages) && item.FinalProductImages.length > 0) {
      return item.FinalProductImages.filter(Boolean);
    }

    if (Array.isArray(item?.FinalProduct) && item.FinalProduct.length > 0) {
      return item.FinalProduct
        .map((card) => {
          if (typeof card === "string") return card;
          if (card && typeof card === "object") return card.baseImage || null;
          return null;
        })
        .filter(Boolean);
    }

    return item?.productImage ? [item.productImage] : [];
  };

  // Calculations
  const calculateSubTotal = () => {
    return cart.reduce((total, item) => total + Number(item.productUnitPrice) * Number(item.productQuantity), 0);
  };
  
  const subtotal = calculateSubTotal();
  const tax = subtotal * 0.08; // Estimated 8% tax to match UI structure
  const total = subtotal + tax;

  const handleEditCustomization = () => {
    const editableItem = cart.find(
      (item) =>
        item?.productSlug &&
        (item?.productType === "trading" || item?.productType === "customizable")
    );

    if (!editableItem?.productSlug) {
      toast.warn("No customizable item found to edit.");
      return;
    }

    if (editableItem?.productType === "trading") {
      router.push(`/application/tradingcard/${editableItem.productSlug}`);
      return;
    }

    router.push(`/application/deckcard/${editableItem.productSlug}`);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const fullName = `${firstName} ${lastName}`.trim();

    if (!fullName || !email || !phone || !City || !address || !zipcode) {
      toast.warn("All shipping and contact fields are required");
      return;
    }

    if (cart.length === 0) {
      toast.warn("Your cart is empty");
      return;
    }

    const invalidItems = cart.filter(item =>
      !item.productId || !item.productQuantity || !item.productUnitPrice
    );

    if (invalidItems.length > 0) {
      toast.error("Some items in your cart are invalid. Please refresh and try again.");
      return;
    }

    setloading(true);

    try {
      const cartItems = await Promise.all(
        cart.map(async (item) => {
          let pdfData = null;
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
            product_id: parseInt(item.productId),
            qty: parseInt(item.productQuantity),
            price: parseFloat(item.productUnitPrice),
            name: item.productName || 'Product',
            FinalProduct: item.FinalProduct || [],
            FinalPDF: pdfData ? { data: pdfData } : null,
          };
        })
      );

      const checkoutData = {
        name: fullName,
        email,
        phone,
        address,
        city: City,
        zipcode,
        gateway: 'stripe',
        items: cartItems,
        userID: id
      };

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

      if (result?.success && result?.checkout_url) {
        window.location.href = result.checkout_url;
      } else {
        const errorMessage = result?.message || result?.error || "Failed to create checkout session";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Failed to initiate checkout. Please try again.");
    } finally {
      setloading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <ToastContainer />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* LEFT COLUMN - Order Summary & Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Your Deck */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Deck</h2>
              <button onClick={handleEditCustomization} className="text-sky-600 text-sm font-medium flex items-center gap-1.5 hover:underline cursor-pointer">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700">
                  <FiEdit3 className="text-[12px]" />
                </span>
                Edit
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              Premium Packaging
            </div>

            {/* Display Cart Items visually */}
            <div className="mb-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-gray-500 text-sm py-4">Your cart is empty</div>
              ) : (
                cart.map((item, idx) => {
                  const previewImages = getItemPreviewImages(item);
                  return (
                  <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:items-center">
                    <div className="flex gap-2">
                      {[previewImages[0], previewImages[1]].filter(Boolean).map((img, imageIndex) => (
                        <div key={imageIndex} className="w-[88px] h-[123px] sm:w-24 sm:h-32 md:w-28 md:h-40 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative">
                          <img
                            src={img}
                            alt={`${item?.productName || "Product"} preview ${imageIndex + 1}`}
                            className="w-full h-full object-cover bg-white"
                          />
                        </div>
                      ))}
                      {previewImages.length === 0 && (
                        <div className="w-[88px] h-[123px] sm:w-24 sm:h-32 md:w-28 md:h-40 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative flex items-center justify-center text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-medium">{item.productName}</p>
                       <p className="text-xs text-gray-500">Qty: {item.productQuantity}</p>
                       {previewImages.length > 1 && (
                        <p className="text-xs text-gray-500 mt-0.5">{previewImages.length} customized cards</p>
                       )}
                    </div>
                  </div>
                )})
              )}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items ({cart.length})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Card 2: What's Included */}
          <div className="bg-sky-50 rounded-2xl p-4 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-sky-100">
            <h3 className="text-sky-600 font-semibold mb-4">What's Included:</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {[
                "High-resolution digital files",
                "Print-ready formats (PDF, PNG)",
                "1 custom portrait cards",
                "Instant download after purchase",
                "Lifetime access to your designs"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <svg className="text-sky-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Finalize Your Deck */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
            <h2 className="text-lg font-bold mb-1">Finalize Your Deck</h2>
            <p className="text-sm text-gray-500 mb-5">Make any final adjustments before checkout</p>
            
            <div className="space-y-3">
              {/* Option 1 */}
              <div 
                onClick={() => setDeckFinish('prism')}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${deckFinish === 'prism' ? 'border-sky-500 bg-sky-50/40' : 'border-gray-200 hover:border-sky-300'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-[#2D3748]">
                     <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Prism Foil</p>
                    <p className="text-xs text-gray-500">Reflective foil finish for a premium collectible look</p>
                  </div>
                </div>
                <span className="text-sky-600 text-sm font-medium">+$0.00</span>
              </div>

              {/* Option 2 */}
              <div 
                onClick={() => setDeckFinish('premium')}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${deckFinish === 'premium' ? 'border-sky-500 bg-sky-50/40' : 'border-gray-200 hover:border-sky-300'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-[#4A5568]">
                    <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Premium Finish</p>
                    <p className="text-xs text-gray-500">Enhanced quality and feel</p>
                  </div>
                </div>
                <span className="text-sky-600 text-sm font-medium">+$0.00</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - Payment Details Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-5 sm:p-6 md:p-8 lg:sticky lg:top-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="text-sky-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              Payment Details
            </h2>

            <form onSubmit={handleCheckout} className="space-y-6">
              
              {/* Email Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="your@email.com"
                  className={inputStyle}
                  required
                />
                {/* <p className="text-xs text-gray-500 mt-1.5">We'll send your download link here</p> */}
              </div>

              {/* Shipping Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 mt-4">Shipping Information</label>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className={inputStyle} required />
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className={inputStyle} required />
                  </div>
                  
                  {/* Phone included to pass your validation silently */}
                  <input type="tel" value={phone} onChange={(e) => setphone(e.target.value)} placeholder="Phone Number" className={inputStyle} required />

                  <input type="text" value={address} onChange={(e) => setaddress(e.target.value)} placeholder="Street Address" className={inputStyle} required />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" value={City} onChange={(e) => setCity(e.target.value)} placeholder="City" className={inputStyle} required />
                    <input type="text" value={zipcode} onChange={(e) => setzipcode(e.target.value)} placeholder="Zip Code" className={inputStyle} required />
                  </div>
                </div>
              </div>

              {/* Payment Information (Visual representation for Stripe redirect design) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 mt-4">Payment Information</label>
                <div className="space-y-3">
                  <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Name on Card" className={inputStyle} />
                  <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="1234 5678 9012 3456" className={inputStyle} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" value={cardExp} onChange={(e) => setCardExp(e.target.value)} placeholder="MM/YY" className={inputStyle} />
                    <input type="text" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} placeholder="CVV" className={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Secure Checkout Alert */}
              <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 flex gap-3 items-start mt-4">
                 <svg className="text-[#16A34A] mt-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                 <div>
                    <p className="text-sm font-semibold text-[#166534]">Secure Checkout</p>
                    <p className="text-xs text-[#15803D] mt-0.5">Your payment information is encrypted and secure</p>
                 </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading && <SpinLoader />}
                {loading ? "Processing..." : `Complete Purchase - $${total.toFixed(2)}`}
              </button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 pt-2">
                 <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    SSL Encrypted
                 </span>
                 <span>•</span>
                 <span>Secure Payment</span>
                 <span>•</span>
                 <span>Money Back Guarantee</span>
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
