import { Other, ResumeOtherType } from "@/types/Resume.ts";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  other: Other,
  index: number,
  isActive: boolean,
  onToggle: () => void,
  onChange: (other: Other) => void,
  onRemove: () => void
}

const OtherItem = ({ other, index, isActive, onToggle, onChange, onRemove }: Props) => {

  const updateType = (value: ResumeOtherType | string) => {
    onChange({ ...other, type: value as ResumeOtherType });
  };

  const updateValue = (value: string) => {
    onChange({ ...other, value: value });
  };

  return (
    <div key={index} className="space-y-4 p-4 border rounded">
      <div className="flex justify-between items-center">
        <h3>Additional {index + 1}</h3>
        <div className="flex space-x-2">
          <Button type="button" onClick={onToggle} variant="outline" size="sm">
            {!isActive ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronUpIcon className="h-4 w-4" />}
          </Button>
          <Button type="button" onClick={onRemove} variant="outline" size="sm">
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Select
                  value={other.type}
                  onValueChange={value => updateType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ResumeOtherType).map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Value</Label>
                <Textarea
                  className="h-36"
                  value={other.value}
                  onChange={e => updateValue(e.target.value)}
                  required
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OtherItem;
