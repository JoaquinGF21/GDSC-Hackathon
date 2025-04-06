// Sample data structure for tracking patient scans

// Scan status types
const SCAN_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  ANALYZED: 'analyzed',
  PENDING_REVIEW: 'pending_review',
  REVIEWED: 'reviewed',
  CANCELLED: 'cancelled'
};

// Diagnosis types
const DIAGNOSIS_TYPES = {
  BENIGN: 'benign',
  SUSPICIOUS: 'suspicious',
  MALIGNANT: 'malignant',
  MELANOMA: 'melanoma',
  BASAL_CELL: 'basal_cell_carcinoma',
  SQUAMOUS_CELL: 'squamous_cell_carcinoma',
  UNKNOWN: 'unknown'
};

// Body location map for reference
const BODY_LOCATIONS = {
  HEAD: [
    'Scalp', 'Forehead', 'Temple', 'Eyebrow', 'Eyelid', 'Nose', 'Cheek', 
    'Ear', 'Jaw', 'Chin', 'Lip', 'Mouth', 'Neck'
  ],
  TRUNK: [
    'Chest', 'Breast', 'Abdomen', 'Upper back', 'Lower back', 'Shoulder blade',
    'Shoulder', 'Armpit'
  ],
  UPPER_EXTREMITIES: [
    'Upper arm', 'Elbow', 'Forearm', 'Wrist', 'Palm', 'Back of hand', 'Finger'
  ],
  LOWER_EXTREMITIES: [
    'Hip', 'Buttock', 'Groin', 'Thigh', 'Knee', 'Calf', 'Shin', 'Ankle', 
    'Top of foot', 'Sole', 'Toe'
  ]
};

