import { useEffect, useRef, useState } from "react";
import { DegreeType, Resume } from "@/types/Resume";
import { format } from "date-fns";
import '@/styles/page.css';

type Props = {
  resume: Resume;
  scale: number;
};

const ResumePreview = ({ resume, scale = 0.5 }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [innerScale, setInnerScale] = useState(scale);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && pageRef.current) {
        const currContainerWidth = containerRef.current.clientWidth;
        const currWrapperWidth = pageRef.current.clientWidth;
        const scaleX = currContainerWidth / currWrapperWidth;
        const newScale = Math.min(scaleX, scale);
        setInnerScale(newScale);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  },[]);

  return (
    <div className="preview-container" ref={containerRef}>
      <div
        className="page-wrapper"
        ref={pageRef}
        style={{ transform: `scale(${innerScale}, ${innerScale})` }}
      >
        <div className="page-container" >
          <h3 className="text-xl font-bold mb-1" style={{ fontSize: `${25}px` }}>{resume.name.toUpperCase()}</h3>
          {(resume.phone || resume.email || resume.address) &&
            <p className="text-sm text-gray-500 mb-1" style={{ fontSize: `${14}px` }}>
              {[
                resume.phone,
                resume.email,
                resume.address,
              ]
                .filter(Boolean)
                .join(" | ")}
            </p>
          }
          {resume.summary &&
            <p className="text-sm mb-1" style={{ fontSize: `${14}px` }}>{resume.summary}</p>
          }
          {resume.experiences.length > 0 &&
            <section className="mt-4">
              <h4 className="text-md font-bold" style={{ fontSize: `${18}px` }}>Work Experience</h4>
              <hr className="h-0.5 -mx-1 bg-black" />
              {resume.experiences.map((experience, index) => (
                <div key={index} className="mt-3 ms-2">
                  <div className="flex justify-between">
                    <h5 className="text-sm font-bold" style={{ fontSize: `${14}px` }}>{experience.company}</h5>
                    <p className="text-sm" style={{ fontSize: `${14}px` }}>
                      {experience.startDate && format(experience.startDate, "MMM yyyy")} - {experience.endDate ? format(experience.endDate, "MMM yyyy") : experience.isCurrent ? "Present" : ""}
                    </p>
                  </div>
                  <p className="text-sm italic" style={{ fontSize: `${14}px` }}>{experience.position}</p>
                  <ul className="list-disc ms-2 ps-4">
                    {experience.highlights.map((highlight, index) => (
                      <li key={index} className="text-sm" style={{ fontSize: `${14}px` }}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          }
          {resume.educations.length > 0 &&
            <section className="mt-4">
              <h4 className="text-md font-bold" style={{ fontSize: `${18}px` }}>Education</h4>
              <hr className="h-0.5 -mx-1 bg-black" />
              {resume.educations.map((education, index) => (
                <div key={index} className="mt-3 ms-2">
                  <div className="flex justify-between">
                    <h5 className="text-sm font-bold" style={{ fontSize: `${14}px` }}>{education.institution}</h5>
                    <p className="text-sm" style={{ fontSize: `${14}px` }}>
                      {education.startDate && format(education.startDate, "MMM yyyy")} - {education.endDate ? format(education.endDate, "MMM yyyy") : education.isCurrent ? "Present" : ""}
                    </p>
                  </div>
                  <p className="text-sm italic" style={{ fontSize: `${14}px` }}>
                    {education.degree !== DegreeType.Add ? education.degree : education.customDegree} {(education.degree !== DegreeType.Add || education.customDegree) && education.major && `in ${education.major}`}
                    {education.score && ` (${education.score}${education.maxScore ? `/${education.maxScore})` : ")"}`}
                  </p>
                  <ul className="list-disc ms-2 ps-4">
                    {education.highlights.map((highlight, index) => (
                      <li key={index} className="text-sm" style={{ fontSize: `${14}px` }}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          }
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
