export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="text-6xl mb-4">&#10004;&#65039;</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment received!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your order with E&apos;Manuel Bakery has been
          confirmed. You can close this page and return to WhatsApp.
        </p>
        <a
          href="https://wa.me/447587985865"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
        >
          Back to WhatsApp
        </a>
      </div>
    </div>
  );
}
