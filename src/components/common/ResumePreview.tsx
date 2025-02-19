import { useEffect, useRef, useState } from "react";
import { DegreeType, Resume } from "@/types/Resume";
import { format } from "date-fns";
import '@/styles/page.css';

type Props = {
  resume: Resume;
};

const ResumePreview = ({ resume }: Props) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (pageRef.current) {
        const { clientWidth, clientHeight } = pageRef.current;
        const scaleX = window.innerWidth / clientWidth;
        const scaleY = window.innerHeight / clientHeight;
        const newScale = Math.min(scaleX, scaleY);
        setScale(newScale);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="preview-container">
      <div
        className="page-wrapper"
        ref={pageRef}
        style={{ transform: `scale(${scale})` }}
      >
        <div className="page-container">
          <h3 className="text-xl font-bold mb-1" style={{ fontSize: `${25 * scale}px` }}>{resume.name.toUpperCase()}</h3>
          {(resume.phone || resume.email || resume.address) &&
            <p className="text-sm text-gray-500 mb-1" style={{ fontSize: `${14 * scale}px` }}>
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
            <p className="text-sm mb-1" style={{ fontSize: `${14 * scale}px` }}>{resume.summary}</p>
          }
          {resume.experiences.length > 0 &&
            <section className="mt-4">
              <h4 className="text-md font-bold" style={{ fontSize: `${18 * scale}px` }}>Work Experience</h4>
              <hr className="h-0.5 -mx-1 bg-black" />
              {resume.experiences.map((experience, index) => (
                <div key={index} className="mt-3 ms-2">
                  <div className="flex justify-between">
                    <h5 className="text-sm font-bold" style={{ fontSize: `${14 * scale}px` }}>{experience.company}</h5>
                    <p className="text-sm" style={{ fontSize: `${14 * scale}px` }}>
                      {experience.startDate && format(experience.startDate, "MMM yyyy")} - {experience.endDate ? format(experience.endDate, "MMM yyyy") : experience.isCurrent ? "Present" : ""}
                    </p>
                  </div>
                  <p className="text-sm italic" style={{ fontSize: `${14 * scale}px` }}>{experience.position}</p>
                  <ul className="list-disc ms-2 ps-4">
                    {experience.highlights.map((highlight, index) => (
                      <li key={index} className="text-sm" style={{ fontSize: `${14 * scale}px` }}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          }
          {resume.educations.length > 0 &&
            <section className="mt-4">
              <h4 className="text-md font-bold" style={{ fontSize: `${18 * scale}px` }}>Education</h4>
              <hr className="h-0.5 -mx-1 bg-black" />
              {resume.educations.map((education, index) => (
                <div key={index} className="mt-3 ms-2">
                  <div className="flex justify-between">
                    <h5 className="text-sm font-bold" style={{ fontSize: `${14 * scale}px` }}>{education.institution}</h5>
                    <p className="text-sm" style={{ fontSize: `${14 * scale}px` }}>
                      {education.startDate && format(education.startDate, "MMM yyyy")} - {education.endDate ? format(education.endDate, "MMM yyyy") : education.isCurrent ? "Present" : ""}
                    </p>
                  </div>
                  <p className="text-sm italic" style={{ fontSize: `${14 * scale}px` }}>
                    {education.degree !== DegreeType.Add ? education.degree : education.customDegree} {(education.degree !== DegreeType.Add || education.customDegree) && education.major && `in ${education.major}`}
                    {education.score && ` (${education.score}${education.maxScore ? `/${education.maxScore})` : ")"}`}
                  </p>
                  <ul className="list-disc ms-2 ps-4">
                    {education.highlights.map((highlight, index) => (
                      <li key={index} className="text-sm" style={{ fontSize: `${14 * scale}px` }}>{highlight}</li>
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
