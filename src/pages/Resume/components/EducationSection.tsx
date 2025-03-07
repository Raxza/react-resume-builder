import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EducationItem from './EducationItem';
import { Education, emptyEducation, Resume } from "@/types/Resume.ts";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type Props = {
  educations: Education[],
  setResume: React.Dispatch<React.SetStateAction<Resume>>
}

const EducationSection = ({ educations, setResume }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(educations.length > 0 ? 0 : null);

  const addEducation = () => {
    const newIndex = educations.length;
    setResume(prev => ({
      ...prev,
      educations: [...prev.educations, { ...emptyEducation }],
    }));
    setActiveIndex(newIndex);
  };

  const updateEducation = (index: number, updatedEducation: Education) => {
    setResume(prev => ({
      ...prev,
      educations: prev.educations.map((edu, i) =>
        i === index ? updatedEducation : edu
      ),
    }));
  };

  const removeEducation = (index: number) => {
    setResume(prev => ({
      ...prev,
      educations: prev.educations.filter((_, i) => i !== index),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnimatePresence initial={false}>
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <EducationItem
                education={edu}
                index={index}
                isActive={activeIndex === index}
                onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
                onChange={(updatedEducation) => updateEducation(index, updatedEducation)}
                onRemove={() => removeEducation(index)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <Button type="button" onClick={addEducation} variant="outline">
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
};

export default EducationSection;
