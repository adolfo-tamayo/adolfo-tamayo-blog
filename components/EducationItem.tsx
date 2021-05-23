import Link from 'next/link'
import Image from "next/image"

const EducationItem = ({data} : {data: any}) => {
  return (
    <div className="flex flex-row">
    <div className="flex-none w-128 items-center justify-center">
      <Image src={data.logo} width={75} height={75}></Image>
    </div>
    <div className="flex flex-grow flex-col">
      <h2 className="mb-2 text-xl md:text-xl tracking-tighter leading-tight pl-4">{data.program} at {data.name}</h2>
      <h4 className="mb-2 text-sm md:text-sm pl-4">{data.start} - {data.end}</h4>
      <p className="mb-2 text-md md:text-md pl-4 whitespace-pre-line text-justify">{data.description}</p>
      <ul className="text-md md:text-md pl-6 whitespace-pre-line">
        {data.projects.map((project) => {
            return (
                <li> {project.name} </li>
            )
        })}
      </ul>
    </div>
  </div>
  )
}

export default EducationItem
