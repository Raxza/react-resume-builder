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

  return (
    <div>
      <article className="printable mx-auto xl:m-0 aspect-[5/7] p-3 border-2 rounded-sm border-gray-200
      prose prose-hr:border prose-hr:border-gray-200 prose-hr:mb-2 prose-p:mt-0 prose-p:mb-4
      md:text-base break-words dynamic-texts" >
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
                <article key={index} className="pl-2">
                  <div className="flex justify-between">
                    <h5 className="font-bold">{company}</h5>
                    <span>
                      {startDate ? format(startDate, "MMM yyyy") : null} - {endDate ? format(endDate, "MMM yyyy") : isCurrent ? "Present" : ""}
                    </span>
                  </div>
                  <em>{position}</em>
                  {/* <p>{summary}</p> */}
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
                <article key={index} className="pl-2">
                  <div className="flex justify-between">
                    <h5 className="font-bold">{institution}</h5>
                    <span>
                      {startDate ? format(startDate, "MMM yyyy") : null} - {endDate ? format(endDate, "MMM yyyy") : isCurrent ? "Present" : ""}
                    </span>
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
