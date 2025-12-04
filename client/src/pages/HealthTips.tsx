import { HEALTH_TIPS } from "@/lib/constants";
import { Heart, Droplet, Footprints, Apple, Stethoscope, Moon, Users, Sun, Pill, Eye, Smile } from "lucide-react";

const iconMap: Record<string, any> = {
  droplet: Droplet,
  footprints: Footprints,
  apple: Apple,
  stethoscope: Stethoscope,
  moon: Moon,
  users: Users,
  sun: Sun,
  pill: Pill,
  eye: Eye,
  smile: Smile,
};

export default function HealthTips() {
  return (
    <div className="space-y-8">
      <div className="bg-rose-600 text-white p-8 rounded-3xl shadow-lg flex items-center gap-6">
        <div className="bg-white/20 p-4 rounded-2xl">
          <Heart className="w-12 h-12" />
        </div>
        <div>
          <h2 className="text-4xl font-bold">Health Tips for Seniors</h2>
          <p className="text-rose-100 text-xl mt-2">Simple habits for a healthier life</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {HEALTH_TIPS.map((tip) => {
          const Icon = iconMap[tip.icon] || Heart;
          return (
            <div key={tip.id} className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition-shadow flex gap-5 items-start">
              <div className="bg-rose-50 text-rose-600 p-4 rounded-xl shrink-0">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{tip.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">{tip.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
