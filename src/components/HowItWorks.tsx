import React from 'react';
import { FileText, Brain, CheckCircle, Send } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Patient Input",
      description: "Healthcare provider inputs patient symptoms, medical history, and current condition through our secure form interface.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Analysis",
      description: "Our fine-tuned LLaMA model processes the information using advanced medical knowledge and pattern recognition.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Validation & Processing",
      description: "C# utilities validate data integrity and run comprehensive error handling to ensure accuracy and reliability.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: <Send className="h-8 w-8" />,
      title: "Medical Recommendations",
      description: "The system delivers detailed consultation results with diagnosis suggestions, treatment recommendations, and follow-up guidance.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How Dr. AI Assistant Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process ensures fast, accurate, and reliable medical consultations 
            through advanced AI technology and robust data processing.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-16">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center w-64">
                    <div className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mb-4 border-2 ${step.borderColor}`}>
                      <div className={step.color}>
                        {step.icon}
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="flex-1 px-4">
                      <div className="h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded animate-pulse"></div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center border-2 ${step.borderColor} flex-shrink-0`}>
                  <div className={step.color}>
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Flow Visualization */}
        <div className="mt-16 bg-gray-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Real-Time Processing Flow
            </h3>
            <p className="text-gray-600">
              Experience the power of AI-driven medical consultations in action
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 text-lg">Input Processing</h4>
                <div className="space-y-2">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-sm text-blue-700 font-medium">Patient Symptoms</div>
                    <div className="text-blue-900">Fever (38.5°C), headache, fatigue</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-sm text-blue-700 font-medium">Medical History</div>
                    <div className="text-blue-900">No chronic conditions, recent travel</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 text-lg">AI Recommendations</h4>
                <div className="space-y-2">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="text-sm text-orange-700 font-medium">Preliminary Diagnosis</div>
                    <div className="text-orange-900">Possible viral infection (94% confidence)</div>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="text-sm text-orange-700 font-medium">Treatment Plan</div>
                    <div className="text-orange-900">Rest, hydration, symptom monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;