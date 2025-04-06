import React, { useState, useEffect } from 'react';
import { UserCircle, Edit, AlertCircle, FileText, ShieldCheck, Clock } from 'lucide-react';
import MedHistoryQuiz from './MedHistoryQuiz'; // Import the quiz component

// Import the same interface used in the quiz for consistency
interface QuizFormData {
  // Personal Information
  age: string;
  gender: string;
  skinType: string;
  sunExposure: string;
  
  // Current State
  currentSkinConcerns: string[];
  changingMoles: boolean;
  newGrowths: boolean;
  unexplainedPigmentation: boolean;
  
  // Family History
  familyHistorySkinCancer: boolean;
  familyHistoryMelanoma: boolean;
  familyMemberAffected: string[];
  
  // Medical History
  previousSkinCancer: boolean;
  immunocompromised: boolean;
  previousRadiationTherapy: boolean;
  
  // Symptoms
  moleChanges: {
    asymmetry: boolean;
    borderIrregularity: boolean;
    colorVariation: boolean;
    diameter: boolean;
    evolution: boolean;
  };
  
  // Risk Factors
  outdoorOccupation: boolean;
  tanningSalonUse: boolean;
  sunburnHistory: boolean;
  
  // Additional Information
  medications: string[];
  allergies: string[];
  additionalNotes: string;
  
  // N/A selections for each section
  personalInfoNA: boolean;
  currentSkinConcernsNA: boolean;
  familyHistoryNA: boolean;
  abcdeAssessmentNA: boolean;
  riskFactorsNA: boolean;
  additionalInfoNA: boolean;
}

