import Link from 'next/link'
import Image from "next/image"

const ProfessionalExperienceItem = ({data} : {data: any}) => {
  return (
    <div className="flex flex-row">
      <div className="flex-none w-128 items-center justify-center">
        <Image src={data.logo} width={75} height={75}></Image>
      </div>
      <div className="flex flex-grow flex-col text-justify">
        <h2 className="mb-2 text-xl md:text-xl tracking-tighter leading-tight pl-4">{data.role} at {data.name}</h2>
        <h4 className="mb-2 text-sm md:text-sm pl-4">{data.start} - {data.end}</h4>
        <p className="mb-2 text-md md:text-md pl-4 whitespace-pre-line ">{data.description}</p>
      </div>
    </div>
  )
}

export default ProfessionalExperienceItem
