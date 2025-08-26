import React, { useEffect, useState } from "react";
import { Trash2, X, Plus } from "lucide-react";

interface PaymentCard {
  id: string;
  type: "visa" | "mastercard";
  last4: string;
  expiryMonth: string;
  expiryYear: string;
}

const PaymentMethods: React.FC = () => {
  const [cards, setCards] = useState<PaymentCard[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
  });

  useEffect(() => {
    if (showAddModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showAddModal]);

  const handleAddCard = () => {
    if (formData.cardNumber.length >= 4) {
      const newCard: PaymentCard = {
        id: Date.now().toString(),
        type: formData.cardNumber.startsWith("4") ? "visa" : "mastercard",
        last4: formData.cardNumber.slice(-4),
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
      };
      setCards([...cards, newCard]);
      setShowAddModal(false);
      setFormData({
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
        cardholderName: "",
      });
    }
  };

  const handleDeleteCard = (cardId: string) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // No cards state
  if (cards.length === 0 && !showAddModal) {
    return (
      <div className="p-8 bg-white min-h-[90vh] rounded-xl">
        <h2 className="text-[18px] font-semibold text-[#1E2B3A] mb-3">
          Saved Cards
        </h2>
        <div className="border border-dashed" />

        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <img src="/icons/ICON9.png" className="h-12 w-12 object-cover" />
          </div>
          <h3 className="text-xl font-medium text-[#363636] mb-2">
            No payment method added
          </h3>
          <p className="text-gray-500 text-center mb-8 max-w-sm">
            You haven't added any payment method yet. Add one to make payments
            easier.
          </p>

          <div className="space-y-4 w-full max-w-md">
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full bg-brandprimary text-white py-4 px-6 rounded-lg font-medium hover:bg-[#00A896] transition-colors"
            >
              Add Payment Method
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-8 bg-white min-h-[90vh] rounded-xl">
        <h2 className="text-[18px] font-semibold text-[#1E2B3A] mb-3">
          Saved Cards
        </h2>
        <div className="border border-dashed" />

        <div className="space-y-4 mt-10">
          {/* Existing Cards */}
          {cards.map((card) => (
            <div
              key={card.id}
              className="border border-[#00C2A8] rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div
                  className={`w-12 h-8 rounded mr-3 flex items-center justify-center ${
                    card.type === "visa" ? "bg-blue-600" : "bg-red-600"
                  }`}
                >
                  <span className="text-white text-xs font-bold">
                    {card.type === "visa" ? "VISA" : "MC"}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-[#1E2B3A]">
                    **** **** **** {card.last4}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires {card.expiryMonth}/{card.expiryYear}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteCard(card.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <button
            onClick={() => setShowAddModal(true)}
            className="w-full border-2 border-dashed border-[#00C2A8] text-[#00C2A8] py-4 rounded-lg font-medium hover:bg-[#F3FFF6] transition-colors flex items-center justify-center"
          >
            <Plus size={20} className="mr-2" />
            Add New Payment Method
          </button>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#363636]">
                  Add Card
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-black text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1"
                >
                  <X size={20} color="white" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Card number"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleInputChange("cardNumber", e.target.value)
                    }
                    className="w-full bg-white px-4 py-3 border border-[#1E2B3A] rounded-xl focus:ring-2 focus:ring-[#00C2A8] focus:border-transparent outline-none text-[#989FB0]"
                    maxLength={16}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Cardholder name"
                    value={formData.cardholderName}
                    onChange={(e) =>
                      handleInputChange("cardholderName", e.target.value)
                    }
                    className="w-full bg-white px-4 py-3 border border-[#1E2B3A] rounded-xl focus:ring-2 focus:ring-[#00C2A8] focus:border-transparent outline-none text-[#989FB0]"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    className="w-full bg-white px-4 py-3 border border-[#1E2B3A]  rounded-xl focus:ring-2 focus:ring-[#00C2A8] focus:border-transparent outline-none text-[#989FB0]"
                    maxLength={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM"
                    value={formData.expiryMonth}
                    onChange={(e) =>
                      handleInputChange("expiryMonth", e.target.value)
                    }
                    className="bg-white px-4 py-3 border border-[#1E2B3A] rounded-xl focus:ring-2 focus:ring-[#00C2A8] focus:border-transparent outline-none text-[#989FB0]"
                    maxLength={2}
                  />
                  <input
                    type="text"
                    placeholder="YY"
                    value={formData.expiryYear}
                    onChange={(e) =>
                      handleInputChange("expiryYear", e.target.value)
                    }
                    className="bg-white px-4 py-3 border border-[#1E2B3A]  rounded-xl focus:ring-2 focus:ring-[#00C2A8] focus:border-transparent outline-none text-[#989FB0]"
                    maxLength={2}
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleAddCard}
                  className="flex-1 bg-[#00C2A8] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#00A896] transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentMethods;
