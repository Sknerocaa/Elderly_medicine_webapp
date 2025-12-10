import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { INDIAN_CITIES, DOCTOR_TYPES } from "@/lib/constants";
import { Stethoscope } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import type { InsertAppointment } from "@shared/schema";

export default function DoctorBooking() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { toast } = useToast();

  const createAppointment = useMutation({
    mutationFn: async (data: InsertAppointment) => {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Appointment Confirmed ✅",
        description: "We have sent a request to the doctor.",
        duration: 5000,
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const onSubmit = (data: any) => {
    createAppointment.mutate({
      name: data.name,
      age: parseInt(data.age),
      city: data.city,
      doctorType: data.doctorType,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-200">
        <div className="bg-blue-600 p-8 text-white flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Stethoscope className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Book Doctor Appointment</h2>
            <p className="text-blue-100 text-lg mt-1">Fill in your details below</p>
          </div>
        </div>
        
        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="space-y-3">
              <label className="text-xl font-semibold text-slate-800 block">Full Name</label>
              <input 
                {...register("name", { required: "Please enter your name" })}
                className="w-full p-4 text-xl border-2 border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="Ex: Rajesh Kumar"
                data-testid="input-name"
              />
              {errors.name && <p className="text-red-600 text-lg font-medium">⚠ {String(errors.name.message)}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xl font-semibold text-slate-800 block">Age</label>
                <input 
                  type="number"
                  {...register("age", { required: "Please enter your age", min: 1 })}
                  className="w-full p-4 text-xl border-2 border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="Ex: 65"
                  data-testid="input-age"
                />
                {errors.age && <p className="text-red-600 text-lg font-medium">⚠ {String(errors.age.message)}</p>}
              </div>

              <div className="space-y-3">
                <label className="text-xl font-semibold text-slate-800 block">City</label>
                <select 
                  {...register("city", { required: "Please select a city" })}
                  className="w-full p-4 text-xl border-2 border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all bg-white"
                  data-testid="select-city"
                >
                  <option value="">Select City</option>
                  {INDIAN_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && <p className="text-red-600 text-lg font-medium">⚠ {String(errors.city.message)}</p>}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xl font-semibold text-slate-800 block">Type of Doctor</label>
              <select 
                {...register("doctorType", { required: "Please select doctor type" })}
                className="w-full p-4 text-xl border-2 border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all bg-white"
                data-testid="select-doctor-type"
              >
                <option value="">Select Specialist</option>
                {DOCTOR_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.doctorType && <p className="text-red-600 text-lg font-medium">⚠ {String(errors.doctorType.message)}</p>}
            </div>

            <button 
              type="submit"
              disabled={createAppointment.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-submit-appointment"
            >
              {createAppointment.isPending ? "Booking..." : "Book Appointment"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
