import Section from '@/components/common/Section';
import OtherItem from './OtherItem';
import { Other, emptyOther, Resume } from "@/types/Resume.ts";
import { motion } from 'framer-motion';
import { useSectionState } from '@/hooks/useSectionState';

type Props = {
  others: Other[],
  setResume: React.Dispatch<React.SetStateAction<Resume>>
}

const AdditionalInformation = ({ others, setResume }: Props) => {
  const {
    activeIndex,
    setActiveIndex,
    handleDragStart,
    handleDragEnd,
    addItem,
    updateItem,
    removeItem,
  } = useSectionState(others, setResume, 'others', emptyOther);

  return (
    <Section
      title="Additional Information"
      items={others}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onAdd={addItem}
      addButtonText="Add Other Information"
    >
      {others.map((other) => (
        <motion.div
          key={other.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <OtherItem
            other={other}
            isActive={activeIndex === other.id}
            onToggle={() => setActiveIndex(activeIndex === other.id ? null : other.id)}
            onChange={(updatedOther) => updateItem(other.id, updatedOther)}
            onRemove={() => removeItem(other.id)}
          />
        </motion.div>
      ))}
    </Section>
  );
};

export default AdditionalInformation;
