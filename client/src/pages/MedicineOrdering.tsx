import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Pill } from "lucide-react";

export default function MedicineOrdering() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { toast } = useToast();

  const onSubmit = (data: any) => {
    setTimeout(() => {
      alert(`Your medicine order has been placed!\n\nDetails:\nMedicine: ${data.medicine}\nQuantity: ${data.quantity}`);
      toast({
        title: "Order Placed Successfully",
        description: "Your medicines will be delivered shortly.",
        duration: 5000,
      });
      reset();
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-200">
        <div className="bg-emerald-600 p-8 text-white flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Pill className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Order Medicines</h2>
            <p className="text-emerald-100 text-lg mt-1">Home delivery for your needs</p>
          </div>
        </div>
        
        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="space-y-3">
              <label className="text-xl font-semibold text-slate-800 block">Medicine Name</label>
              <input 
                {...register("medicine", { required: "Please enter medicine name" })}
                className="w-full p-4 text-xl border-2 border-slate-300 rounded-xl focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all"
                placeholder="Ex: Paracetamol, Sugar Tablet"
              />
              {errors.medicine && <p className="text-red-600 text-lg font-medium">⚠ {String(errors.medicine.message)}</p>}
            </div>

            <div className="space-y-3">
              <label className="text-xl font-semibold text-slate-800 block">Quantity (Number of strips/bottles)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="number"
                  {...register("quantity", { required: "Please enter quantity", min: 1 })}
                  className="w-32 p-4 text-xl border-2 border-slate-300 rounded-xl focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all text-center"
                  placeholder="1"
                  defaultValue="1"
                />
                <span className="text-lg text-slate-500">Packets / Strips</span>
              </div>
              {errors.quantity && <p className="text-red-600 text-lg font-medium">⚠ {String(errors.quantity.message)}</p>}
            </div>

            <div className="space-y-3">
              <label className="text-xl font-semibold text-slate-800 block">Delivery Address</label>
              <textarea 
                {...register("address", { required: "Please enter address" })}
                className="w-full p-4 text-xl border-2 border-slate-300 rounded-xl focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all min-h-[120px]"
                placeholder="Enter your full home address here..."
              />
              {errors.address && <p className="text-red-600 text-lg font-medium">⚠ {String(errors.address.message)}</p>}
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-2xl font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 mt-4"
            >
              Place Order
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
