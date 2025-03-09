import Section from '@/components/common/Section';
import ExperienceItem from './ExperienceItem';
import { Experience, emptyExperience, Resume } from "@/types/Resume.ts";
import { motion } from 'framer-motion';
import { useSectionState } from '@/hooks/useSectionState';

type Props = {
  experiences: Experience[],
  setResume: React.Dispatch<React.SetStateAction<Resume>>
}

const WorkExperience = ({ experiences, setResume }: Props) => {
  const {
    activeIndex,
    setActiveIndex,
    handleDragStart,
    handleDragEnd,
    addItem,
    updateItem,
    removeItem,
  } = useSectionState(experiences, setResume, 'experiences', emptyExperience);

  return (
    <Section
      title="Work Experience"
      items={experiences}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onAdd={addItem}
      addButtonText="Add Experience"
    >
      {experiences.map((exp) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ExperienceItem
            experience={exp}
            isActive={activeIndex === exp.id}
            onToggle={() => setActiveIndex(activeIndex === exp.id ? null : exp.id)}
            onChange={(updatedExperience) => updateItem(exp.id, updatedExperience)}
            onRemove={() => removeItem(exp.id)}
          />
        </motion.div>
      ))}
    </Section>
  );
};

export default WorkExperience;
