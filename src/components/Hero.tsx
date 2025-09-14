import React from 'react';
import { ArrowRight, Globe, Users, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-white via-orange-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                <span>Transforming Healthcare Access</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                AI-Powered Medical
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Assistant</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Bridging the healthcare gap in underserved communities with intelligent AI consultations. 
                Empowering clinics in Ethiopia and beyond with accessible, reliable medical assistance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 text-lg font-semibold">
                <span>Start Consultation</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-full hover:bg-orange-50 transition-all duration-200 text-lg font-semibold">
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">5,000+</div>
                <div className="text-sm text-gray-600">Consultations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">89%</div>
                <div className="text-sm text-gray-600">Ratio Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Availability</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 transform rotate-3 hover:rotate-1 transition-transform duration-500">
              <div className="bg-white rounded-2xl p-6 transform -rotate-3">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Remote Consultation</div>
                      <div className="text-sm text-gray-600">AI-powered medical assistance</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Patient symptoms:</div>
                      <div className="text-gray-900">Fever, headache, fatigue</div>
                    </div>
                    
                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="text-sm text-orange-700">AI Analysis:</div>
                      <div className="text-orange-900">Possible viral infection. Recommend rest, hydration, and monitoring.</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Confidence: 94%</span>
                    <Globe className="h-4 w-4 text-gray-400" />
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

export default Hero;