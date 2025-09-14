import React from "react";
import { Brain, Shield, Clock, Globe, Zap, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Diagnosis",
      description:
        "Advanced LLaMA model fine-tuned for medical consultations with 94% accuracy rate",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description:
        "End-to-end encryption and robust error handling ensure complete patient data protection",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Availability",
      description:
        "Round-the-clock medical assistance for emergency and routine healthcare consultations",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Reach",
      description:
        "Serving underserved communities worldwide, starting with Ethiopian rural clinics",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description:
        "Instant consultation results with real-time processing and immediate recommendations",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Scalable Solution",
      description:
        "Built to handle thousands of consultations simultaneously across multiple clinics",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>Powerful Features</span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Advanced AI Medical Assistant
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our cutting-edge technology combines artificial intelligence with
            medical expertise to deliver reliable, accessible healthcare
            solutions for underserved communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:border-orange-200 group"
            >
              <div
                className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-6 border-2 ${feature.borderColor} group-hover:scale-110 transition-transform duration-300`}
              >
                <div className={feature.color}>{feature.icon}</div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="mt-20 bg-gradient-to-r from-gray-50 to-orange-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Built with Cutting-Edge Technology
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our AI medical assistant leverages the latest in machine learning
              and healthcare technology to deliver accurate, reliable medical
              consultations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">LLaMA Model</h4>
              <p className="text-sm text-gray-600">
                Fine-tuned for medical consultations
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Flask Backend</h4>
              <p className="text-sm text-gray-600">
                Robust API and data processing
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-10 w-10 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">C# Utilities</h4>
              <p className="text-sm text-gray-600">
                Advanced error handling and validation
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-10 w-10 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">React Frontend</h4>
              <p className="text-sm text-gray-600">
                Modern, responsive user interface
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
