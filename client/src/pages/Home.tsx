import { Link } from "wouter";
import { Stethoscope, Pill, Heart, MessageCircle, ArrowRight } from "lucide-react";
import seniorImage from "@assets/generated_images/warm,_welcoming_image_of_a_senior_indian_couple_for_healthcare_website..png";

export default function Home() {
  const buttons = [
    { 
      href: "/doctor", 
      label: "Book Doctor Appointment", 
      icon: Stethoscope, 
      color: "bg-blue-600 hover:bg-blue-700",
      desc: "Find a specialist near you"
    },
    { 
      href: "/medicine", 
      label: "Order Medicines", 
      icon: Pill, 
      color: "bg-emerald-600 hover:bg-emerald-700",
      desc: "Home delivery available"
    },
    { 
      href: "/tips", 
      label: "View Health Tips", 
      icon: Heart, 
      color: "bg-rose-600 hover:bg-rose-700",
      desc: "Daily wellness advice"
    },
    { 
      href: "/ai-helper", 
      label: "Talk to AI Helper", 
      icon: MessageCircle, 
      color: "bg-violet-600 hover:bg-violet-700",
      desc: "Instant assistance & chat"
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl bg-white border border-slate-200">
        <div className="md:flex">
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Healthcare Made Simple for You
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Welcome to Senior Healthcare Helpdesk India. We are here to help you manage your health with ease and comfort.
            </p>
            <Link href="/ai-helper">
              <button className="bg-primary text-white px-8 py-4 rounded-xl text-xl font-semibold shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 self-start flex items-center gap-2">
                Need Help? Ask AI
                <ArrowRight className="w-6 h-6" />
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 h-64 md:h-auto relative bg-slate-100">
             <img 
               src={seniorImage} 
               alt="Senior Indian couple smiling" 
               className="w-full h-full object-cover"
             />
          </div>
        </div>
      </section>

      {/* Action Buttons Grid */}
      <section>
        <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">What would you like to do today?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {buttons.map((btn) => {
            const Icon = btn.icon;
            return (
              <Link key={btn.href} href={btn.href}>
                <div className={`group cursor-pointer rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-slate-300 transition-all duration-300 flex items-center gap-6 bg-white hover:bg-slate-50`}>
                  <div className={`${btn.color} text-white p-6 rounded-2xl shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                      {btn.label}
                    </h4>
                    <p className="text-lg text-slate-500">
                      {btn.desc}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
