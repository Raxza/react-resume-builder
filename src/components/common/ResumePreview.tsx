// import { useRef } from "react";
import { DegreeType, Resume } from "@/types/Resume";
import { format } from "date-fns";
import '@/styles/page.css';

type Props = {
  resume: Resume;
  scale: number;
};

const ResumePreview = ({ resume }: Props) => {
  const { email, phone, address, summary, experiences, educations } = resume;
  const userInfo = [phone, email, address].filter(Boolean).join(" | ");


  // const containerRef = useRef<HTMLDivElement>(null);
  // const pageRef = useRef<HTMLPreElement>(null);
  // const [innerScale, setInnerScale] = useState(scale);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (containerRef.current && pageRef.current) {
  //       const currContainerWidth = containerRef.current.clientWidth;
  //       const currWrapperWidth = pageRef.current.clientWidth;
  //       const scaleX = currContainerWidth / currWrapperWidth;
  //       const newScale = Math.min(scaleX, scale);
  //       setInnerScale(newScale);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize();

  //   return () => window.removeEventListener("resize", handleResize);
  // },[]);

  return (
    <div>
      <article className="aspect-[1/1.414] p-4 border-2 rounded-sm border-gray-200
      prose prose-hr:border prose-hr:border-gray-200 prose-hr:mb-2 prose-p:mt-0 prose-p:mb-4
      text-xs md:text-base" >
        <h3 className="mb-0">{resume.name.toUpperCase()}</h3>
        {userInfo ? <span>{userInfo}</span> : null}
        {summary ? <p>{resume.summary}</p> : null}
        {experiences.length ?
          <section>
            <h4>Work Experience</h4>
            <hr />
            {experiences.map((experience, index) => {
              const { company, position, summary, startDate, endDate, isCurrent, highlights } = experience;
              return (
                <article key={index}>
                  <div className="flex justify-between">
                    <h5 className="font-bold">{company}</h5>
                    <span>
                      {startDate ? format(startDate, "MMM yyyy") : null} - {endDate ? format(endDate, "MMM yyyy") : isCurrent ? "Present" : ""}
                    </span>
                  </div>
                  <em>{position}</em>
                  <p>{summary}</p>
                  <ul>
                    {highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </section>
          : null}
        {educations.length ?
          <section>
            <h4>Education</h4>
            <hr />
            {educations.map((education, index) => {
              const { institution, startDate, endDate, isCurrent } = education;
              return (
                <article key={index} >
                  <div className="flex justify-between">
                    <h5>{institution}</h5>
                    <p>
                      {startDate ? format(startDate, "MMM yyyy") : null} - {endDate ? format(endDate, "MMM yyyy") : isCurrent ? "Present" : ""}
                    </p>
                  </div>
                  <em>
                    {education.degree !== DegreeType.Add ? education.degree : education.customDegree} {(education.degree !== DegreeType.Add || education.customDegree) && education.major && `in ${education.major}`}
                    {education.score && ` (${education.score}${education.maxScore ? `/${education.maxScore})` : ")"}`}
                  </em>
                  <ul>
                    {education.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </section> : null
        }
      </article>
    </div>
  );
};

export default ResumePreview;
