import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ExperienceItem from './ExperienceItem';
import { Experience, emptyExperience, Resume } from "@/types/Resume.ts";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  experiences: Experience[],
  setResume: React.Dispatch<React.SetStateAction<Resume>>
}

const WorkExperience = ({ experiences, setResume }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(experiences.length > 0 ? 0 : null);

  const addExperience = () => {
    const newIndex = experiences.length;
    setResume(prev => ({
      ...prev,
      experiences: [...prev.experiences, { ...emptyExperience }],
    }));
    setActiveIndex(newIndex);
  };

  const updateExperience = (index: number, updatedExperience: Experience) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) =>
        i === index ? updatedExperience : exp
      ),
    }));
  };

  const removeExperience = (index: number) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnimatePresence initial={false}>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ExperienceItem
                experience={exp}
                index={index}
                isActive={activeIndex === index}
                onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
                onChange={(updatedExperience) => updateExperience(index, updatedExperience)}
                onRemove={() => removeExperience(index)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <Button type="button" onClick={addExperience} variant="outline">
          Add Experience
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkExperience;
