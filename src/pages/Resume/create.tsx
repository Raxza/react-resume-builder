import React, { useState } from 'react';
import {
  emptyEducation,
  emptyExperience,
  emptyOther,
  Resume,
} from "@/types/Resume.ts";
import { Button } from '@/components/ui/button';
import PersonalInformation from './components/PersonalInformation';
import WorkExperience from './components/WorkExperience';
import EducationSection from './components/EducationSection';
import AdditionalInformation from './components/AdditionalInformation';
import { Input } from '@/components/ui/input';
import { handleAddResume } from '@/lib/IndexedDB/resumeStore';
import { useNavigate } from 'react-router-dom';

const ResumeCreate = () => {
  const [resume, setResume] = useState<Resume>({
    title: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    experiences: [emptyExperience],
    educations: [emptyEducation],
    others: [emptyOther],
    lastModifiedTime: Date.now(),
  });

  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  const handleSave = async () => {
    const result = await handleAddResume({ ...resume, lastModifiedTime: Date.now() });
    if (result.status === 'success') {
      console.log('Resume saved successfully');
      navigate('/');
    } else {
      console.error('Error saving resume', result.data);
    }
  };

  const pages = [
    {
      title: "Personal Information",
      content: (
        <PersonalInformation name={resume.name} email={resume.email} phone={resume.phone} address={resume.address} setResume={setResume} />
      ),
      isValid: resume.name.trim() !== ''
    },
    {
      title: "Work Experience",
      content: (
        <WorkExperience experiences={resume.experiences} setResume={setResume} />
      ),
      isValid: resume.experiences.every(exp => exp.company && exp.position && exp.startDate && exp.summary)
    },
    {
      title: "Education",
      content: (
        <EducationSection educations={resume.educations} setResume={setResume} />
      ),
      isValid: resume.educations.every(edu => edu.institution && edu.degree && edu.startDate && edu.summary)
    },
    {
      title: "Additional Information",
      content: (
        <AdditionalInformation others={resume.others} setResume={setResume} />
      ),
      isValid: resume.others.every(other => other.type && other.value)
    },
  ];

  const page = pages[currentPage];

  return (
    <form className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <Input
          type="text"
          id="title"
          value={resume.title}
          onChange={(e) => setResume({ ...resume, title: e.target.value })}
          placeholder='Resume Title'
          className='w-40'
          required
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        {pages.map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}
            >
              {index + 1}
            </div>
            {index < pages.length - 1 && (
              <div className={`flex-1 h-1 ${index < currentPage ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            )}
          </div>
        ))}
      </div>

      {page.content}

      <div className="flex justify-between mt-6">
        {currentPage > 0 ? (
          <Button type="button" onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </Button>
        ) : (
          <div className="flex-1" />
        )}

        {currentPage < pages.length - 1 ? (
          <Button
            type="button"
            disabled={!page.isValid}
            onClick={() => {
              if (page.isValid) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            Next
          </Button>
        ) : (
          <Button type="button" disabled={!page.isValid} onClick={handleSave}>
            Save Resume
          </Button>
        )}
      </div>
    </form>
  );
};

export default ResumeCreate;