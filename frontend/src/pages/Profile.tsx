import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile, createUser } from '../services/api';

export default function Profile() {
    const [userId, setUserId] = useState<number | null>(null);
    const [profile, setProfile] = useState<any>(null);

    // Registration Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // Profile Form State
    const [skills, setSkills] = useState('');
    const [experience, setExperience] = useState('Entry-Level');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await createUser({ email, password, name });
            setUserId(user.id);
            loadProfile(user.id);
        } catch (err) {
            alert('Registration failed. Email might exist.');
        }
    };

    const loadProfile = async (id: number) => {
        try {
            const data = await getProfile(id);
            setProfile(data);
            setSkills(data.skills.map((s: any) => s.name).join(', '));
            setExperience(data.experience_level || 'Entry-Level');
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;

        // Convert comma-separated string to objects
        const skillsList = skills.split(',').map(s => ({ name: s.trim() })).filter(s => s.name.length > 0);

        try {
            await updateProfile(userId, {
                skills: skillsList,
                experience_level: experience,
                master_resume_url: null
            });
            alert('Profile updated successfully!');
        } catch (err) {
            alert('Update failed');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 font-sans">
            <h1 className="text-3xl font-bold mb-8 text-indigo-600">User Profile</h1>

            {!userId ? (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Register to get started</h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" required value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full transition-colors">Register</button>
                    </form>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Welcome, Dashboard Active</h2>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                            <input type="text" value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g. React, Python, PostgreSQL" className="mt-1 border border-gray-300 rounded-md p-2 w-full focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                            <select value={experience} onChange={e => setExperience(e.target.value)} className="mt-1 border border-gray-300 rounded-md p-2 w-full focus:ring-indigo-500 focus:border-indigo-500">
                                <option>Entry-Level</option>
                                <option>Mid-Level</option>
                                <option>Senior</option>
                                <option>Lead / Manager</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full transition-colors">Save Profile</button>
                    </form>
                </div>
            )}
        </div>
    );
}
