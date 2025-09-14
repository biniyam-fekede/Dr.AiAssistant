import React from 'react';
import { Users, Clock, Globe, TrendingUp, Award, Shield } from 'lucide-react';

const Impact = () => {
  const metrics = [
    {
      icon: <Users className="h-8 w-8" />,
      value: "5,000+",
      label: "Remote Consultations",
      description: "Successful AI-powered medical consultations delivered to underserved clinics",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: "89%",
      label: "Ratio Reduction",
      description: "Dramatic improvement in patient-to-doctor accessibility ratio",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      value: "24/7",
      label: "Availability",
      description: "Round-the-clock medical assistance for emergency and routine care",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      value: "50+",
      label: "Clinics Served",
      description: "Remote healthcare facilities now equipped with AI medical assistance",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: "94%",
      label: "Accuracy Rate",
      description: "High precision in medical diagnosis and treatment recommendations",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      value: "100%",
      label: "Data Security",
      description: "Complete patient privacy protection with robust error handling",
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <section id="impact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>Measurable Impact</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transforming Lives Through AI Healthcare
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered medical assistant is making a real difference in underserved communities, 
            delivering measurable improvements in healthcare accessibility and quality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:border-orange-200"
            >
              <div className={`w-16 h-16 ${metric.bgColor} rounded-full flex items-center justify-center mb-6`}>
                <div className={metric.color}>
                  {metric.icon}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-lg font-semibold text-gray-800">{metric.label}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Healthcare Practice?
          </h3>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Join the healthcare revolution and provide your patients with AI-powered medical assistance 
            that's available 24/7, accurate, and accessible.
          </p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-full hover:bg-orange-50 transition-all duration-200 transform hover:scale-105 text-lg font-semibold">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Impact;