import { useState } from 'react';
import { Other, ResumeOtherType } from "@/types/Resume.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { Textarea } from '@/components/ui/textarea';

type Props = {
  other: Other,
  index: number,
  onChange: (other: Other) => void,
  onRemove: () => void
}

const OtherItem = ({ other, index, onChange, onRemove }: Props) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const updateType = (value: ResumeOtherType | string) => {
    onChange({ ...other, type: value as ResumeOtherType });
  };

  const updateValue = (value: string) => {
    onChange({ ...other, value: value });
  };

  return (
    <div key={index} className="space-y-4 p-4 border rounded">
      <div className="flex justify-between items-center">
        <h3>Additonal {index + 1}</h3>
        <div className="flex space-x-2">
          <Button type="button" onClick={() => setIsMinimized(!isMinimized)} variant="outline" size="sm">
            {isMinimized ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronUpIcon className="h-4 w-4" />}
          </Button>
          <Button type="button" onClick={onRemove} variant="outline" size="sm">
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
        {/* <div className="space-y-2">
          <Label>Type</Label> */}
        {/* <Select
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
          </Select> */}
        {/* </div> */}
        {/* <div className="flex items-center space-x-2">
          <Button type="button" onClick={() => setIsMinimized(!isMinimized)} variant="outline" size="sm">
            {isMinimized ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronUpIcon className="w-4 h-4" />}
          </Button>
          <Button type="button" onClick={onRemove} variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div> */}
      </div>
      {!isMinimized && (
        <>
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
        </>
      )}
    </div>
  );
};

export default OtherItem;
