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
        logo: "https://media.licdn.com/dms/image/C4D0BAQE2w_kyyEOB4Q/company-logo_100_100/0/1677884975544?e=1687996800&v=beta&t=rhsn4qhVuUFIVizNVpodNvw-e1xKyR5kFUho3At7iAk",
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
        logo: "https://media.licdn.com/dms/image/C4E0BAQHqXJsKK7wi9g/company-logo_100_100/0/1615848127873?e=1687996800&v=beta&t=rA3XfCIKgiM91qIW7oCNLoy-hD7QLrP2mScyzfeDPD8",
        role: 'Software Engineer',
        start: "Apr 2013",
        end: "May 2018",
        description: "Worked on a wide variety of software projects for German clients, mostly in the fintech space as a software engineer.\n Example projects include marketplace for metals trading, digital family office mobile app, wealth management analytics and others."
      },
      {
        name: "Universidad Catolica San Pablo",
        logo: "https://media.licdn.com/dms/image/C4D0BAQE2w_kyyEOB4Q/company-logo_100_100/0/1677884975544?e=1687996800&v=beta&t=rhsn4qhVuUFIVizNVpodNvw-e1xKyR5kFUho3At7iAk",
        role: 'Teaching Assistant',
        start: "Apr 2014",
        end: "Jul 2014",
        description: 'TA for the "Introduction to Programming" class of about 30 first year Computer Science students.\n Taught basic programming and algorithms in Python.'
      },
      {
        name: "Fincite",
        logo: "https://media.licdn.com/dms/image/C4E0BAQHsKzZ7kCEKaw/company-logo_100_100/0/1628522400595?e=1687996800&v=beta&t=APZ9tu2iFzy8tILYdAZq0K3rgjmcsl90V5TIEldGcik",
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
        logo: "https://media.licdn.com/dms/image/C4E0BAQFO68BVzYerJQ/company-logo_100_100/0/1656690187447?e=1687996800&v=beta&t=37fyjRG_LTxLKl8UfNPc-piokLcjSAXGuJBBb0CBaH0",
        role: 'Senior Software Engineer',
        start: "Nov 2019",
        end: "Present",
        description: "\
          As a Senior Python Engineer, I contributed to the development of web services on the Google Cloud Platform and participated in the interviewing process for new engineering hires. \n \
          \n \
          My initial six months at Revolut were spent establishing the Compliance Product team, recruiting and managing two engineers, as well as outlining software architecture and integrations to enhance compliance processes. \n \
          \n \
          I then transitioned to the NLP team, where my colleagues and I developed several services, including: \n \
          * A training data management platform for the support chatbot agent, which increased intent detection accuracy and customer satisfaction by 27% \n \
          * An orchestrator service that enabled other internal teams to utilize NLP tools like intent detection, full-text search, and article recommendation machine learning models \n \
          * An internal knowledge base data service that employed PostgreSQL's ltree module to create weighted hierarchical content relationships"
      },
      {
        name: "Revolut",
        logo: "https://media.licdn.com/dms/image/C4E0BAQFO68BVzYerJQ/company-logo_100_100/0/1656690187447?e=1687996800&v=beta&t=37fyjRG_LTxLKl8UfNPc-piokLcjSAXGuJBBb0CBaH0",
        role: 'Lead Software Engineer (Python)',
        start: "Nov 2019",
        end: "June 2022",
        description: "\
          Additionally to the further development of the NLP products of the Help Centre CMS, the Chatbot, and translation services, I was involved in Python engineering function level initiatives, like trialing infrastructure migrations and providing input for common guidelines and development libraries creation.\n \
          Mentoring of up to 5 other Python backend engineers across different teams and products like localisation, scheduling optimisation and our in house HR system. \
          "
      },
      {
        name: "Revolut",
        logo: "https://media.licdn.com/dms/image/C4E0BAQFO68BVzYerJQ/company-logo_100_100/0/1656690187447?e=1687996800&v=beta&t=37fyjRG_LTxLKl8UfNPc-piokLcjSAXGuJBBb0CBaH0",
        role: 'Lead Software Engineer',
        start: "July 2022",
        end: "Present",
        description: "\
        As the lead of the Technology Governance team, I've overseen the development of a platform for software governance. \n \
        The platform includes: \n \
          * Component catalog: Records metadata on software components, infrastructure definitions, and observability links. \n \
          * SLO monitoring: Tier-based framework for evaluating service health and performance. \n \
          * Service maps: Visualizes architecture, displaying individual components and dependencies. \n \
          * Aggregate views: Organizes components by domains, teams, and departments, showing filtered lists and key stats. \n \
          * Cost explorer: Provides a heatmap of expenses, navigable by department, product usage, and attributed component. \n \
        "
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