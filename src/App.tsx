import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Home from "./pages/Home";
import CoursesOverview from "./pages/CoursesOverview";
import CourseVideo from "./pages/CourseVideo";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Enroll from "./pages/Enroll";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollToTopButton />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesOverview />} />
          <Route path="/course/:level" element={<CourseVideo />} />
          <Route path="/about" element={<About />} />
          <Route path="/student-results" element={<Testimonials />} />
          <Route path="/testimonials" element={<Testimonials />} /> {/* Redirect old URL */}
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
