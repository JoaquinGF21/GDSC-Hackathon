import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

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
  
  // N/A selections for sections that need it
  familyHistoryNA: boolean;
  additionalInfoNA: boolean;
}

interface Props {
  onComplete: (data: QuizFormData) => void;
  onSkip?: () => void;
}

export default function MedHistoryQuiz({ onComplete, onSkip }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuizFormData>({
    age: '',
    gender: '',
    skinType: '',
    sunExposure: '',
    currentSkinConcerns: [],
    changingMoles: false,
    newGrowths: false,
    unexplainedPigmentation: false,
    familyHistorySkinCancer: false,
    familyHistoryMelanoma: false,
    familyMemberAffected: [],
    previousSkinCancer: false,
    immunocompromised: false,
    previousRadiationTherapy: false,
    moleChanges: {
      asymmetry: false,
      borderIrregularity: false,
      colorVariation: false,
      diameter: false,
      evolution: false,
    },
    outdoorOccupation: false,
    tanningSalonUse: false,
    sunburnHistory: false,
    medications: [],
    allergies: [],
    additionalNotes: '',
    // Only keeping N/A flags for family history and additional info
    familyHistoryNA: false,
    additionalInfoNA: false,
  });

  const steps = [
    {
      title: 'Personal Information',
      fields: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skin Type</label>
            <select
              value={formData.skinType}
              onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select skin type</option>
              <option value="type1">Type I - Always burns, never tans</option>
              <option value="type2">Type II - Usually burns, tans minimally</option>
              <option value="type3">Type III - Sometimes burns, tans uniformly</option>
              <option value="type4">Type IV - Burns minimally, tans well</option>
              <option value="type5">Type V - Rarely burns, tans profusely</option>
              <option value="type6">Type VI - Never burns, deeply pigmented</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: 'Current Skin Concerns',
      fields: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Current Skin Concerns</label>
            <div className="space-y-4">
              {['Changing moles', 'New growths', 'Unexplained pigmentation'].map((concern) => (
                <label key={concern} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.currentSkinConcerns.includes(concern)}
                    onChange={(e) => {
                      const concerns = e.target.checked
                        ? [...formData.currentSkinConcerns, concern]
                        : formData.currentSkinConcerns.filter((c) => c !== concern);
                      setFormData({ ...formData, currentSkinConcerns: concerns });
                    }}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">{concern}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Family History',
      fields: (
        <div className="space-y-6">
          <label className="flex items-center mb-5 p-3 bg-gray-50 rounded">
            <input
              type="checkbox"
              checked={formData.familyHistoryNA}
              onChange={(e) => {
                setFormData({ 
                  ...formData, 
                  familyHistoryNA: e.target.checked,
                  // Clear fields if N/A is selected
                  ...(e.target.checked ? {
                    familyHistorySkinCancer: false,
                    familyHistoryMelanoma: false,
                    familyMemberAffected: [],
                  } : {})
                });
              }}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2"
            />
            <span className="text-gray-700 font-medium">Not applicable / Unknown family history</span>
          </label>
          
          <div className={formData.familyHistoryNA ? "opacity-50 pointer-events-none" : ""}>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-3">Family History</label>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.familyHistorySkinCancer}
                    onChange={(e) => setFormData({ ...formData, familyHistorySkinCancer: e.target.checked })}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    disabled={formData.familyHistoryNA}
                  />
                  <span className="ml-2">Family history of skin cancer</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.familyHistoryMelanoma}
                    onChange={(e) => setFormData({ ...formData, familyHistoryMelanoma: e.target.checked })}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    disabled={formData.familyHistoryNA}
                  />
                  <span className="ml-2">Family history of melanoma</span>
                </label>
              </div>
            </div>

            {(formData.familyHistorySkinCancer || formData.familyHistoryMelanoma) && !formData.familyHistoryNA && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Affected Family Members</label>
                <div className="space-y-4">
                  {['Parent', 'Sibling', 'Grandparent', 'Other'].map((member) => (
                    <label key={member} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.familyMemberAffected.includes(member)}
                        onChange={(e) => {
                          const members = e.target.checked
                            ? [...formData.familyMemberAffected, member]
                            : formData.familyMemberAffected.filter((m) => m !== member);
                          setFormData({ ...formData, familyMemberAffected: members });
                        }}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        disabled={formData.familyHistoryNA}
                      />
                      <span className="ml-2">{member}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'ABCDE Assessment',
      fields: (
        <div className="space-y-6">
          <p className="text-sm text-gray-600 mb-4">
            Please indicate if you've noticed any of these changes in your moles:
          </p>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.moleChanges.asymmetry}
                onChange={(e) => setFormData({
                  ...formData,
                  moleChanges: { ...formData.moleChanges, asymmetry: e.target.checked }
                })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Asymmetry - One half unlike the other half</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.moleChanges.borderIrregularity}
                onChange={(e) => setFormData({
                  ...formData,
                  moleChanges: { ...formData.moleChanges, borderIrregularity: e.target.checked }
                })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Border - Irregular, scalloped, or poorly defined</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.moleChanges.colorVariation}
                onChange={(e) => setFormData({
                  ...formData,
                  moleChanges: { ...formData.moleChanges, colorVariation: e.target.checked }
                })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Color - Varying shades of brown, tan, or black</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.moleChanges.diameter}
                onChange={(e) => setFormData({
                  ...formData,
                  moleChanges: { ...formData.moleChanges, diameter: e.target.checked }
                })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Diameter - Larger than 6mm (about 1/4 inch)</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.moleChanges.evolution}
                onChange={(e) => setFormData({
                  ...formData,
                  moleChanges: { ...formData.moleChanges, evolution: e.target.checked }
                })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Evolution - Changing in size, shape, or color</span>
            </label>
          </div>
        </div>
      ),
    },
    {
      title: 'Risk Factors',
      fields: (
        <div className="space-y-6">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-3">Sun Exposure & Risk Factors</label>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.outdoorOccupation}
                  onChange={(e) => setFormData({ ...formData, outdoorOccupation: e.target.checked })}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2">Outdoor occupation or frequent outdoor activities</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.tanningSalonUse}
                  onChange={(e) => setFormData({ ...formData, tanningSalonUse: e.target.checked })}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2">History of tanning salon use</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.sunburnHistory}
                  onChange={(e) => setFormData({ ...formData, sunburnHistory: e.target.checked })}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2">History of severe sunburns</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Average Daily Sun Exposure</label>
            <select
              value={formData.sunExposure}
              onChange={(e) => setFormData({ ...formData, sunExposure: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select exposure level</option>
              <option value="minimal">Minimal (less than 1 hour)</option>
              <option value="moderate">Moderate (1-3 hours)</option>
              <option value="high">High (3-6 hours)</option>
              <option value="extreme">Extreme (more than 6 hours)</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: 'Additional Information',
      fields: (
        <div className="space-y-6">
          <label className="flex items-center mb-5 p-3 bg-gray-50 rounded">
            <input
              type="checkbox"
              checked={formData.additionalInfoNA}
              onChange={(e) => {
                setFormData({ 
                  ...formData, 
                  additionalInfoNA: e.target.checked,
                  // Clear fields if N/A is selected
                  ...(e.target.checked ? {
                    medications: [],
                    allergies: [],
                    additionalNotes: '',
                  } : {})
                });
              }}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2"
            />
            <span className="text-gray-700 font-medium">Not applicable / No additional information to provide</span>
          </label>
          
          <div className={formData.additionalInfoNA ? "opacity-50 pointer-events-none" : ""}>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
              <input
                type="text"
                placeholder="Enter medications (comma-separated)"
                value={formData.medications.join(', ')}
                onChange={(e) => setFormData({ ...formData, medications: e.target.value.split(',').map(item => item.trim()) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={formData.additionalInfoNA}
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
              <input
                type="text"
                placeholder="Enter allergies (comma-separated)"
                value={formData.allergies.join(', ')}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value.split(',').map(item => item.trim()) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={formData.additionalInfoNA}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Any other relevant information..."
                disabled={formData.additionalInfoNA}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep].title}</h2>
        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {steps[currentStep].fields}

        <div className="flex justify-between mt-10">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </button>

          <div className="flex space-x-4">
            {currentStep === 0 && onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Skip for now
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}