// Sample scan records
const patientScanRecords = [
  {
    scanId: "SCN-2025-001",
    patientId: "PT-2025-001", // Emma Johnson
    scanDate: "2025-03-20",
    scanType: "Full body",
    performedBy: "Dr. Michael Roberts",
    bodyLocations: [
      {
        location: "Left forearm",
        lesionCount: 1,
        notes: "Small brown mole, no significant changes from previous scan"
      },
      {
        location: "Upper back",
        lesionCount: 3,
        notes: "Multiple small nevi, all appear benign"
      }
    ],
    status: SCAN_STATUS.REVIEWED,
    aiAnalysis: {
      completed: true,
      timestamp: "2025-03-20T14:32:15",
      findings: [
        {
          location: "Left forearm",
          coordinates: "X234-Y156",
          confidence: 0.96,
          classification: DIAGNOSIS_TYPES.BENIGN,
          riskScore: 0.12
        }
      ]
    },
    doctorReview: {
      completed: true,
      timestamp: "2025-03-20T16:45:22",
      reviewedBy: "Dr. Sarah Chen",
      diagnosis: DIAGNOSIS_TYPES.BENIGN,
      notes: "Benign nevus, no concerning features. Regular monitoring recommended.",
      followupRecommended: true,
      followupInterval: 6 // months
    },
    images: [
      {
        imageId: "IMG-2025-0034",
        location: "Left forearm",
        url: "/images/scans/PT-2025-001/IMG-2025-0034.jpg",
        thumbnail: "/images/scans/PT-2025-001/thumbnails/IMG-2025-0034.jpg",
        metadata: {
          camera: "DermaScan Pro",
          resolution: "3840x2160",
          lighting: "Polarized",
          magnification: "10x"
        }
      },
      {
        imageId: "IMG-2025-0035",
        location: "Upper back",
        url: "/images/scans/PT-2025-001/IMG-2025-0035.jpg",
        thumbnail: "/images/scans/PT-2025-001/thumbnails/IMG-2025-0035.jpg",
        metadata: {
          camera: "DermaScan Pro",
          resolution: "3840x2160",
          lighting: "Polarized",
          magnification: "10x"
        }
      }
    ]
  },
  {
    scanId: "SCN-2025-002",
    patientId: "PT-2025-002", // Michael Chen
    scanDate: "2025-03-15",
    scanType: "Targeted",
    performedBy: "Dr. James Wilson",
    bodyLocations: [
      {
        location: "Back",
        lesionCount: 0,
        notes: "No suspicious lesions observed"
      }
    ],
    status: SCAN_STATUS.REVIEWED,
    aiAnalysis: {
      completed: true,
      timestamp: "2025-03-15T11:15:42",
      findings: []
    },
    doctorReview: {
      completed: true,
      timestamp: "2025-03-15T13:20:18",
      reviewedBy: "Dr. Rebecca Taylor",
      diagnosis: null,
      notes: "No suspicious lesions identified. Patient has several benign freckles on back.",
      followupRecommended: false,
      followupInterval: 12 // months
    },
    images: [
      {
        imageId: "IMG-2025-0042",
        location: "Back",
        url: "/images/scans/PT-2025-002/IMG-2025-0042.jpg",
        thumbnail: "/images/scans/PT-2025-002/thumbnails/IMG-2025-0042.jpg",
        metadata: {
          camera: "DermaScan Pro",
          resolution: "3840x2160",
          lighting: "Standard",
          magnification: "1x"
        }
      }
    ]
  },
  {
    scanId: "SCN-2025-003",
    patientId: "PT-2025-003", // Sarah Williams
    scanDate: "2025-04-01",
    scanType: "Targeted",
    performedBy: "Dr. Michael Roberts",
    bodyLocations: [
      {
        location: "Right shoulder",
        lesionCount: 1,
        notes: "Irregular border, uneven coloration"
      }
    ],
    status: SCAN_STATUS.PENDING_REVIEW,
    aiAnalysis: {
      completed: true,
      timestamp: "2025-04-01T09:47:32",
      findings: [
        {
          location: "Right shoulder",
          coordinates: "X145-Y187",
          confidence: 0.89,
          classification: DIAGNOSIS_TYPES.SUSPICIOUS,
          riskScore: 0.67
        }
      ]
    },
    doctorReview: {
      completed: false,
      timestamp: null,
      reviewedBy: null,
      diagnosis: null,
      notes: "PENDING REVIEW: AI analysis suggests suspicious lesion, biopsy may be recommended",
      followupRecommended: null,
      followupInterval: null
    },
    images: [
      {
        imageId: "IMG-2025-0056",
        location: "Right shoulder",
        url: "/images/scans/PT-2025-003/IMG-2025-0056.jpg",
        thumbnail: "/images/scans/PT-2025-003/thumbnails/IMG-2025-0056.jpg",
        metadata: {
          camera: "DermaScan Pro",
          resolution: "3840x2160",
          lighting: "Polarized",
          magnification: "20x"
        }
      },
      {
        imageId: "IMG-2025-0057",
        location: "Right shoulder - close-up",
        url: "/images/scans/PT-2025-003/IMG-2025-0057.jpg",
        thumbnail: "/images/scans/PT-2025-003/thumbnails/IMG-2025-0057.jpg",
        metadata: {
          camera: "DermaScan Pro",
          resolution: "3840x2160",
          lighting: "Polarized",
          magnification: "50x"
        }
      }
    ]
  },
  {
    scanId: "SCN-2025-004",
    patientId: "PT-2025-003", // Sarah Williams
    scanDate: "2025-01-15",
    scanType: "Biopsy follow-up",
    performedBy: "Dr. James Wilson",
    bodyLocations: [
      {
        location: "Nose",
        lesionCount: 1,
        notes: "Post-treatment follow-up of confirmed basal cell carcinoma"
      }
    ],
    status: SCAN_STATUS.REVIEWED,
    aiAnalysis: {
      completed: true,
      timestamp: "2025-01-15T14:12:08",
      findings: [
        {
          location: "Nose",
          coordinates: "X87-Y103",
          confidence: 0.92,
          classification: DIAGNOSIS_TYPES.BASAL_CELL,
          riskScore: 0.85
        }
      ]
    },
    doctorReview: {
      completed: true,
      timestamp: "2025-01-15T16:30:45",
      reviewedBy: "Dr. Rebecca Taylor",
      diagnosis: DIAGNOSIS_TYPES.BASAL_CELL,
      notes: "Confirmed basal cell carcinoma. Mohs surgery scheduled for January 22, 2025.",
      followupRecommended: true,
      followupInterval: 3 // months
    },
    treatment: {
      type: "Mohs surgery",
      date: "2025-01-22",
      provider: "Dr. Elizabeth Chang",
      notes: "Complete excision achieved with clear margins. Excellent cosmetic outcome.",
      followupScheduled: "2025-04-01"
    },
    images: [
      {
        imageId: "IMG-2025-0022",
        location: "Nose",
        url: "/images/scans/PT-2025-003/IMG-2025-0022.jpg",
        thumbnail: "/images/scans/PT-2025-003/thumbnails/IMG-2025-0022.jpg",
        metadata: {
          camera: "DermaScan Pro",
          resolution: "3840x2160",
          lighting: "Polarized",
          magnification: "20x"
        }
      }
    ]
  },
  {
    scanId: "SCN-2025-005",
    patientId: "PT-2025-004", // James Garcia
    scanDate: "2025-03-25",
    scanType: "Full body",
    performedBy: "Dr. Sarah Chen",
    bodyLocations: [
      {
        location: "Full body",
        lesionCount: 0,
        notes: "No suspicious lesions identified"
      }
    ],
    status: SCAN_STATUS.REVIEWED,
    aiAnalysis: {
      completed: true,
      timestamp: "2025-03-25T10:22:37",
      findings: []
    },
    doctorReview: {
      completed: true,
      timestamp: "2025-03-25T11:45:12",
      reviewedBy: "Dr. Michael Roberts",
      diagnosis: null,
      notes: "Baseline scan completed. Patient works outdoors and has moderate sun exposure. Recommended sunscreen SPF 50+ daily.",
      followupRecommended: true,
      followupInterval: 12 // months
    },
    images: [
      {
        imageId: "IMG-2025-0065",
        location: "Full body - composite",
        url: "/images/scans/PT-2025-004/IMG-2025-0065.jpg",
        thumbnail: "/images/scans/PT-2025-004/thumbnails/IMG-2025-0065.jpg",
        metadata: {
          camera: "DermaScan Pro",
          resolution: "7680x4320",
          lighting: "Standard",
          magnification: "1x"
        }
      }
    ]
  },
  {
    scanId: "SCN-2025-006",
    patientId: "PT-2025-005", // Emily Thompson
    scanDate: "2025-03-10",
    scanType: "Targeted",
    performedBy: "Dr. Rebecca Taylor",
    bodyLocations: [
      {
        location: "Back",
        lesionCount: 1,
        notes: "Slightly irregular border, consistent coloration"
      }
    ],
    status: SCAN_STATUS.REVIEWED,
    aiAnalysis: {
      completed: true,
      timestamp: "2025-03-10T13:42:19",
      findings: [
        {
          location: "Back",
          coordinates: "X302-Y178",
          confidence: 0.94,
          classification: DIAGNOSIS_TYPES.BENIGN,
          riskScore: 0.32
        }
      ]
    },
    doctorReview: {
      completed: true,
      timestamp: "2025-03-10T15:15:32",
      reviewedBy: "Dr. James Wilson",
      diagnosis: DIAGNOSIS_TYPES.BENIGN,
      notes: "Atypical nevus but likely benign. Close monitoring recommended.",
      followupRecommended: true,
      followupInterval: 6 // months
    },
    images: [
      {
        imageId: "IMG-2025-0078",
        location: "Back",
        url: "/images/scans/PT-2025-005/IMG-2025-0078.jpg",
        thumbnail: "/images/scans/PT-2025-005/thumbnails/IMG-2025-0078.jpg",
        metadata: {
          camera: "DermaScan Pro",
          resolution: "3840x2160",
          lighting: "Polarized",
          magnification: "20x"
        }
      }
    ]
  },
  {
    scanId: "SCN-2025-007",
    patientId: "PT-2025-005", // Emily Thompson
    scanDate: "2025-03-10",
    scanType: "Targeted",
    performedBy: "Dr. Rebecca Taylor",
    bodyLocations: [
      {
        location: "Left thigh",
        lesionCount: 1,
        notes: "Slightly irregular border, some color variation"
      }
    ],
    status: SCAN_STATUS.REVIEWED,
    aiAnalysis: {
      completed: true,
      timestamp: "2025-03-10T13:55:41",
      findings: [
        {
          location: "Left thigh",
          coordinates: "X219-Y345",
          confidence: 0.91,
          classification: DIAGNOSIS_TYPES.BENIGN,
          riskScore: 0.28
        }
      ]
    },
    doctorReview: {
      completed: true,
      timestamp: "2025-03-10T15:22:18",
      reviewedBy: "Dr. James Wilson",
      diagnosis: DIAGNOSIS_TYPES.BENIGN,
      notes: "Atypical nevus but likely benign. Close monitoring recommended.",
      followupRecommended: true,
      followupInterval: 6 // months
    },
    images: [
      {
        imageId: "IMG-2025-0079",
        location: "Left thigh",
        url: "/images/scans/PT-2025-005/IMG-2025-0079.jpg",
        thumbnail: "/images/scans/PT-2025-005/thumbnails/IMG-2025-0079.jpg",
        metadata: {
          camera: "DermaScan Pro",
          resolution: "3840x2160",
          lighting: "Polarized",
          magnification: "20x"
        }
      }
    ]
  }
];

