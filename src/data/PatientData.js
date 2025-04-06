// Sample data for patient management table
const patientData = [
  {
    id: "PT-2025-001",
    firstName: "Emma",
    lastName: "Johnson",
    dob: "1978-06-15",
    gender: "female",
    contactNumber: "(555) 123-4567",
    email: "emma.johnson@email.com",
    skinType: "type2", // Type II - Usually burns, tans minimally
    riskLevel: "Moderate",
    profileComplete: true,
    lastVisit: "2025-03-20",
    nextAppointment: "2025-04-25",
    notes: "Patient has family history of melanoma. Regular 6-month check recommended.",
    medicalHistory: {
      familyHistorySkinCancer: true,
      familyHistoryMelanoma: true,
      familyMemberAffected: ["Mother", "Maternal Aunt"],
      previousSkinCancer: false,
      immunocompromised: false,
      previousRadiationTherapy: false,
      outdoorOccupation: false,
      tanningSalonUse: false,
      sunburnHistory: true,
      sunExposure: "moderate", // Moderate (1-3 hours)
      medications: ["Lisinopril", "Simvastatin"],
      allergies: ["Penicillin"]
    },
    abcdeAssessment: {
      asymmetry: false,
      borderIrregularity: true,
      colorVariation: false,
      diameter: false,
      evolution: true
    },
    scans: [
      {
        id: "SCN-2025-001",
        date: "2025-03-20",
        location: "Left forearm",
        diagnosis: "Benign nevus",
        followUpRecommended: true,
        imageUrl: "/images/scans/SCN-2025-001.jpg"
      }
    ]
  },
  {
    id: "PT-2025-002",
    firstName: "Michael",
    lastName: "Chen",
    dob: "1985-11-23",
    gender: "male",
    contactNumber: "(555) 987-6543",
    email: "michael.chen@email.com",
    skinType: "type3", // Type III - Sometimes burns, tans uniformly
    riskLevel: "Low",
    profileComplete: true,
    lastVisit: "2025-03-15",
    nextAppointment: "2025-10-15",
    notes: "Annual check recommended. No concerning lesions at last visit.",
    medicalHistory: {
      familyHistorySkinCancer: false,
      familyHistoryMelanoma: false,
      familyMemberAffected: [],
      previousSkinCancer: false,
      immunocompromised: false,
      previousRadiationTherapy: false,
      outdoorOccupation: false,
      tanningSalonUse: false,
      sunburnHistory: false,
      sunExposure: "minimal",
      medications: [],
      allergies: []
    },
    abcdeAssessment: {
      asymmetry: false,
      borderIrregularity: false,
      colorVariation: false,
      diameter: false,
      evolution: false
    },
    scans: [
      {
        id: "SCN-2025-002",
        date: "2025-03-15",
        location: "Back",
        diagnosis: "No suspicious lesions",
        followUpRecommended: false,
        imageUrl: "/images/scans/SCN-2025-002.jpg"
      }
    ]
  },
  {
    id: "PT-2025-003",
    firstName: "Sarah",
    lastName: "Williams",
    dob: "1967-09-04",
    gender: "female",
    contactNumber: "(555) 234-5678",
    email: "sarah.williams@email.com",
    skinType: "type1", // Type I - Always burns, never tans
    riskLevel: "High",
    profileComplete: true,
    lastVisit: "2025-04-01",
    nextAppointment: "2025-07-01",
    notes: "Patient has history of basal cell carcinoma. Quarterly checks recommended.",
    medicalHistory: {
      familyHistorySkinCancer: true,
      familyHistoryMelanoma: false,
      familyMemberAffected: ["Father"],
      previousSkinCancer: true,
      immunocompromised: false,
      previousRadiationTherapy: false,
      outdoorOccupation: true,
      tanningSalonUse: true,
      sunburnHistory: true,
      sunExposure: "high",
      medications: ["Prednisone", "Methotrexate"],
      allergies: ["Sulfa drugs"]
    },
    abcdeAssessment: {
      asymmetry: true,
      borderIrregularity: true,
      colorVariation: true,
      diameter: false,
      evolution: true
    },
    scans: [
      {
        id: "SCN-2025-003",
        date: "2025-04-01",
        location: "Right shoulder",
        diagnosis: "Suspicious lesion - biopsy scheduled",
        followUpRecommended: true,
        imageUrl: "/images/scans/SCN-2025-003.jpg"
      },
      {
        id: "SCN-2025-004",
        date: "2025-01-15",
        location: "Nose",
        diagnosis: "Basal cell carcinoma (treated)",
        followUpRecommended: true,
        imageUrl: "/images/scans/SCN-2025-004.jpg"
      }
    ]
  },
  {
    id: "PT-2025-004",
    firstName: "James",
    lastName: "Garcia",
    dob: "1992-03-12",
    gender: "male",
    contactNumber: "(555) 345-6789",
    email: "james.garcia@email.com",
    skinType: "type4", // Type IV - Burns minimally, tans well
    riskLevel: "Low to Moderate",
    profileComplete: false, // Incomplete profile
    lastVisit: "2025-03-25",
    nextAppointment: null,
    notes: "New patient. Medical history questionnaire incomplete. First scan performed, no concerning lesions.",
    medicalHistory: {
      familyHistorySkinCancer: null, // Unknown
      familyHistoryMelanoma: null, // Unknown
      familyMemberAffected: [],
      previousSkinCancer: false,
      immunocompromised: false,
      previousRadiationTherapy: false,
      outdoorOccupation: true, // Works as landscaper
      tanningSalonUse: false,
      sunburnHistory: null, // Unknown
      sunExposure: "high",
      medications: [],
      allergies: []
    },
    abcdeAssessment: {
      asymmetry: false,
      borderIrregularity: false,
      colorVariation: false,
      diameter: false,
      evolution: false
    },
    scans: [
      {
        id: "SCN-2025-005",
        date: "2025-03-25",
        location: "Full body scan",
        diagnosis: "No suspicious lesions",
        followUpRecommended: true,
        imageUrl: "/images/scans/SCN-2025-005.jpg"
      }
    ]
  },
  {
    id: "PT-2025-005",
    firstName: "Emily",
    lastName: "Thompson",
    dob: "1988-12-10",
    gender: "female",
    contactNumber: "(555) 456-7890",
    email: "emily.thompson@email.com",
    skinType: "type2", // Type II - Usually burns, tans minimally
    riskLevel: "Moderate",
    profileComplete: true,
    lastVisit: "2025-03-10",
    nextAppointment: "2025-09-10",
    notes: "Several atypical moles being monitored. Semi-annual checks recommended.",
    medicalHistory: {
      familyHistorySkinCancer: false,
      familyHistoryMelanoma: false,
      familyMemberAffected: [],
      previousSkinCancer: false,
      immunocompromised: false,
      previousRadiationTherapy: false,
      outdoorOccupation: false,
      tanningSalonUse: false,
      sunburnHistory: true,
      sunExposure: "moderate",
      medications: ["Oral contraceptives"],
      allergies: []
    },
    abcdeAssessment: {
      asymmetry: false,
      borderIrregularity: true,
      colorVariation: true,
      diameter: false,
      evolution: false
    },
    scans: [
      {
        id: "SCN-2025-006",
        date: "2025-03-10",
        location: "Back",
        diagnosis: "Atypical nevus - monitoring",
        followUpRecommended: true,
        imageUrl: "/images/scans/SCN-2025-006.jpg"
      },
      {
        id: "SCN-2025-007",
        date: "2025-03-10",
        location: "Left thigh",
        diagnosis: "Atypical nevus - monitoring",
        followUpRecommended: true,
        imageUrl: "/images/scans/SCN-2025-007.jpg"
      }
    ]
  }
];

// Sample statistics for dashboard overview
const patientStatistics = {
  totalPatients: 5,
  highRiskPatients: 1,
  moderateRiskPatients: 2,
  lowRiskPatients: 2,
  pendingFollowUps: 4,
  incompleteProfiles: 1,
  upcomingAppointments: 3,
  recentScans: 7,
  suspiciousLesions: 1
};

// Export the data
export { patientData, patientStatistics };