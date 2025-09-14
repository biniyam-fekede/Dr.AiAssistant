import React from 'react';
import { Heart, MapPin, Target, Zap } from 'lucide-react';

const Story = () => {
  const steps = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "The Challenge",
      description: "Remote Ethiopian clinics faced severe doctor shortages, with thousands of patients unable to access proper medical consultation.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "The Vision",
      description: "We envisioned AI-powered medical assistance that could bridge the gap between patients and healthcare expertise.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "The Solution",
      description: "Built a fine-tuned LLaMA model with Flask backend, enabling intelligent medical consultations at scale.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "The Impact",
      description: "Delivered 5,000+ consultations and reduced patient-to-doctor ratio by 89%, transforming healthcare access.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Story: Transforming Healthcare Access
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From identifying critical healthcare gaps to deploying AI solutions that save lives, 
            here's how Dr. AI Assistant is making a difference in underserved communities.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-200 via-blue-200 via-purple-200 to-orange-200"></div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className={`p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mb-4`}>
                      <div className={step.color}>
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                <div className="w-6 h-6 bg-white border-4 border-gray-300 rounded-full relative z-10"></div>

                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;