// Summary statistics about patient scans
const scanStatistics = {
  totalScans: patientScanRecords.length,
  scansByType: {
    fullBody: patientScanRecords.filter(scan => scan.scanType === "Full body").length,
    targeted: patientScanRecords.filter(scan => scan.scanType === "Targeted").length,
    biopsyFollowUp: patientScanRecords.filter(scan => scan.scanType === "Biopsy follow-up").length
  },
  scansByStatus: {
    scheduled: patientScanRecords.filter(scan => scan.status === SCAN_STATUS.SCHEDULED).length,
    completed: patientScanRecords.filter(scan => scan.status === SCAN_STATUS.COMPLETED).length,
    analyzed: patientScanRecords.filter(scan => scan.status === SCAN_STATUS.ANALYZED).length,
    pendingReview: patientScanRecords.filter(scan => scan.status === SCAN_STATUS.PENDING_REVIEW).length,
    reviewed: patientScanRecords.filter(scan => scan.status === SCAN_STATUS.REVIEWED).length,
    cancelled: patientScanRecords.filter(scan => scan.status === SCAN_STATUS.CANCELLED).length
  },
  scansByDiagnosis: {
    benign: patientScanRecords.filter(scan => scan.doctorReview?.diagnosis === DIAGNOSIS_TYPES.BENIGN).length,
    suspicious: patientScanRecords.filter(scan => scan.doctorReview?.diagnosis === DIAGNOSIS_TYPES.SUSPICIOUS).length,
    malignant: patientScanRecords.filter(scan => scan.doctorReview?.diagnosis === DIAGNOSIS_TYPES.MALIGNANT).length,
    melanoma: patientScanRecords.filter(scan => scan.doctorReview?.diagnosis === DIAGNOSIS_TYPES.MELANOMA).length,
    basalCell: patientScanRecords.filter(scan => scan.doctorReview?.diagnosis === DIAGNOSIS_TYPES.BASAL_CELL).length,
    squamousCell: patientScanRecords.filter(scan => scan.doctorReview?.diagnosis === DIAGNOSIS_TYPES.SQUAMOUS_CELL).length
  },
  requiresFollowUp: patientScanRecords.filter(scan => scan.doctorReview?.followupRecommended === true).length,
  aiAccuracy: {
    // This would be calculated based on AI predictions vs. confirmed diagnosis
    correctPredictions: 5,
    totalPredictionsWithConfirmation: 6,
    accuracyRate: (5/6 * 100).toFixed(1) + "%"
  }
};

// Export the data structures and sample data
export {
  SCAN_STATUS,
  DIAGNOSIS_TYPES,
  BODY_LOCATIONS,
  patientScanRecords,
  scanStatistics
};