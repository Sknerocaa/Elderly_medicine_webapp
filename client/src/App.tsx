import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import DoctorBooking from "@/pages/DoctorBooking";
import MedicineOrdering from "@/pages/MedicineOrdering";
import HealthTips from "@/pages/HealthTips";
import AIHelper from "@/pages/AIHelper";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/doctor" component={DoctorBooking} />
        <Route path="/medicine" component={MedicineOrdering} />
        <Route path="/tips" component={HealthTips} />
        <Route path="/ai-helper" component={AIHelper} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
