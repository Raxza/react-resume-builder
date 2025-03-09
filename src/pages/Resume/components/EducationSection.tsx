import Section from '@/components/common/Section';
import EducationItem from './EducationItem';
import { Education, emptyEducation, Resume } from "@/types/Resume.ts";
import { motion } from 'framer-motion';
import { useSectionState } from '@/hooks/useSectionState';

type Props = {
  educations: Education[],
  setResume: React.Dispatch<React.SetStateAction<Resume>>
}

const EducationSection = ({ educations, setResume }: Props) => {
  const {
    activeIndex,
    setActiveIndex,
    handleDragStart,
    handleDragEnd,
    addItem,
    updateItem,
    removeItem,
  } = useSectionState(educations, setResume, 'educations', emptyEducation);

  return (
    <Section
      title="Education"
      items={educations}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onAdd={addItem}
      addButtonText="Add Education"
    >
      {educations.map((edu) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <EducationItem
            education={edu}
            isActive={activeIndex === edu.id}
            onToggle={() => setActiveIndex(activeIndex === edu.id ? null : edu.id)}
            onChange={(updatedEducation) => updateItem(edu.id, updatedEducation)}
            onRemove={() => removeItem(edu.id)}
          />
        </motion.div>
      ))}
    </Section>
  );
};

export default EducationSection;
