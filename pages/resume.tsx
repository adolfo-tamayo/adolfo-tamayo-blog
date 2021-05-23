import Head from 'next/head'

import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import HeaderContainer from '../components/header-container'
import Navigation from '../components/navigation'
import EducationItem from '../components/EducationItem'
import ProfessionalExperienceItem from '../components/ProfessionalExperienceItem'

const data = {
  education: {
    items: [
      {
        name: "Universidad Catolica San Pablo",
        logo: "https://media-exp1.licdn.com/dms/image/C560BAQEfoDgcVpQnPA/company-logo_100_100/0/1610042207753?e=1629936000&v=beta&t=iOskBseFIYncySyWRkX5lPFInYscipHBuewmgzxXenc",
        program: "Bsc. Computer Science",
        start: "Mar 2012",
        end: "Dec 2016",
        description: "5 year computer science program with specialization in AI and Computer Graphics. \n Finished top of the class.",
        projects: [
          {
            "name": "Thesis: Volatility-forecasting based genetic portfolio optimization."
          }
        ]
      }
    ]
  },
  profesional: {
    experiences: [ // Ordered by time
      {
        name: "Inka labs",
        logo: "https://media-exp1.licdn.com/dms/image/C4E0BAQHqXJsKK7wi9g/company-logo_100_100/0/1615848127873?e=1629936000&v=beta&t=9nsxnTBjL6P1ttVrqnTM372154xeTJ1sLW-r4rcUCmE",
        role: 'Software Engineer',
        start: "Apr 2013",
        end: "May 2018",
        description: "Worked on a wide variety of software projects for German clients, mostly in the fintech space as a software engineer.\n Example projects include marketplace for metals trading, digital family office mobile app, wealth management analytics and others."
      },
      {
        name: "Universidad Catolica San Pablo",
        logo: "https://media-exp1.licdn.com/dms/image/C560BAQEfoDgcVpQnPA/company-logo_100_100/0/1610042207753?e=1629936000&v=beta&t=iOskBseFIYncySyWRkX5lPFInYscipHBuewmgzxXenc",
        role: 'Teaching Assistant',
        start: "Apr 2014",
        end: "Jul 2014",
        description: 'TA for the "Introduction to Programming" class of about 30 first year Computer Science students.\n Taught basic programming and algorithms in Python.'
      },
      {
        name: "Fincite",
        logo: "https://media-exp1.licdn.com/dms/image/C4D0BAQG5BfldSoktBQ/company-logo_100_100/0/1597666667228?e=1629936000&v=beta&t=OHp9z5eQ_a__GK0XeC-kR6do8y3J7Ms6vD6XhYms9WA",
        role: 'Senior Software Engineer',
        start: "Jun 2018",
        end: "Nov 2019",
        description: "\
          Led several client-facing and internal products as lead developer, working alongside product owners to provide a technical perspective and leading distributed development teams in Peru and Ukraine \n \
          Coordinated with other lead developers to define the architecture of the company's products.\n \
          Led initiatives for internal tools and documentation to speed up development of solutions and increase the quality of deliverables.\n \
          Mentored several new joiners\n \
          Help define hiring standards for new developers"
      },
      {
        name: "Revolut",
        logo: "https://media-exp1.licdn.com/dms/image/C560BAQFBLzULA8_fhg/company-logo_100_100/0/1580135947398?e=1629936000&v=beta&t=Tnlr1LSTdgtx_miDsziDMI1N47EE1X-tsVucqoiTEbM",
        role: 'Senior Software Engineer',
        start: "Nov 2019",
        end: "Present",
        description: "\
          Senior Python engineer building web services on Google Cloud Platform. \n \
          Part of the interviewing team for new engineers. \n \
          \n \
          Spent the first 6 months at Revolut setting up the Compliance Product team, hiring and managing two other engineers and defining software architecture and integrations to streamline compliance processes. \n \
          \n \
          Later moved to the NLP team where the team and I developed several services like: \n \
          * Training data management platform for the chatbot agent used in support, which improved the accuracy of the intent detection and chatbot CSAT by 27% \n \
          * Orchestrator service to allow other internal teams to leverage NLP tools like intent detection, full text search, article recommendation ML models, etc. \n \
          * Internal knowledge base data service with weighted hierarchical content relationships using PostgreSQL ltree module"
      },
    ]
  },
}

const Resume = () => {
    return (
    <>
      <Layout>
        <Head>
          <title>Adolfo Tamayo's personal site</title>
        </Head>
        <Container>
          <HeaderContainer>
            <Intro />
            <Navigation />
          </HeaderContainer>
          <h2 className="text-6xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">Professional Experience</h2>
          <div style={{width: "64rem", margin: "auto"}}>
            {
              data.profesional.experiences.reverse().map((professionalExperience)=> <ProfessionalExperienceItem data={professionalExperience}/>)
            }
          </div>
          <h2 className="text-6xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">Education</h2>
          <div style={{width: "64rem", margin: "auto"}}>
          {
            data.education.items.map((education)=> <EducationItem data={education}/>)
          }
          </div>
          
          
        </Container>
      </Layout>
    </>
  )
}
export default Resume