const Profile: React.FC = () => {
  const [medicalData, setMedicalData] = useState<QuizFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false); // New state to control quiz visibility

  useEffect(() => {
    // Get medical history data from localStorage
    try {
      const savedData = localStorage.getItem('medHistoryQuizData');
      if (savedData) {
        setMedicalData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error retrieving medical history data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handler for quiz completion
  const handleQuizComplete = (data: QuizFormData) => {
    // Save to localStorage
    localStorage.setItem('medHistoryQuizData', JSON.stringify(data));
    // Update state
    setMedicalData(data);
    // Hide quiz
    setShowQuiz(false);
  };

  // Helper function to render skin type in human-readable format
  const getSkinTypeName = (type: string) => {
    const skinTypes = {
      'type1': 'Type I - Always burns, never tans',
      'type2': 'Type II - Usually burns, tans minimally',
      'type3': 'Type III - Sometimes burns, tans uniformly',
      'type4': 'Type IV - Burns minimally, tans well',
      'type5': 'Type V - Rarely burns, tans profusely',
      'type6': 'Type VI - Never burns, deeply pigmented',
    };
    return skinTypes[type as keyof typeof skinTypes] || type;
  };

  // Helper function to render exposure level in human-readable format
  const getSunExposureName = (level: string) => {
    const exposureLevels = {
      'minimal': 'Minimal (less than 1 hour)',
      'moderate': 'Moderate (1-3 hours)',
      'high': 'High (3-6 hours)',
      'extreme': 'Extreme (more than 6 hours)',
    };
    return exposureLevels[level as keyof typeof exposureLevels] || level;
  };

  // Formatting the risk assessment based on medical history
  const getRiskAssessment = () => {
    if (!medicalData) return 'Unknown';
    
    let riskFactors = 0;
    
    // Family history
    if (medicalData.familyHistorySkinCancer) riskFactors += 2;
    if (medicalData.familyHistoryMelanoma) riskFactors += 3;
    
    // Personal history
    if (medicalData.previousSkinCancer) riskFactors += 4;
    if (medicalData.immunocompromised) riskFactors += 2;
    if (medicalData.previousRadiationTherapy) riskFactors += 2;
    
    // Sun exposure
    if (medicalData.sunExposure === 'high') riskFactors += 2;
    if (medicalData.sunExposure === 'extreme') riskFactors += 3;
    if (medicalData.sunburnHistory) riskFactors += 2;
    if (medicalData.outdoorOccupation) riskFactors += 1;
    if (medicalData.tanningSalonUse) riskFactors += 2;
    
    // Skin type (fair skin is higher risk)
    if (medicalData.skinType === 'type1') riskFactors += 3;
    if (medicalData.skinType === 'type2') riskFactors += 2;
    
    // ABCDE factors
    let abcdeFactors = 0;
    if (medicalData.moleChanges.asymmetry) abcdeFactors++;
    if (medicalData.moleChanges.borderIrregularity) abcdeFactors++;
    if (medicalData.moleChanges.colorVariation) abcdeFactors++;
    if (medicalData.moleChanges.diameter) abcdeFactors++;
    if (medicalData.moleChanges.evolution) abcdeFactors++;
    
    // Add ABCDE risk
    riskFactors += abcdeFactors * 2;
    
    // Determine risk level
    if (riskFactors >= 15) return 'High';
    if (riskFactors >= 8) return 'Moderate';
    if (riskFactors >= 4) return 'Low to Moderate';
    return 'Low';
  };

  // Determine risk level color
  const getRiskColor = () => {
    const risk = getRiskAssessment();
    if (risk === 'High') return 'text-red-600';
    if (risk === 'Moderate') return 'text-orange-500';
    if (risk === 'Low to Moderate') return 'text-yellow-500';
    if (risk === 'Low') return 'text-green-500';
    return 'text-gray-500';
  };

  // If quiz is active, show the quiz instead of profile
  if (showQuiz) {
    return <MedHistoryQuiz onComplete={handleQuizComplete} />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!medicalData) {
    return (
      <div className="flex flex-col items-center text-center p-6">
        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">No Medical History Found</h2>
        <p className="text-gray-600 mb-6">
          You haven't completed the medical history questionnaire yet, or your data wasn't saved.
        </p>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setShowQuiz(true)} // Show the quiz when button clicked
        >
          Take Questionnaire
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Profile Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-center sm:items-start sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="bg-indigo-100 p-3 rounded-full mr-4">
            <UserCircle className="h-10 w-10 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Medical Profile</h2>
            <p className="text-gray-500 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <button
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setShowQuiz(true)} // Show the quiz when "Update Information" is clicked
        >
          <Edit className="h-4 w-4 mr-2" />
          Update Information
        </button>
      </div>
      
      {/* Risk Assessment */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <ShieldCheck className="h-5 w-5 mr-2 text-indigo-600" />
            Risk Assessment
          </h3>
          <span className={`font-medium ${getRiskColor()}`}>
            {getRiskAssessment()}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          This risk assessment is based on your medical history and known risk factors for skin cancer. 
          Regular skin checks are recommended regardless of risk level.
        </p>
      </div>
      
      {/* Medical History Sections */}
      <div className="space-y-6">
        {/* Personal Information */}
        {!medicalData.personalInfoNA && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-md font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {medicalData.age && (
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{medicalData.age}</p>
                </div>
              )}
              
              {medicalData.gender && (
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium capitalize">{medicalData.gender}</p>
                </div>
              )}
              
              {medicalData.skinType && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Skin Type</p>
                  <p className="font-medium">{getSkinTypeName(medicalData.skinType)}</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Skin Concerns */}
        {!medicalData.currentSkinConcernsNA && medicalData.currentSkinConcerns.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-md font-medium text-gray-900 mb-4">Current Skin Concerns</h3>
            <ul className="list-disc pl-5 space-y-1">
              {medicalData.currentSkinConcerns.map((concern, index) => (
                <li key={index} className="text-gray-700">{concern}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Family History */}
        {!medicalData.familyHistoryNA && (medicalData.familyHistorySkinCancer || medicalData.familyHistoryMelanoma) && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-md font-medium text-gray-900 mb-4">Family History</h3>
            <div className="space-y-3">
              {medicalData.familyHistorySkinCancer && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-indigo-500">✓</div>
                  <div className="ml-2">
                    <p className="text-gray-700">Family history of skin cancer</p>
                  </div>
                </div>
              )}
              
              {medicalData.familyHistoryMelanoma && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-indigo-500">✓</div>
                  <div className="ml-2">
                    <p className="text-gray-700">Family history of melanoma</p>
                  </div>
                </div>
              )}
              
              {medicalData.familyMemberAffected.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Affected Family Members:</p>
                  <p className="font-medium">{medicalData.familyMemberAffected.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* ABCDE Assessment */}
        {!medicalData.abcdeAssessmentNA && 
         (medicalData.moleChanges.asymmetry || 
          medicalData.moleChanges.borderIrregularity || 
          medicalData.moleChanges.colorVariation || 
          medicalData.moleChanges.diameter || 
          medicalData.moleChanges.evolution) && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-md font-medium text-gray-900 mb-4">ABCDE Mole Assessment</h3>
            <div className="space-y-2">
              {medicalData.moleChanges.asymmetry && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-red-500">⚠</div>
                  <div className="ml-2">
                    <p className="text-gray-700">Asymmetry - One half unlike the other half</p>
                  </div>
                </div>
              )}
              
              {medicalData.moleChanges.borderIrregularity && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-red-500">⚠</div>
                  <div className="ml-2">
                    <p className="text-gray-700">Border - Irregular, scalloped, or poorly defined</p>
                  </div>
                </div>
              )}
              
              {medicalData.moleChanges.colorVariation && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-red-500">⚠</div>
                  <div className="ml-2">
                    <p className="text-gray-700">Color - Varying shades of brown, tan, or black</p>
                  </div>
                </div>
              )}
              
              {medicalData.moleChanges.diameter && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-red-500">⚠</div>
                  <div className="ml-2">
                    <p className="text-gray-700">Diameter - Larger than 6mm (about 1/4 inch)</p>
                  </div>
                </div>
              )}
              
              {medicalData.moleChanges.evolution && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-red-500">⚠</div>
                  <div className="ml-2">
                    <p className="text-gray-700">Evolution - Changing in size, shape, or color</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Warning if multiple ABCDE factors */}
            {(Object.values(medicalData.moleChanges).filter(Boolean).length >= 2) && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
                <p className="font-medium">Important Note:</p>
                <p>Having multiple ABCDE factors may indicate a higher risk. Consider consulting a dermatologist for a professional assessment.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Risk Factors */}
        {!medicalData.riskFactorsNA && 
         (medicalData.outdoorOccupation || 
          medicalData.tanningSalonUse || 
          medicalData.sunburnHistory || 
          medicalData.sunExposure) && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-md font-medium text-gray-900 mb-4">Sun Exposure & Risk Factors</h3>
            <div className="space-y-3">
              {medicalData.outdoorOccupation && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-amber-500">•</div>
                  <div className="ml-2">
                    <p className="text-gray-700">Outdoor occupation or frequent outdoor activities</p>
                  </div>
                </div>
              )}
              
              {medicalData.tanningSalonUse && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-amber-500">•</div>
                  <div className="ml-2">
                    <p className="text-gray-700">History of tanning salon use</p>
                  </div>
                </div>
              )}
              
              {medicalData.sunburnHistory && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-amber-500">•</div>
                  <div className="ml-2">
                    <p className="text-gray-700">History of severe sunburns</p>
                  </div>
                </div>
              )}
              
              {medicalData.sunExposure && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Average Daily Sun Exposure:</p>
                  <p className="font-medium">{getSunExposureName(medicalData.sunExposure)}</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Additional Information */}
        {!medicalData.additionalInfoNA && 
         (medicalData.medications.length > 0 || 
          medicalData.allergies.length > 0 || 
          medicalData.additionalNotes) && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-md font-medium text-gray-900 mb-4">Additional Information</h3>
            
            {medicalData.medications.length > 0 && medicalData.medications[0] !== '' && (
              <div className="mb-4">
                <p className="text-sm text-gray-500">Current Medications:</p>
                <p className="font-medium">{medicalData.medications.join(', ')}</p>
              </div>
            )}
            
            {medicalData.allergies.length > 0 && medicalData.allergies[0] !== '' && (
              <div className="mb-4">
                <p className="text-sm text-gray-500">Allergies:</p>
                <p className="font-medium">{medicalData.allergies.join(', ')}</p>
              </div>
            )}
            
            {medicalData.additionalNotes && (
              <div>
                <p className="text-sm text-gray-500">Notes:</p>
                <p className="text-gray-700">{medicalData.additionalNotes}</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Disclaimer */}
      <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-gray-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-800">Disclaimer</h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>
                This medical profile is based on self-reported information and should not be considered a medical diagnosis. 
                Always consult with a healthcare professional for medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;