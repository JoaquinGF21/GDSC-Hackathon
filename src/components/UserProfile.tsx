import React, { useState } from "react";

interface ProfileData {
  photo?: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  medicalInfo: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    dob: "1990-01-01",
    medicalInfo: "None",
  });

  const [photoPreview, setPhotoPreview] = useState<string | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Send profile to backend or Supabase
    console.log("Saved profile:", profile);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Personal Profile</h2>

      <div className="flex flex-col items-center gap-4 mb-6">
        <img
          src={photoPreview || "/placeholder-profile.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover shadow"
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="text-sm"
          />
        )}
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            name="dob"
            type="date"
            value={profile.dob}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Medical Information</label>
          <textarea
            name="medicalInfo"
            value={profile.medicalInfo}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
